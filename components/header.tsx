'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const Header = () => {
  const router = useRouter();

  return (
    <header className='bg-white px-6 py-2 flex items-center justify-between border-b border-solid fixed w-screen z-20'>
      <h2
        className='text-xl font-bold cursor-pointer select-none'
        onClick={() => {
          router.push('/fyp');
        }}
      >
        pikpok
      </h2>
      <div className='search-bar flex-inital w-64'>
        <Input placeholder='Search' className='h-8' />
      </div>
      <div className='action-buttons flex gap-2'>
        <Button
          variant='outline'
          className='h-8'
          onClick={() => {
            router.push('/upload');
          }}
        >
          Upload
        </Button>
        <Button
          className='h-8'
          onClick={() => {
            router.push('/auth');
          }}
        >
          Log in
        </Button>
      </div>
    </header>
  );
};
