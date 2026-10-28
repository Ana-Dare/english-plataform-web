export interface IUserProfile {
  studentId: number | null;
  levelId: number | null;
  classId: number | null;
  vip: boolean;
  notes: string | null;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  birthdate: string | null;
  active: boolean;
  role: "student" | "teacher" | "admin";
  avatar_url: string | null;
  createdAt: string;
  profile: IUserProfile | null;
}

export interface GetMeRes {
  user: IUser;
}

export interface UpdateUserParams {
  name?: string;
  email?: string;
  phone?: string | null;
  birthdate?: string | null;
}

export interface UpdateUserRes {
  message: string;
  user: IUser;
}

export interface UpdateProfileImageRes {
  message: string;
  avatar_url: string;
}
