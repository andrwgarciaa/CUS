export declare interface IPost {
  id?: string;
  title: string;
  body: string;
  created_at: Date;
  updated_at?: Date | undefined;
  upvote: number;
  downvote: number;
  user_id: string | undefined;
}

export declare interface IComment {
  id?: string;
  body: string;
  created_at: Date;
  updated_at?: Date | undefined;
  upvote: number;
  downvote: number;
  post_id: string | undefined;
  user_id: string | undefined;
}
