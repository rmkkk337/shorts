'use client';

import i18n from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { SidebarUser } from './sidebarUser';
import { AccessedPageStore, AccountStore, useAccessedPage, useAccountData } from '@/hooks/account.actions';
import SidebarLink from '../SidebarLink';

export const Sidebar = () => 
{
  const pathname = usePathname();
  const router = useRouter();

  const accountData: AccountStore = useAccountData();
  const accessedPage: AccessedPageStore = useAccessedPage();
  const data = accountData.data;

  return (
    <div className='w-[170px] h-screen mx-6 mt-2 fixed top-14 block mr-15 left-0 z-10'>
      <div className='buttons pb-3 border-b border-solid flex flex-col'>
        <SidebarLink pathname={pathname} url='/fyp'>
          {i18n.t('fyp.fyp')}
        </SidebarLink>
        <SidebarLink pathname={pathname} url='/following'>
          {i18n.t('fyp.following')}
        </SidebarLink>
        <SidebarLink pathname={pathname} url={`/profile/@${accountData.data?.username}`}>
          {i18n.t('header.dropdown.profile')}
        </SidebarLink>
      </div>
      {data && accountData.data ? (
        <div className='h-full overflow-y-scroll'>
          <p className='text-xs text-zinc-400 font-medium mt-2 select-none'>{i18n.t('sidebar.following')}</p>
          {accountData.data.subscribtions.map((user: string) => (
            <SidebarUser key={user} uid={user} />
          ))}
        </div>
      ) : (
        <p className='text-xs text-zinc-400 mt-3 font-medium'>{i18n.t('fyp.no_account')}</p>
      )}
      {!data && (
        <Button
          className='h-8 w-[150px] mt-2'
          onClick={() => 
          {
            accessedPage.setLastAccessed(document.location.pathname);
            router.push('/auth');
          }}
        >
          {i18n.t('login_button')}
        </Button>
      )}
    </div>
  );
};
