/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { AccessedPageStore, AccountStore, FirstLoadStore, useAccessedPage, useAccountData, useFirstLoad } from '@/hooks/account.actions';
import i18n from '@/lib/i18n';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { uploadImage } from '@/controllers/posts.controller';
import axios from 'axios';
import { HOST_DNS } from '@/lib/conf';
import { Account } from '@/types/Account';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TextArea } from '@/components/TextArea';
import { getUser } from '@/controllers/users.controller';
import { Pencil } from 'lucide-react';
import { isValidString } from '@/common/regex';

export default function Page() 
{
  const [uploading, setUploading] = useState<boolean>(false);
  const [data, setData] = useState<Account | null>(null);

  const router = useRouter();
  useEffect(() => 
  {
    if (document != null) 
    {
      document.title = `${i18n.t('edit_profile')} | pikpok`;
    }
  }, []);

  const load: FirstLoadStore = useFirstLoad();
  const accountData: AccountStore = useAccountData();
  const accessedPage: AccessedPageStore = useAccessedPage();
  const [usernameValue, setUsernameValue] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => 
  {
    if (load.firstLoad) 
    {
      accessedPage.setLastAccessed('/edit');
      router.push('/');
    }
    else if (!load.firstLoad && !accountData.data) 
    {
      router.push('/auth');
    }
  }, [load, router]);

  useEffect(() => 
  {
    if (accountData.data) 
    {
      setUsernameValue(accountData.data.username);
      setDescription(accountData.data.description);
      updateProfile();
    }
  }, []);

  if (load.firstLoad || !accountData.data) 
  {
    return null;
  }

  const updateProfile = async () => 
  {
    if (accountData.data && accountData.data.id) 
    {
      const response = await getUser(accountData.data.id);
      setData(response);
      accountData.setAccountData(response);
    }
  };

  const onChangeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => 
  {
    setUploading(true);
    try 
    {
      // @ts-ignore
      await uploadImage(event.target.files[0]);
      setUploading(false);
    }
    catch 
    {
      setUploading(false);
    }
    updateProfile();
  };

  const updateUser = () => 
  {
    if (usernameValue.length >= 2 && accountData.data && isValidString(usernameValue)) 
    {
      axios
        .patch(
          `${HOST_DNS}:3001/user/${accountData.data.id}/patch`,
          {
            username: usernameValue,
            description: description,
          },
          {
            withCredentials: true,
          }
        )
        .then(() => 
        {
          setTimeout(() => 
          {
            updateProfile();
            router.push(`/profile/@${usernameValue}`);
          }, 200);
        });
    }
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
      <div className='z-50 mx-3 sm:min-w-[355px]'>
        <h1 className='text-2xl font-bold mt-2 ml-2 mb-2 select-none'>{i18n.t('edit_profile')}</h1>
        <label htmlFor='pfpUploader' className='ml-2 relative mr-4 cursor-pointer w-[144px] flex items-center justify-center'>
          <div className='overflow-hidden rounded-full flex object-fill select-none w-[144px]'>
            <Image
              src={data.avatarUrl}
              className='w-[144px] h-[144px] object-cover'
              title={i18n.t('account.change_profile_picture')}
              alt={i18n.t('account.picture', { username: data.username })}
              width={144}
              height={144}
            />
          </div>
          <div className='absolute h-full w-full bg-black/30 z-10 hover:bg-black/60 duration-200 rounded-full flex items-center justify-center'>
            <Pencil size={24} color='white' />
          </div>
        </label>
        <p className='ml-2 text-xs font-semibold text-zinc-500 select-none mt-2'>{i18n.t('account.change_profile_picture')}</p>
        <div className='px-2 sm:px-0 pt-2 border-t border-zinc-100 w-screen sm:w-[350px] mt-2'>
          {usernameValue.length < 2 && (
            <p className='text-xs font-semibold text-red-500 select-none'>{i18n.t('length_must_be_not_less_than', { length: 2 })}</p>
          )}
          {!isValidString(usernameValue) && <p className='text-xs font-semibold text-red-500 select-none'>{i18n.t('username_characters_error')}</p>}
          <Input
            className='mt-2 h-8'
            placeholder={i18n.t('auth.username')}
            onChange={(event) => 
            {
              setUsernameValue(event.target.value);
            }}
            value={usernameValue}
          />
          <p className='text-xs font-semibold text-zinc-500 select-none mt-2'>
            {i18n.t('url_preview')}{' '}
            <span className='text-zinc-700'>
              {document.location.origin}/profile/@{usernameValue}
            </span>
          </p>
          <TextArea
            className='min-h-[140px] antialiased mt-2'
            onChange={(event) => 
            {
              setDescription(event.target.value);
            }}
            value={description}
            maxLength={50}
            placeholder={i18n.t('description')}
          />
          <Button
            className='mt-2'
            onClick={() => 
            {
              updateUser();
            }}
          >
            {i18n.t('update_profile')}
          </Button>
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
