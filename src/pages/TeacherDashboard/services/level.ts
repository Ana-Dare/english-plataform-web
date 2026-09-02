import type { ListLevelRes } from "../../../interfaces/levels";
import { api } from "../../../services/api";

export async function listLevels(): Promise<ListLevelRes> {
  const res = await api.get<ListLevelRes>("/levels");

  return res.data ?? { levels: [] };
}
