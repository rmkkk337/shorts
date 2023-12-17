'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import i18n from '@/lib/i18n';
import { register } from '@/controllers/users.controller';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { isValidString } from '@/common/regex';

export default function Register() 
{
  const buttonRef: any = useRef(null);
  useEffect(() => 
  {
    if (document != null) 
    {
      document.title = i18n.t('register.title');
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

  const toast = useToast();

  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const router = useRouter();

  // Handle login, password input changes
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
    if (!isValidString(username)) 
    {
      toast.toast({
        title: i18n.t('error.special_characters.title'),
        description: i18n.t('error.special_characters.description'),
        variant: 'destructive',
      });
      return;
    }
    if (password !== confirmPassword) 
    {
      toast.toast({
        title: i18n.t('password_toast.title'),
        description: i18n.t('password_toast.description'),
        variant: 'destructive',
      });
      return;
    }

    register(email, username, password)
      .then((response) => 
      {
        if (response === 'success') 
        {
          router.push('/');
        }
      })
      .catch((error) => 
      {
        if (error === 'User already exists') 
        {
          toast.toast({
            title: i18n.t('error.already_exists.title'),
            description: i18n.t('error.already_exists.description'),
            variant: 'destructive',
          });
        }
        else 
        {
          toast.toast({
            title: i18n.t('error.title'),
            description: i18n.t('error.description'),
            variant: 'destructive',
          });
        }
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
        ref={buttonRef}
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
