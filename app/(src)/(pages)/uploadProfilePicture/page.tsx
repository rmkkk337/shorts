'use client';

import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { FileUploader } from 'react-drag-drop-files';
import { useAccountData } from '@/hooks/account.actions';
import { HOST_DNS } from '@/lib/conf';

export default function Page() 
{
  const [image, setImage] = useState<File | null>(null);
  const account: any = useAccountData();
  const data = account.data;

  const uploadImage = () => 
  {
    if (image != null) 
    {
      const formData = new FormData();
      formData.append('file', image);
      axios
        .post(`${HOST_DNS}:3001/user/${data.id}/post`, formData, {
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
    <>
      <FileUploader
        name='file'
        // types={['png', 'jpeg', 'jpg']}
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
    </>
  );
}
