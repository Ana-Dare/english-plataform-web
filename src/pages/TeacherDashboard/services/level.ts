import type { ILevel, ListLevelRes } from "../../../interfaces/levels";
import { api } from "../../../services/api";

export async function listLevels(): Promise<ListLevelRes> {
  const res = await api.get<ListLevelRes>("/levels");

  return res.data ?? { levels: [] };
}

export async function createLevel(
  name: string,
  description: string = "",
): Promise<ILevel> {
  const res = await api.post<ILevel>("/levels", {
    name,
    description,
  });

  return res.data ?? { id: 0, name: "", description: "" };
}
