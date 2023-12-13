'use client';

import { AccessedPageStore, AccountStore, useAccessedPage, useAccountData } from '@/hooks/account.actions';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() 
{
  const router = useRouter();
  const accountData: AccountStore = useAccountData();
  const accessedPage: AccessedPageStore = useAccessedPage();

  useEffect(() => 
  {
    if (document != null) 
    {
      deleteCookie('access-token');
    }
    accountData.clearAccountData();
    router.push(accessedPage.lastAccessed.replace('%40', '@'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <main></main>;
}
