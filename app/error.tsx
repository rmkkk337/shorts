'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error() 
{
  const env = process.env.NODE_ENV;
  const router = useRouter();
  useEffect(() => 
  {
    if (env == 'production') 
    {
      router.push('/fyp');
    }
  }, []);
  return null;
}
