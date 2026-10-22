import type { Metadata } from 'next';
import { Inter, Jost } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800', '900'], style: ['normal', 'italic'], variable: '--font-inter', display: 'swap' });
const jost = Jost({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--font-jost', display: 'swap' });

export const metadata: Metadata = {
  title: 'CASCADE — Gives form to the intangible',
  description: 'Boutique agency operating across scale and medium, seamlessly navigating from digital to material.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  );
}
