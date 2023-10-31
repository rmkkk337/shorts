'use client';

// import { Video } from '@/components/Video';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { useFirstLoad } from '@/hooks/account.actions';
import i18n from '@/lib/i18n';
import { useRouter } from 'next/navigation';
// import testVideo from '@/app/testvideo.mp4';
import React, { useEffect } from 'react';
// import { Video } from '@/components/Video';
import AppContent from '@/components/AppContent';

export default function Page() 
{
  const router = useRouter();
  useEffect(() => 
  {
    if (document != null) 
    {
      document.title = i18n.t('fyp.title');
    }
  }, []);

  const load: any = useFirstLoad();

  useEffect(() => 
  {
    if (load.firstLoad) 
    {
      router.push('/');
      load.setFirstLoad(false);
    }
  }, [load, router]);

  return (
    <main>
      <Header />
      <main className='flex'>
        <Sidebar />
        <AppContent>
          <div className='videos-wrapper flex flex-col items-center w-full max-w-[960px]'>
            {/* <Video username='teikukuheia' description='This is very first video on pikpok!' name='Mykola' video={testVideo} /> */}
            {/* <Video username='teikukuheia' description='This is very first video on pikpok!' name='Mykola' video={testVideo} /> */}
          </div>
        </AppContent>
      </main>
    </main>
  );
}
