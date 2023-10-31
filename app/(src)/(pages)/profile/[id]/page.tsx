'use client';

import AppContent from '@/components/AppContent';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';

export default function Page({ params }: { params: { id: string } }) 
{
  // TODO: At this page we must fetch the user data from the server by using the id from the params.
  return (
    <main>
      <Header />
      <main className='flex'>
        <Sidebar />
        <AppContent>
          <h1>{params.id}</h1>
        </AppContent>
      </main>
    </main>
  );
}
