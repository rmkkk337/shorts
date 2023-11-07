'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FileUploader } from 'react-drag-drop-files';
// import { Video } from '@/components/Video';
import { useRouter } from 'next/navigation';
import { useAccountData, useFirstLoad } from '@/hooks/account.actions';
import { UseBoundStore } from 'zustand';
import { Button } from '@/components/ui/button';
import React from 'react';
import '@/app/globals.css';
import i18n from '@/lib/i18n';
import { HOST_DNS } from '@/lib/conf';
import { Player } from '@/components/player';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

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
        .post(`${HOST_DNS}:3001/user/${accountData.data.id}/video/post`, formData, {
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
        <div className='w-[50vw] mx-auto my-8'>
          <p>{i18n.t('uploader.video_will_look_like')}</p>
          <div className='info-wrapper'>
            <div className='user-title flex items-center justify-start gap-2 mb-2'>
              <div className='w-8 h-8 rounded-full bg-zinc-300'></div>
              <h3 className='text-lg font-medium'>{accountData.data.username}</h3>
            </div>
            <p className='text-xs max-w-[250px] mb-2'>{description}</p>
          </div>
          <div>
            <div className='flex'>
              <Player src={URL.createObjectURL(video)} />
              <div className='self-end ml-4'>
                <div className='my-3 flex flex-col items-center'>
                  <div className='p-2 bg-zinc-100 w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-50 duration-300 cursor-pointer'>
                    <Heart size={20} />
                  </div>
                  <p className='font-medium text-sm select-none'>0</p>
                </div>
                <div className='my-3 flex flex-col items-center'>
                  <div className='p-2 bg-zinc-100 w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-50 duration-300 cursor-pointer'>
                    <MessageCircle size={20} />
                  </div>
                  <p className='font-medium text-sm select-none'>0</p>
                </div>
                <div className='my-3 flex flex-col items-center'>
                  <div className='p-2 bg-zinc-100 w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-50 duration-300 cursor-pointer'>
                    <Share2 size={20} />
                  </div>
                </div>
              </div>
            </div>
            <Button
              onClick={() => 
              {
                uploadVideo();
              }}
              className='mt-2'
            >
              {i18n.t('uploader.publish')}
            </Button>
          </div>
        </div>
      )}
      <textarea onChange={(event) => setDescription(event.target.value)}>{description}</textarea>
    </main>
  );
}
