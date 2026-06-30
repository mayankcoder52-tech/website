import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Disable custom cursor on mobile/touch screens
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setHidden(false);

    const position = { x: 0, y: 0 };
    const ringPosition = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      position.x = e.clientX;
      position.y = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
      }
    };

    const animateRing = () => {
      // Linear interpolation to make the outer ring lag smoothly
      ringPosition.x += (position.x - ringPosition.x) * 0.12;
      ringPosition.y += (position.y - ringPosition.y) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0)`;
      }

      requestAnimationFrame(animateRing);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const animId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Tiny solid dot */}
      <div
        ref={cursorRef}
        id="custom-cursor-dot"
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-indigo-400 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
        style={{ mixBlendMode: 'difference' }}
      />
      {/* Lagging trailing ring */}
      <div
        ref={ringRef}
        id="custom-cursor-ring"
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${
          hovered
            ? 'w-10 h-10 bg-indigo-500/10 border border-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.4)] scale-110'
            : 'w-6 h-6 border border-indigo-500/30'
        }`}
      />
    </>
  );
}
