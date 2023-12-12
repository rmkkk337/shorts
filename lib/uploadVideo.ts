import axios from 'axios';
import { HOST_DNS } from './conf';

type UploadProps = {
  video: string | Blob;
  description: string;
};

export const uploadVideo = (props: UploadProps) => {
  if (props.video != null) {
    const formData = new FormData();
    formData.append('file', props.video);
    formData.append('description', props.description);
    axios.post(`${HOST_DNS}:3001/user/video/post`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
  }
};
