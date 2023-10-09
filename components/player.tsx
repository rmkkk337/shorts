'use client';

import { useEffect, useRef, useState } from 'react';
import { FilledPauseIcon, FilledPlayIcon, Muted, Playing } from './icons/icons';
import '@/components/player.css';
import { Slider } from './ui/slider';
import useOnScreen from '@/hooks/isVisible';
import { getStorageVolume, setStorageVolume } from '@/lib/volume.localStorage';

export const Player = (video: any) => {
  const [playing, setPlaying] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(40);
  const [muted, setMuted] = useState<boolean>(false);
  const [lastMutedVolume, setLastVolumeMuted] = useState<number>(0);

  const videoRef = useRef<any>(null);
  const isVisible = useOnScreen(videoRef, 0.5);

  const playbackHandler = () => {
    if (videoRef.current == null) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const mutedHandler = () => {
    if (videoRef.current == null) return;

    if (videoRef.current.muted) {
      videoRef.current.muted = false;
      setMuted(false);
      setVolume(lastMutedVolume);
    } else if (videoRef.current.muted === false) {
      videoRef.current.muted = true;
      setMuted(true);
      setLastVolumeMuted(volume);
      setVolume(0);
    }
  };

  const volumeHandler = (event: any) => {
    if (volume > 0) {
      setMuted(false);
      videoRef.current.muted = false;
    }
    setVolume(event[0]);
  };

  useEffect(() => {
    if (isVisible) {
      setPlaying(true);
      videoRef.current.play();
    } else {
      setPlaying(false);
      videoRef.current.pause();
    }
  }, [isVisible]);

  useEffect(() => {
    if (videoRef.current == null) return;
    videoRef.current.volume = volume / 100;

    if (videoRef.current.volume === 0) {
      videoRef.current.muted = true;
      setMuted(true);
    } else {
      setMuted(false);
      videoRef.current.muted = false;
    }

    if (volume == 40) return;
    setStorageVolume(volume);
  }, [volume]);

  useEffect(() => {
    const vol = getStorageVolume();
    setVolume(vol);
  }, [playing]);

  return (
    <div className='flex items-center justify-center'>
      <div className='video-container'>
        <div className='video-controls-container flex w-full items-center'>
          <div className='play-pause-button'>
            {playing ? (
              <div
                onClick={() => {
                  playbackHandler();
                }}
              >
                <FilledPauseIcon />
              </div>
            ) : (
              <div
                onClick={() => {
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
                  onClick={() => {
                    mutedHandler();
                  }}
                >
                  <Muted />
                </div>
              ) : (
                <div
                  onClick={() => {
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
              onValueChange={(e) => {
                volumeHandler(e);
              }}
            />
          </div>
        </div>
        <video ref={videoRef} className='video-video' src={video.src} autoPlay loop></video>
      </div>
    </div>
  );
};
