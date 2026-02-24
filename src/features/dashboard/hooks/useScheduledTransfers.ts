import { useQuery } from "@tanstack/react-query";
import { getScheduledTransfers } from "../api/dashboard.api";

export function useScheduledTransfers() {
  return useQuery({
    queryKey: ["dashboard", "scheduled-transfers"],
    queryFn: getScheduledTransfers,
  });
}