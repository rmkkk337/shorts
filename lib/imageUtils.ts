import axios from 'axios';
import { HOST_DNS } from './conf';

/*
  @name Upload image to server
  @param { File } image - Profile picture
  @param { any } data - User data
  @returns { void }
*/

export const uploadImage = (image: File): Promise<void> => 
{
  return new Promise((resolve, reject) => 
  {
    if (image != null) 
    {
      const formData = new FormData();
      formData.append('file', image);
      axios
        .post(`${HOST_DNS}:3001/user/avatar/update`, formData, {
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
