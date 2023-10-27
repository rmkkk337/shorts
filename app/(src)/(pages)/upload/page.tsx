'use client';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import i18n from '@/lib/i18n';
import { Sidebar } from '@/components/sidebar';

export default function Page() {
  const [video, setVideo] = useState<Boolean>(false);

  useEffect(() => {
    document.title = i18n.t('upload.title');
  }, [document]);

  return (
    <main>
      <Header />
      <main className='flex'>
        <Sidebar />
        <main className='flex items-center justify-center w-full h-screen'>
          {video ? (
            <div className='flex flex-col md:flex-row'>
              <div className='placeholder h-[533px] w-[533px] bg-zinc-200 rounded-sm'></div>
              <textarea
                placeholder={i18n.t('upload.video_description')}
                className='flex h-56 ml-2 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
              ></textarea>
            </div>
          ) : (
            <Button
              onClick={() => {
                setVideo(true);
              }}
            >
              {i18n.t('upload_video')}
            </Button>
          )}
        </main>
      </main>
    </main>
  );
}
