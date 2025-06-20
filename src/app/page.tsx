"use client"; // Required because we use hooks like useState for mock data
import { Header } from "@/components/layout/header";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { RecentTransactionsTable } from "@/components/dashboard/recent-transactions-table";
import type { SummaryData } from "@/lib/types";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

const initialSummaryData: SummaryData[] = [
  { title: "Total Balance", value: "$0.00", icon: Wallet, bgColorClass: "bg-primary", textColorClass: "text-primary-foreground", iconColorClass: "text-primary-foreground/80" },
  { title: "Total Income (Month)", value: "$0.00", icon: TrendingUp, change: "+0%", changeType: "positive" },
  { title: "Total Expenses (Month)", value: "$0.00", icon: TrendingDown, change: "+0%", changeType: "positive" },
  { title: "Savings Goal Progress", value: "0%", icon: DollarSign },
];

export default function DashboardPage() {
  const [summaryData, setSummaryData] = useState<SummaryData[]>(initialSummaryData);
  const [userName, setUserName] = useState<string>("User");

  useEffect(() => {
    // Simulate data fetching or dynamic generation
    const mockBalance = (Math.random() * 10000 + 5000).toFixed(2);
    const mockIncome = (Math.random() * 5000 + 1000).toFixed(2);
    const mockExpenses = (Math.random() * 3000 + 500).toFixed(2);
    const mockSavingsProgress = Math.floor(Math.random() * 100);

    const incomeChange = (Math.random() * 10).toFixed(1);
    const expenseChange = (Math.random() * 5).toFixed(1);


    setSummaryData([
      { title: "Total Balance", value: `$${parseFloat(mockBalance).toLocaleString()}`, icon: Wallet, bgColorClass: "bg-primary", textColorClass: "text-primary-foreground", iconColorClass: "text-primary-foreground/70" },
      { title: "Total Income (This Month)", value: `$${parseFloat(mockIncome).toLocaleString()}`, icon: TrendingUp, change: `+${incomeChange}% from last month`, changeType: "positive" },
      { title: "Total Expenses (This Month)", value: `$${parseFloat(mockExpenses).toLocaleString()}`, icon: TrendingDown, change: `+${expenseChange}% from last month`, changeType: "positive" }, // typically an increase in expense is negative, but wording "from last month" can be neutral
      { title: "Savings Goal Progress", value: `${mockSavingsProgress}%`, icon: DollarSign, change: `Target: $5,000`, changeType: "positive" },
    ]);
    
    // Simulate fetching user name
    setUserName("Alex"); 
  }, []);


  return (
    <>
      <Header title="Dashboard" />
      <main className="flex-1 p-4 md:p-8 space-y-6 bg-background overflow-auto">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground font-headline">Welcome back, {userName}!</h2>
          <p className="text-muted-foreground">Here's your financial overview for today.</p>
        </div>

        <section aria-labelledby="financial-summary">
          <h3 id="financial-summary" className="sr-only">Financial Summary</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {summaryData.map((data) => (
              <SummaryCard key={data.title} {...data} />
            ))}
          </div>
        </section>
        
        <section aria-labelledby="recent-activity">
           <h3 id="recent-activity" className="sr-only">Recent Activity</h3>
          <RecentTransactionsTable />
        </section>

      </main>
    </>
  );
}
