'use client';

import { FirstLoadProps, useAccessedPage, useAccountData, useFirstLoad } from '@/hooks/account.actions';
import i18n from '@/lib/i18n';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { UseBoundStore } from 'zustand';
import Image from 'next/image';
import { Account } from '@/types/Account';
import { Button } from '@/components/ui/button';
import { HOST_DNS } from '@/lib/conf';
import { uploadImage } from '@/lib/imageUtils';

export default function Content(params: { id: string }) 
{
  const load: FirstLoadProps = useFirstLoad();
  const accessed: any = useAccessedPage();
  const router = useRouter();
  const accountData: UseBoundStore<any> = useAccountData();

  useEffect(() => 
  {
    if (load.firstLoad) 
    {
      router.push('/');
      load.setFirstLoad(false);
    }
  }, []);

  const [uploading, setUploading] = useState<boolean>(false);
  const [data, setData] = useState<Account | null>(null);

  const followUser = async () => 
  {
    await axios.get(`${HOST_DNS}:3001/user/${params.id}/follow`, {
      withCredentials: true,
    });
    updateProfile();
  };

  const updateProfile = () => 
  {
    axios
      .get(`${HOST_DNS}:3001/user/${params.id}`, {
        withCredentials: true,
      })
      .then((response) => 
      {
        setData(response.data.data);
      });
  };

  const onChangeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => 
  {
    setUploading(true);
    try 
    {
      // @ts-ignore
      await uploadImage(event.target.files[0], accountData);
      setUploading(false);
    }
    catch 
    {
      setUploading(false);
    }
    updateProfile();
  };

  useEffect(() => 
  {
    if (document != null) 
    {
      document.title = i18n.t('fyp.title');
    }
  }, []);

  useEffect(() => 
  {
    accessed.setLastAccessed(`/profile/${params.id}`);
    updateProfile();
  }, []);

  useEffect(() => 
  {
    if (data && document) 
    {
      document.title = `${i18n.t('account.title')} ${data.username} - pikpok`;
    }
  }, [data]);

  if (!data) return;

  return (
    <React.Fragment>
      <div
        className={`absolute top-0 left-0 flex flex-row ${
          uploading ? 'z-[80] opacity-100' : 'z-0 opacity-0'
        } transition-colors duration-150 bg-black/80 h-screen w-screen items-center justify-center`}
      >
        {uploading && <p className='text-white font-semibold'>{i18n.t('profile_picture_upgrading')}</p>}
      </div>
      <div className='account-info flex mt-3 z-50'>
        <label htmlFor='pfpUploader' className={`mr-4 ${accountData.data?.id === data.id ? 'cursor-pointer' : 'cursor-default'}`}>
          <div
            className='z-30 h-36 w-36 overflow-hidden rounded-full flex items-center justify-center object-fill select-none'
            onClick={() => 
            {
              if (accountData.data == null) return;
              updateProfile();
            }}
          >
            <Image
              src={data.avatarUrl}
              title={
                accountData.data?.id === data.id ? i18n.t('account.change_profile_picture') : i18n.t('account.picture', { username: data.username })
              }
              alt={i18n.t('account.picture', { username: data.username })}
              width={144}
              height={144}
            />
          </div>
        </label>
        <div>
          <h1 className='text-xl font-bold'>{data.username}</h1>
          <div className='flex gap-3 mb-2'>
            <p className='text-zinc-600 flex gap-1'>
              {i18n.t('account.following')}
              <span className='text-zinc-800 font-semibold'>{data.subscribtions.length}</span>
            </p>
            <p className='text-zinc-600 flex gap-1'>
              {i18n.t('account.followers')}
              <span className='text-zinc-800 font-semibold'>{data.subscribers.length}</span>
            </p>
          </div>
          {accountData?.data?.id !== params.id ? (
            <Button
              onClick={() => 
              {
                if (!accountData?.data?.id) 
                {
                  router.push('/auth');
                }
                followUser();
              }}
            >
              {data.followed ? i18n.t('account.unfollow') : i18n.t('account.follow')}
            </Button>
          ) : null}
        </div>
      </div>

      {accountData.data && accountData.data.id === params.id && (
        <input
          type='file'
          id='pfpUploader'
          className='hidden'
          accept='image/png, image/jpeg'
          onChange={(event) => 
          {
            onChangeUpload(event);
          }}
        />
      )}
    </React.Fragment>
  );
}
