"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Transaction } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockTransactions: Transaction[] = [
  { id: "1", date: new Date(2024, 5, 28), description: "Salary Deposit", amount: 5000, type: "income", category: "Salary" },
  { id: "2", date: new Date(2024, 5, 28), description: "Groceries", amount: 75.50, type: "expense", category: "Groceries" },
  { id: "3", date: new Date(2024, 5, 27), description: "Netflix Subscription", amount: 15.99, type: "expense", category: "Entertainment" },
  { id: "4", date: new Date(2024, 5, 26), description: "Freelance Project A", amount: 1200, type: "income", category: "Freelance" },
  { id: "5", date: new Date(2024, 5, 25), description: "Dinner with Friends", amount: 60.00, type: "expense", category: "Dining Out" },
  { id: "6", date: new Date(2024, 5, 24), description: "Rent Payment", amount: 1500.00, type: "expense", category: "Rent" },
  { id: "7", date: new Date(2024, 5, 23), description: "Gas Bill", amount: 85.20, type: "expense", category: "Utilities" },
];


export function RecentTransactionsTable() {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  React.useEffect(() => {
    // In a real app, you'd fetch this data.
    // For hydration safety with dates, we set it in useEffect.
    setTransactions(mockTransactions);
  }, []);

  if (transactions.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>No recent transactions to display.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>A quick look at your latest financial activities.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] md:h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{format(transaction.date, "MMM dd, yyyy")}</TableCell>
                  <TableCell className="font-medium">{transaction.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">{transaction.category}</Badge>
                  </TableCell>
                  <TableCell className={`text-right font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
