import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogClose } from '@/components/ui/dialog';
import { deletePost } from '@/controllers/posts.controller';
import i18n from '@/lib/i18n';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  username: string;
  postId: string;
};

export default function DeleteConfirm(props: Props) 
{
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger className='flex items-center gap-2 outline-none border-none text-red-500 cursor-pointer hover:underline relative top-[-16px] font-medium'>
        <Trash size={20} />
        {i18n.t('delete.title')}
      </DialogTrigger>
      <DialogContent className='pb-0'>
        <DialogHeader>
          <DialogTitle className='mb-3 select-none'>{i18n.t('delete.confirm')}</DialogTitle>
        </DialogHeader>
        <p className='text-zinc-500 font-medium relative top-[-16px] text-sm'>{i18n.t('delete.alert', { username: props.username })}</p>
        <div className='flex mb-3 justify-end gap-2'>
          <DialogClose>
            <Button variant='outline'>{i18n.t('delete.cancel')}</Button>
          </DialogClose>
          <DialogClose>
            <Button
              onClick={() => 
              {
                deletePost(props.postId).then(() => 
                {
                  router.push('/fyp');
                });
              }}
              className='bg-red-500 hover:bg-red-500/90'
            >
              {i18n.t('delete.title')}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
