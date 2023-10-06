'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Register() {
  const router = useRouter();
  const toast = useToast();

  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const eventHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirm-password':
        setConfirmPassword(value);
        break;
    }
  };

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      toast.toast({
        title: "Password doesn't match",
        description: "Make sure that you've entered the same password in both fields.",
        variant: 'destructive',
      });
      setPassword('');
      setConfirmPassword('');
      return;
    }
  };

  return (
    <main className='items-center flex flex-col gap-2 mt-3'>
      <p className='text-xl mb-3 relative top-[-32px]'>
        Create account in <span className='font-bold'>pikpok</span>
      </p>
      <Input onChange={eventHandler} name='username' className='w-full max-w-xs' placeholder='Username' />
      <Input onChange={eventHandler} name='email' className='w-full max-w-xs' placeholder='Email' />
      <Input onChange={eventHandler} value={password} name='password' className='w-full max-w-xs' placeholder='Password' type='password' />
      <Input
        onChange={eventHandler}
        value={confirmPassword}
        name='confirm-password'
        className='w-full max-w-xs'
        placeholder='Confirm password'
        type='password'
      />
      <Button
        onClick={() => {
          handleSubmit();
        }}
        className='w-full max-w-xs'
      >
        Sign Up
      </Button>
    </main>
  );
}
