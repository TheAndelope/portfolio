import { useState, useEffect, useRef, useCallback } from 'react';

interface Bounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface UseWindowBoundsResult {
  bounds: Bounds | null;
  isDragging: boolean;
  startResize: (e: React.MouseEvent, dir: string) => void;
}

export const useWindowBounds = (
  wrapperRef: React.RefObject<HTMLElement | null>,
  active: boolean,
  minWidth = 220,
  minHeight = 150,
): UseWindowBoundsResult => {
  const [bounds, setBounds] = useState<Bounds | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Ref that always holds the latest bounds to avoid stale closures in event handlers
  const boundsRef = useRef<Bounds | null>(null);

  // Sync boundsRef whenever bounds state changes
  useEffect(() => {
    boundsRef.current = bounds;
  }, [bounds]);

  // Lazily capture bounds from the DOM on first interaction (drag or resize).
  // This lets CSS animations (float cards) run freely until the user touches the window.
  const captureBoundsNow = () => {
    if (boundsRef.current || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const b: Bounds = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
    boundsRef.current = b;
    setBounds(b);
  };

  // Title-bar drag (move the window)
  useEffect(() => {
    if (!active) return;

    const el = wrapperRef.current;
    if (!el) return;

    let dragging = false;
    let startX = 0;
    let startY = 0;

    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Only drag from title-bar, but NOT from title-bar-controls
      if (!target.closest('.title-bar')) return;
      if (target.closest('.title-bar-controls')) return;

      captureBoundsNow();
      const b = boundsRef.current;
      if (!b) return;

      dragging = true;
      startX = e.clientX - b.left;
      startY = e.clientY - b.top;
      setIsDragging(true);
      e.preventDefault();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      e.preventDefault();

      const newLeft = e.clientX - startX;
      const newTop = e.clientY - startY;

      const next: Bounds = {
        left: newLeft,
        top: newTop,
        width: boundsRef.current?.width ?? minWidth,
        height: boundsRef.current?.height ?? minHeight,
      };
      boundsRef.current = next;
      setBounds(next);
    };

    const onMouseUp = () => {
      if (!dragging) return;
      dragging = false;
      setIsDragging(false);
    };

    el.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [active, wrapperRef, minWidth, minHeight]);

  const startResize = useCallback(
    (e: React.MouseEvent, dir: string) => {
      if (!active) return;

      e.preventDefault();
      e.stopPropagation();

      captureBoundsNow();

      const startMouseX = e.clientX;
      const startMouseY = e.clientY;
      const startBounds = boundsRef.current
        ? { ...boundsRef.current }
        : null;

      if (!startBounds) return;

      setIsDragging(true);

      const onMouseMove = (ev: MouseEvent) => {
        ev.preventDefault();

        const dx = ev.clientX - startMouseX;
        const dy = ev.clientY - startMouseY;

        let { left, top, width, height } = startBounds;

        if (dir.includes('e')) {
          width = Math.max(minWidth, startBounds.width + dx);
        }
        if (dir.includes('s')) {
          height = Math.max(minHeight, startBounds.height + dy);
        }
        if (dir.includes('w')) {
          const newWidth = Math.max(minWidth, startBounds.width - dx);
          left = startBounds.left + (startBounds.width - newWidth);
          width = newWidth;
        }
        if (dir.includes('n')) {
          const newHeight = Math.max(minHeight, startBounds.height - dy);
          top = startBounds.top + (startBounds.height - newHeight);
          height = newHeight;
        }

        const next: Bounds = { left, top, width, height };
        boundsRef.current = next;
        setBounds(next);
      };

      const onMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [active, minWidth, minHeight],
  );

  if (!active) {
    return {
      bounds: null,
      isDragging: false,
      startResize: () => {},
    };
  }

  return { bounds, isDragging, startResize };
};
