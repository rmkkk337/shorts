import axios, { AxiosResponse } from 'axios';
import { HOST_DNS } from '../lib/conf';
import { Video } from '@/types/Video';
import { Comment } from '@/types/Account';

type UploadProps = {
  video: string | Blob;
  description: string;
};

export const uploadVideo = (props: UploadProps): Promise<string | object> => 
{
  return new Promise((resolve, reject) => 
  {
    if (props.video != null) 
    {
      const formData = new FormData();
      formData.append('file', props.video);
      formData.append('description', props.description);
      axios
        .post(`${HOST_DNS}:3001/user/video/post`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        })
        .then(() => 
        {
          resolve('success');
        })
        .catch((error) => 
        {
          reject(error);
        });
    }
  });
};

/**
  @param {string} id Video id
  @param {string} uid User id
  @return {boolean} Whether the video is liked or not
*/

export const likeVideo = async (id: string, uid: string): Promise<boolean> => 
{
  return new Promise((resolve, reject) => 
  {
    try 
    {
      axios
        .get(`${HOST_DNS}:3001/video/posts/${id}/like`, {
          withCredentials: true,
        })
        .then(() => 
        {
          axios.get(`${HOST_DNS}:3001/video/post/${id}/`).then((res) => 
          {
            if (res.data.data.likes.includes(uid)) 
            {
              resolve(true);
            }
            else 
            {
              resolve(false);
            }
          });
        });
    }
    catch (error) 
    {
      reject(error);
    }
  });
};

/**
  @name Upload image to server
  @param { File } image - Profile picture
  @param { Account } data - User data
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

export const getVideos = (): Promise<Video[]> => 
{
  return new Promise((resolve, reject) => 
  {
    axios
      .get(`${HOST_DNS}:3001/video/posts`)
      .then((response: AxiosResponse) => 
      {
        resolve(response.data.data.reverse());
      })
      .catch((error) => reject(error));
  });
};

export const getLastComment = (id: string): Promise<Comment> => 
{
  return new Promise((resolve, reject) => 
  {
    axios
      .get(`${HOST_DNS}:3001/video/posts/${id}/comments`)
      .then((response: AxiosResponse) => 
      {
        const comments = response.data.data.reverse();
        resolve(comments[0]);
      })
      .catch((error) => reject(error?.response?.data?.error));
  });
};
