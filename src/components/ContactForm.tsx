
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you shortly.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest px-1">Full Name</label>
          <Input 
            required 
            placeholder="John Doe" 
            className="bg-white/50 border-border focus:ring-primary focus:border-primary rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest px-1">Email Address</label>
          <Input 
            required 
            type="email" 
            placeholder="john@example.com" 
            className="bg-white/50 border-border focus:ring-primary focus:border-primary rounded-xl"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest px-1">Subject</label>
        <Input 
          required 
          placeholder="New branding project" 
          className="bg-white/50 border-border focus:ring-primary focus:border-primary rounded-xl"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest px-1">Message</label>
        <Textarea 
          required 
          placeholder="Tell us about your vision..." 
          rows={5}
          className="bg-white/50 border-border focus:ring-primary focus:border-primary rounded-xl resize-none"
        />
      </div>
      <Button 
        type="submit" 
        disabled={loading}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-xl font-semibold text-lg gold-shimmer shadow-lg flex gap-2 items-center justify-center group"
      >
        {loading ? "Sending..." : (
          <>
            Send Message 
            <Send size={18} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </Button>
    </form>
  );
};
