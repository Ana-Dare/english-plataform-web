import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, updateProfileImage, updateUser } from "../../../services/user";
import type { UpdateUserParams } from "../../../interfaces/users";

export function useStudentProfile() {
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const updateMutation = useMutation({
    mutationFn: (params: UpdateUserParams) =>
      updateUser(profileQuery.data!.id, params),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  const photoMutation = useMutation({
    mutationFn: (file: File) =>
      updateProfileImage(profileQuery.data!.id, file),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  return {
    user: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    updateProfile: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.isError,
    uploadPhoto: photoMutation.mutate,
    isUploadingPhoto: photoMutation.isPending,
    photoError: photoMutation.isError,
  };
}
