'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Account } from '@/types/Account';
import { searchPosts, searchUser } from '@/controllers/search.controller';
import Image from 'next/image';
import Link from 'next/link';
import i18n from '@/lib/i18n';
import SearchSelector from './components/SearchSelector';
import { Video as VideoType } from '@/types/Video';
import { Video } from '@/components/Video';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AccessedPageStore, FirstLoadStore, useAccessedPage, useFirstLoad } from '@/hooks/account.actions';

export default function Page() 
{
  const params = useSearchParams();
  // const [searchResult, setSearchResult] = useState<Account[] | VideoType[]>([]);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const load: FirstLoadStore = useFirstLoad();
  const accessedPage: AccessedPageStore = useAccessedPage();
  const options = [
    {
      title: i18n.t('search_variants.users'),
      type: 'users',
    },
    {
      title: i18n.t('search_variants.posts'),
      type: 'posts',
    },
  ];

  const router = useRouter();

  useEffect(() => 
  {
    if (load.firstLoad) 
    {
      accessedPage.setLastAccessed(`/search?${query}&type=${type}`);
      router.push('/');
    }
  }, [load, router]);

  const query = params.get('q');
  const type = params.get('type');
  const [search, setSearch] = useState<string>(query ? query : '');

  useEffect(() => 
  {
    setSearchResult([]);
    if (query && type == 'users') 
    {
      searchUser(query).then((response: Account[]) => 
      {
        setSearchResult(response);
      });
    }
    else if (query && type == 'posts') 
    {
      searchPosts(query).then((response: VideoType[]) => 
      {
        setSearchResult(response);
      });
    }
  }, [params, query, type]);

  const searchRequest = () => 
  {
    router.push(`/search?q=${search}&type=${type}`);
  };

  const renderUsers = () => 
  {
    return searchResult.map((user) => (
      <div key={user.id} className='flex items-center gap-5'>
        <Image src={user.avatarUrl} alt='' height={108} width={108} className='rounded-full object-cover min-w-[108px] min-h-[108px] select-none' />
        <div>
          <Link href={`/profile/@${user.username}`} className='text-lg font-medium cursor-pointer hover:underline select-none'>
            {user.username}
          </Link>
          <div className='flex gap-2 items-center'>
            <p className='text-zinc-500 text-sm'>
              {i18n.t('account.followers')}
              <span className='text-black ml-1 font-medium'>{user?.subscribers && user.subscribers.length}</span>
            </p>
            <p className='text-zinc-500 text-sm'>
              {i18n.t('account.following')}
              <span className='text-black ml-1 font-medium'>{user?.subscribtions && user.subscribtions.length}</span>
            </p>
          </div>
          <p className='whitespace-pre font-medium text-zinc-500 text-sm'>{user.description.trim()}</p>
        </div>
      </div>
    ));
  };

  const renderPosts = () => 
  {
    return searchResult.map((post: VideoType) => (
      <Video key={post.id} id={post.id} uid={post.creatorId} description={post.description} video={post.url} />
    ));
  };

  return (
    <main className='mt-4 flex flex-col gap-5'>
      <div className='flex gap-5'>
        {options.map((option) => (
          <SearchSelector key={option.type} type={option.type}>
            {option.title}
          </SearchSelector>
        ))}
      </div>
      <div className='flex gap-2 items-center'>
        <Input
          value={search}
          placeholder={i18n.t('header.search_alt')}
          onChange={(event) => 
          {
            setSearch(event.target.value);
          }}
          onKeyDown={(event) => 
          {
            if (event.key.toLowerCase() === 'enter') 
            {
              searchRequest();
            }
          }}
          className='font-medium'
        />
        <Button
          onClick={() => 
          {
            searchRequest();
          }}
        >
          {i18n.t('header.search')}
        </Button>
      </div>
      {type == 'users' && renderUsers()}
      {type == 'posts' && <div className='mt-[-32px]'>{renderPosts()}</div>}
    </main>
  );
}
