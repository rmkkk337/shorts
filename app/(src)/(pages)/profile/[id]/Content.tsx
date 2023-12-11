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

  useEffect(() => 
  {
    if (load.firstLoad) 
    {
      accessed.setLastAccessed(`/profile/${params.id}`);
      router.push('/');
      load.setFirstLoad(false);
    }
  }, []);

  const accountData: UseBoundStore<any> = useAccountData();

  const router = useRouter();

  // TODO: Remove in future when backend will be ready
  const [followers, setFollowers] = useState<number>(120);
  const [followed, setFollowed] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  const [data, setData] = useState<Account | null>(null);

  // TODO: Remove in future when backend will be ready
  const incrementFollow = () => 
  {
    if (!followed) 
    {
      setFollowed(true);
      setFollowers(followers + 1);
    }
  };

  const updateProfile = () => 
  {
    axios.get(`${HOST_DNS}:3001/user/${params.id}`).then((response) => 
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
        <label htmlFor='pfpUploader' className='mr-4 cursor-pointer'>
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
              title={i18n.t('account.picture', { username: data.username })}
              alt='Profile picture'
              width={144}
              height={144}
            />
          </div>
        </label>
        <div>
          <h1 className='text-xl font-bold'>{data.username}</h1>
          <div className='flex gap-3 mb-2'>
            <p>{i18n.t('account.following')}: 0</p>
            <p>
              {i18n.t('account.followers')}: {followers}
            </p>
          </div>
          <Button
            onClick={() => 
            {
              incrementFollow();
            }}
          >
            {i18n.t('account.follow')}
          </Button>
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
            // FIXME: image applying only from second timez
            onChangeUpload(event);
          }}
        />
      )}
    </React.Fragment>
  );
}
