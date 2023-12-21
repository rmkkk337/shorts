'use client';

import { MailX, SendHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import i18n from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { AccessedPageStore, AccountStore, FirstLoadStore, useAccessedPage, useAccountData, useFirstLoad } from '@/hooks/account.actions';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateChat from './components/CreateChat';
import SidebarChatUser from './components/SidebarChatUser';
import { Account } from '@/types/Account';
import { getUser } from '@/controllers/users.controller';
import Image from 'next/image';
import { socket } from '@/common/socket';
import { getChat } from '@/controllers/chat.controller';
import { replaceUid } from '@/common/regex';
import { HOST_DNS } from '@/lib/conf';

type Message = {
  sender: string;
  content: string;
};

export default function Page() 
{
  const accountData: AccountStore = useAccountData();
  const data = accountData.data;
  const [messageText, setMessageText] = useState<string>('');
  const load: FirstLoadStore = useFirstLoad();
  const accessedPage: AccessedPageStore = useAccessedPage();
  const router = useRouter();
  const [chatter, setChatter] = useState<string>('');

  useEffect(() => 
  {
    if (load.firstLoad) 
    {
      accessedPage.setLastAccessed(`/chat`);
      router.push('/');
    }
  }, [load, router]);

  const [messages, setMessages] = useState<Message[]>([]);

  const [chatterInfo, setChatterInfo] = useState<Account | null>(null);

  useEffect(() => 
  {
    if (chatter) 
    {
      if (accountData.data?.id && replaceUid(chatter, accountData.data.id)) 
      {
        getUser(replaceUid(chatter, accountData.data.id)).then((user) => 
        {
          if (accountData.data?.id && user.id) 
          {
            getChat(chatter).then((response) => 
            {
              setMessages(response.data.messages)
            });
          }
          setChatterInfo(user);
        });
      }
    }
  }, [chatter]);

  function sendMessage() 
  {
    if (!accountData.data?.id) return;
    socket.emit('message', {
      userId: accountData.data.id,
      text: messageText,
    });
    console.log(`Trying to send a message with text ${messageText}`)
    fetch(`${HOST_DNS}:3002?room=${chatter}`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    setMessageText('');
  }

  if (load.firstLoad || !accountData.data?.id) 
  {
    return null;
  }

  return (
    <main className='flex'>
      <div className='messages-sidebar hidden md:block w-[20%] min-w-[200px] border-l bg-zinc-100 px-5 py-2 border-r border-zinc-200 h-[calc(100vh-48px)]'>
        <div className='py-2 border-b border-zinc-200 flex justify-between'>
          <h1 className='text-xl font-medium'>{i18n.t('messages.title')}</h1>
          <CreateChat subscribtions={data?.subscribtions ? data.subscribtions : []} />
        </div>
        <div className='pt-2'>
          {accountData.data?.chats &&
            accountData.data.chats.map((chat) => 
            {
              if (!accountData.data?.id) return;
              return (
                <SidebarChatUser
                  onClick={() => 
                  {
                    setChatter(chat);
                  }}
                  key={replaceUid(chat, accountData.data.id)}
                  uid={replaceUid(chat, accountData.data.id)}
                />
              );
            })}
        </div>
      </div>
      <div className='chat min-w-[100vw] sm:min-w-[calc(100vw-435px)] h-[calc(100vh-48px)] bg-zinc-100 flex flex-col'>
        {chatterInfo ? (
          <>
            <div className='py-[10px] border-b border-zinc-200 mx-2 flex gap-2 items-center'>
              <Image
                alt=''
                width={32}
                height={32}
                src={chatterInfo.avatarUrl}
                className='object-cover min-w-[32px] min-h-[32px] rounded-full'
              />
              <h1 className='text-xl font-medium'>{chatterInfo ? chatterInfo.username : ''}</h1>
            </div>
            <div className='flex flex-1 flex-col overflow-hidden'>
              <div className='messages pl-4 bg-zinc-100 overflow-scroll'>
                {messages.map((message: Message, index: number) => 
                {
                  return (
                    <div key={index} className='message py-2'>
                      <div className='text-sm font-medium'>{message.sender}</div>
                      <div className='text-sm'>{message.content}</div>
                    </div>
                  );
                })}
              </div>
              <div className='self-end mt-auto mb-4 mx-4 md:w-[96%] w-[90%] flex gap-2'>
                <Input
                  onChange={(event) => 
                  {
                    setMessageText(event.target.value);
                  }}
                  placeholder={i18n.t('messages.send_message')}
                  className='bg-white w-full'
                  onKeyDown={(event) => 
                  {
                    if (event.key.toLowerCase() === 'enter') 
                    {
                      sendMessage();
                    }
                  }}
                />
                <Button
                  onClick={() => 
                  {
                    sendMessage();
                  }}
                >
                  <SendHorizontal />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className='flex items-center justify-center h-full flex-col select-none font-medium'>
            <MailX size={36} strokeWidth={2} className='mb-2' />
            No chat selected
          </div>
        )}
      </div>
    </main>
  );
}
