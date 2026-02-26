import { http } from "@/shared/lib/http";
import type {
  FinancialSummaryResponse,
  WorkingCapitalResponse,
  WalletResponse,
  RecentTransactionsResponse,
  ScheduledTransfersResponse,
  ApiResponse
} from "../types/dashboard.types";

export async function getFinancialSummary(): Promise<FinancialSummaryResponse> {
  const res = await http.get<ApiResponse<FinancialSummaryResponse>>("/financial/summary");
  return res.data.data;
}

export async function getWorkingCapital(): Promise<WorkingCapitalResponse> {
  const res = await http.get<ApiResponse<WorkingCapitalResponse>>("/financial/working-capital");
  return res.data.data;
}

export async function getWalletCards(): Promise<WalletResponse> {
  const res = await http.get<ApiResponse<WalletResponse>>("/financial/wallet");
  return res.data.data;
}

export async function getRecentTransactions(): Promise<RecentTransactionsResponse> {
  const res = await http.get<ApiResponse<RecentTransactionsResponse>>("/financial/transactions/recent");
  return res.data.data;
}

export async function getScheduledTransfers(): Promise<ScheduledTransfersResponse> {
  const res = await http.get<ApiResponse<ScheduledTransfersResponse>>("/financial/transfers/scheduled");
  return res.data.data;
}