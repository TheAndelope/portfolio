import { useState, useEffect, useRef, RefObject } from 'react';

interface DragOptions {
  initialX?: number;
  initialY?: number;
  handleSelector?: string;
}

export const useDraggable = <T extends HTMLElement>({
  initialX = 0,
  initialY = 0,
  handleSelector,
}: DragOptions = {}): [RefObject<T>, boolean] => {
  const elementRef = useRef<T>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.style.transform = `translate3d(${initialX}px, ${initialY}px, 0)`;
    element.style.willChange = 'transform';

    let active = false;
    let startX = 0;
    let startY = 0;
    let currentX = initialX;
    let currentY = initialY;

    const onMouseDown = (e: MouseEvent) => {
      if (handleSelector && !(e.target as HTMLElement).closest(handleSelector)) {
        return;
      }

      // Read the ACTUAL visual position from the computed transform matrix.
      // This is critical when a CSS animation is also driving transform — without
      // this the element snaps back to the initialX/Y origin on first move.
      const computed = window.getComputedStyle(element).transform;
      if (computed && computed !== 'none') {
        const matrix = new DOMMatrix(computed);
        currentX = matrix.m41;
        currentY = matrix.m42;
      }

      active = true;
      startX = e.clientX - currentX;
      startY = e.clientY - currentY;

      element.style.transition = 'none';
      element.classList.add('dragging');

      setIsDragging(true);
      e.preventDefault();
      e.stopPropagation();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!active) return;
      e.preventDefault();

      currentX = e.clientX - startX;
      currentY = e.clientY - startY;

      element.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    };

    const onMouseUp = () => {
      if (!active) return;
      active = false;

      element.style.transition = '';
      element.classList.remove('dragging');

      setIsDragging(false);
    };

    element.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      element.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [handleSelector, initialX, initialY]);

  return [elementRef, isDragging];
};
