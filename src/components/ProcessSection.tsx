
"use client";

import React from 'react';
import { Lightbulb, PenTool, Hammer, PackageCheck } from 'lucide-react';

const steps = [
  {
    icon: Lightbulb,
    title: 'Ideia',
    desc: 'Partilhe a sua visão connosco.'
  },
  {
    icon: PenTool,
    title: 'Design',
    desc: 'Criamos o esboço para aprovação.'
  },
  {
    icon: Hammer,
    title: 'Produção',
    desc: 'Arte feita à mão com precisão.'
  },
  {
    icon: PackageCheck,
    title: 'Entrega',
    desc: 'A sua peça chega até si.'
  }
];

export const ProcessSection: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-headline font-bold">Como Trabalhamos</h2>
          <p className="text-muted-foreground italic max-w-lg mx-auto">
            Um processo transparente e dedicado para garantir que cada detalhe seja perfeito.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-primary/5 text-primary flex items-center justify-center transition-all group-hover:bg-primary group-hover:text-white group-hover:rotate-6">
                  <step.icon size={36} />
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-primary uppercase tracking-widest">Passo 0{idx + 1}</div>
                  <h3 className="text-xl font-headline font-bold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-6 w-12 h-[2px] bg-primary/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
