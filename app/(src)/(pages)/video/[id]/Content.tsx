'use client';

import { Video } from '@/components/Video';
import { getUser } from '@/controllers/users.controller';
import { useFirstLoad, useAccessedPage, FirstLoadStore, AccessedPageStore } from '@/hooks/account.actions';
import { HOST_DNS } from '@/lib/conf';
import i18n from '@/lib/i18n';
import { Video as VideoType } from '@/types/Video';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Content(params: { id: string }) 
{
  const [video, setVideo] = useState<VideoType | null>(null);
  const router = useRouter();

  useEffect(() => 
  {
    axios.get(`${HOST_DNS}:3001/video/post/${params.id}`).then((response) => 
    {
      setVideo(response.data.data);
      if (document != null) 
      {
        getUser(response.data.data.creatorId).then((response) => 
        {
          document.title = i18n.t('video_by', { username: response.username });
        });
      }
    });
  }, [params.id]);

  const load: FirstLoadStore = useFirstLoad();
  const accessedPage: AccessedPageStore = useAccessedPage();

  useEffect(() => 
  {
    if (load.firstLoad) 
    {
      accessedPage.setLastAccessed(`/video/${params.id}`);
      router.push('/');
    }
  }, [load, router]);

  if (load.firstLoad) 
  {
    return null;
  }

  if (!video) return null;

  return (
    <main className='flex'>
      <Video key={video.id} id={video.id} uid={video.creatorId} description={video.description} video={video.url} />
    </main>
  );
}
