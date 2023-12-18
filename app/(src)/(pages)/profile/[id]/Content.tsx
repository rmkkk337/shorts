'use client';

import { AccessedPageStore, AccountStore, FirstLoadStore, useAccessedPage, useAccountData, useFirstLoad } from '@/hooks/account.actions';
import i18n from '@/lib/i18n';
import { useRouter } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import { Account } from '@/types/Account';
import { Button } from '@/components/ui/button';
import { followUser, getUser, isNotOwnPage } from '@/controllers/users.controller';
import { getUserPosts } from '@/controllers/posts.controller';
import { Video } from '@/types/Video';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import Subscribers from '@/components/profile/Subscribers';
import Subscriptions from '@/components/profile/Subscriptions';
import { Badge } from '@/components/ui/badge';
import { followingState } from '@/common/profile';

export default function Content(params: { id: string }) 
{
  const load: FirstLoadStore = useFirstLoad();
  const accountData: AccountStore = useAccountData();
  const accessedPage: AccessedPageStore = useAccessedPage();
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState<Boolean>(false);
  const [posts, setPosts] = useState<Video[]>([]);

  const updateProfile = async () => 
  {
    getUserPosts(params.id).then((response) => 
    {
      setPosts(response);
    });
    const response = await getUser(params.id);
    setIsFollowing(response.followed);
    setData(response);
  };

  const [data, setData] = useState<Account | null>(null);

  useEffect(() => 
  {
    if (data && document) 
    {
      document.title = `${i18n.t('account.title', { username: data.username })} | pikpok`;
    }
  }, [data]);

  useEffect(() => 
  {
    updateProfile();
    accessedPage.setLastAccessed(`/profile/${params.id}`);
    if (load.firstLoad) 
    {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => 
  {
    accessedPage.setLastAccessed(`/profile/${params.id}`);
    updateProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderBadge = () => 
  {
    if (data && accountData.data?.id) 
    {
      const subscribeState = followingState(data.subscribtions, data?.subscribers, accountData.data.id);

      return (
        subscribeState && (
          <Badge variant='outline' className='select-none'>
            {i18n.t(subscribeState)}
          </Badge>
        )
      );
    }
  };

  if (!data || load.firstLoad) return null;

  return (
    <React.Fragment>
      <div className='account-info flex mt-3 mx-2 sm:mx-0'>
        <Image
          src={data.avatarUrl}
          className='rounded-full mr-3 w-[144px] h-[144px] object-cover'
          title={i18n.t('account.picture', { username: data.username })}
          alt={i18n.t('account.picture', { username: data.username })}
          width={144}
          height={144}
        />
        <div>
          <div className='flex items-center gap-2'>
            <h1 className='text-xl font-bold'>{data.username}</h1>
            {renderBadge()}
          </div>
          <p className='text-zinc-500 font-medium text-xs sm:text-sm' style={{ whiteSpace: 'pre-wrap' }}>
            {data.description.trim()}
          </p>
          <div className='flex gap-3 mb-2'>
            <Subscriptions subscribtions={data.subscribtions} />
            <Subscribers subscribtions={data.subscribers} />
          </div>
          {isNotOwnPage(params.id, accountData.data?.id, accountData.data?.username) ? (
            <Button
              className='text-md sm:text-base'
              onClick={async () => 
              {
                if (!accountData?.data?.id) 
                {
                  router.push('/auth');
                  return;
                }
                if (data.id) 
                {
                  const followed = await followUser(data.id);
                  if (followed) 
                  {
                    updateProfile();
                  }
                }
              }}
            >
              {isFollowing ? i18n.t('account.unfollow') : i18n.t('account.follow')}
            </Button>
          ) : (
            <Button
              className='text-md sm:text-base'
              onClick={() => 
              {
                router.push('/edit');
              }}
            >
              {i18n.t('edit_profile')}
            </Button>
          )}
        </div>
      </div>
      <div className='w-full mt-12 min-w-[370px] flex gap-0.5 flex-wrap justify-center sm:justify-start max-w-[680px]'>
        {posts.length != 0 &&
          posts.map((video) => (
            <Link
              href={`/video/${video.id}`}
              key={video.id}
              className='overflow-hidden w-[170px] min-h-[16rem] bg-black flex items-center relative rounded-[5px]'
            >
              <video disablePictureInPicture src={video.url}></video>
              <p className='absolute bottom-2 left-2 flex gap-1 text-sm items-center text-white font-medium'>
                <Heart size={16} color='white' />
                {video.likes.length}
              </p>
            </Link>
          ))}
      </div>
    </React.Fragment>
  );
}
