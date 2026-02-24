import { useQuery } from "@tanstack/react-query";
import { getWorkingCapital } from "../api/dashboard.api";

export function useWorkingCapital() {
  return useQuery({
    queryKey: ["dashboard", "working-capital"],
    queryFn: getWorkingCapital,
  });
}