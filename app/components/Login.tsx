'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { RegisterUser, UserCredentials } from '@/lib/user.action';
import { LOG, LOG_LEVEL } from 'another-colored-logger';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const toast = useToast();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const eventHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
  };
  const handleSubmit = () => {
    setPassword('');
    return;
  };

  return (
    <main className='items-center flex flex-col gap-2 mt-3'>
      <p className='text-xl mb-3 relative top-[-32px]'>
        Login into <span className='font-bold'>pikpok</span>
      </p>
      <Input onChange={eventHandler} name='email' className='w-full max-w-xs' placeholder='Email' />
      <Input onChange={eventHandler} value={password} name='password' className='w-full max-w-xs' placeholder='Password' type='password' />
      <Button
        onClick={() => {
          handleSubmit();
        }}
        className='w-full max-w-xs'
      >
        Login
      </Button>
    </main>
  );
}
