import { Toaster } from '@/components/ui/toaster';
import '@/app/globals.css';
import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import React from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import AppContent from '@/components/AppContent';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Welcome to pikpok | pikpok',
  description: 'Pikpok - platform to share your short videos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) 
{
  return (
    <html lang='en'>
      <body>
        <main>
          <Header />
          <main className='flex'>
            <Sidebar />
            <AppContent>{children}</AppContent>
          </main>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
