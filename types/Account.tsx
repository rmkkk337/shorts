export interface Account {
  id: string | undefined;
  username: string;
  avatarUrl: string;
  subscribers: string[];
  subscribtions: string[];
  followed: boolean;
  description: string;
}

export type Comment = {
  id: string;
  creatorId: string;
  text: string;
};
