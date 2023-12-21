import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import i18n from '@/lib/i18n';
import { useEffect, useState } from 'react';
import { Account } from '@/types/Account';
import { getUser } from '@/controllers/users.controller';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { createChat } from '@/controllers/chat.controller';
import { AccountStore, useAccountData } from '@/hooks/account.actions';

type Props = {
  subscribtions: string[];
};

export default function CreateChat(props: Props) 
{
  const { subscribtions } = props;
  const [subscribersList, setSubscribersList] = useState<Account[]>([]);
  const accountData: AccountStore = useAccountData();
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
        <Plus size={18} />
      </DialogTrigger>
      <DialogContent className='pb-0'>
        <DialogHeader>
          <DialogTitle className='mb-3 select-none'>Create chat with</DialogTitle>
          <div className='max-h-96 overflow-scroll'>
            {subscribersList.length != 0
              ? subscribersList.map((subscriber) => (
                <p key={subscriber.id} className='mb-3 hover:underline flex justify-between'>
                  <div className='flex gap-2 items-center'>
                    <Image
                      src={subscriber.avatarUrl}
                      className='object-cover w-8 h-8 rounded-full select-none'
                      width={48}
                      height={48}
                      alt={i18n.t('account.picture', { username: subscriber.username })}
                    />
                    <p className='select-none text-zinc-500'>{subscriber.username}</p>
                  </div>
                  <Plus
                    onClick={() => 
                    {
                      if (accountData.data?.id && subscriber.id) 
                      {
                        createChat(accountData.data.id, subscriber.id);
                      }
                    }}
                    size={18}
                  />
                </p>
              ))
              : i18n.t('no_followers')}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
