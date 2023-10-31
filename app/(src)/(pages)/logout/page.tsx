'use client';

import { useAccountData } from '@/hooks/account.actions';
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
      document.cookie = '';
    }
    accountData.clearAccountData();

    router.push('/fyp');
  }, [accountData, router]);

  return <main></main>;
}
