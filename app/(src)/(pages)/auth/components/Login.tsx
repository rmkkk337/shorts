'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import i18n from '@/lib/i18n';
import { AccountStore, useAccountData } from '@/hooks/account.actions';
import React from 'react';
import { isEmail } from '@/common/regex';
import { login } from '@/controllers/users.controller';

export default function Login() 
{
  const buttonRef: any = useRef(null);
  useEffect(() => 
  {
    if (document != null) 
    {
      document.title = i18n.t('login.title');
      document.addEventListener('keydown', (event) => 
      {
        // When user press enter we click on login button,
        // have side effects such as displaying modal and procceding to login
        // but if doing click on button we don't have such behavior
        // FIXME: fix this behavior somehow
        if (event.key.toLowerCase() === 'enter' && buttonRef != null) 
        {
          buttonRef.current?.click();
        }
      });
    }

    return () => 
    {
      if (document != null) 
      {
        document.removeEventListener('keydown', () => 
        {});
      }
    };
  }, []);

  const router = useRouter();
  const toast = useToast();
  const accountData: AccountStore = useAccountData();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Handle login, password input changes
  const eventHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => 
  {
    const { name, value } = event.target;

    switch (name) 
    {
    case 'email':
      setEmail(value);
      break;
    case 'password':
      setPassword(value);
      break;
    }
  };

  // Handles login button click
  const handleSubmit = async () => 
  {
    if (isEmail(email) === false) 
    {
      toast.toast({
        title: i18n.t('error.invalid_email.title'),
        description: i18n.t('error.invalid_email.description'),
        variant: 'destructive',
      });
      return;
    }

    if (password.length >= 4) 
    {
      login(email, password)
        .then((response) => 
        {
          accountData.setAccountData(response);
          router.push('/');
        })
        .catch((error) => 
        {
          if (error == 'Incorrect password') 
          {
            toast.toast({
              title: i18n.t('error.incorrect_password.title'),
              description: i18n.t('error.incorrect_password.description'),
              variant: 'destructive',
            });
          }
          else if (error == "User doesn't exist") 
          {
            toast.toast({
              title: i18n.t('error.user_doesnt_exist.title'),
              description: i18n.t('error.user_doesnt_exist.description'),
              variant: 'destructive',
            });
          }
        });
    }
    else 
    {
      toast.toast({
        title: i18n.t('error.password_too_short.title'),
        description: i18n.t('error.password_too_short.description'),
        variant: 'destructive',
      });
    }
    setPassword('');
  };

  return (
    <main className='items-center flex flex-col gap-2 mt-3'>
      <p className='text-xl mb-3 relative top-[-32px]'>
        {i18n.t('login.text')} <span className='font-bold'>{i18n.t('application_name')}</span>
      </p>
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
      <Button
        ref={buttonRef}
        onClick={() => 
        {
          if (password.length > 4) 
          {
            toast.toast({
              title: i18n.t('error.password_too_short.title'),
              description: i18n.t('error.password_too_short.description'),
              variant: 'destructive',
            });
            return;
          }
          else 
          {
            handleSubmit();
          }
        }}
        className='w-full max-w-xs'
      >
        {i18n.t('login_button')}
      </Button>
    </main>
  );
}
