'use client';

import { Player } from './player';

type Props = {
  video: any;
  username: string;
  description: string;
  name: string;
};

export const Video = (props: Props) => {
  return (
    <div className='max-w-[320px] mx-auto my-8'>
      <div className='info-wrapper'>
        <div className='user-title flex items-center justify-start gap-2'>
          <h3 className='text-lg font-medium'>{props.username}</h3>
          <p className='text-xs text-zinc-500'>{props.name}</p>
        </div>
        <p className='text-xs max-w-[250px] mb-2'>{props.description}</p>
      </div>
      <Player src={props.video} />
    </div>
  );
};
