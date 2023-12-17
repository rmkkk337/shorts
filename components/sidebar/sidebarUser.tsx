import { Account } from '@/types/Account';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getUser } from '@/controllers/users.controller';

type Props = {
  uid: string;
};

export function SidebarUser(props: Props) 
{
  const router = useRouter();
  const { uid } = props;
  const [userData, setUserData] = useState<Account>();
  async function getUserData() 
  {
    const user = await getUser(uid);
    setUserData(user);
  }

  useEffect(() => 
  {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userData) 
  {
    return (
      <div className='flex flex-row items-center mt-2 hover:bg-zinc-200/20 duration-200 px-2 py-1 rounded-sm select-none cursor-pointer'>
        <div className='w-8 h-8 rounded-full bg-zinc-200 overflow-hidden'></div>
        <p className='text-sm ml-4 h-4 w-16 bg-zinc-200 rounded-sm'></p>
      </div>
    );
  }

  return (
    <div
      onClick={() => 
      {
        router.push(`/profile/@${userData.username}`);
      }}
      className={`flex flex-row items-center mt-2 hover:bg-zinc-200/20 ${
        document.location.pathname == `/profile/${props.uid}` || document.location.pathname == `/profile/${userData.username}`
          ? 'bg-zinc-200/20'
          : 'bg-white/0'
      } duration-200 px-2 py-1 rounded-sm select-none cursor-pointer`}
    >
      <Image
        src={userData.avatarUrl}
        height={64}
        width={64}
        className='w-8 h-8 rounded-full bg-zinc-200 overflow-hidden min-w-[32px] object-cover'
        alt={`${userData.username} profile picture`}
      />
      <p className='text-sm ml-4 font-medium text-zinc-600'>{userData.username}</p>
    </div>
  );
}
