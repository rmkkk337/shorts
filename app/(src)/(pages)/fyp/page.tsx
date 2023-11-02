'use client';

import { Video } from '@/components/Video';
import { useFirstLoad } from '@/hooks/account.actions';
import i18n from '@/lib/i18n';
import { useRouter } from 'next/navigation';
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
      <Video
        likes={0}
        comments={0}
        username='moe'
        description='Cute video with cats!'
        video={
          'https://firebasestorage.googleapis.com/v0/b/pikpok-7e43d.appspot.com/o/videos%2Fmoe%2Fb07bcc6079614ef494776f0abe4a0f8b.mp4-Thu%20Nov%2002%202023%2022%3A38%3A43%20GMT%2B0200%20(%D0%B7%D0%B0%20%D1%81%D1%85%D1%96%D0%B4%D0%BD%D0%BE%D1%94%D0%B2%D1%80%D0%BE%D0%BF%D0%B5%D0%B9%D1%81%D1%8C%D0%BA%D0%B8%D0%BC%20%D1%81%D1%82%D0%B0%D0%BD%D0%B4%D0%B0%D1%80%D1%82%D0%BD%D0%B8%D0%BC%20%D1%87%D0%B0%D1%81%D0%BE%D0%BC)?alt=media&token=89d6bc48-3898-4c87-86b6-9e27fdcfe06d'
        }
      />
      <Video likes={0} comments={0} username='moe' description='This is very first video on pikpok!' />
    </div>
  );
}
