import { HOST_DNS } from '@/lib/conf';
import { Account } from '@/types/Account';
import { Video } from '@/types/Video';
import axios from 'axios';

export const searchUser = (query: string): Promise<Account[]> => 
{
  return axios.get(`${HOST_DNS}:3001/search?q=${query}&type=users`).then((response) => 
  {
    return response.data.data;
  });
};

export const searchPosts = (query: string): Promise<Video[]> => 
{
  return axios
    .get(`${HOST_DNS}:3001/search?q=${query}&type=posts`)
    .then((response) => 
    {
      return response.data.data;
    })
    .catch(() => 
    {
      //
    });
};
