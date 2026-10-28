import { api } from "./api";
import type {
  GetMeRes,
  IUser,
  UpdateProfileImageRes,
  UpdateUserParams,
  UpdateUserRes,
} from "../interfaces/users";

export async function getMe(): Promise<IUser> {
  const res = await api.get<GetMeRes>("/users/me");
  return res.data.user;
}

export async function updateUser(
  userId: number,
  params: UpdateUserParams,
): Promise<IUser> {
  const res = await api.patch<UpdateUserRes>(`/users/${userId}`, params);
  return res.data.user;
}

export async function updateProfileImage(
  userId: number,
  file: File,
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.post<UpdateProfileImageRes>(
    `/users/${userId}/image`,
    formData,
  );
  return res.data.avatar_url;
}
