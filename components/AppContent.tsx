import React from 'react';

interface AppContentProps {
  children: React.ReactNode;
}

export default function AppContent(AppContentProps: AppContentProps) 
{
  return (
    <main className='mt-12 sm:ml-60 w-screen items-center sm:items-start flex flex-col sm:w-[calc(100vw-240px)] h-[calc(100vh-48px)]'>
      {AppContentProps.children}
    </main>
  );
}
