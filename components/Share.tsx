import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import i18n from '@/lib/i18n';
import { useEffect, useState } from 'react';
import { Account } from '@/types/Account';
import { getUser } from '@/controllers/users.controller';
import Image from 'next/image';
import { Share2 } from 'lucide-react';
import Link from 'next/link';
import { HOST_DNS } from '@/lib/conf';
import { socket } from '@/common/socket';
import copy from 'copy-to-clipboard';

type Props = {
  subscribtions: string[];
  videoUrl: string;
};

export default function Share(props: Props) 
{
  const { subscribtions } = props;
  const [subscribersList, setSubscribersList] = useState<Account[]>([]);
  const [copyText, setCopyText] = useState<string>(i18n.t('share.copy'));
  useEffect(() => 
  {
    setSubscribersList([]);

    const fetchUsers = async () => 
    {
      const users = await Promise.all(subscribtions.map((id) => getUser(id)));

      setSubscribersList(users);
    };

    fetchUsers();
  }, [subscribtions]);

  const selectUser = async (targetId: string | undefined) => 
  {
    const uid = (await getUser()).id;
    const chats = (await getUser()).chats;

    if (!uid || chats.length == 0 || !targetId) return;

    chats.forEach((chat) => 
    {
      if (chat.includes(targetId)) 
      {
        socket.emit('changeRoom', chat);
        socket.emit('message', {
          userId: uid,
          text: `video/${props.videoUrl}`,
        });
      }
    });
  };

  useEffect(() => 
  {
    if (copyText === i18n.t('share.copied')) 
    {
      setTimeout(() => 
      {
        setCopyText(i18n.t('share.copy'));
      }, 2000);
    }
  }, [copyText]);

  return (
    <Dialog>
      <DialogTrigger className='outline-none border-none'>
        <button className='p-2 bg-zinc-100 w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-50 duration-300 cursor-pointer'>
          <Share2 size={20} />
        </button>
      </DialogTrigger>
      <DialogContent className='pb-0'>
        <DialogHeader>
          <DialogTitle className='mb-3 select-none'>{i18n.t('share.title')}</DialogTitle>
          <div className='max-h-96 overflow-scroll'>
            <>
              {subscribersList.length != 0 ? (
                subscribersList.map((subscriber) => 
                {
                  return (
                    <div key={subscriber.id} className='mb-3 flex justify-between items-center'>
                      <div className='flex gap-2 items-center'>
                        <Image
                          src={subscriber.avatarUrl}
                          className='object-cover w-8 h-8 rounded-full select-none'
                          width={48}
                          height={48}
                          alt={i18n.t('account.picture', { username: subscriber.username })}
                        />
                        <Link href={`/profile/@${subscriber.username}`} className='hover:underline select-none text-zinc-500 text-sm font-medium'>
                          {subscriber.username}
                        </Link>
                      </div>
                      <button
                        onClick={() => 
                        {
                          selectUser(subscriber.id);
                        }}
                        className='text-blue-500 font-medium text-sm cursor-pointer'
                      >
                        {i18n.t('share.send')}
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className='mb-4'>{i18n.t('not_following')}</div>
              )}
              <div className='flex items-center gap-2'>
                <input
                  value={`${HOST_DNS}/video/${props.videoUrl}`}
                  readOnly
                  className='w-full text-zinc-500 font-medium text-sm py-1 px-3 focus-within:border-none focus-within:outline-none bg-zinc-100 rounded-sm'
                />
                <button
                  onClick={() => 
                  {
                    copy(`${HOST_DNS}/video/${props.videoUrl}`, {
                      debug: true,
                    });
                    setCopyText(i18n.t('share.copied'));
                  }}
                  className='text-blue-500 text-sm font-medium'
                >
                  {copyText}
                </button>
              </div>
            </>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
