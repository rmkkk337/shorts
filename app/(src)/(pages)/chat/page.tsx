'use client';

import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import AppContent from '@/components/AppContent';
import { SettingsIcon } from 'lucide-react';
import ListElement from '@/components/ListElement';
import RoomHeader from '@/components/RoomHeader';
import RoomMessage from '@/components/RoomMessage';

export default function Page() {
  return (
    <main>
      <Header />
      <main className='flex'>
        <Sidebar />
        <AppContent>
          <div className='chat-block w-[1600px] flex gap-10'>
            <div className='messangers-list bg-zinc-100 w-2/6 h-full flex  flex-col rounded-xl'>
              <div className='list-header flex w-full h-full flex-row justify-around'>
                <h1>Messages</h1>
                <SettingsIcon />
              </div>
              <div className='list-wrapper w-full h-full'>
                <div className='list-elements flex flex-col w-full justify-center'>
                  <ListElement />
                  <ListElement />
                  <ListElement />
                </div>
              </div>
            </div>
            <div className='conversation-rooms bg-zinc-100 w-4/6 h-full rounded-xl'>
              <RoomHeader />
              <div className='room-message-block'>
                <RoomMessage />
              </div>
            </div>
          </div>
        </AppContent>
      </main>
    </main>
  );
}
