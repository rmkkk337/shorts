'use client';

import { Video } from '@/components/Video';
import { getUser } from '@/controllers/users.controller';
import { useFirstLoad, useAccessedPage, FirstLoadStore, AccessedPageStore } from '@/hooks/account.actions';
import { HOST_DNS } from '@/lib/conf';
import i18n from '@/lib/i18n';
import { Video as VideoType } from '@/types/Video';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Comments } from '@/types/Account';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';

export default function Content(params: { id: string }) 
{
  const [video, setVideo] = useState<VideoType | null>(null);
  const [commentText, setCommentText] = useState<string>('');
  const [commentRequestEnded, setCommentRequestEnded] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => 
  {
    axios.get(`${HOST_DNS}:3001/video/post/${params.id}`).then((response) => 
    {
      setVideo(response.data.data);
      if (document != null) 
      {
        getUser(response.data.data.creatorId).then((response) => 
        {
          document.title = i18n.t('video_by', { username: response.username });
        });
      }
    });
  }, [params.id]);

  const load: FirstLoadStore = useFirstLoad();
  const accessedPage: AccessedPageStore = useAccessedPage();

  useEffect(() => 
  {
    if (load.firstLoad) 
    {
      accessedPage.setLastAccessed(`/video/${params.id}`);
      router.push('/');
    }
  }, [load, router]);

  const getComponentComments = () => 
  {
    getComments(params.id).then((response) => 
    {
      let comments: any[] = [];
      let getUserPromises: any[] = [];

      response.forEach((comment) => 
      {
        let userPromise = getUser(comment.creatorId).then((user) => 
        {
          return {
            user: user,
            comment: comment,
          };
        });

        getUserPromises.push(userPromise);
      });

      Promise.all(getUserPromises).then((commentsWithUsers) => 
      {
        comments = [...comments, ...commentsWithUsers];
        setComments(comments);
        setCommentRequestEnded(true);
      });
    });
  };

  useEffect(() => 
  {
    getComponentComments();
  }, []);

  if (load.firstLoad) 
  {
    return null;
  }

  const postComment = () => 
  {
    if (commentText === '') return;
    uploadComment(commentText, params.id);
    setTimeout(() => 
    {
      getComponentComments();
      setCommentText('');
    }, 200);
  };

  const componentKeyListener = (event: any) => 
  {
    if (event.key.toLowerCase() === 'enter') 
    {
      postComment();
    }
  };

  const commentTextHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => 
  {
    setCommentText(event.target.value);
  };
      
  if (!video) return null;

  return (
    <main className='flex'>
      <Video key={video.id} id={video.id} uid={video.creatorId} description={video.description} video={video.url} />
      {commentRequestEnded ? (
        <div className='ml-10'>
          <div className='h-[525px] overflow-scroll mt-4 sm:w-[300px]'>
            {comments.map((comment) => (
              <div key={comment.comment.id} className='my-5'>
                <Link href={`/profile/@${comment.user.username}`} className='flex flex-row gap-2 items-center hover:underline'>
                  <Image alt='' className='rounded-full' height={32} width={32} src={comment.user.avatarUrl} />
                  <p>{comment.user.username}</p>
                </Link>
                <p className='text-sm mt-1'>{comment.comment.text}</p>
              </div>
            ))}
          </div>
          <div className='flex gap-2'>
            <Input placeholder={i18n.t('write_comment')} onKeyDown={componentKeyListener} onChange={commentTextHandler} value={commentText} />
            <Button
              onClick={() => 
              {
                postComment();
              }}
            >
              <SendHorizonal size={18} />
            </Button>
          </div>
        </div>
      ) : (
        <div className='sm:w-[340px]'></div>
      )}
    </main>
  );
}
