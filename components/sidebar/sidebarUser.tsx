import { HOST_DNS } from '@/lib/conf';
import axios from 'axios';
import { Account } from '@/types/Account';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
  uid: string;
};

export function SidebarUser(props: Props) 
{
  const router = useRouter();
  const [userData, setUserData] = useState<Account>();
  async function getUserData() 
  {
    const res = await axios.get(`${HOST_DNS}:3001/user/${props.uid}`);

    setUserData(res.data.data);
  }

  useEffect(() => 
  {
    getUserData();
  }, []);

  if (!userData) 
  {
    return (
      <div className='flex flex-row items-center mt-2 hover:bg-zinc-200/20 duration-200 px-2 py-1 rounded-sm select-none cursor-pointer'>
        <div className='w-8 h-8 rounded-full bg-zinc-200 overflow-hidden'></div>
        <p className='text-sm ml-4 h-4 w-16 bg-zinc-200'></p>
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
        height={32}
        width={32}
        className='w-8 h-8 rounded-full bg-zinc-200 overflow-hidden'
        alt={`${userData.username} profile picture`}
      />
      <p className='text-sm ml-4 font-medium text-zinc-600'>{userData.username}</p>
    </div>
  );
}
