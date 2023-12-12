/* eslint-disable no-unreachable */

'use client';

import { useEffect, useState } from 'react';
import { FileUploader } from '@/components/DragAndDrop';
import { useRouter } from 'next/navigation';
import { useAccountData, useFirstLoad } from '@/hooks/account.actions';
import { UseBoundStore } from 'zustand';
import { Button } from '@/components/ui/button';
import React from 'react';
import '@/app/globals.css';
import i18n from '@/lib/i18n';
import { Player } from '@/components/player';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import Image from 'next/image';
import { TextArea } from '@/components/TextArea';
import { uploadVideo } from '@/lib/uploadVideo';

export default function Page() {
  const router = useRouter();
  const load = useFirstLoad();
  const accountData: UseBoundStore<any> = useAccountData();

  useEffect(() => {
    if (load.firstLoad) {
      router.push('/');
      load.setFirstLoad(false);
    }
  }, [load, router]);

  const [video, setVideo] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');

  if (!accountData.data) return;

  return (
    <main className='h-screen flex flex-col items-center justify-center'>
      <FileUploader
        name='file'
        label={i18n.t('uploader.upload_label')}
        types={['mp4', 'mov']}
        handleChange={(event: any) => {
          setVideo(event);
        }}
      />
      {video != null && (
        <div className='w-[50vw] mx-auto my-8'>
          {/* <p>{i18n.t('uploader.video_will_look_like')}</p> */}
          <div className='info-wrapper'>
            <div className='user-title flex items-center justify-start gap-2 mb-2'>
              <Image
                src={accountData.data.avatarUrl}
                width={32}
                height={32}
                className='rounded-full w-8 h-8 object-cover select-none'
                alt={i18n.t('account.picture', { username: accountData.data.username })}
              />
              <h3 className='text-lg font-medium'>{accountData.data.username}</h3>
            </div>
            <p className='text-xs max-w-[250px] mb-2'>{description}</p>
          </div>
          <div>
            <div className='flex items-center'>
              {video && <Player src={URL.createObjectURL(video as Blob)} />}
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
              <TextArea
                placeholder={i18n.t('description')}
                className='min-h-[140px] h-full ml-6'
                onChange={(event) => setDescription(event.target.value)}
              >
                {description}
              </TextArea>
            </div>

            <Button
              onClick={() => {
                uploadVideo({ video, description });
              }}
              className='mt-2'
            >
              {i18n.t('uploader.publish')}
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
