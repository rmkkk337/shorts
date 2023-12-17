import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { DialogHeader } from '../ui/dialog';
import i18n from '@/lib/i18n';
import { useEffect, useState } from 'react';
import { Account } from '@/types/Account';
import { getUser } from '@/controllers/users.controller';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  subscribtions: string[];
};

export default function Subscribers(props: Props) 
{
  const { subscribtions } = props;
  const [subscribersList, setSubscribersList] = useState<Account[]>([]);
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
  return (
    <Dialog>
      <DialogTrigger className='outline-none border-none'>
        <p className='text-zinc-600 flex gap-1 select-none text-sm sm:text-base hover:underline'>
          {i18n.t('account.following')}
          <span className='text-zinc-800 font-semibold'>{subscribtions.length}</span>
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-3 select-none'>{i18n.t('account.following')}</DialogTitle>
          <DialogDescription>
            {subscribersList.length != 0
              ? subscribersList.map((subscriber) => (
                <Link href={`/profile/@${subscriber.username}`} key={subscriber.id} className='mb-3 flex gap-2 items-center hover:underline'>
                  <Image
                    src={subscriber.avatarUrl}
                    className='object-cover w-8 h-8 rounded-full select-none'
                    width={48}
                    height={48}
                    alt={i18n.t('account.picture', { username: subscriber.username })}
                  />
                  <span className='select-none'>{subscriber.username}</span>
                </Link>
              ))
              : i18n.t('no_followings')}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
