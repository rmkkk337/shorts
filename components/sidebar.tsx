'use client';

import i18n from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { SidebarUser } from './sidebar/sidebarUser';
import { useAccessedPage, useAccountData } from '@/hooks/account.actions';
import SidebarLink from './SidebarLink';
import { AccountStatus } from '@/lib/account.status';

export const Sidebar = () => 
{
  const pathname = usePathname();
  const router = useRouter();

  const accountData: any = useAccountData();
  const accessedPage: any = useAccessedPage();
  const data = accountData.data;

  return (
    <div className='w-[170px] h-screen mx-6 mt-2 fixed top-14 block mr-15 left-0'>
      <div className='buttons pb-3 border-b border-solid flex flex-col'>
        <SidebarLink pathname={pathname} url='/fyp'>
          {i18n.t('fyp.fyp')}
        </SidebarLink>
        <SidebarLink pathname={pathname} url='/following'>
          {i18n.t('fyp.following')}
        </SidebarLink>
      </div>
      {data ? (
        <div>
          <p className='text-xs text-zinc-400 mt-2'>{i18n.t('sidebar.following')}</p>
          <SidebarUser />
          <SidebarUser />
          <SidebarUser />
          <SidebarUser />
          <SidebarUser />
        </div>
      ) : (
        <p className='text-xs text-zinc-400 mt-3'>{i18n.t('fyp.no_account')}</p>
      )}
      {!data && (
        <Button
          className='h-8 w-[150px] mt-2'
          onClick={() => 
          {
            accessedPage.setLastAccessed(AccountStatus.RedirectedToAuth);
            router.push('/auth');
          }}
        >
          {i18n.t('login_button')}
        </Button>
      )}
    </div>
  );
};
