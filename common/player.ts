'use client';

export const setStorageVolume = (value: number) => 
{
  localStorage.setItem('volume', value.toString());
};

export const getStorageVolume = () => 
{
  const volume = localStorage.getItem('volume');
  if (!volume) return 40;

  return volume ? parseInt(volume) : 0;
};
