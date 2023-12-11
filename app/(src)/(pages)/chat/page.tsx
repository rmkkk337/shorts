'use client';

import { SendHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import i18n from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { useAccountData } from '@/hooks/account.actions';
import Image from 'next/image';
import React, { useState } from 'react';

export default function Page() {
  const accountData: any = useAccountData();
  const data = accountData.data;
  const [messageText, setMessageText] = useState<string>('');
  // const inputFieldRef = React.useRef<HTMLInputElement>(null);

  const messagesOld = [
    {
      sender: 'moe',
      content: 'Hello, how are you?',
    },
    {
      sender: 'moonlight',
      content: "I'm fine, thanks",
    },
    {
      sender: 'moonlight',
      content: 'What about you?',
    },
    {
      sender: 'moe',
      content: "I'm fine too, thanks!",
    },
    {
      sender: 'moe',
      content: 'Hello, how are you?',
    },
    {
      sender: 'moonlight',
      content: "I'm fine, thanks",
    },
    {
      sender: 'moonlight',
      content: 'What about you?',
    },
    {
      sender: 'moe',
      content: "I'm fine too, thanks!",
    },
    {
      sender: 'moe',
      content: 'Hello, how are you?',
    },
    {
      sender: 'moonlight',
      content: "I'm fine, thanks",
    },
    {
      sender: 'moonlight',
      content: 'What about you?',
    },
    {
      sender: 'moe',
      content: "I'm fine too, thanks!",
    },
    {
      sender: 'moe',
      content: 'Hello, how are you?',
    },
    {
      sender: 'moonlight',
      content: "I'm fine, thanks",
    },
    {
      sender: 'moonlight',
      content: 'What about you?',
    },
    {
      sender: 'moe',
      content: "I'm fine too, thanks!",
    },
  ];

  const [messages, setMessages] = useState<any>(messagesOld);

  const contacts = [
    {
      name: data?.username ? data.username : 'untitled',
      avatar: data?.avatarUrl ? data.avatarUrl : '',
    },
  ];

  function sendMessage() {
    setMessages([...messages, { sender: data?.username ? data.username : 'untitled', content: messageText }]);
    setMessageText('');
  }

  // useEffect(() =>
  // {
  //   if (inputFieldRef != null)
  //   {
  //     // add enter key event listener
  //     inputFieldRef.current?.addEventListener('keydown', (event) =>
  //     {
  //       if (event.key === 'Enter')
  //       {
  //         sendMessage();
  //       }
  //     });
  //   }

  //   return () =>
  //   {
  //     if (inputFieldRef != null)
  //     {
  //       // remove enter key event listener
  //       inputFieldRef.current?.removeEventListener('keydown', () =>
  //       {});
  //     }
  //   };
  // }, [inputFieldRef]);

  return (
    <main className='flex'>
      <div className='messages-sidebar w-[20%] min-w-[200px] border-l bg-zinc-100 px-5 py-2 border-r border-zinc-200 h-[calc(100vh-48px)]'>
        <h1 className='text-xl font-medium py-2 border-b border-zinc-200'>{i18n.t('messages.title')}</h1>
        <div className='pt-2'>
          {contacts.map((contact, index) => {
            return (
              <div
                key={index}
                className='text-lg hover:bg-zinc-200 duration-100 cursor-pointer px-2 py-1 rounded-sm select-none flex items-center gap-3'
              >
                {contact.avatar == '' ? (
                  <div className='w-8 h-8 bg-black rounded-full'></div>
                ) : (
                  <Image alt={`${contact.name} profile`} src={contact.avatar} width={32} height={32} className='rounded-full' />
                )}
                <p className='text-sm'>{contact.name}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className='chat w-[100%] h-[calc(100vh-48px)] bg-zinc-100 flex flex-col'>
        <div className='py-[10px] border-b border-zinc-200 mx-2 flex gap-2'>
          <div className='w-8 h-8 bg-black rounded-full'></div>
          <h1 className='text-xl font-medium'>moonlight</h1>
        </div>
        <div className='flex flex-1 flex-col overflow-hidden'>
          <div className='messages pl-4 bg-zinc-100 overflow-scroll'>
            {messages.map((message: any, index: number) => {
              return (
                <div key={index} className='message py-2'>
                  <div className='text-sm font-medium'>{message.sender}</div>
                  <div className='text-sm'>{message.content}</div>
                </div>
              );
            })}
          </div>
          <div className='self-end mt-auto mb-4 mx-4 w-[96%] flex gap-2'>
            <Input
              // ref={inputFieldRef}
              onChange={(event) => {
                setMessageText(event.target.value);
              }}
              placeholder={i18n.t('messages.send_message')}
              className='bg-white w-full'
            />
            <Button
              onClick={() => {
                sendMessage();
              }}
            >
              <SendHorizontal />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
