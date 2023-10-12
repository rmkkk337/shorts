'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [hasAccount, setHasAccount] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    if (!hasAccount) {
      router.push('/auth');
    } else if (hasAccount) {
      router.push('/fyp');
    }
  }, []);
  return null;
}
