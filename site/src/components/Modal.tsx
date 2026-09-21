/// <reference types="vite/client" />

import {
  type ReactNode,
  useEffect,
  useId,
  useRef,
} from "react";

import "./interactions.css";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  className?: string;
}

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

let lockedDialogCount = 0;
let previousBodyOverflow = "";

function lockBodyScroll() {
  if (lockedDialogCount === 0) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  lockedDialogCount += 1;

  return () => {
    lockedDialogCount = Math.max(0, lockedDialogCount - 1);
    if (lockedDialogCount === 0) {
      document.body.style.overflow = previousBodyOverflow;
    }
  };
}

export function Modal({
  open,
  onClose,
  label,
  children,
  className = "",
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const labelId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }

    returnFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    if (!dialog.open) dialog.showModal();
    const unlockBodyScroll = lockBodyScroll();

    const focusTarget = dialog.querySelector<HTMLElement>(
      "[autofocus], " + FOCUSABLE_SELECTOR,
    );
    focusTarget?.focus();

    return () => {
      unlockBodyScroll();
      if (dialog.open) dialog.close();
      const returnTarget = returnFocusRef.current;
      if (returnTarget?.isConnected) returnTarget.focus();
    };
  }, [open]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ).filter((element) => !element.hasAttribute("hidden"));

    if (focusable.length === 0) {
      event.preventDefault();
      dialog.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={`interaction-modal ${className}`.trim()}
      aria-labelledby={labelId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const isBackdropClick =
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom;
        if (isBackdropClick) onClose();
      }}
      onKeyDown={handleKeyDown}
    >
      <span id={labelId} className="interaction-sr-only">
        {label}
      </span>
      {children}
    </dialog>
  );
}

export default Modal;
