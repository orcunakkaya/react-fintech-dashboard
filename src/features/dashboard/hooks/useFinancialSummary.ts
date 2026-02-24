import { useQuery } from "@tanstack/react-query";
import { getFinancialSummary } from "../api/dashboard.api";

export function useFinancialSummary() {
  return useQuery({
    queryKey: ["dashboard", "financial-summary"],
    queryFn: getFinancialSummary,
  });
}