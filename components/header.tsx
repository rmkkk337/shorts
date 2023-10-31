'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import i18n from '@/lib/i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAccountData } from '@/hooks/account.actions';

export const Header = () => 
{
  const router = useRouter();
  const accountData: any = useAccountData();
  const data = accountData.data;

  function handleUploadButton() 
  {
    if (data === null) 
    {
      router.push('/auth');
      return;
    }
    router.push('/upload');
  }

  return (
    <header className='bg-white px-6 py-2 flex items-center justify-between border-b border-solid fixed w-screen z-20'>
      <h2
        className='text-xl font-bold cursor-pointer select-none'
        onClick={() => 
        {
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
          onClick={() => 
          {
            handleUploadButton();
          }}
        >
          {i18n.t('header.upload')}
        </Button>
        {data ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className='w-8 h-8 rounded-full bg-zinc-200 cursor-pointer'></div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='mr-2'>
              <DropdownMenuLabel>{data.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => 
                {
                  router.push(`/profile/${data.id}`);
                }}
              >
                {i18n.t('header.dropdown.profile')}
              </DropdownMenuItem>
              <DropdownMenuItem>{i18n.t('header.dropdown.settings')}</DropdownMenuItem>
              <DropdownMenuItem
                className='text-red-400 focus:text-red-500'
                onClick={() => 
                {
                  router.push('/logout');
                }}
              >
                {i18n.t('header.dropdown.logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            className='h-8'
            onClick={() => 
            {
              router.push('/auth');
            }}
          >
            {i18n.t('login_button')}
          </Button>
        )}
      </div>
    </header>
  );
};
