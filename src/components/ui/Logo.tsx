import React from 'react';

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bold geometric monogram 'A' */}
      <path d="M150 12 L168 48 L132 48 Z" stroke="currentColor" strokeWidth="3" fill="none" />
      <path d="M150 25 L158 41 L142 41 Z" fill="currentColor" />
      <path d="M150 12 C168 2, 180 25, 150 48 C120 25, 132 2, 150 12 Z" stroke="currentColor" strokeWidth="2" fill="none" />
      
      {/* Brand Text */}
      <text x="50%" y="88" dominantBaseline="middle" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="42" fontWeight="700" letterSpacing="0.2em" fill="currentColor">
        AROHAE
      </text>
    </svg>
  );
}
