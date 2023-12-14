import { Metadata } from 'next';
import Content from './Content';
import React from 'react';
import { getUser } from '@/controllers/users.controller';

type MetadataProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> 
{
  const id = params.id;

  try 
  {
    const profile = await getUser(id);

    return {
      title: `${profile.username} profile`,
      description: `Check out ${profile.username} profile on pikpok.${profile.description ? `\nAbout: ${profile.description}` : ''}`,
      openGraph: {
        images: [profile.avatarUrl],
      },
      other: {
        'og:site_name': 'pikpok',
      },
    };
  }
  catch 
  {
    return {
      title: `Profile not found`,
      description: "This profile wasn't found",
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
