'use client';

import styles from './BeepOverview.module.css'

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function BeepOverview() {

const MaskedText = () => {
  const [hoveredShape, setHoveredShape] = useState(null);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Background Text (Always Present) */}
      <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-gray-500">
        <p>UX/UI DESIGN - PRODUCT DESIGN - USER TESTING - RESEARCH</p>
      </div>

      {/* SVG Masked Shapes */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <mask id="hover-mask">
            <rect width="100%" height="100%" fill="white" />
            {hoveredShape === 'rect' && (
              <rect x="10" y="10" width="40" height="40" fill="black" />
            )}
            {hoveredShape === 'circle' && (
              <circle cx="70" cy="30" r="20" fill="black" />
            )}
            {hoveredShape === 'triangle' && (
              <polygon points="40,70 60,90 80,70" fill="black" />
            )}
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="black" mask="url(#hover-mask)" />
      </svg>

      {/* Hoverable Elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-gray-500"
        onMouseEnter={() => setHoveredShape('rect')}
        onMouseLeave={() => setHoveredShape(null)}
      />
      <motion.div
        className="absolute top-20 left-60 w-16 h-16 bg-gray-500 rounded-full"
        onMouseEnter={() => setHoveredShape('circle')}
        onMouseLeave={() => setHoveredShape(null)}
      />
      <motion.div
        className="absolute top-40 left-40 w-16 h-16 bg-gray-500 clip-triangle"
        onMouseEnter={() => setHoveredShape('triangle')}
        onMouseLeave={() => setHoveredShape(null)}
      />
    </div>
  );
};

export default MaskedText;

}