'use client';

import { useState, useRef } from 'react';
import styles from './MagnifyingGlass.module.css';
import Image from 'next/image';

export default function MagnifyingGlass({
  src,
  alt = 'Image with magnifying glass',
  width,
  height,
  zoomLevel = 2,
  magnifierSize = 150,
  className = '',
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showHint, setShowHint] = useState(true);
  
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Ensure magnifier stays within bounds
    const posX = Math.max(magnifierSize / 2, Math.min(x, rect.width - magnifierSize / 2));
    const posY = Math.max(magnifierSize / 2, Math.min(y, rect.height - magnifierSize / 2));

    setPosition({ x: posX, y: posY });
    
    // Calculate cursor position for zoomed image
    const relativeX = x / rect.width;
    const relativeY = y / rect.height;
    
    setCursorPosition({ 
      x: relativeX * 100, 
      y: relativeY * 100 
    });
  };

  const handleMouseEnter = () => {
    setShowMagnifier(true);
    setShowHint(false);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
    setShowHint(true);
  };

  return (
    <div className={`${styles.magnifierContainer} ${className}`}>
      {/* Image Container - Full viewport */}
      <div
        ref={containerRef}
        className={styles.imageContainer}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Image */}
        <Image
          src={src}
          alt={alt}
          fill={true}
          className={styles.mainImage}
          sizes="100vw"
          priority={true}
        />

        {/* Hover Hint */}
        <div className={`${styles.hoverHint} ${showHint ? styles.hintVisible : styles.hintHidden}`}>
          Hover over the image to zoom
        </div>

        {/* Magnifying Glass */}
        {showMagnifier && (
          <>
            {/* Magnifier Background */}
            <div
              className={styles.magnifier}
              style={{
                left: position.x - magnifierSize / 2,
                top: position.y - magnifierSize / 2,
                width: magnifierSize,
                height: magnifierSize,
              }}
            >
              {/* Zoomed Image */}
              <div
                className={styles.zoomedImage}
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundSize: `${width * zoomLevel}px ${height * zoomLevel}px`,
                  backgroundPosition: `${cursorPosition.x}% ${cursorPosition.y}%`,
                }}
              />
            </div>

            {/* Magnifier Glass Effect */}
            <div
              className={styles.glassEffect}
              style={{
                left: position.x - magnifierSize / 2,
                top: position.y - magnifierSize / 2,
                width: magnifierSize,
                height: magnifierSize,
              }}
            />
          </>
        )}

        {/* Cursor Follow Effect (no pulse) */}
        {showMagnifier && (
          <div
            className={styles.cursorFollower}
            style={{
              left: position.x,
              top: position.y,
            }}
          >
            <div className={styles.cursorDot} />
          </div>
        )}
      </div>
    </div>
  );
}