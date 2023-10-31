import { Toaster } from '@/components/ui/toaster';
import '@/app/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Welcome to pikpok | pikpok',
  description: 'Pikpok - platform to share your short videos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) 
{
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
