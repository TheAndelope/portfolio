import React, { useState, useEffect, useCallback } from 'react';
import { Window } from 'react-windows-xp';
import { useDraggable } from '../hooks/useDraggable';
import { useWindowBounds } from '../hooks/useWindowBounds';

interface XPWindowProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  showMinimize?: boolean;
  /** Skip the mount open-animation (parent already manages entry) */
  skipOpenAnimation?: boolean;
  className?: string;
  /** Outer wrapper size / position styles (width, height, top, left, zIndex, etc.) */
  style?: React.CSSProperties;
  /**
   * Rendered flush at the very top of the window, directly inside .window-body
   * (which has margin:0). Use for toolbars so they sit edge-to-edge.
   */
  toolbar?: React.ReactNode;
  /** When true, the content area shows a permanent XP-styled scrollbar. */
  scrollable?: boolean;
  /** Extra styles forwarded to the scrollable content wrapper */
  bodyStyle?: React.CSSProperties;
  /** Called on any mousedown inside the window (use to bring window to front) */
  onMouseDown?: () => void;
  /** Adds custom resize handles to all 8 edges/corners */
  resizable?: boolean;
  /** Filename (without path) of a 16×16 PNG in /public/icons/ e.g. "portfolio.png" */
  icon?: string;
}

const RESIZE_HANDLES: {
  dir: string;
  style: React.CSSProperties;
}[] = [
  { dir: 'n',  style: { top: -3, left: 8, right: 8, height: 6, cursor: 'n-resize' } },
  { dir: 'ne', style: { top: -3, right: -3, width: 8, height: 8, cursor: 'ne-resize' } },
  { dir: 'e',  style: { top: 8, right: -3, bottom: 8, width: 6, cursor: 'e-resize' } },
  { dir: 'se', style: { bottom: -3, right: -3, width: 8, height: 8, cursor: 'se-resize' } },
  { dir: 's',  style: { bottom: -3, left: 8, right: 8, height: 6, cursor: 's-resize' } },
  { dir: 'sw', style: { bottom: -3, left: -3, width: 8, height: 8, cursor: 'sw-resize' } },
  { dir: 'w',  style: { top: 8, left: -3, bottom: 8, width: 6, cursor: 'w-resize' } },
  { dir: 'nw', style: { top: -3, left: -3, width: 8, height: 8, cursor: 'nw-resize' } },
];

export const XPWindow: React.FC<XPWindowProps> = ({
  title,
  children,
  onClose,
  showMinimize = false,
  skipOpenAnimation = false,
  className = '',
  style,
  toolbar,
  scrollable = false,
  bodyStyle,
  onMouseDown,
  resizable = false,
  icon,
}) => {
  const [isMaximized, setIsMaximized] = useState(false);

  // When resizable, disable useDraggable; also disable while maximized so
  // drag/resize can't overwrite bounds with the fullscreen position.
  const [wrapperRef, isDraggingTransform] = useDraggable<HTMLDivElement>({
    handleSelector: resizable ? '__no_match__' : '.title-bar',
  });

  const { bounds, isDragging: isDraggingBounds, startResize } = useWindowBounds(
    wrapperRef as React.RefObject<HTMLElement | null>,
    resizable && !isMaximized,
  );

  const isDragging = resizable ? isDraggingBounds : isDraggingTransform;

  // Once dragged, kill the CSS float animation permanently.
  const [animationKilled, setAnimationKilled] = useState(false);
  useEffect(() => {
    if (isDragging && !animationKilled) setAnimationKilled(true);
  }, [isDragging, animationKilled]);

  // Open animation
  const [isAnimatingIn, setIsAnimatingIn] = useState(!skipOpenAnimation);
  useEffect(() => {
    if (skipOpenAnimation) return;
    const t = setTimeout(() => setIsAnimatingIn(false), 220);
    return () => clearTimeout(t);
  }, [skipOpenAnimation]);

  // Close animation
  const [isClosing, setIsClosing] = useState(false);
  const handleClose = useCallback(() => {
    if (!onClose) return;
    setIsClosing(true);
    setTimeout(() => onClose(), 170);
  }, [onClose]);

  const handleMaximize = () => setIsMaximized(m => !m);

  const getWrapperStyle = (): React.CSSProperties => {
    // Fullscreen override
    if (isMaximized) {
      return {
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'block',
        cursor: 'default',
      };
    }

    // When resizable and bounds are available, use fixed pixel positioning
    if (resizable && bounds) {
      return {
        position: 'fixed',
        left: bounds.left,
        top: bounds.top,
        width: bounds.width,
        height: bounds.height,
        display: 'block',
        cursor: isDragging ? 'grabbing' : 'default',
        zIndex: style?.zIndex,
        ...(isClosing ? { animation: 'windowClose 0.17s ease-in forwards' } : {}),
      };
    }

    if (isClosing) {
      const { opacity, transform, transition, animation, ...rest } = style ?? {};
      return { display: 'inline-block', cursor: 'default', ...rest, animation: 'windowClose 0.17s ease-in forwards' };
    }
    if (isAnimatingIn && !animationKilled) {
      const { opacity, transform, transition, animation, ...rest } = style ?? {};
      return { display: 'inline-block', cursor: isDragging ? 'grabbing' : 'default', ...rest, animation: 'windowOpen 0.22s ease-out forwards' };
    }
    return {
      display: 'inline-block',
      cursor: isDragging ? 'grabbing' : 'default',
      ...style,
      ...(animationKilled ? { animation: 'none' } : {}),
    };
  };

  // Apply flex-fill layout when bounds are active OR maximized
  const activeResizable = resizable && (!!bounds || isMaximized);
  const wrapperClassName = [
    className,
    activeResizable ? 'xp-resizable-active' : '',
    icon ? 'window-has-icon' : '',
  ].filter(Boolean).join(' ');

  const wrapperStyle = icon
    ? { ...getWrapperStyle(), '--title-icon': `url('/icons/${icon}')` } as React.CSSProperties
    : getWrapperStyle();

  return (
    <div ref={wrapperRef} className={wrapperClassName} style={wrapperStyle} onMouseDownCapture={onMouseDown}>
      <Window
        title={title}
        showClose={!!onClose}
        showMinimize={showMinimize}
        showMaximize
        onClose={handleClose}
        onMaximize={handleMaximize}
        style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}
      >
        {toolbar}
        <div
          style={
            activeResizable
              ? {
                  padding: '8px',
                  flex: 1,
                  minHeight: 0,
                  overflowY: scrollable ? 'scroll' : 'auto',
                  boxSizing: 'border-box',
                }
              : {
                  padding: '8px',
                  overflowY: scrollable ? 'scroll' : 'auto',
                  ...bodyStyle,
                }
          }
        >
          {children}
        </div>
      </Window>

      {/* Resize handles — hidden while maximized */}
      {resizable && !isMaximized && RESIZE_HANDLES.map(({ dir, style: handleStyle }) => (
        <div
          key={dir}
          style={{
            position: 'absolute',
            zIndex: 1,
            background: 'transparent',
            ...handleStyle,
          }}
          onMouseDown={e => startResize(e, dir)}
        />
      ))}
    </div>
  );
};
