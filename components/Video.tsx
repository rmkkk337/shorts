'use client';

import React, { useEffect, useState } from 'react';
import { Player } from './player';
import { MessageCircle, Share2, Heart } from 'lucide-react';
import '@/app/globals.css';
import { HOST_DNS } from '@/lib/conf';
import axios from 'axios';
import Image from 'next/image';
import { Account } from '@/types/Account';
// @ts-ignore
import { Tagify } from 'react-tagify';
import i18n from '@/lib/i18n';
import Link from 'next/link';

type Props = {
  video?: any;
  description: string;
  likes?: number;
  comments?: number;
  uid: string;
};

export const Video: React.FC<Props> = ({ video, description, likes, comments, uid }) => 
{
  const [liked, setLiked] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<Account | null>(null);

  useEffect(() => 
  {
    axios.get(`${HOST_DNS}:3001/user/${uid}`).then((response: any) => 
    {
      setMetadata(response.data.data);
    });
  }, [uid]);

  if (!metadata) return;

  return (
    <div className='w-[50vw] mx-auto my-8'>
      <div className='info-wrapper'>
        <div className='user-title flex items-center justify-start gap-2 mb-2 select-none'>
          <Image
            src={metadata.avatarUrl}
            width={32}
            height={32}
            className='rounded-full w-8 h-8 object-cover select-none'
            alt={i18n.t('account.picture', { username: metadata.username })}
          />
          <Link href={`/profile/@${metadata.username}`}>
            <h3 className='font-medium antialiased text-zinc-600 hover:underline cursor-pointer'>{metadata.username}</h3>
          </Link>
        </div>
        <Tagify>
          <p className='text-xs max-w-[250px] mb-2 antialiased'>{description}</p>
        </Tagify>
      </div>
      <div className='flex'>
        <Player src={video} />
        <div className='self-end ml-4'>
          <div className='my-3 flex flex-col items-center'>
            <div
              onClick={() => 
              {
                setLiked(!liked);
              }}
              className='p-2 bg-zinc-100 w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-50 duration-300 cursor-pointer'
            >
              {liked ? <Heart className='like-animation select-none' size={20} fill='true' /> : <Heart className='select-none' size={20} />}
            </div>
            <p className='font-medium text-sm select-none mt-1'>{likes ? likes : 0}</p>
          </div>
          <div className='my-3 flex flex-col items-center'>
            <div className='p-2 bg-zinc-100 w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-50 duration-300 cursor-pointer'>
              <MessageCircle size={20} />
            </div>
            <p className='font-medium text-sm select-none mt-1'>{comments ? comments : 0}</p>
          </div>
          <div className='my-3 flex flex-col items-center'>
            <div className='p-2 bg-zinc-100 w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-50 duration-300 cursor-pointer'>
              <Share2 size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
