'use client';

import { Video } from '@/components/Video';
import { getVideos } from '@/controllers/posts.controller';
import { useFirstLoad } from '@/hooks/account.actions';
import i18n from '@/lib/i18n';
import { Video as VideoType } from '@/types/Video';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() 
{
  const router = useRouter();
  const load: any = useFirstLoad();
  const [videos, setVideos] = useState<VideoType[]>([]);

  useEffect(() => 
  {
    if (document != null) 
    {
      document.title = i18n.t('fyp.title');
    }
    getVideos().then((response) => 
    {
      setVideos(response);
    });
  }, []);

  useEffect(() => 
  {
    if (load.firstLoad) 
    {
      router.push('/');
      load.setFirstLoad(false);
    }
  }, [load, router]);

  if (load.firstLoad) 
  {
    return null;
  }

  return (
    <div className='videos-wrapper flex flex-col items-center w-[calc(100vw-170px)]'>
      {videos.map((video: VideoType) => (
        <Video key={video.id} id={video.id} uid={video.creatorId} description={video.description} video={video.url} />
      ))}
    </div>
  );
}
