'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Register from './components/Register';
import { TabsContent } from '@radix-ui/react-tabs';
import Login from './components/Login';
import i18n from '@/lib/i18n';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

export default function Page() {
  const router = useRouter();
  const [cookieChecked, setCookieChecked] = useState(false);

  useEffect(() => 
  {
    if (getCookie('access-token') !== undefined) 
    {
      router.push('/');
    } else {
      setCookieChecked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (cookieChecked) {
    return (
      <main className='h-screen w-full flex flex-col items-center justify-center'>
        <Tabs defaultValue='create' className='w-[300px]'>
          <TabsList className='grid w-full grid-cols-2 relative top-[50px]'>
            <TabsTrigger value='login'>{i18n.t('login_button')}</TabsTrigger>
            <TabsTrigger value='create'>{i18n.t('auth.sign_up')}</TabsTrigger>
          </TabsList>
          <TabsContent value='login'>
            <Login />
          </TabsContent>
          <TabsContent value='create'>
            <Register />
          </TabsContent>
        </Tabs>
      </main>
    );
  }
}
