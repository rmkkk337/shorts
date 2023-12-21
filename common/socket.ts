import { HOST_DNS } from '@/lib/conf';
import { io } from 'socket.io-client';

const URL = `${HOST_DNS}:3002`;

export const socket = io(URL);
