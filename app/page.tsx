'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { AccessedPageStore, AccountStore, FirstLoadStore, useAccessedPage, useAccountData, useFirstLoad } from '@/hooks/account.actions';
import { useEffect } from 'react';
import { HOST_DNS } from '@/lib/conf';
import { socket } from '@/common/socket';

export default function Home() 
{
  const router = useRouter();
  const accountData: AccountStore = useAccountData();
  const accessedPage: AccessedPageStore = useAccessedPage();
  const load: FirstLoadStore = useFirstLoad();

  socket.on('connect', () => 
  {
    //
  });

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
            load.setFirstLoad(false);
            router.push(accessedPage.lastAccessed.replace('%40', '@'));
            return;
          }
          else 
          {
            load.setFirstLoad(false);
            router.push(accessedPage.lastAccessed.replace('%40', '@'));
            return;
          }
        })
        .catch((error) => 
        {
          if (error.response.data.error === 'Pikpoker isn`t authenticated') 
          {
            load.setFirstLoad(false);
            router.push(accessedPage.lastAccessed.replace('%40', '@'));
            return;
          }
          if (error.response.data.data.error === 'User doesn`t exist') 
          {
            load.setFirstLoad(false);
            router.push('/logout');
            return;
          }
          else if (error.response.status === 403) 
          {
            load.setFirstLoad(false);
            router.push(accessedPage.lastAccessed.replace('%40', '@'));
            return;
          }
          else 
          {
            load.setFirstLoad(false);
            router.push('/fyp');
            return;
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <div></div>;
}
