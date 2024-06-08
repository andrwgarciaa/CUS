export declare interface IPost {
  id?: string;
  title: string;
  body: string;
  created_at: Date;
  updated_at?: Date | undefined;
  upvote: number;
  downvote: number;
  user_id: string | undefined;
  comments?: number;
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

export declare interface IVote {
  id?: string;
  post_id?: string | undefined;
  comment_id?: string;
  user_id: string | undefined;
  type: string;
  created_at?: Date;
}
