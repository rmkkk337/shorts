'use client';

import { Video } from '@/components/Video';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import testVideo from '@/app/testvideo.mp4';
import { Header } from '@/components/header';

export default function Page() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    document.title = 'For You Page | pikpok';
  }, [document]);

  return (
    <main>
      <Header />
      <main className='flex'>
        <div className='sidebar w-[150px] h-screen mx-6 mt-2 fixed top-14'>
          <div className='buttons pb-3 border-b border-solid'>
            <p
              className={`${
                pathname === '/fyp' ? null : 'text-zinc-400'
              } hover:bg-zinc-200/30 rounded-md py-1 px-2 text-sm cursor-pointer duration-300`}
            >
              For You Page
            </p>
          </div>
          <p className='text-xs text-zinc-400 mt-3'>Login to follow people, like videos and view comments</p>
          <Button
            className='h-8 w-[150px] mt-2'
            onClick={() => {
              router.push('/auth');
            }}
          >
            Log in
          </Button>
        </div>
        <div className='videos-wrapper flex flex-col items-center w-full ml-20 mt-6 max-w-[960px]'>
          <Video username='teikukuheia' description='This is very first video on pikpok!' name='Mykola' video={testVideo} />
          <Video username='teikukuheia' description='This is very first video on pikpok!' name='Mykola' video={testVideo} />
        </div>
      </main>
    </main>
  );
}
