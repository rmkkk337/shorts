import '@/app/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Welcome to pikpok | pikpok',
  description: 'Create your account in pikpok',
};

export default function Layout({ children }: { children: React.ReactNode }) 
{
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div>{children}</div>
      </body>
    </html>
  );
}
