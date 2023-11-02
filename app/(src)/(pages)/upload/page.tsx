'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FileUploader } from 'react-drag-drop-files';
import { Video } from '@/components/Video';
import { useRouter } from 'next/navigation';
import { useAccountData, useFirstLoad } from '@/hooks/account.actions';
import { UseBoundStore } from 'zustand';
import { Button } from '@/components/ui/button';
import React from 'react';
import '@/app/globals.css';
import i18n from '@/lib/i18n';

export default function Page() 
{
  const router = useRouter();
  const load = useFirstLoad();
  const accountData: UseBoundStore<any> = useAccountData();
  useEffect(() => 
  {
    if (load.firstLoad) 
    {
      router.push('/');
      load.setFirstLoad(false);
    }
  }, [load, router]);

  const [video, setVideo] = useState<File | null>(null);
  // eslint-disable-next-line no-unused-vars
  const [description, setDescription] = useState<string>('');

  if (!accountData.data) return;

  const uploadVideo = () => 
  {
    if (video != null) 
    {
      const formData = new FormData();
      formData.append('file', video);
      axios
        .post('http://ec2-13-53-80-251.eu-north-1.compute.amazonaws.com:3001/user/video/post', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        })
        .then(() => 
        {
          // console.log(response);
        })
        .catch(() => 
        {
          // console.log(error);
        });
    }
  };

  return (
    <main className='h-screen w-[calc(100vw-240px)] flex flex-col items-center justify-center'>
      {video == null ? (
        <FileUploader
          name='file'
          types={['mp4', 'mov']}
          handleChange={(event: any) => 
          {
            setVideo(event);
          }}
        />
      ) : null}
      {video != null && (
        <div>
          <p>{i18n.t('uploader.video_will_look_like')}</p>
          <div className='flex'>
            <Video video={URL.createObjectURL(video)} username={accountData.data.username} description={description} />
          </div>
          <Button
            onClick={() => 
            {
              uploadVideo();
            }}
          >
            {i18n.t('uploader.publish')}
          </Button>
        </div>
      )}
    </main>
  );
}
