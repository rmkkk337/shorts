'use client';

import i18n from '@/lib/i18n';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AccessedPageStore, AccountStore, useAccessedPage, useAccountData } from '@/hooks/account.actions';
import Link from 'next/link';
// import { MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Logo from '@/app/favicon.png';

export const Header = () => 
{
  const router = useRouter();
  const accountData: AccountStore = useAccountData();
  const accessedPage: AccessedPageStore = useAccessedPage();
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
        className='text-xl font-bold cursor-pointer select-none text-black flex items-center gap-1'
        onClick={() => 
        {
          router.push('/fyp');
        }}
      >
        <Image alt='' src={Logo} width={20} height={20} />
        pikpok
      </h2>
      <div className='search-bar flex-inital w-40 sm:w-64'>
        <Input placeholder={i18n.t('header.search')} className='h-8' />
      </div>
      <div className='action-buttons flex gap-2 items-center'>
        {/* TODO: Bring back when will be functional */}
        {/* <Link href='/chat'>
          <MessageSquare />
        </Link> */}
        {/* In future instead of hiding dl button replace it with icon */}
        <Button
          variant='outline'
          className='h-8 text-black hidden sm:flex'
          onClick={() => 
          {
            handleUploadButton();
          }}
        >
          {i18n.t('header.upload')}
        </Button>
        {accountData.data && data ? (
          <DropdownMenu>
            <DropdownMenuTrigger className='outline-none focus-within:outline-none focus:outline-none'>
              <Image
                className='rounded-full min-w-8 w-8 h-8 object-cover select-none'
                src={accountData.data.avatarUrl}
                alt={i18n.t('account.picture', { username: accountData.data.username })}
                height={64}
                width={64}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='mr-2'>
              <DropdownMenuLabel>{data.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={`/profile/@${data.username}`}>
                <DropdownMenuItem>{i18n.t('header.dropdown.profile')}</DropdownMenuItem>
              </Link>
              <Link href={`/edit`}>
                <DropdownMenuItem>{i18n.t('header.dropdown.settings')}</DropdownMenuItem>
              </Link>
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
              accessedPage.setLastAccessed(document.location.pathname);
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
