
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Napau Folio | Design & Arte',
  description: 'Estúdio de design minimalista e artístico especializado em branding, web design e ilustração criativa.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
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
