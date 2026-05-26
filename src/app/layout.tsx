import type { Metadata } from 'next';
import { Cormorant_Garamond, Lato, Playfair_Display } from 'next/font/google';
import './globals.css';

// ─── Fonts via next/font ───────────────────────────────────────────────────
// Self-hosted from Vercel CDN: zero render-blocking, no external round-trip,
// automatically subsetted → smaller font files.
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Neev Gifting — Enhancing Experiences',
  description:
    'Premium personalized gifting solutions. Pure silver gifts, luxury hampers, and bespoke gifting experiences for every occasion.',
  keywords: 'gifting, luxury gifts, personalized gifts, silver gifts, corporate gifting, neev gifting',
  openGraph: {
    title: 'Neev Gifting — Enhancing Experiences',
    description: 'Premium personalized gifting solutions for all your special occasions.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${lato.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/logo.jpeg" type="image/jpeg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-paragraph bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
