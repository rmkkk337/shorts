export interface Account {
  id: string | undefined;
  username: string;
  avatarUrl: string;
  subscribers: string[];
  subscribtions: string[];
  followed: boolean;
  description: string;
  chats: string[];
  isAdmin: boolean;
}

export type Comments = {
  comment: Comment;
  user: Account;
};

export type Comment = {
  id: string;
  creatorId: string;
  text: string;
};
