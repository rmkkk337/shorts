'use client';

import { useAccessedPage, useAccountData } from '@/hooks/account.actions';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() 
{
  const router = useRouter();
  const accountData: any = useAccountData();
  const accessedPage: any = useAccessedPage();

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
