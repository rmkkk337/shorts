'use client';

import { useAccountData } from '@/hooks/account.actions';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() 
{
  const router = useRouter();
  const accountData: any = useAccountData();

  useEffect(() => 
  {
    if (document != null) 
    {
      deleteCookie('access-token');
    }
    accountData.clearAccountData();

    router.push('/fyp');
  }, [router]);

  return <main></main>;
}
