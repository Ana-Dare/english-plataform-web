export interface CreateClassParams {
  name: string;
  level_id: number;
  vip: boolean;
  status: "active" | "inactive";
}

export interface Class extends CreateClassParams {
  id: number;
  created_at?: string;
  updated_at?: string;
}

export interface ListClassesRes {
  classes: Class[];
}

export interface CreateClassRes {
  id: number;
  message: string;
}
