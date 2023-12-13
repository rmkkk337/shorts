type Comment = {
  id: string;
  creatorId: string;
  text: string;
};

export type Video = {
  comments: Comment[];
  creatorId: string;
  description: string;
  id: string;
  likes: string[];
  shares: number;
  url: string;
};
