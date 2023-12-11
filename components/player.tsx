'use client';

import { useEffect, useRef, useState } from 'react';
import { FilledPauseIcon, FilledPlayIcon, Muted, Playing } from './icons/icons';
import '@/components/player.css';
import { Slider } from './ui/slider';
import useOnScreen from '@/hooks/isVisible';
import { getStorageVolume, setStorageVolume } from '@/lib/volume.localStorage';

export const PlaceholderVideo = () => 
{
  return <div className='rounded-sm bg-zinc-300 w-64 h-[460px]'></div>;
};

export const Player = (video?: any) => 
{
  const [playing, setPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(40);
  const [muted, setMuted] = useState<boolean>(false);
  const [lastMutedVolume, setLastVolumeMuted] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);

  const videoRef = useRef<any>(null);
  const isVisible = useOnScreen(videoRef, 0.9);

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

  const volumeHandler = (event: any) => 
  {
    if (volume > 0) 
    {
      setMuted(false);
      videoRef.current.muted = false;
    }
    setVolume(event[0]);
  };

  useEffect(() => 
  {
    if (isVisible) 
    {
      videoRef.current.play();
      if (!videoRef.current.paused) 
      {
        setPlaying(true);
      }
    }
    else 
    {
      setPlaying(false);
      if (videoRef.current == null) return;
      videoRef.current.pause();
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

  if (video.src == undefined) 
  {
    return <PlaceholderVideo />;
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
      <div className='video-container bg-zinc-200 rounded-md'>
        <div className='video-controls-container flex w-full items-center'>
          <div className='play-pause-button'>
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
          </div>
        </div>
        {loaded ? null : <PlaceholderVideo />}
        <video ref={videoRef} className={`video-video ${loaded && 'fadeInVideo'}`} src={video.src} autoPlay loop></video>
      </div>
    </div>
  );
};
