'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Home() {
  const [hasAccount, setHasAccount] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    axios.get('http://ec2-13-51-199-34.eu-north-1.compute.amazonaws.com:5462/user', { withCredentials: true }).then((response) => {
      console.log(response);
    });
    return;
    if (!hasAccount) {
      router.push('/auth');
    } else if (hasAccount) {
      router.push('/fyp');
    }
  }, []);
  return <div className='bg-black h-screen w-full'></div>;
}
