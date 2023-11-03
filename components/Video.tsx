// TODO: Add loading circle while source is loading

'use client';

import { useState } from 'react';
import { Player } from './player';
import { MessageCircle, Share2, Heart } from 'lucide-react';
import '@/app/globals.css';

type Props = {
  video?: any;
  username: string;
  description: string;
  likes?: number;
  comments?: number;
};

export const Video = (props: Props) => 
{
  const [liked, setLiked] = useState<boolean>(false);

  return (
    <div className='w-[50vw] mx-auto my-8'>
      <div className='info-wrapper'>
        <div className='user-title flex items-center justify-start gap-2 mb-2'>
          <div className='w-8 h-8 rounded-full bg-zinc-300'></div>
          <h3 className='text-lg font-medium'>{props.username}</h3>
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
            <p className='font-medium text-sm select-none'>{props.likes ? props.likes : 0}</p>
          </div>
          <div className='my-3 flex flex-col items-center'>
            <div className='p-2 bg-zinc-100 w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-50 duration-300 cursor-pointer'>
              <MessageCircle size={20} />
            </div>
            <p className='font-medium text-sm select-none'>{props.comments ? props.comments : 0}</p>
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
