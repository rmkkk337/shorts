'use client';

import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { FileUploader } from 'react-drag-drop-files';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import AppContent from '@/components/AppContent';

export default function Page() 
{
  const [image, setImage] = useState<File | null>(null);

  const uploadImage = () => 
  {
    if (image != null) 
    {
      const formData = new FormData();
      formData.append('file', image);
      axios
        .post('http://localhost:3001/user/avatar/post', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        })
        .then((response) => 
        {
          console.log(response);
        })
        .catch((error) => 
        {
          console.log(error);
        });
    }
  };

  return (
    <main>
      {/* image upload button */}
      <Header />
      <main className='flex'>
        <Sidebar />
        <AppContent>
          <FileUploader
            name='file'
            types={['png', 'jpeg']}
            handleChange={(event: any) => 
            {
              setImage(event);
            }}
          />
          {image != null && <Image width={100} height={100} src={URL.createObjectURL(image)} alt='New profile picture' />}
          <button
            onClick={() => 
            {
              uploadImage();
            }}
          >
            Upload
          </button>
        </AppContent>
      </main>
    </main>
  );
}
