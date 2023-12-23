'use client';

import { MailX, SendHorizontal } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import i18n from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { AccessedPageStore, AccountStore, FirstLoadStore, useAccessedPage, useAccountData, useFirstLoad } from '@/hooks/account.actions';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateChat from './components/CreateChat';
import SidebarChatUser from './components/SidebarChatUser';
import { Account } from '@/types/Account';
import { getUser } from '@/controllers/users.controller';
import { getChat } from '@/controllers/chat.controller';
import { socket } from '@/common/socket';
import { replaceUid } from '@/common/regex';
import Link from 'next/link';
import VideoPreview from './components/VideoPreview';
import axios from 'axios';
import { HOST_DNS } from '@/lib/conf';

type Message = {
  id: string;
  text: string;
  userId: string;
  user: {
    name: string;
    avatar: string;
  };
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
  const [canSend, setCanSend] = useState<boolean>(true);
  const messagesRef: any = useRef();

  useEffect(() => 
  {
    if (document != null) 
    {
      document.title = `${i18n.t('messages.title')} | pikpok`;
    }
  }, []);

  useEffect(() => 
  {
    if (load.firstLoad) 
    {
      accessedPage.setLastAccessed(`/chat`);
      router.push('/');
    }
    else if (!load.firstLoad && !accountData.data) 
    {
      router.push('/auth');
    }
  }, [load, router]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [chats, setChats] = useState<string[]>([]);
  const [chatterInfo, setChatterInfo] = useState<Account | null>(null);

  useEffect(() => 
  {
    if (chatter && accountData.data?.id && replaceUid(chatter, accountData.data.id)) 
    {
      setMessages([]);
      getUser(replaceUid(chatter, accountData.data.id)).then((user) => 
      {
        getChat(chatter).then((response) => 
        {
          if (accountData.data?.id) 
          {
            getUser(replaceUid(chatter, accountData.data.id)).then((user) => 
            {
              document.title = i18n.t('messages.chat_with', { username: user.username }) + ' | pikpok';
            });
          }
          socket.emit('changeRoom', response.data.chatId);
          setMessages(response.data.messages);
        });
        setChatterInfo(user);
      });
    }
  }, [chatter]);

  useEffect(() => 
  {
    if (messagesRef.current) 
    {
      setTimeout(() => 
      {
        messagesRef.current.scrollIntoView({
          block: 'end',
          behavior: 'smooth',
        });
      }, 175);
    }
  }, [messagesRef, messages]);

  socket.on('message', (message: Message) => 
  {
    setMessages([...messages, message]);
  });

  function sendMessage() 
  {
    if (!accountData.data?.id) return;

    if (canSend) 
    {
      socket.emit('message', {
        userId: accountData.data.id,
        text: messageText,
      });
      setMessageText('');
      setCanSend(false);
      coolDownSend();
    }
  }

  const coolDownSend = () => 
  {
    setTimeout(() => 
    {
      setCanSend(true);
    }, 500);
  };
  useEffect(() => 
  {
    const interval = setInterval(async () => 
    {
      await axios.get(`${HOST_DNS}:3001/user`, { withCredentials: true }).then((response) => 
      {
        accountData.setAccountData(response.data.data);
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => 
  {
    if (accountData.data?.chats) 
    {
      setChats(accountData.data.chats);
    }
  }, [accountData.data?.chats]);

  if (load.firstLoad || !accountData.data?.id) 
  {
    return null;
  }

  return (
    <main className='flex'>
      <div className='messages-sidebar hidden md:block w-[20%] min-w-[200px] border-l bg-zinc-100/40 px-5 py-2 border-r border-zinc-200 h-[calc(100vh-48px)]'>
        <div className='py-2 border-b border-zinc-200 flex justify-between'>
          <h1 className='text-base font-medium'>{i18n.t('messages.title')}</h1>
          <CreateChat setChats={setChats} subscribtions={data?.subscribtions ? data.subscribtions : []} />
        </div>
        <div className='pt-2'>
          {chats.length != 0 &&
            chats.map((chat) => 
            {
              if (!accountData.data?.id) return;
              return (
                // @ts-ignore
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
      <div className='chat min-w-[100vw] sm:min-w-[calc(100vw-435px)] h-[calc(100vh-48px)] bg-zinc-100/40 flex flex-col'>
        {chatterInfo ? (
          <>
            <div className='py-[10px] border-b border-zinc-200 mx-2 flex gap-2 items-center'>
              <Image alt='' width={32} height={32} src={chatterInfo.avatarUrl} className='object-cover min-w-[32px] min-h-[32px] rounded-full' />
              <h1 className='text-base font-medium'>{chatterInfo ? chatterInfo.username : ''}</h1>
            </div>
            <div className='flex flex-1 flex-col overflow-hidden'>
              <div className='messages pl-4 bg-zinc-100/40 overflow-scroll'>
                {messages.map((message: Message, index: number) => 
                {
                  return (
                    <div key={index} className={`flex ${message.text.startsWith('video/') ? 'items-start' : 'items-center'} message py-2`}>
                      <Image
                        src={message.user.avatar}
                        alt=''
                        width={32}
                        height={32}
                        className='min-w-[32px] min-h-[32px] mr-2 rounded-full object-cover'
                      />
                      <div>
                        <Link href={`/profile/@${message.user.name}`} className='text-sm font-medium hover:underline'>
                          {message.user.name}
                        </Link>
                        <div className='text-sm'>
                          {message.text.startsWith('video/') ? <VideoPreview postId={message.text.split('video/')[1]} /> : message.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesRef} />
              </div>
              <div className='self-end mt-auto mb-4 mx-4 md:w-[96%] w-[90%] flex gap-2'>
                <Input
                  onChange={(event) => 
                  {
                    setMessageText(event.target.value);
                  }}
                  value={messageText}
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
                  className={`${canSend ? 'bg-black' : 'bg-black/50 hover:bg-black/50 cursor-default'}`}
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
            {i18n.t('messages.no_chat')}
          </div>
        )}
      </div>
    </main>
  );
}
