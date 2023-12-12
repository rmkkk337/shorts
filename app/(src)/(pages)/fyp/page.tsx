'use client';

import { Video } from '@/components/Video';
// import { Video } from '@/components/Video';
import { useFirstLoad } from '@/hooks/account.actions';
import { HOST_DNS } from '@/lib/conf';
import i18n from '@/lib/i18n';
import { Video as VideoType } from '@/types/Video';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const load: any = useFirstLoad();
  const [videos, setVideos] = useState<VideoType[]>([]);

  useEffect(() => {
    if (document != null) {
      document.title = i18n.t('fyp.title');
    }
    getVideos();
  }, []);

  useEffect(() => {
    if (load.firstLoad) {
      router.push('/');
      load.setFirstLoad(false);
    }
  }, [load, router]);

  const getVideos = async () => {
    const videos = await axios.get(`${HOST_DNS}:3001/video/posts`);
    setVideos(videos.data.data.reverse());
  };

  if (load.firstLoad) {
    return null;
  }

  return (
    <div className='videos-wrapper flex flex-col items-center w-[calc(100vw-170px)]'>
      {videos.map((video: VideoType) => (
        <Video key={video.id} likes={video.likes} comments={0} uid={video.creatorId} description={video.description} video={video.url} />
      ))}
    </div>
  );
}
