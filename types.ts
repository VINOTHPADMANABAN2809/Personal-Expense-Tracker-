
export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  type: TransactionType;
  date: string; // ISO string format: "YYYY-MM-DD"
  description?: string;
  isRecurring?: boolean;
  recurrence?: 'monthly'; // Extended for weekly, yearly etc. in the future
  budgetScope?: 'all' | 'monthly' | 'weekly' | 'none'; // 'all' is default for both, 'monthly' or 'weekly' for one, 'none' to exclude.
}

export type FilterType = 'all' | TransactionType.INCOME | TransactionType.EXPENSE;