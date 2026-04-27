
"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generativeMoodBoardTool } from '@/ai/flows/generative-mood-board-tool-flow';
import Image from 'next/image';
import { Sparkles, Loader2, Download, RefreshCcw, Wand2 } from 'lucide-react';

export default function MoodBoardPage() {
  const { toast } = useToast();
  const [brief, setBrief] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ moodBoardImage: string, designConceptDescription: string } | null>(null);

  const handleGenerate = async () => {
    if (!brief.trim()) {
      toast({
        title: "Brief is required",
        description: "Please provide some details about your vision first.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const data = await generativeMoodBoardTool({ designBrief: brief });
      setResult(data);
      toast({
        title: "Concept Generated!",
        description: "Your visual mood board is ready.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your concept. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest border border-primary/20">
              <Sparkles size={14} />
              AI-Powered Innovation
            </div>
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">Mood Board Generator</h1>
            <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
              Our AI tool helps visualize your ideas before we even pick up a pencil. Describe your brand vision, and we'll generate a preliminary concept.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Input Form */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="border-border/50 shadow-xl rounded-3xl overflow-hidden">
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-primary uppercase tracking-[0.2em]">Design Brief</label>
                    <Textarea 
                      placeholder="e.g., A minimalist organic skincare brand with earthy tones, soft shadows, and high-end botanical textures..." 
                      className="min-h-[200px] bg-secondary/30 border-none rounded-2xl resize-none focus:ring-primary p-4"
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground italic px-1">
                      Be as descriptive as possible: colors, materials, style, atmosphere.
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full h-14 bg-primary text-primary-foreground font-semibold text-lg rounded-2xl gold-shimmer shadow-lg flex items-center justify-center gap-2 group"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Generating Vision...
                      </>
                    ) : (
                      <>
                        <Wand2 size={20} />
                        Generate Concept
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 space-y-3">
                <h4 className="font-headline font-semibold flex items-center gap-2 text-primary">
                  <Sparkles size={18} />
                  What to include?
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2 font-light list-disc pl-4">
                  <li>Keywords (e.g., Luxury, Playful, Industrial)</li>
                  <li>Color palettes (e.g., Deep emerald and gold)</li>
                  <li>Textures (e.g., Brushed metal, raw linen)</li>
                  <li>Inspirations (e.g., Bauhaus, Japanese Minimalism)</li>
                </ul>
              </div>
            </div>

            {/* Output Display */}
            <div className="lg:col-span-7 h-full min-h-[500px]">
              {result ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white">
                    <div className="aspect-video relative">
                      <Image 
                        src={result.moodBoardImage} 
                        alt="Generated Mood Board" 
                        fill 
                        className="object-cover"
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button size="icon" variant="secondary" className="rounded-full bg-white/90 backdrop-blur" onClick={() => window.open(result.moodBoardImage, '_blank')}>
                          <Download size={20} />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-8 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-semibold text-primary uppercase tracking-[0.2em]">Design Concept</h4>
                        <Badge className="bg-primary/10 text-primary border-none">Concept Draft</Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed font-light italic">
                        "{result.designConceptDescription}"
                      </p>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-center gap-4">
                    <Button variant="outline" className="rounded-full flex gap-2 items-center" onClick={() => setResult(null)}>
                      <RefreshCcw size={18} />
                      Start Over
                    </Button>
                    <Link href="/#contact" className="bg-accent text-white px-8 py-2 rounded-full font-medium shadow-md hover:bg-accent/90 transition-all flex items-center gap-2">
                      Discuss This Concept
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="h-full border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center text-center p-12 space-y-4 bg-white/30 backdrop-blur-sm">
                  {loading ? (
                    <div className="space-y-6">
                      <div className="relative w-24 h-24 mx-auto">
                        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                        <Sparkles className="absolute inset-0 m-auto text-primary animate-pulse" size={32} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-headline font-semibold text-primary">Blending Art & Logic</h3>
                        <p className="text-muted-foreground text-sm font-light max-w-xs mx-auto">Our creative AI is synthesizing colors, textures, and atmosphere for your unique vision...</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center text-primary/30">
                        <Sparkles size={40} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-headline font-semibold text-muted-foreground/60">Your vision awaits</h3>
                        <p className="text-muted-foreground max-w-xs font-light">
                          Fill out the brief and click generate to see your concept come to life.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
