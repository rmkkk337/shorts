'use client';

import { FirstLoadProps, useAccessedPage, useAccountData, useFirstLoad } from '@/hooks/account.actions';
import i18n from '@/lib/i18n';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { UseBoundStore } from 'zustand';
import Image from 'next/image';
import { Account } from '@/types/Account';
import { Button } from '@/components/ui/button';
import { HOST_DNS } from '@/lib/conf';
import { Badge } from '@/components/ui/badge';

export default function Content(params: { id: string }) 
{
  const load: FirstLoadProps = useFirstLoad();
  const accessed: any = useAccessedPage();
  const router = useRouter();
  const accountData: UseBoundStore<any> = useAccountData();
  const [isFollowing, setIsFollowing] = useState<Boolean>(false);
  const accessedPage: any = useAccessedPage();

  useEffect(() => 
  {
    updateProfile();
    accessedPage.setLastAccessed(`/profile/${params.id}`);
    if (load.firstLoad) 
    {
      router.push('/');
      load.setFirstLoad(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [data, setData] = useState<Account | null>(null);

  const followUser = async () => 
  {
    await axios
      .get(`${HOST_DNS}:3001/user/${data?.id}/follow`, {
        withCredentials: true,
      })
      .then(() => 
      {
        setTimeout(async () => 
        {
          await updateProfile();
        }, 200);
      });
  };

  const updateProfile = async () => 
  {
    try 
    {
      const response = await axios.get(`${HOST_DNS}:3001/user/${params.id}`, {
        withCredentials: true,
      });
      setIsFollowing(response.data.data.followed);
      setData(response.data.data);
    }
    catch 
    {
      //
    }
  };

  useEffect(() => 
  {
    if (document != null) 
    {
      document.title = i18n.t('fyp.title');
    }
  }, []);

  useLayoutEffect(() => 
  {
    accessed.setLastAccessed(`/profile/${params.id}`);
    updateProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => 
  {
    if (data && document) 
    {
      document.title = `${i18n.t('account.title', { username: data.username })} - pikpok`;
    }
  }, [data]);

  if (!data) return;

  const isNotOwnPage = () => 
  {
    if (params.id.charAt(0) === '%' || params.id.charAt(0) === '@') 
    {
      return accountData.data?.username !== decodeURI(params.id.split('%40')[1]);
    }
    return accountData?.data?.id !== params.id;
  };

  return (
    <React.Fragment>
      <div className='account-info flex mt-3 z-50'>
        <Image
          src={data.avatarUrl}
          className='rounded-full mr-3 w-[144px] h-[144px]'
          title={accountData.data?.id === data.id ? i18n.t('account.change_profile_picture') : i18n.t('account.picture', { username: data.username })}
          alt={i18n.t('account.picture', { username: data.username })}
          width={144}
          height={144}
        />
        <div>
          <div className='flex items-center gap-2'>
            <h1 className='text-xl font-bold'>{data.username}</h1>
            {data.username == 'moe' ? (
              <Badge variant='secondary' className='h-5'>
                CEO
              </Badge>
            ) : null}
          </div>
          <p className='text-zinc-500 font-medium text-sm' style={{ whiteSpace: 'pre-wrap' }}>
            {data.description.trim()}
          </p>
          <div className='flex gap-3 mb-2'>
            <p className='text-zinc-600 flex gap-1 select-none'>
              {i18n.t('account.following')}
              <span className='text-zinc-800 font-semibold'>{data.subscribtions.length}</span>
            </p>
            <p className='text-zinc-600 flex gap-1 select-none'>
              {i18n.t('account.followers')}
              <span className='text-zinc-800 font-semibold'>{data.subscribers.length}</span>
            </p>
          </div>
          {isNotOwnPage() ? (
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
              {isFollowing ? i18n.t('account.unfollow') : i18n.t('account.follow')}
            </Button>
          ) : null}
          {!isNotOwnPage() ? (
            <Button
              onClick={() => 
              {
                router.push('/edit');
              }}
            >
              {i18n.t('edit_profile')}
            </Button>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
}
