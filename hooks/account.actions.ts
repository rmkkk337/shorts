import { create } from 'zustand';

export const useAccountData = create((set) => ({
  data: null,
  clearAccountData: () => 
  {
    set({ data: null });
  },
  setAccountData: (data: Object) => 
  {
    set({ data: data });
  },
}));

interface FirstLoadProps {
  firstLoad: boolean;
  // eslint-disable-next-line no-unused-vars
  setFirstLoad: (value: boolean) => void;
}

export const useFirstLoad = create<FirstLoadProps>((set) => ({
  firstLoad: true,
  setFirstLoad: (value: boolean) => 
  {
    set({ firstLoad: value });
  },
}));
