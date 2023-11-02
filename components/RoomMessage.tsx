import React from 'react';

interface Message {
  sender: string;
  message: string;
}

const RoomMessage = (props: Message) => {
  return (
    <div className='room-header w-full flex flex-col my-2'>
      <p className='font-medium'>{props.sender}</p>
      <p>{props.message}</p>
    </div>
  );
};

export default RoomMessage;
