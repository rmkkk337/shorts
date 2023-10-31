'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAccountData } from '@/hooks/account.actions';

export default function Home() 
{
  const router = useRouter();
  const accountData: any = useAccountData();

  axios
    .get('http://localhost:3001/user', { withCredentials: true })
    .then((response) => 
    {
      if (response?.status === 200) 
      {
        accountData.setAccountData(response.data.data);
        router.push('/fyp');
      }
      else 
      {
        router.push('/auth');
      }
    })
    .catch(() => 
    {
      router.push('/auth');
    });

  return <div></div>;
}
