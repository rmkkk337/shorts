'use client';

import { Video } from '@/components/Video';
import { useFirstLoad } from '@/hooks/account.actions';
import i18n from '@/lib/i18n';
import { useRouter } from 'next/navigation';
// import testVideo from '@/app/testvideo.mp4';
import React, { useEffect } from 'react';

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
    <div className='videos-wrapper flex flex-col items-center w-full max-w-[960px]'>
      <Video likes={0} comments={0} username='teikukuheia' description='This is very first video on pikpok!' />
      <Video likes={0} comments={0} username='teikukuheia' description='This is very first video on pikpok!' />
    </div>
  );
}
