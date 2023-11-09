'use client';

import i18n from '@/lib/i18n';
import Link from 'next/link';

export default function Error() 
{
  return (
    <main className='flex items-center justify-center h-[calc(100vh-48px)] w-[calc(100vw-240px]'>
      <h1 className='text-zinc-600'>
        {i18n.t('page_error.not_found')}{' '}
        <Link className='text-black underline' href='/fyp'>
          {i18n.t('fyp.fyp')}
        </Link>
      </h1>
    </main>
  );
}
