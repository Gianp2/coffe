/**
 * Elegant smooth scrolling animation with adaptive duration and cubic-bezier easing.
 */

interface SmoothScrollOptions {
  duration?: number;
  offset?: number;
  onComplete?: () => void;
}

// Ease-in-out cubic for luxurious, editorial deceleration
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

let currentScrollCancellation: (() => void) | null = null;

export function smoothScrollToElement(
  targetElement: HTMLElement,
  options: SmoothScrollOptions = {}
): () => void {
  // Cancel any ongoing programmatic scroll
  if (currentScrollCancellation) {
    currentScrollCancellation();
    currentScrollCancellation = null;
  }

  const { offset = 60, onComplete } = options;
  const startY = window.scrollY || window.pageYOffset;
  const elementRect = targetElement.getBoundingClientRect();
  const targetY = Math.max(0, elementRect.top + startY - offset);
  const distance = targetY - startY;

  // If very close, instant jump
  if (Math.abs(distance) < 8) {
    window.scrollTo({ top: targetY });
    onComplete?.();
    return () => {};
  }

  // Adaptive duration: 450ms min, 750ms max based on distance
  const baseDuration = options.duration ?? Math.min(Math.max(450, Math.abs(distance) * 0.4), 700);

  let startTime: number | null = null;
  let animationFrameId: number;
  let isCancelled = false;

  const cancel = () => {
    isCancelled = true;
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('wheel', onUserInterrupt);
    window.removeEventListener('touchstart', onUserInterrupt);
    if (currentScrollCancellation === cancel) {
      currentScrollCancellation = null;
    }
  };

  const onUserInterrupt = () => {
    cancel();
  };

  window.addEventListener('wheel', onUserInterrupt, { passive: true });
  window.addEventListener('touchstart', onUserInterrupt, { passive: true });

  const step = (currentTime: number) => {
    if (isCancelled) return;
    if (startTime === null) startTime = currentTime;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / baseDuration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * easedProgress);

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetY);
      cancel();
      onComplete?.();
    }
  };

  currentScrollCancellation = cancel;
  animationFrameId = requestAnimationFrame(step);

  return cancel;
}
