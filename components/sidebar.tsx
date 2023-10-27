import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import i18n from '@/lib/i18n';

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className='sidebar w-[150px] h-screen mx-6 mt-2 fixed top-14 hidden sm:block'>
      <div className='buttons pb-3 border-b border-solid'>
        <p
          className={`${pathname === '/fyp' ? null : 'text-zinc-400'} hover:bg-zinc-200/30 rounded-md py-1 px-2 text-sm cursor-pointer duration-300`}
        >
          {i18n.t('fyp.fyp')}
        </p>
      </div>
      <p className='text-xs text-zinc-400 mt-3'>{i18n.t('fyp.no_account')}</p>
      <Button
        className='h-8 w-[150px] mt-2'
        onClick={() => {
          router.push('/auth');
        }}
      >
        {i18n.t('login_button')}
      </Button>
    </div>
  );
};
