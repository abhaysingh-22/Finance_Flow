import type { LucideIcon } from 'lucide-react';

export type TransactionCategory = 
  | 'Salary' 
  | 'Groceries' 
  | 'Rent' 
  | 'Utilities' 
  | 'Transportation'
  | 'Healthcare'
  | 'Entertainment' 
  | 'Dining Out'
  | 'Shopping'
  | 'Freelance' 
  | 'Investment' 
  | 'Gifts'
  | 'Education'
  | 'Travel'
  | 'Other';

export const transactionCategories: TransactionCategory[] = [
  'Salary', 'Groceries', 'Rent', 'Utilities', 'Transportation', 'Healthcare',
  'Entertainment', 'Dining Out', 'Shopping', 'Freelance', 'Investment', 'Gifts',
  'Education', 'Travel', 'Other'
];

export type Transaction = {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: TransactionCategory;
};

export type Budget = {
  id: string;
  category: TransactionCategory;
  allocated: number;
  spent: number;
  month: Date; 
};

export type SummaryData = {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative';
  bgColorClass?: string; 
  textColorClass?: string; 
  iconColorClass?: string;
};

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}
