import useSWR from "swr";
import { getUserProfile } from "@/services/user";

export function useUserInfo() {
  const { data, error, isLoading } = useSWR("/api/auth/profile", getUserProfile);
  const user = data && !data.statusCode ? data : null;
  return { user, error, isLoading };
}
