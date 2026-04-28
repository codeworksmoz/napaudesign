
"use client";

import React from 'react';
import { Star, Award, Users, Truck } from 'lucide-react';

const stats = [
  { icon: Award, text: '+200 Projectos Únicos' },
  { icon: Users, text: '+5 Anos de Experiência' },
  { icon: Truck, text: 'Entregas em Todo o País' },
  { icon: Star, text: 'Avaliação ★★★★★ Google' }
];

export const SocialProofStrip: React.FC = () => {
  return (
    <section className="bg-primary py-6 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex items-center gap-3 text-white/90">
            <stat.icon size={20} className="text-white" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">
              {stat.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
