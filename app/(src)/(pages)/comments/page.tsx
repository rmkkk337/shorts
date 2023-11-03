// Smartmove anton

'use client';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import AppContent from '@/components/AppContent';

export default function Page() 
{
  return (
    <main>
      <Header />
      <main className='flex'>
        <Sidebar />
        <AppContent>f</AppContent>
      </main>
    </main>
  );
}
