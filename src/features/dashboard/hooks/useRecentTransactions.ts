import { useQuery } from "@tanstack/react-query";
import { getRecentTransactions } from "../api/dashboard.api";

export function useRecentTransactions() {
  return useQuery({
    queryKey: ["dashboard", "recent-transactions"],
    queryFn: getRecentTransactions,
  });
}