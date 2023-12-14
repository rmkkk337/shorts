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
import { likeVideo } from '@/controllers/posts.controller';
import { AccountStore, useAccountData } from '@/hooks/account.actions';
import { getUser } from '@/controllers/users.controller';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type Props = {
  video?: string;
  description: string;
  uid: string;
  id: string;
};

export const Video: React.FC<Props> = (props: Props) => 
{
  const { video, description, uid, id } = props;
  const [liked, setLiked] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<Account | null>(null);
  const [likes, setLikes] = useState<number | null>(null);
  const accountData: AccountStore = useAccountData();
  const router: AppRouterInstance = useRouter();
  const [comments, setComments] = useState<number>(0);

  useEffect(() => 
  {
    getUser(uid).then((user) => 
    {
      setMetadata(user);
    });
  }, [uid]);

  useEffect(() => 
  {
    axios.get(`${HOST_DNS}:3001/video/post/${id}`).then((res) => 
    {
      setLikes(res.data.data.likes.length);
      setComments(res.data.data.comments.length);
      if (accountData.data) 
      {
        setLiked(res.data.data.likes.includes(accountData.data.id));
      }
    });
  }, [liked]);

  // useEffect(() =>
  // {
  //   if (withComments)
  //   {
  //     getComments(id).then((response) =>
  //     {
  //       console.log(response);
  //       setComments(response);
  //     });
  //   }
  // }, [withComments, id]);

  if (!metadata || likes == null) return <div></div>;

  return (
    <div className='sm:w-[50vw] mx-auto my-8 snap-start snap-margin'>
      <div className='info-wrapper'>
        <Link className='user-title flex items-center justify-start gap-2 mb-2 select-none' href={`/profile/@${metadata.username}`}>
          <Image
            src={metadata.avatarUrl}
            width={32}
            height={32}
            className='rounded-full w-8 h-8 object-cover select-none'
            alt={i18n.t('account.picture', { username: metadata.username })}
          />
          <h3 className='font-medium antialiased text-zinc-600 hover:underline cursor-pointer'>{metadata.username}</h3>
        </Link>
        <Tagify>
          <p className='text-xs max-w-[250px] mb-2 antialiased'>{description}</p>
        </Tagify>
      </div>
      <div className='flex'>
        <Player src={video} videoID={id} />
        <div className='self-end ml-4'>
          <div className='my-3 flex flex-col items-center'>
            <button
              onClick={async () => 
              {
                if (accountData.data?.id) 
                {
                  const liked = await likeVideo(id, accountData.data.id);
                  setLiked(liked);
                }
              }}
              className='p-2 bg-zinc-100 w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-50 duration-300 cursor-pointer'
            >
              {liked ? <Heart className='like-animation select-none ' size={20} fill='true' /> : <Heart className='select-none' size={20} />}
            </button>
            <p className='font-medium text-sm select-none mt-1'>{likes}</p>
          </div>
          <div className='my-3 flex flex-col items-center'>
            <button
              className='p-2 bg-zinc-100 w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-50 duration-300 cursor-pointer'
              onClick={() => 
              {
                router.push(`/video/${id}`);
              }}
            >
              <MessageCircle size={20} />
            </button>
            <p className='font-medium text-sm select-none mt-1'>{comments}</p>
          </div>
          <div className='my-3 flex flex-col items-center'>
            <button className='p-2 bg-zinc-100 w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-50 duration-300 cursor-pointer'>
              <Share2 size={20} />
            </button>
          </div>
        </div>
        {/* {withComments &&
          comments.length != 0 &&
          comments.map((comment: Comment) => 
          {
            return <div key={comment.id}>{comment.text}</div>;
          })} */}
      </div>
    </div>
  );
};
