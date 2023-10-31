import { UserIcon } from 'lucide-react';
import React from 'react';
import { MoreIcon } from './icons/icons';

const RoomMessage = () => {
  return (
    <div className='room-header w-full h-full flex flex-row '>
      <UserIcon />
      {/* Video */}
      <MoreIcon />
    </div>
  );
};

export default RoomMessage;
