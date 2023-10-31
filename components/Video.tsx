'use client';

import { Player } from './player';
import { MessageCircle, Share2, Heart } from 'lucide-react';

type Props = {
  video: any;
  username: string;
  description: string;
  name: string;
};

export const Video = (props: Props) => 
{
  return (
    <div className='max-w-[320px] mx-auto my-8'>
      <div className='info-wrapper'>
        <div className='user-title flex items-baseline justify-start gap-2'>
          <h3 className='text-lg font-medium'>{props.username}</h3>
          <p className='text-xs text-zinc-500'>{props.name}</p>
        </div>
        <p className='text-xs max-w-[250px] mb-2'>{props.description}</p>
      </div>
      <div className='flex'>
        <Player src={props.video} />
        <div className='self-end ml-4'>
          <div className='p-2 bg-zinc-100 w-10 h-10 flex items-center justify-center rounded-full my-3 hover:bg-zinc-50 duration-300 cursor-pointer'>
            <Heart size={20} />
          </div>
          <div className='p-2 bg-zinc-100 w-10 h-10 flex items-center justify-center rounded-full my-3 hover:bg-zinc-50 duration-300 cursor-pointer'>
            <MessageCircle size={20} />
          </div>
          <div className='p-2 bg-zinc-100 w-10 h-10 flex items-center justify-center rounded-full my-3 hover:bg-zinc-50 duration-300 cursor-pointer'>
            <Share2 size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};
