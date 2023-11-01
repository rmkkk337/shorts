'use client';

import { useState } from 'react';
import { Player } from './player';
import { MessageCircle, Share2, Heart } from 'lucide-react';

type Props = {
  video?: any;
  username: string;
  description: string;
  likes: number;
  comments: number;
};

export const Video = (props: Props) => 
{
  const [liked, setLiked] = useState<string>('false');
  const [likeButtonSize, setLikeButtonSize] = useState<number>(20);
  const LikeButtonClick = () => 
  {
    if (!liked) setLiked('true');
    for (let i = 0; i <= 20; i++) 
    {
      setLikeButtonSize(i);
    }
  };

  return (
    <div className='max-w-[320px] mx-auto my-8'>
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
            <div className='p-2 bg-zinc-100 w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-50 duration-300 cursor-pointer'>
              <Heart
                onClick={() => 
                {
                  LikeButtonClick();
                }}
                size={likeButtonSize}
                fill={liked}
              />
            </div>
            <p className='font-medium text-sm'>{props.likes}</p>
          </div>
          <div className='my-3 flex flex-col items-center'>
            <div className='p-2 bg-zinc-100 w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-50 duration-300 cursor-pointer'>
              <MessageCircle size={20} />
            </div>
            <p className='font-medium text-sm'>{props.comments}</p>
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
