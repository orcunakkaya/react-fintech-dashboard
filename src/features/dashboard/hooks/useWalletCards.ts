import { useQuery } from "@tanstack/react-query";
import { getWalletCards } from "../api/dashboard.api";

export function useWalletCards() {
  return useQuery({
    queryKey: ["dashboard", "wallet-cards"],
    queryFn: getWalletCards,
  });
}