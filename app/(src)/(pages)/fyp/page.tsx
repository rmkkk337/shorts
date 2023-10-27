'use client';

import { Video } from '@/components/Video';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Header } from '@/components/header';
import i18n from '@/lib/i18n';
import { Sidebar } from '@/components/sidebar';

export default function Page() {
  // useEffect(() => {
  //   document.title = i18n.t('fyp.title');
  // }, [document]);

  return (
    <main>
      <Header />
      <main className='flex'>
        <Sidebar />
        <div className='videos-wrapper flex flex-col items-center w-full ml-20 mt-6 max-w-[960px]'>
          {/* <Video username='teikukuheia' description='This is very first video on pikpok!' name='Mykola' video={testVideo} /> */}
          {/* <Video username='teikukuheia' description='This is very first video on pikpok!' name='Mykola' video={testVideo} /> */}
        </div>
      </main>
    </main>
  );
}
