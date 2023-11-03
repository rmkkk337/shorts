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

export default function Page({ params }: { params: { id: string } }) 
{
  const router = useRouter();
  const load: FirstLoadProps = useFirstLoad();
  const [followers, setFollowers] = useState<number>(120);
  const [followed, setFollowed] = useState<boolean>(false);

  const incrementFollow = () => 
  {
    if (!followed) 
    {
      setFollowed(true);
      setFollowers(followers + 1);
    }
  };

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

  const [image, setImage] = useState<File | null>(null);
  const [data, setData] = useState<Account | null>(null);

  const updateProfile = () => 
  {
    axios.get(`http://ec2-13-53-80-251.eu-north-1.compute.amazonaws.com:3001/user/${params.id}`).then((response) => 
    {
      setData(response.data.data);
    });
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

  const accountData: UseBoundStore<any> = useAccountData();

  if (!data) return;

  const uploadImage = () => 
  {
    if (image != null && accountData.data !== null) 
    {
      const formData = new FormData();
      formData.append('file', image);
      axios
        .post(`http://ec2-13-53-80-251.eu-north-1.compute.amazonaws.com:3001/user/${accountData.data.id}/avatar/update`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        })
        .then((response) => 
        {
          console.log(response);
        })
        .catch((error) => 
        {
          console.log(error);
        });
    }
  };

  return (
    <React.Fragment>
      <div className='account-info flex mt-3'>
        {params.id === params.id ? null : null}
        <label htmlFor='pfpUploader' className='mr-4'>
          <div
            className='h-36 w-36 overflow-hidden rounded-full flex items-center justify-center object-fill'
            onClick={() => 
            {
              if (accountData.data == null) return;
              if (params.id === accountData.data.id) 
              {
                uploadImage();
                updateProfile();
              }
            }}
          >
            <Image src={data.avatarUrl} alt='Profile picture' width={144} height={144} />
          </div>
        </label>
        <div>
          <h1 className='text-xl font-bold'>{data.username}</h1>
          <div className='flex gap-3 mb-2'>
            <p>Following: 0</p>
            <p>Followers: {followers}</p>
          </div>
          <Button
            onClick={() => 
            {
              incrementFollow();
            }}
          >
            Follow
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
          if (!event.target.files) return;
          setImage(event.target.files[0]);
        }}
      />
    </React.Fragment>
  );
}
