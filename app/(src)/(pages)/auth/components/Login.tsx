'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import i18n from '@/lib/i18n';
import axios from 'axios';
import { useAccountData } from '@/hooks/account.actions';
import React from 'react';
import { isEmail } from '@/lib/isEmail';

export default function Login() 
{
  // document.title = i18n.t('login.title');

  const router = useRouter();
  const toast = useToast();
  const accountData: any = useAccountData();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
  const handleSubmit = () => 
  {
    setPassword('');

    if (isEmail(email) === false) 
    {
      toast.toast({
        title: i18n.t('error.invalid_email.title'),
        description: i18n.t('error.invalid_email.description'),
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 4) 
    {
      toast.toast({
        title: i18n.t('error.password_too_short.title'),
        description: i18n.t('error.password_too_short.description'),
        variant: 'destructive',
      });
      return;
    }

    axios
      .post(
        'http://ec2-13-53-80-251.eu-north-1.compute.amazonaws.com:3001/auth/login',
        {
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
      .then((response) => 
      {
        if (response.data.status === 200) 
        {
          axios.get(`http://ec2-13-53-80-251.eu-north-1.compute.amazonaws.com:3001/user/`, { withCredentials: true }).then((response) => 
          {
            accountData.setAccountData(response.data.data);
            router.push('/');
          });
        }
      })
      .catch((error) => 
      {
        if (error.response.data.data.error === 'Incorrect password') 
        {
          toast.toast({
            title: i18n.t('error.incorrect_password.title'),
            description: i18n.t('error.incorrect_password.description'),
            variant: 'destructive',
          });
        }
        else if (error.response.data.data.error === 'User doesn`t exist') 
        {
          toast.toast({
            title: i18n.t('error.user_doesnt_exist.title'),
            description: i18n.t('error.user_doesnt_exist.description'),
            variant: 'destructive',
          });
        }
      });
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
        onClick={() => 
        {
          handleSubmit();
        }}
        className='w-full max-w-xs'
      >
        {i18n.t('login_button')}
      </Button>
    </main>
  );
}
