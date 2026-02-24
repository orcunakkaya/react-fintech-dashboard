import { http } from "@/shared/lib/http";
import type {
  FinancialSummaryResponse,
  WorkingCapitalResponse,
  WalletResponse,
  RecentTransactionsResponse,
  ScheduledTransfersResponse,
} from "../types/dashboard.types";

export async function getFinancialSummary() {
  const res = await http.get<FinancialSummaryResponse>("/financial/summary");
  return res.data;
}

export async function getWorkingCapital() {
  const res = await http.get<WorkingCapitalResponse>("/financial/working-capital");
  return res.data;
}

export async function getWalletCards() {
  const res = await http.get<WalletResponse>("/wallet");
  return res.data;
}

export async function getRecentTransactions() {
  const res = await http.get<RecentTransactionsResponse>("/financial/transactions/recent");
  return res.data;
}

export async function getScheduledTransfers() {
  const res = await http.get<ScheduledTransfersResponse>("/financial/transfers/scheduled");
  return res.data;
}