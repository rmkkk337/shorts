'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAccessedPage, useAccountData } from '@/hooks/account.actions';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { AccountStatus } from '@/lib/account.status';

export default function Home() 
{
  const router = useRouter();
  const accountData: any = useAccountData();
  const accessedPage: any = useAccessedPage();

  useEffect(() => 
  {
    if (document) 
    {
      const token = getCookie('access-token');

      if (token !== '') 
      {
        axios
          .get('http://ec2-13-51-235-77.eu-north-1.compute.amazonaws.com:3001/user', { withCredentials: true })
          .then((response) => 
          {
            if (response?.status === 200) 
            {
              accountData.setAccountData(response.data.data);
              router.push(accessedPage.lastAccessed);
            }
            else 
            {
              accessedPage.setLastAccessed(AccountStatus.Idle);
              router.push(accessedPage.lastAccessed);
            }
          })
          .catch(() => 
          {
            router.push(accessedPage.lastAccessed);
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <div></div>;
}
