import { useEffect, useRef, useState } from 'react';
import { Video } from '@/types/Video';
import { HOST_DNS } from '@/lib/conf';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type VideoPreviewProps = {
  postId: string;
};

export default function VideoPreview(props: VideoPreviewProps) 
{
  const videoRef: any = useRef(null);
  const [video, setVideo] = useState<Video | null>(null);
  const router = useRouter();
  useEffect(() => 
  {
    axios.get(`${HOST_DNS}:3001/video/post/${props.postId}`).then((response) => 
    {
      setVideo(response.data.data);
    });
  }, [props.postId]);

  // useEffect(() =>
  // {
  //   if (videoRef.current)
  //   {
  //     if (!videoRef.current.paused)
  //     {
  //       videoRef.current.pause();
  //     }
  //   }
  // }, [videoRef]);

  if (!video) 
  {
    return null;
  }

  return (
    <div className='rounded-[4px] h-60 bg-black justify-center flex'>
      <video
        onClick={() => 
        {
          router.push(`/video/${props.postId}`);
        }}
        ref={videoRef}
        className='w-36 cursor-pointer '
        src={video.url}
        playsInline
        onPlay={(event) => 
        {
          event.preventDefault();
          return;
        }}
      />
    </div>
  );
}
