import { UserIcon } from 'lucide-react';
import React from 'react';

const RoomHeader = () => {
  return (
    <div className='room-header w-full h-full flex flex-row border-b-2'>
      <UserIcon />
      <p>ANTON</p>
    </div>
  );
};

export default RoomHeader;
