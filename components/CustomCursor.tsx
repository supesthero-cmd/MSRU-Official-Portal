import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);

  // Use MotionValues to bypass React render cycle for high-frequency updates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring animation configuration for the inner dot
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Outer ring lags slightly behind for organic feel
  const springConfigOuter = { damping: 20, stiffness: 300 };
  const cursorXOuterSpring = useSpring(cursorX, springConfigOuter);
  const cursorYOuterSpring = useSpring(cursorY, springConfigOuter);

  // Transform values to center the cursor elements (offset by half width/height)
  // Inner dot is w-4 (16px), so offset is 8px
  const dotX = useTransform(cursorXSpring, (x) => x - 8);
  const dotY = useTransform(cursorYSpring, (y) => y - 8);
  
  // Outer ring is w-8 (32px), so offset is 16px
  const ringX = useTransform(cursorXOuterSpring, (x) => x - 16);
  const ringY = useTransform(cursorYOuterSpring, (y) => y - 16);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Update MotionValues directly - no React re-render triggered
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check for clickable elements
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('[role="button"]');
        
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-cinnabar rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-ink rounded-full pointer-events-none z-50 hidden md:block opacity-50"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      />
    </>
  );
};

export default CustomCursor;