'use client';

import { Video } from '@/components/Video';
import { getComments, uploadComment } from '@/controllers/posts.controller';
import { getUser } from '@/controllers/users.controller';
import { useFirstLoad, useAccessedPage, FirstLoadStore, AccessedPageStore } from '@/hooks/account.actions';
import { HOST_DNS } from '@/lib/conf';
import i18n from '@/lib/i18n';
import { Video as VideoType } from '@/types/Video';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { Comments } from '@/types/Account';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function Content(params: { id: string }) 
{
  const [comments, setComments] = useState<Comments[]>([]);
  const [video, setVideo] = useState<VideoType | null>(null);
  const [commentText, setCommentText] = useState<string>('');
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

  if (load.firstLoad) 
  {
    return null;
  }

  const getComponentComments = async () => 
  {
    setTimeout(() => 
    {
      getComments(params.id).then((response) => 
      {
        let comments: Comments[] = [];
        let getUserPromises: Comments[] = [];

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
        });
      });
    }, 500);
  };

  useEffect(() => 
  {
    getComponentComments();
  }, []);

  const postComment = () => 
  {
    if (commentText === '') return;
    uploadComment(commentText, params.id);
    getComponentComments();
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
      <div className='ml-10'>
        <div className='h-[550px] overflow-scroll'>
          {comments.map((comment) => (
            <div key={comment.comment.id} className='my-5'>
              <Link href={`/profile/@${comment.user.username}`} className='flex flex-row gap-2 items-center hover:underline'>
                <Image alt='' className='rounded-full' height={32} width={32} src={comment.user.avatarUrl} />
                <p>{comment.user.username}</p>
              </Link>
              <p>{comment.comment.text}</p>
            </div>
          ))}
        </div>
        <Input onKeyDown={componentKeyListener} onChange={commentTextHandler} value={commentText} />
      </div>
    </main>
  );
}
