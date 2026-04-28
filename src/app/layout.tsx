
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Napau Design & Arte | Topos de Bolo e Camisetas em Maputo',
  description: 'Especialistas em topos de bolo personalizados e camisetas exclusivas em Moçambique. Criatividade e acabamento premium para celebrar os seus momentos especiais.',
  keywords: ['topos de bolo maputo', 'camisetas personalizadas moçambique', 'confeitaria moçambique', 'design de eventos maputo', 'napau design'],
  authors: [{ name: 'Napau Design & Arte' }],
  metadataBase: new URL('https://napaudesign.netlify.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Napau Design & Arte | Arte em Cada Detalhe',
    description: 'Transformamos as suas ideias em peças exclusivas. Topos de bolo e camisetas personalizadas com selo de qualidade Napau.',
    url: 'https://napaudesign.netlify.app',
    siteName: 'Napau Design & Arte',
    images: [
      {
        url: 'https://xywhrhvljrqjzmlznjrv.supabase.co/storage/v1/object/public/produtos/1777400114494-o2faq6.jpg',
        width: 1200,
        height: 630,
        alt: 'Napau Design & Arte Preview',
      },
    ],
    locale: 'pt_MZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Napau Design & Arte',
    description: 'Personalização exclusiva em Maputo.',
    images: ['https://xywhrhvljrqjzmlznjrv.supabase.co/storage/v1/object/public/produtos/1777400114494-o2faq6.jpg'],
  },
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-MZ">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        
        {/* Schema.org JSON-LD para LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Napau Design & Arte",
              "image": "https://xywhrhvljrqjzmlznjrv.supabase.co/storage/v1/object/public/produtos/1777400114494-o2faq6.jpg",
              "@id": "https://napaudesign.netlify.app",
              "url": "https://napaudesign.netlify.app",
              "telephone": "+258847615871",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av. Acordos de Lusaka, Paragem Baltazar",
                "addressLocality": "Maputo",
                "addressCountry": "MZ"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -25.952,
                "longitude": 32.583
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "08:00",
                "closes": "17:00"
              }
            })
          }}
        />

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZWHT62L7W4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZWHT62L7W4');
          `}
        </Script>
      </head>
      <body className="font-body antialiased selection:bg-primary/20 selection:text-primary overflow-x-hidden">
        {children}
        <WhatsAppButton />
        <Toaster />
      </body>
    </html>
  );
}
