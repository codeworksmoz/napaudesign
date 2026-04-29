"use client";

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { DEFAULT_HOME_CONTENT } from '@/lib/portfolio-data';

export const WhatsAppButton: React.FC = () => {
  const [whatsapp, setWhatsapp] = useState(DEFAULT_HOME_CONTENT.whatsappNumber);

  useEffect(() => {
    async function fetchContact() {
      const { data } = await supabase.from('home_content').select('whatsappNumber').eq('id', 1).maybeSingle();
      if (data?.whatsappNumber) setWhatsapp(data.whatsappNumber);
    }
    fetchContact();
  }, []);

  return (
    <a
      href={`https://wa.me/${whatsapp}`}
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