export interface User {
  id: number;
  email: string;
  is_admin: boolean;
  username: string;
  created_at: string;
  user_task_image_count: number;
  user_task_image_remain_count: number;
}

export interface CurUser {
  id?: number;
  email?: string;
  username: string;
  password: string;
  is_admin: boolean;
}
