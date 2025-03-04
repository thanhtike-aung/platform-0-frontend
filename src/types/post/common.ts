export interface Post {
  id: number;
  content: string;
  published: boolean;
  author_id: number;
  created_at: Date;
  updates_at: Date;
}
