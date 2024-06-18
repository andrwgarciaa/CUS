export declare interface ICommunityActivity {
  id?: string;
  name: string;
  motto: string;
  description: string;
  type_id: number;
  category_id: number;
  member_count?: number | null;
  has_photo?: boolean;
  pos_x: number;
  pos_y: number;
}
