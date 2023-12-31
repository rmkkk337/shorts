'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FilledPauseIcon, FilledPlayIcon, Muted, Playing } from './icons/icons';
import '@/components/player.css';
import { Slider } from './ui/slider';
import useOnScreen from '@/hooks/isVisible';
import { getStorageVolume, setStorageVolume } from '@/common/player';
import { VideoIdStore, useVideoId } from '@/hooks/account.actions';

type Props = {
  src?: string;
  videoID?: string;
  upload?: boolean;
};

export const PlaceholderVideo = () => 
{
  return <div className='rounded-sm bg-zinc-300 w-64 h-[460px]'></div>;
};

export const Player: React.FC<Props> = ({ src, videoID, upload }) => 
{
  const [playing, setPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(40);
  const [muted, setMuted] = useState<boolean>(false);
  const [lastMutedVolume, setLastVolumeMuted] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisible = useOnScreen(videoRef, 1);
  const videoStore: VideoIdStore = useVideoId();
  const mobileDevice = (): boolean => 
  {
    if (window.clientInformation.userAgent.includes('Android') || window.clientInformation.userAgent.includes('iPhone')) 
    {
      try 
      {
        document.createEvent('TouchEvent');
        return true;
      }
      catch 
      {
        return false;
      }
    }
    return false;
  };

  const playbackHandler = () => 
  {
    if (videoRef.current == null) return;

    if (videoRef.current.paused) 
    {
      videoRef.current.play();
      setPlaying(true);
    }
    else 
    {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const mutedHandler = () => 
  {
    if (videoRef.current == null) return;

    if (videoRef.current.muted) 
    {
      videoRef.current.muted = false;
      setMuted(false);
      if (lastMutedVolume === 0) 
      {
        setVolume(20);
        return;
      }
      setVolume(lastMutedVolume);
    }
    else if (videoRef.current.muted === false) 
    {
      videoRef.current.muted = true;
      setMuted(true);
      setLastVolumeMuted(volume);
      setVolume(0);
    }
  };

  const volumeHandler = (event: number[]) => 
  {
    if (volume > 0 && videoRef.current) 
    {
      setMuted(false);
      videoRef.current.muted = false;
    }
    setVolume(event[0]);
  };

  useEffect(() => 
  {
    if (upload && videoRef.current) 
    {
      try 
      {
        videoRef.current.play();
      }
      catch 
      {
        //
      }
      setPlaying(!videoRef.current.paused);
      return;
    }
    if (isVisible && videoRef.current) 
    {
      if (videoID && videoRef.current.paused && !videoStore.isPlaying && videoStore.videoID == '') 
      {
        videoStore.setVideoID(videoID);
        videoStore.setIsPlaying(true);
        try 
        {
          videoRef.current.play();
        }
        catch 
        {
          //
        }
        setPlaying(!videoRef.current.paused);
      }
    }
    else 
    {
      if (videoStore.videoID === videoID) 
      {
        videoStore.setVideoID('');
      }
      videoStore.setIsPlaying(false);
      setPlaying(false);
      if (videoRef.current == null) return;
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isVisible]);

  useEffect(() => 
  {
    if (videoRef.current == null) return;
    videoRef.current.volume = volume / 100;

    if (videoRef.current.volume === 0) 
    {
      videoRef.current.muted = true;
      setMuted(true);
    }
    else 
    {
      setMuted(false);
      videoRef.current.muted = false;
    }

    if (volume == 40) return;
    setStorageVolume(volume);
  }, [volume]);

  useEffect(() => 
  {
    const vol = getStorageVolume();
    setVolume(vol);
  }, [playing]);

  if (src == undefined) 
  {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => 
  {
    if (videoRef.current == null) return;
    const localRef = videoRef.current;

    localRef.addEventListener('loadeddata', () => 
    {
      setLoaded(true);
    });

    return () => 
    {
      if (localRef == null) return;

      localRef.removeEventListener('loadeddata', () => 
      {});
    };
  }, []);

  return (
    <div className='flex items-center justify-center'>
      <div className='video-container bg-black rounded-md min-w-[280px] min-h-[480px]'>
        <div className='video-controls-container flex w-full items-center justify-between'>
          <div className={`play-pause-button ${mobileDevice() ? 'mr-[150%]' : 'mr-[80%]'}`}>
            {playing ? (
              <div
                onClick={() => 
                {
                  playbackHandler();
                }}
              >
                <FilledPauseIcon />
              </div>
            ) : (
              <div
                onClick={() => 
                {
                  playbackHandler();
                }}
              >
                <FilledPlayIcon />
              </div>
            )}
          </div>
          <div className='video-volume flex'>
            <div className='mute-button mr-3'>
              {muted ? (
                <div
                  onClick={() => 
                  {
                    mutedHandler();
                  }}
                >
                  <Muted />
                </div>
              ) : (
                <div
                  onClick={() => 
                  {
                    mutedHandler();
                  }}
                >
                  <Playing />
                </div>
              )}
            </div>
            {!mobileDevice() && (
              <Slider
                defaultValue={[volume]}
                className='w-20'
                value={[volume]}
                max={100}
                onValueChange={(e) => 
                {
                  volumeHandler(e);
                }}
              />
            )}
          </div>
        </div>
        {loaded ? null : <PlaceholderVideo />}
        <video playsInline preload='auto' ref={videoRef} className={`video-video ${loaded && 'fadeInVideo'}`} src={src} autoPlay loop></video>
      </div>
    </div>
  );
};
