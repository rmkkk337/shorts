import React from 'react';

interface AppContentProps {
  children: React.ReactNode;
}

export default function AppContent(AppContentProps: AppContentProps) 
{
  return <main className='mt-12 ml-60'>{AppContentProps.children}</main>;
}
