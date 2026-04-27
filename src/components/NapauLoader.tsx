import React from 'react';

export const NapauLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative flex flex-col items-center gap-4">
        <svg 
          width="120" 
          height="120" 
          viewBox="0 0 500 500" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gold-loader" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E6C200"/>
              <stop offset="50%" stopColor="#D4AF37"/>
              <stop offset="100%" stopColor="#B8860B"/>
            </linearGradient>
          </defs>

          {/* Círculo de fundo estático */}
          <circle cx="250" cy="250" r="210" fill="none" stroke="url(#gold-loader)" strokeWidth="1" opacity="0.2"/>

          {/* Parte que gira: Gotas */}
          <g className="napau-spin">
            <path d="
              M 250 40 
              C 230 40, 180 45, 140 70 
              C 100 95, 60 140, 50 180 
              C 45 200, 48 215, 60 220 
              C 72 225, 80 215, 78 200 
              C 72 165, 95 125, 130 95 
              C 165 65, 210 48, 250 45 
              Z
            " fill="url(#gold-loader)"/>
            
            <path d="
              M 250 460 
              C 270 460, 320 455, 360 430 
              C 400 405, 440 360, 450 320 
              C 455 300, 452 285, 440 280 
              C 428 275, 420 285, 422 300 
              C 428 335, 405 375, 370 405 
              C 335 435, 290 452, 250 455 
              Z
            " fill="url(#gold-loader)" opacity="0.7"/>
          </g>

          {/* N central estático */}
          <g transform="translate(250, 250)">
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
            " fill="url(#gold-loader)" transform="translate(0, -95) scale(1.5)" opacity="0.3"/>
          </g>
        </svg>
        <div className="flex flex-col items-center">
          <span className="text-primary font-headline font-bold text-lg tracking-[0.2em] uppercase">Napau</span>
          <div className="w-12 h-[1px] bg-primary/30 mt-1"></div>
        </div>
      </div>
    </div>
  );
};