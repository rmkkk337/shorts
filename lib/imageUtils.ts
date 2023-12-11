import axios from 'axios';
import { HOST_DNS } from './conf';
import { Account } from '@/types/Account';

/*
  @name Upload image to server
  @param { File } image - Profile picture
  @param { any } data - User data
  @returns { void }
*/

export const uploadImage = (image: File, data: any): Promise<void> => 
{
  return new Promise((resolve, reject) => 
  {
    const accountData: Account = data.data;
    if (image != null && accountData !== null) 
    {
      const formData = new FormData();
      formData.append('file', image);
      axios
        .post(`${HOST_DNS}:3001/user/${accountData.id}/avatar/update`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        })
        .then(() => 
        {
          resolve();
        })
        .catch((error) => 
        {
          reject(error);
        });
    }
    else 
    {
      reject(new Error('Invalid image or account data'));
    }
  });
};
