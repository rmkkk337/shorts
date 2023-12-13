/* eslint-disable no-unused-vars */
import { Account } from '@/types/Account';
import { create } from 'zustand';

export type AccountStore = {
  clearAccountData: () => void;
  data: Account | null;
  setAccountData: (data: Account) => void;
  setSubscriptions: (data: Account) => void;
};

export const useAccountData = create<AccountStore>((set) => ({
  data: null,
  clearAccountData: () => 
  {
    set({ data: null });
  },
  setAccountData: (data: Account) => 
  {
    set({ data });
  },
  setSubscriptions: (data: Account) => 
  {
    set({
      ...data,
      // @ts-ignore
      subscriptions: data,
    });
  },
}));

export type FirstLoadStore = {
  firstLoad: boolean;
  setFirstLoad: (value: boolean) => void;
};

export const useFirstLoad = create<FirstLoadStore>((set) => ({
  firstLoad: true,
  setFirstLoad: (value: boolean) => 
  {
    set({ firstLoad: value });
  },
}));

export type AccessedPageStore = {
  lastAccessed: string;
  setLastAccessed: (value: string) => void;
};

export const useAccessedPage = create<AccessedPageStore>((set) => ({
  lastAccessed: '/fyp',
  setLastAccessed: (value: string) => 
  {
    set({ lastAccessed: value });
  },
}));
