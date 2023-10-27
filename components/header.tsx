'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import i18n from '@/lib/i18n';

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
        <Input placeholder={i18n.t('header.search')} className='h-8' />
      </div>
      <div className='action-buttons flex gap-2'>
        <Button
          variant='outline'
          className='h-8'
          onClick={() => {
            router.push('/upload');
          }}
        >
          {i18n.t('header.upload')}
        </Button>
        <Button
          className='h-8'
          onClick={() => {
            router.push('/auth');
          }}
        >
          {i18n.t('login_button')}
        </Button>
      </div>
    </header>
  );
};
