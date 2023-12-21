import { HOST_DNS } from '@/lib/conf';
export const createChat = (sender: string, receiver: string) => 
{
  fetch(`${HOST_DNS}:3001/chat/create?sender=${sender}&receiver=${receiver}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
};

export const getChat = (chatId: string) => 
{
  return fetch(`${HOST_DNS}:3001/chat/${chatId}`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => 
  {
    return response.json();
  });
};
