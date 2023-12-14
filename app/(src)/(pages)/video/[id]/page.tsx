import { Metadata } from 'next';
import Content from './Content';
import { HOST_DNS } from '@/lib/conf';
import axios from 'axios';
import React from 'react';
import { Video } from '@/types/Video';
import { Account } from '@/types/Account';

type MetadataProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> 
{
  const id = params.id;

  try 
  {
    const video: Video = await axios.get(`${HOST_DNS}:3001/video/post/${id}`).then((response) => 
    {
      return response.data.data;
    });

    const profile: Account = await axios.get(`${HOST_DNS}:3001/user/${video.creatorId}`).then((response) => 
    {
      return response.data.data;
    });

    return {
      title: `pikpok · ${profile.username}`,
      description: `Likes ${video.likes.length}, comments: ${video.comments.length}. ${video.description ? `«${video.description}»` : ''}`,
      openGraph: {
        images: [video.url],
      },
      other: {
        'og:site_name': 'pikpok',
      },
    };
  }
  catch 
  {
    return {
      title: 'Video is not found',
      description: "This video wasn't found",
      openGraph: {
        images: [
          'https://firebasestorage.googleapis.com/v0/b/pikpok-7e43d.appspot.com/o/avatars%2Fdefault-avatar.jpeg?alt=media&token=16fe35e9-f2b7-4306-ac55-5f3131c33ca6',
        ],
      },
      other: {
        'og:site_name': 'pikpok',
      },
    };
  }
}

export default function Page({ params }: { params: { id: string } }) 
{
  return <Content id={params.id} />;
}
