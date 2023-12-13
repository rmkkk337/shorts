'use client';

import React, { useEffect, useState } from 'react';
import { Player } from './player';
import { MessageCircle, Share2, Heart } from 'lucide-react';
import '@/app/globals.css';
import { HOST_DNS } from '@/lib/conf';
import axios from 'axios';
import Image from 'next/image';
import { Account, Comment } from '@/types/Account';
// @ts-ignore
import { Tagify } from 'react-tagify';
import i18n from '@/lib/i18n';
import Link from 'next/link';
import { getLastComment, likeVideo } from '@/controllers/posts.controller';
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
  const [comments, setComments] = useState<number | null>(null);
  const accountData: AccountStore = useAccountData();
  const [lastComment, setLastComment] = useState<Comment | null>(null);
  const [lastCommentUser, setLastCommentUser] = useState<Account | null>(null);
  const router: AppRouterInstance = useRouter();

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
      getLastComment(id).then((response) => 
      {
        setLastComment(response);
        if (response !== undefined) 
        {
          getUser(response.creatorId).then((user) => 
          {
            setLastCommentUser(user);
          });
        }
      });
    });
  }, [liked, accountData.data, id]);

  if (!metadata || likes == null) return <div></div>;

  return (
    <div className='w-[50vw] mx-auto my-8 snap-center'>
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
            </div>
            <p className='font-medium text-sm select-none mt-1'>{likes}</p>
          </div>
          <div className='my-3 flex flex-col items-center'>
            <div
              className='p-2 bg-zinc-100 w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-50 duration-300 cursor-pointer'
              onClick={() => 
              {
                router.push(`/video/${id}`);
              }}
            >
              <MessageCircle size={20} />
            </div>
            <p className='font-medium text-sm select-none mt-1'>{comments}</p>
          </div>
          <div className='my-3 flex flex-col items-center'>
            <div className='p-2 bg-zinc-100 w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-50 duration-300 cursor-pointer'>
              <Share2 size={20} />
            </div>
          </div>
        </div>
      </div>
      {lastCommentUser && lastComment ? (
        <div className='bg-zinc-100 w-[280px] h-10 mt-2 rounded-sm flex items-center px-2'>
          <Link className='flex' href={`/profile/@${lastCommentUser.username}`}>
            <Image
              src={lastCommentUser.avatarUrl}
              width={32}
              height={32}
              className='rounded-full w-8 h-8 object-cover select-none'
              alt={i18n.t('account.picture', { username: lastCommentUser.username })}
            />
            <div className='ml-2'>
              <div className='flex'>
                <p className='text-xs font-medium antialiased'>{lastCommentUser.username}</p>
              </div>
              <p className='text-xs text-zinc-800 antialiased'>{lastComment.text}</p>
            </div>
          </Link>
        </div>
      ) : null}
    </div>
  );
};
