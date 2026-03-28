'use client';

import { motion } from 'framer-motion';

export function MountainMark({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <defs>
        <linearGradient id="sierra-mountain-grad" x1="24" y1="6" x2="24" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2c3a32" />
          <stop offset="1" stopColor="#3d5247" />
        </linearGradient>
      </defs>
      <path d="M24 6L8 38h32L24 6z" fill="url(#sierra-mountain-grad)" />
      <path
        d="M24 14L14 38h20L24 14z"
        fill="url(#sierra-mountain-grad)"
        fillOpacity={0.55}
      />
      <circle cx="17" cy="22" r="2" className="fill-sierra-snow/90" />
    </motion.svg>
  );
}
