
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Napau Folio | Design & Arte',
  description: 'Minimalist and artistic design studio specializing in branding, web design, and creative illustration.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/20 selection:text-primary">
        {children}
      </body>
    </html>
  );
}
