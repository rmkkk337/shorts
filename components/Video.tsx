// TODO: Add loading circle while source is loading

'use client';

import { useEffect, useState } from 'react';
import { Player } from './player';
import { MessageCircle, Share2, Heart } from 'lucide-react';
import '@/app/globals.css';
import { HOST_DNS } from '@/lib/conf';
import axios from 'axios';
import Image from 'next/image';

type Props = {
  video?: any;
  description: string;
  likes?: number;
  comments?: number;
  uid: string;
};

type Metadata = {
  username: string;
  avatarUrl: string;
};

export const Video = (props: Props) => 
{
  const [liked, setLiked] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  useEffect(() => 
  {
    axios.get(`${HOST_DNS}:3001/user/${props.uid}`).then((response: any) => 
    {
      setMetadata(response.data.data);
    });
  }, [props]);

  if (!metadata) return;

  return (
    <div className='w-[50vw] mx-auto my-8'>
      <div className='info-wrapper'>
        <div className='user-title flex items-center justify-start gap-2 mb-2 select-none'>
          <Image
            src={metadata.avatarUrl}
            width={32}
            height={32}
            className='rounded-full w-8 h-8 object-cover'
            alt={`${metadata.username} profile picture`}
          />
          <h3 className='text-lg font-medium'>{metadata.username}</h3>
        </div>
        <p className='text-xs max-w-[250px] mb-2'>{props.description}</p>
      </div>
      <div className='flex'>
        <Player src={props.video} />
        <div className='self-end ml-4'>
          <div className='my-3 flex flex-col items-center'>
            <div
              onClick={() => 
              {
                setLiked(!liked);
              }}
              className='p-2 bg-zinc-100 w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-50 duration-300 cursor-pointer'
            >
              {liked ? <Heart className='like-animation' size={20} fill='true' /> : <Heart size={20} />}
            </div>
            <p className='font-medium text-sm select-none mt-1'>{props.likes ? props.likes : 0}</p>
          </div>
          <div className='my-3 flex flex-col items-center'>
            <div className='p-2 bg-zinc-100 w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-50 duration-300 cursor-pointer'>
              <MessageCircle size={20} />
            </div>
            <p className='font-medium text-sm select-none mt-1'>{props.comments ? props.comments : 0}</p>
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
