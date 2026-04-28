
"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/258847615871"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group flex items-center gap-3"
      aria-label="Contactar no WhatsApp"
    >
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-bold text-sm transition-all group-hover:max-w-[150px]">
        Falar com a Napau
      </span>
      <MessageCircle size={28} />
    </a>
  );
};
