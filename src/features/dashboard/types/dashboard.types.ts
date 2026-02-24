export type Trend = "up" | "down";

export type MoneyChange = {
  percentage: number;
  trend: Trend;
};

export type Money = {
  amount: number;
  currency: string;
  change?: MoneyChange;
};

export type FinancialSummaryResponse = {
  success: boolean;
  message: string;
  data: {
    totalBalance: Money;
    totalExpense: Money;
    totalSavings: Money;
    lastUpdated: string;
  };
};

export type WorkingCapitalItem = {
  month: string;
  income: number;
  expense: number;
  net: number;
};

export type WorkingCapitalResponse = {
  success: boolean;
  message: string;
  data: {
    period: string;
    currency: string;
    data: WorkingCapitalItem[];
    summary: {
      totalIncome: number;
      totalExpense: number;
      netBalance: number;
    };
  };
};

export type WalletCard = {
  id: string;
  name: string;
  type: "credit" | "debit" | string;
  cardNumber: string;
  bank: string;
  network: string;
  expiryMonth: number;
  expiryYear: number;
  color: string;
  isDefault: boolean;
};

export type WalletResponse = {
  success: boolean;
  message: string;
  data: {
    cards: WalletCard[];
  };
};

export type TransactionStatus = "completed" | "pending" | "failed" | string;

export type RecentTransaction = {
  id: string;
  name: string;
  business: string;
  image: string;
  type: string;
  amount: number;
  currency: string;
  date: string;
  status: TransactionStatus;
};

export type RecentTransactionsResponse = {
  success: boolean;
  message: string;
  data: {
    transactions: RecentTransaction[];
    summary: {
      totalIncome: number;
      totalExpense: number;
      count: number;
    };
  };
};

export type ScheduledTransfer = {
  id: string;
  name: string;
  image: string;
  date: string;
  amount: number;
  currency: string;
  status: "scheduled" | string;
};

export type ScheduledTransfersResponse = {
  success: boolean;
  message: string;
  data: {
    transfers: ScheduledTransfer[];
    summary: {
      totalScheduledAmount: number;
      count: number;
    };
  };
};