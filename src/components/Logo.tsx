
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className, size = 100 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 500 500" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E6C200"/>
          <stop offset="50%" stopColor="#D4AF37"/>
          <stop offset="100%" stopColor="#B8860B"/>
        </linearGradient>
      </defs>

      {/* Círculo principal */}
      <circle cx="250" cy="250" r="210" fill="none" stroke="url(#gold)" strokeWidth="2"/>

      {/* Gota superior esquerda */}
      <path d="
        M 250 40 
        C 230 40, 180 45, 140 70 
        C 100 95, 60 140, 50 180 
        C 45 200, 48 215, 60 220 
        C 72 225, 80 215, 78 200 
        C 72 165, 95 125, 130 95 
        C 165 65, 210 48, 250 45 
        Z
      " fill="url(#gold)" opacity="0.9"/>

      {/* Gota inferior direita */}
      <path d="
        M 250 460 
        C 270 460, 320 455, 360 430 
        C 400 405, 440 360, 450 320 
        C 455 300, 452 285, 440 280 
        C 428 275, 420 285, 422 300 
        C 428 335, 405 375, 370 405 
        C 335 435, 290 452, 250 455 
        Z
      " fill="url(#gold)" opacity="0.85"/>

      {/* Ícone "N" central superior */}
      <g transform="translate(250, 155)">
        <circle cx="0" cy="0" r="30" fill="url(#gold)"/>
        <path d="
          M -18 12
          C -14 -2, -6 -16, 2 -18
          C 8 -20, 12 -14, 8 -6
          C 4 2, -2 10, -8 14
          C -12 16, -16 14, -18 12
          Z
          M -18 12
          C -14 10, -8 4, -2 -2
          C 4 -8, 10 -14, 16 -18
          C 18 -19, 20 -19, 18 -16
          C 14 -10, 8 -2, 2 4
          C -4 10, -10 14, -16 16
          Z
        " fill="#ffffff" opacity="0.95"/>
      </g>

      {/* Texto "napau" */}
      <text 
        x="250" 
        y="270" 
        textAnchor="middle" 
        fontFamily="'Poppins', sans-serif" 
        fontSize="48" 
        fontWeight="400" 
        fill="url(#gold)" 
        style={{ letterSpacing: '6px' }}
      >
        napau
      </text>

      {/* Gotinhas decorativas no "u" */}
      <circle cx="305" cy="272" r="2.5" fill="url(#gold)"/>
      <circle cx="310" cy="276" r="1.8" fill="url(#gold)" opacity="0.7"/>

      {/* Texto "Design & Arte" */}
      <text 
        x="250" 
        y="300" 
        textAnchor="middle" 
        fontFamily="'Poppins', sans-serif" 
        fontSize="16" 
        fontWeight="300" 
        fill="url(#gold)" 
        style={{ letterSpacing: '4px', textTransform: 'uppercase' }}
      >
        Design & Arte
      </text>
    </svg>
  );
};
