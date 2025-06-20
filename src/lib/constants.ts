import type { NavItem, TransactionCategory } from '@/lib/types';
import { LayoutDashboard, TrendingUp, TrendingDown, BarChart3, Target, Settings } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Income', href: '/income', icon: TrendingUp },
  { label: 'Expenses', href: '/expenses', icon: TrendingDown },
  { label: 'Reports', href: '/reports', icon: BarChart3 },
  { label: 'Budgets', href: '/budgets', icon: Target },
];

export const CATEGORIES_CONFIG: Record<TransactionCategory, { icon?: LucideIcon, color?: string }> = {
  'Salary': { color: 'text-green-500' },
  'Groceries': { color: 'text-orange-500' },
  'Rent': { color: 'text-red-500' },
  'Utilities': { color: 'text-blue-500' },
  'Transportation': { color: 'text-purple-500' },
  'Healthcare': { color: 'text-pink-500' },
  'Entertainment': { color: 'text-yellow-500' },
  'Dining Out': { color: 'text-teal-500' },
  'Shopping': { color: 'text-indigo-500' },
  'Freelance': { color: 'text-lime-500' },
  'Investment': { color: 'text-cyan-500' },
  'Gifts': { color: 'text-rose-500' },
  'Education': { color: 'text-sky-500' },
  'Travel': { color: 'text-amber-500' },
  'Other': { color: 'text-gray-500' },
};

export const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
