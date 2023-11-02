import React from 'react';

interface AppContentProps {
  children: React.ReactNode;
}

export default function AppContent(AppContentProps: AppContentProps) 
{
  return <main className='mt-12 ml-60 flex flex-col w-[calc(100vw-240px)] h-[calc(100vh-48px)]'>{AppContentProps.children}</main>;
}
