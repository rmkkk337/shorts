'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { HOST_DNS } from '@/lib/conf';
import i18n from '@/lib/i18n';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React from 'react';

export default function Register() 
{
  // document.title = i18n.t('register.title');
  const toast = useToast();

  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const router = useRouter();

  const eventHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => 
  {
    const { name, value } = event.target;

    switch (name) 
    {
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

  const handleSubmit = () => 
  {
    if (password !== confirmPassword) 
    {
      toast.toast({
        title: i18n.t('password_toast.title'),
        description: i18n.t('password_toast.description'),
        variant: 'destructive',
      });
      return;
    }

    axios
      .post(
        `${HOST_DNS}:3001/auth/registration`,
        {
          username: username,
          email: email,
          password: password,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then(() => 
      {
        router.push('/');
      })
      .catch(() => 
      {
        toast.toast({
          title: i18n.t('error.title'),
          description: i18n.t('error.description'),
          variant: 'destructive',
        });
      });

    setPassword('');
    setConfirmPassword('');
  };

  return (
    <main className='items-center flex flex-col gap-2 mt-3'>
      <p className='text-xl mb-3 relative top-[-32px]'>
        {i18n.t('register.text')} <span className='font-bold'>{i18n.t('application_name')}</span>
      </p>
      <Input onChange={eventHandler} name='username' className='w-full max-w-xs' placeholder={i18n.t('auth.username')} />
      <Input onChange={eventHandler} name='email' className='w-full max-w-xs' placeholder={i18n.t('auth.email')} />
      <Input
        onChange={eventHandler}
        value={password}
        name='password'
        className='w-full max-w-xs'
        placeholder={i18n.t('auth.password')}
        type='password'
        maxLength={20}
      />
      <Input
        onChange={eventHandler}
        value={confirmPassword}
        name='confirm-password'
        className='w-full max-w-xs'
        placeholder={i18n.t('auth.confirm_password')}
        type='password'
        maxLength={20}
      />
      <Button
        onClick={() => 
        {
          handleSubmit();
        }}
        className='w-full max-w-xs'
      >
        {i18n.t('auth.sign_up')}
      </Button>
    </main>
  );
}
