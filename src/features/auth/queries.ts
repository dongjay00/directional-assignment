import { useMutation } from "@tanstack/react-query";
import { login } from "@/apis/auth/api";
import { useAuthStore } from "@/features/auth/store";

export const useLoginMutation = () => {
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setSession(data.token, data.user);
    },
  });
};
