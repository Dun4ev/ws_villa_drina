import { useEffect } from "react";
import { isKeyboardInput, motionToken } from '../motion';

const REVEAL_SELECTOR = "[data-reveal]";
const revealedElements = new WeakSet<HTMLElement>();

function getDelay(element: HTMLElement) {
  const parsed = Number.parseInt(element.dataset.revealDelay ?? "0", 10);
  return Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), 160) : 0;
}

/**
 * Adds a single, progressive reveal to the existing `[data-reveal]` elements.
 * The DOM remains fully visible when animation APIs are unavailable.
 */
export function useLuxuryMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const pointer = () => { root.dataset.inputModality = 'pointer'; };
    const keyboard = () => { root.dataset.inputModality = 'keyboard'; };
    document.addEventListener('pointerdown', pointer, true);
    document.addEventListener('keydown', keyboard, true);
    return () => {
      document.removeEventListener('pointerdown', pointer, true);
      document.removeEventListener('keydown', keyboard, true);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    );
    const elementSet = new Set(elements);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileViewport = window.matchMedia("(max-width: 600px)");
    const activeAnimations = new Map<HTMLElement, Animation>();
    let observer: IntersectionObserver | null = null;

    const clearAnimation = (element: HTMLElement) => {
      const animation = activeAnimations.get(element);
      if (animation) {
        animation.cancel();
        activeAnimations.delete(element);
      }
    };

    const settleElement = (element: HTMLElement) => {
      revealedElements.add(element);
      observer?.unobserve(element);
      clearAnimation(element);
    };

    const animateElement = (element: HTMLElement) => {
      if (revealedElements.has(element) || reducedMotion.matches) return;

      if (isKeyboardInput()) {
        settleElement(element);
        return;
      }

      revealedElements.add(element);
      observer?.unobserve(element);

      const mobile = mobileViewport.matches;
      try {
        const animation = element.animate(
          [
            {
              opacity: 0.55,
              transform: `translateY(${mobile ? 6 : 8}px)`,
            },
            {
              opacity: 1,
              transform: "translateY(0)",
            },
          ],
          {
            duration: 600,
            delay: getDelay(element),
            easing: motionToken('--ease-out', 'cubic-bezier(0.23, 1, 0.32, 1)'),
            fill: "both",
          },
        );

        activeAnimations.set(element, animation);
        animation.addEventListener(
          "finish",
          () => {
            if (activeAnimations.get(element) === animation) {
              animation.cancel();
              activeAnimations.delete(element);
            }
          },
          { once: true },
        );
      } catch {
        // The base CSS keeps content visible if WAAPI cannot animate the element.
        clearAnimation(element);
      }
    };

    const startObserver = () => {
      observer?.disconnect();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) animateElement(entry.target as HTMLElement);
          }
        },
        { rootMargin: "0px 0px -8%", threshold: 0.12 },
      );

      for (const element of elements) {
        if (!revealedElements.has(element)) observer.observe(element);
      }
    };

    const handleMotionPreference = () => {
      if (reducedMotion.matches) {
        observer?.disconnect();
        observer = null;
        for (const [element] of activeAnimations) clearAnimation(element);
      } else {
        startObserver();
      }
    };

    const handleFocus = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const revealElement = target.closest<HTMLElement>(REVEAL_SELECTOR);
      if (revealElement && elementSet.has(revealElement)) {
        settleElement(revealElement);
      }
    };

    const interruptForKeyboard = () => {
      for (const [element] of activeAnimations) settleElement(element);
    };

    document.addEventListener("focusin", handleFocus, true);
    document.addEventListener('keydown', interruptForKeyboard, true);
    reducedMotion.addEventListener("change", handleMotionPreference);
    handleMotionPreference();

    return () => {
      observer?.disconnect();
      document.removeEventListener("focusin", handleFocus, true);
      document.removeEventListener('keydown', interruptForKeyboard, true);
      reducedMotion.removeEventListener("change", handleMotionPreference);
      for (const animation of activeAnimations.values()) animation.cancel();
      activeAnimations.clear();
    };
  }, []);
}

export default useLuxuryMotion;
