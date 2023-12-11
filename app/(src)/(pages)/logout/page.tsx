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
    router.push(accessedPage.lastAccessed);
  }, [router]);

  return <main></main>;
}
