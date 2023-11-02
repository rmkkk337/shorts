import '@/app/globals.css';
import AppContent from '@/components/AppContent';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'For You Page | pikpok',
  description: 'Watch videos just For You on pikpok',
};

export default function Layout({ children }: { children: React.ReactNode }) 
{
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header />
        <main className='flex'>
          <Sidebar />
          <AppContent>{children}</AppContent>
        </main>
      </body>
    </html>
  );
}
