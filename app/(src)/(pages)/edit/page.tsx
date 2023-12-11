'use client';

// import { Video } from '@/components/Video';
import { useAccountData, useFirstLoad } from '@/hooks/account.actions';
import i18n from '@/lib/i18n';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { uploadImage } from '@/lib/imageUtils';
import axios from 'axios';
import { HOST_DNS } from '@/lib/conf';
import { Account } from '@/types/Account';
import { Input } from '@/components/ui/input';

export default function Page() 
{
  const [uploading, setUploading] = useState<boolean>(false);
  const [data, setData] = useState<Account | null>(null);

  const router = useRouter();
  useEffect(() => 
  {
    if (document != null) 
    {
      document.title = i18n.t('fyp.title');
    }
  }, []);

  const load: any = useFirstLoad();
  const accountData: any = useAccountData();
  const [usernameValue, setUsernameValue] = useState<string>('');

  useEffect(() => 
  {
    if (load.firstLoad) 
    {
      router.push('/');
      load.setFirstLoad(false);
    }
  }, [load, router]);

  useEffect(() => 
  {
    if (accountData.data) 
    {
      setUsernameValue(accountData.data.username);
      updateProfile();
    }
  }, []);

  if (load.firstLoad || !accountData.data) 
  {
    return null;
  }

  const updateProfile = () => 
  {
    axios
      .get(`${HOST_DNS}:3001/user/${accountData.data.id}`, {
        withCredentials: true,
      })
      .then((response) => 
      {
        setData(response.data.data);
        accountData.setAccountData(response.data.data);
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

  if (!data) return;

  return (
    <>
      <div
        className={`absolute top-0 left-0 flex flex-row ${
          uploading ? 'z-[80] opacity-100' : 'z-0 opacity-0'
        } transition-colors duration-150 bg-black/80 h-screen w-screen items-center justify-center`}
      >
        {uploading && <p className='text-white font-semibold'>{i18n.t('profile_picture_upgrading')}</p>}
      </div>
      <div className='w-[calc(100vw-170px)] z-50'>
        <h1 className='text-2xl font-bold mt-2 ml-2 mb-2'>Редагувати профіль</h1>
        <label htmlFor='pfpUploader' className='mr-4 cursor-pointer w-[144px] flex items-center justify-center'>
          <div className='overflow-hidden rounded-full flex object-fill select-none w-[144px]'>
            <Image
              src={data.avatarUrl}
              className='w-[144px] h-[144px]'
              title={i18n.t('account.change_profile_picture')}
              alt={i18n.t('account.picture', { username: data.username })}
              width={144}
              height={144}
            />
          </div>
        </label>
        <p className='text-xs font-semibold text-zinc-500 select-none mt-2'>Натисніть на вашу світлину щоб завантажити нову</p>
        <div className='pt-2 border-t border-zinc-100 max-w-xl mt-3'>
          <p className='text-xs font-semibold text-zinc-500 select-none'>Імʼя користувача</p>
          <Input
            className='mt-2 h-8'
            placeholder='Імʼя користувача'
            onChange={(event) => 
            {
              setUsernameValue(event.target.value);
            }}
            value={usernameValue}
          />
          <p className='text-xs font-semibold text-zinc-500 select-none mt-2'>
            Посиланням на ваш профіль буде{' '}
            <span className='text-zinc-700'>
              {document.location.origin}/profile/@{usernameValue}
            </span>
          </p>
        </div>
      </div>
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
    </>
  );
}