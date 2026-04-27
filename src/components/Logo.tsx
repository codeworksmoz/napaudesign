
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
          <stop offset="0%" stopColor="#E6C200" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>

      {/* 1. Círculo principal */}
      <circle 
        cx="250" 
        cy="250" 
        r="220" 
        stroke="url(#gold)" 
        strokeWidth="2" 
        fill="transparent" 
      />

      {/* 2. Elementos de gota decorativa (Abraçando o círculo) */}
      {/* Superior esquerda */}
      <path 
        d="M60,150 C40,100 80,50 130,70 C160,85 150,130 150,150 C150,200 100,220 60,150 Z" 
        fill="url(#gold)" 
        transform="rotate(-15, 60, 150)"
      />
      {/* Inferior direita */}
      <path 
        d="M440,350 C460,400 420,450 370,430 C340,415 350,370 350,350 C350,300 400,280 440,350 Z" 
        fill="url(#gold)" 
        transform="rotate(-15, 440, 350)"
      />

      {/* 3. Ícone central superior (N estilizado) */}
      <g transform="translate(250, 160)">
        <circle r="40" fill="url(#gold)" opacity="0.1" />
        <path 
          d="M-15,20 C-15,-10 0,-15 15,-5 C15,10 0,15 -15,15 C-25,15 -25,-20 -10,-25 C5,-30 15,-15 15,10" 
          stroke="url(#gold)" 
          strokeWidth="6" 
          strokeLinecap="round" 
          fill="none"
        />
      </g>

      {/* 4. Tipografia - Texto principal: napau */}
      <text 
        x="250" 
        y="300" 
        textAnchor="middle" 
        fontFamily="'Poppins', sans-serif" 
        fontSize="72" 
        fontWeight="400" 
        fill="url(#gold)"
        style={{ letterSpacing: '2px' }}
      >
        napau
      </text>

      {/* Pingo decorativo no final do 'u' */}
      <circle cx="370" cy="305" r="5" fill="url(#gold)" />
      <circle cx="380" cy="295" r="4" fill="url(#gold)" />

      {/* 4. Tipografia - Texto secundário: Design & Arte */}
      <text 
        x="250" 
        y="355" 
        textAnchor="middle" 
        fontFamily="'Poppins', sans-serif" 
        fontSize="24" 
        fontWeight="300" 
        fill="url(#gold)"
        style={{ letterSpacing: '6px', textTransform: 'uppercase' }}
      >
        Design & Arte
      </text>
    </svg>
  );
};
