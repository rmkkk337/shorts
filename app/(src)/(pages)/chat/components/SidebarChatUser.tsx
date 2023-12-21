import { getUser } from '@/controllers/users.controller';
import { Account } from '@/types/Account';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type SidebarChatUserProps = {
  uid: string | null;
  onClick: () => void;
};

export default function SidebarChatUser(props: SidebarChatUserProps) 
{
  const [contact, setContact] = useState<Account | null>(null);
  useEffect(() => 
  {
    if (props.uid == '' || props.uid == null) return;
    getUser(props.uid).then((user) => setContact(user));
  }, [props.uid]);
  if (contact == null) return;
  return (
    <div
      onClick={() => props.onClick()}
      className='text-lg hover:bg-zinc-100/80 duration-100 cursor-pointer px-2 py-1 rounded-sm select-none flex items-center gap-3'
    >
      <Image
        alt={`${contact.username} profile`}
        src={contact.avatarUrl}
        width={32}
        height={32}
        className='rounded-full object-cover min-w-[32px] min-h-[32px]'
      />
      <p className='text-sm'>{contact.username}</p>
    </div>
  );
}
