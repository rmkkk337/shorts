'use client';

import { Video } from '@/components/Video';
import { useFirstLoad, useAccessedPage, FirstLoadStore, AccessedPageStore } from '@/hooks/account.actions';
import { HOST_DNS } from '@/lib/conf';
import { Comment } from '@/types/Account';
import { Video as VideoType } from '@/types/Video';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Content(params: { id: string }) 
{
  const [video, setVideo] = useState<VideoType | null>(null);
  const router = useRouter();
  axios.get(`${HOST_DNS}:3001/video/post/${params.id}`).then((response) => 
  {
    setVideo(response.data.data);
  });

  const load: FirstLoadStore = useFirstLoad();
  const accessedPage: AccessedPageStore = useAccessedPage();

  useEffect(() => 
  {
    if (load.firstLoad) 
    {
      accessedPage.setLastAccessed(`/video/${params.id}`)
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
      <div>
        {video.comments.map((comment: Comment) => (
          <div key={comment.id} className='bg-black text-white'>
            {JSON.stringify(comment.text)}
          </div>
        ))}
      </div>
    </main>
  );
}
