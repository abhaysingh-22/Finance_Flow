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
import { cn } from "@/lib/utils";

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-US', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
};

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

  return (
    <Card className={cn(
      "shadow-lg transition-all duration-300",
      "border border-gray-200 dark:border-gray-800"
    )}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              {transactions.length === 0
                ? "No recent transactions to display."
                : "A quick look at your latest financial activities."}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <ScrollArea className="h-[300px] md:h-[400px] custom-scrollbar">
            {transactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4 text-center p-4">
                <p className="text-muted-foreground text-sm">
                  No transactions found. Start adding your financial activities to see them here.
                </p>
              </div>
            ) : (
              <>
                <div className="md:hidden space-y-3">
                  {transactions.map((transaction) => (
                    <Card key={transaction.id} className="p-4 border border-gray-200 dark:border-gray-800">
                      <div className="flex justify-between items-start mb-2">
                        <div className="space-y-1">
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(transaction.date, "MMM dd, yyyy")}
                          </p>
                        </div>
                        <p className={cn(
                          "font-semibold text-right",
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        )}>
                          {transaction.type === 'income' ? '+' : '-'}
                          {formatCurrency(transaction.amount)}
                        </p>
                      </div>
                      <Badge variant="outline" className="capitalize text-xs">
                        {transaction.category}
                      </Badge>
                    </Card>
                  ))}
                </div>

                <div className="hidden md:block">
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
                          <TableCell className={cn(
                            "text-right font-semibold whitespace-nowrap",
                            transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                          )}>
                            {transaction.type === 'income' ? '+' : '-'}
                            {formatCurrency(transaction.amount)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
