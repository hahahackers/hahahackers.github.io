import type { Metadata } from 'next';
import { Overpass } from 'next/font/google';
import './globals.css';

const font = Overpass({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Hahahackers Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
