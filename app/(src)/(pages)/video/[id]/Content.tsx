import { Video } from '@/components/Video';
import { HOST_DNS } from '@/lib/conf';
import { Video as VideoType } from '@/types/Video';
import axios from 'axios';

export default async function Content(params: { id: string }) 
{
  const video: VideoType = await axios.get(`${HOST_DNS}:3001/video/post/${params.id}`).then((response) => 
  {
    return response.data.data;
  });

  return (
    <main className='flex'>
      <Video key={video.id} id={video.id} uid={video.creatorId} description={video.description} video={video.url} />
      <div>
        {video.comments.map((comment) => (
          <div key={comment.id} className='bg-black text-white'>
            {JSON.stringify(comment.text)}
          </div>
        ))}
      </div>
    </main>
  );
}
