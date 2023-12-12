'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAccessedPage, useAccountData } from '@/hooks/account.actions';
import { useEffect } from 'react';
import { HOST_DNS } from '@/lib/conf';

export default function Home() 
{
  const router = useRouter();
  const accountData: any = useAccountData();
  const accessedPage: any = useAccessedPage();

  useEffect(() => 
  {
    if (document) 
    {
      axios
        .get(`${HOST_DNS}:3001/user`, { withCredentials: true })
        .then((response) => 
        {
          if (response?.status === 200) 
          {
            accountData.setAccountData(response.data.data);
            router.push(accessedPage.lastAccessed.replace('%40', '@'));
            return;
          }
          else 
          {
            router.push(accessedPage.lastAccessed.replace('%40', '@'));
            return;
          }
        })
        .catch((error) => 
        {
          if (error.response.data.error === 'Pikpoker isn`t authenticated') 
          {
            router.push(accessedPage.lastAccessed.replace('%40', '@'));
            return;
          }
          if (error.response.data.data.error === 'User doesn`t exist') 
          {
            router.push('/logout');
            return;
          }
          else 
          {
            router.push('/fyp');
            return;
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <div></div>;
}
