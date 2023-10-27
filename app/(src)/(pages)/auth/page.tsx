'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Register from './root_page_tabs/Register';
import { TabsContent } from '@radix-ui/react-tabs';
import Login from './root_page_tabs/Login';
import i18n from '@/lib/i18n';

export default function Page() {
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
