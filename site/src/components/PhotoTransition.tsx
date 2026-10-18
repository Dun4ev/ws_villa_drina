import { useEffect, useRef, type ImgHTMLAttributes } from 'react';
import { isKeyboardInput } from '../motion';

/** CSS retargets rapid photo changes; stale decodes cannot restart the fade. */
export function PhotoTransition(props: ImgHTMLAttributes<HTMLImageElement>) {
  const imageRef = useRef<HTMLImageElement>(null);
  const previousSource = useRef(props.src);

  useEffect(() => {
    if (previousSource.current === props.src) return;
    previousSource.current = props.src;
    const image = imageRef.current;
    if (!image || isKeyboardInput()) return;
    let cancelled = false;
    let frame = 0;
    image.style.opacity = '0.55';

    void image.decode().then(() => {
      if (cancelled || isKeyboardInput()) return;
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => { image.style.opacity = '1'; });
      });
    }).catch(() => { if (!cancelled) image.style.opacity = '1'; });

    const interrupt = () => { image.style.opacity = '1'; };
    document.addEventListener('keydown', interrupt, true);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      image.style.opacity = '1';
      document.removeEventListener('keydown', interrupt, true);
    };
  }, [props.src]);

  return <img {...props} className={`photo-transition ${props.className ?? ''}`.trim()} ref={imageRef} />;
}
