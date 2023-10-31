import { UserIcon } from 'lucide-react';
import React from 'react';
import { MoreIcon } from './icons/icons';

const ListElement = () => {
  return (
    <div className='list-element w-full h-full flex flex-row justify-around'>
      <div className='user-info flex flex-row '>
        <UserIcon />
        <p>ANTON</p>
      </div>
      <MoreIcon />
    </div>
  );
};

export default ListElement;
