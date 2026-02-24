import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/auth.api";
import { tokenStorage } from "../store/auth.token";

export function useProfile() {
  const token = tokenStorage.get();

  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: !!token, // token yoksa istek atma
    retry: 1,
  });
}