import { HOST_DNS } from '@/lib/conf';
import { io } from 'socket.io-client';

const URL = `${HOST_DNS}:3002`;

const options = {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 10000,
  autoConnect: true,
  transports: ['websocket'],
  rejectUnauthorized: true,
};

export const socket = io(URL, options);
