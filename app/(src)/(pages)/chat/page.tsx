'use client';

import { SendHorizontal, SettingsIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import i18n from '@/lib/i18n';
import { Button } from '@/components/ui/button';

export default function Page() {
  const messages = [
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

  const contacts = [
    {
      name: 'moe',
    },
    {
      name: 'moonlight',
    },
  ];
  return (
    <main className='flex w-[calc(100vw-240px)] h-[calc(100vh-48px)] items-center justify-center'>
      <div className='messages-sidebar w-[20%] min-w-[200px] bg-zinc-100 px-5 py-2 border-r border-zinc-200 h-[720px] rounded-l-md'>
        <h1 className='text-2xl font-medium py-2 border-b border-zinc-200'>{i18n.t('messages.title')}</h1>
        <div className='pt-2'>
          {contacts.map((contact, index) => {
            return (
              <div key={index} className='text-lg hover:bg-zinc-200 px-2 py-1 rounded-sm select-none flex items-center gap-3'>
                <div className='w-8 h-8 bg-black rounded-full'></div>
                <p>{contact.name}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className='chat w-[60%] min-w-[400px] h-[720px] bg-zinc-100 flex flex-col rounded-r-md'>
        <div className='py-3 border-b border-zinc-200 mx-2 flex gap-2'>
          <div className='w-8 h-8 bg-black rounded-full'></div>
          <h1 className='text-2xl font-medium '>moonlight</h1>
        </div>
        <div className='flex flex-1 flex-col overflow-hidden'>
          <div className='messages pl-4 bg-zinc-100 overflow-scroll'>
            {messages.map((message, index) => {
              return (
                <div key={index} className='message py-2'>
                  <div className='message-sender font-medium'>{message.sender}</div>
                  <div className='message-content'>{message.content}</div>
                </div>
              );
            })}
          </div>
          <div className='self-end mt-auto mb-4 mx-4 w-[96%] flex gap-2'>
            <Input placeholder={i18n.t('messages.send_message')} className='bg-white w-full' />
            <Button>
              <SendHorizontal />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
