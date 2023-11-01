'use client';

import { FirstLoadProps, useAccountData, useFirstLoad } from '@/hooks/account.actions';
import i18n from '@/lib/i18n';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { UseBoundStore } from 'zustand';

export default function Page({ params }: { params: { id: string } }) 
{
  const router = useRouter();
  useEffect(() => 
  {
    if (document != null) 
    {
      document.title = i18n.t('fyp.title');
    }
  }, []);

  const load: FirstLoadProps = useFirstLoad();
  const accountData: UseBoundStore<any> = useAccountData();

  useEffect(() => 
  {
    if (load.firstLoad) 
    {
      router.push('/');
      load.setFirstLoad(false);
    }
  }, [load, router]);

  if (!accountData.data) 
  {
    return;
  }

  // TODO: At this page we must fetch the user data from the server by using the id from the params.
  return (
    <React.Fragment>
      {/* profile picture placeholder */}
      <div className='account-info flex mt-3'>
        {params.id === params.id ? null : null}
        <div className='w-36 h-36 rounded-full bg-zinc-300'></div>
        <h1 className='text-xl font-bold'>{accountData.data.username}</h1>
      </div>
    </React.Fragment>
  );
}
