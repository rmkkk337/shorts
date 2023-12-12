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
import Image from 'next/image';
import { TextArea } from '@/components/TextArea';
import { uploadVideo } from '@/lib/uploadVideo';
import { ChevronLeft } from 'lucide-react';

export default function Page() 
{
  const router = useRouter();
  const load = useFirstLoad();
  const accountData: UseBoundStore<any> = useAccountData();
  const MemoVideo = React.memo(Player);

  useEffect(() => 
  {
    if (document != null) 
    {
      document.title = `${i18n.t('uploader.title')}`;
    }
  }, []);

  useEffect(() => 
  {
    if (load.firstLoad) 
    {
      router.push('/');
      load.setFirstLoad(false);
    }
  }, [load, router]);

  const [video, setVideo] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');

  if (!accountData.data) return;

  return (
    <main className='h-screen flex flex-col items-center justify-center'>
      {video == null && (
        <FileUploader
          name='file'
          label={i18n.t('uploader.upload_label')}
          types={['mp4', 'mov']}
          handleChange={(event: any) => 
          {
            setVideo(event);
          }}
        />
      )}
      {video != null && (
        <div className='w-[50vw] mx-auto my-8'>
          <p
            onClick={() => 
            {
              setVideo(null);
              setDescription('');
            }}
            className='flex items-center cursor-pointer hover:underline text-sm text-zinc-500 font-semibold mb-2'
          >
            <ChevronLeft className='text-zinc-500' /> {i18n.t('cancel_upload')}
          </p>
          <div className='info-wrapper'>
            <div className='user-title flex items-center justify-start gap-2 mb-2'>
              <Image
                src={accountData.data.avatarUrl}
                width={32}
                height={32}
                className='rounded-full w-8 h-8 object-cover select-none'
                alt={i18n.t('account.picture', { username: accountData.data.username })}
              />
              <h3 className='font-medium antialiased text-zinc-600'>{accountData.data.username}</h3>
            </div>
            <p className='text-xs max-w-[250px] mb-2'>{description}</p>
          </div>
          <div>
            <div className='flex items-center'>
              <div className='self-start'>
                <MemoVideo src={URL.createObjectURL(video as Blob)} />
              </div>
              <div className='ml-6 w-full'>
                <TextArea
                  placeholder={i18n.t('description')}
                  className='min-h-[240px] h-full w-full max-w-[260px] resize-none'
                  onChange={(event) => setDescription(event.target.value)}
                >
                  {description}
                </TextArea>
                <Button
                  onClick={() => 
                  {
                    uploadVideo({ video, description });
                  }}
                  className='mt-2 w-full max-w-[260px]'
                >
                  {i18n.t('uploader.publish')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
