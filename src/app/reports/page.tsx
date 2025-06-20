
"use client";
import { Header } from "@/components/layout/header";
import { IncomeExpenseChart } from "@/components/charts/income-expense-chart";
import { CategoryPieChart } from "@/components/charts/category-pie-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import type { PieChartEntry } from "@/lib/types";
import { transactionCategories } from "@/lib/types";
import { MONTH_NAMES } from "@/lib/constants";


const generateMockSpendingData = (): PieChartEntry[] => {
  const categories = transactionCategories.filter(c => c !== 'Salary' && c !== 'Freelance' && c !== 'Investment'); // Exclude income categories
  const numCategories = Math.floor(Math.random() * 5) + 3; // 3 to 7 categories
  const selectedCategories = categories.sort(() => 0.5 - Math.random()).slice(0, numCategories);
  
  return selectedCategories.map((category, index) => ({
    name: category,
    value: Math.floor(Math.random() * 500) + 50, // Random spending between 50 and 550
    // fill is typically set by the chart component using chartConfig
  }));
};

const generateMockSavingsData = (): PieChartEntry[] => {
  const savedAmount = Math.floor(Math.random() * 4000) + 500;
  const goalAmount = 5000;
  const remainingGoal = Math.max(0, goalAmount - savedAmount);

  return [
    { name: "Amount Saved", value: savedAmount },
    { name: "Remaining Goal", value: remainingGoal },
  ];
};


export default function ReportsPage() {
  const [spendingData, setSpendingData] = useState<PieChartEntry[]>([]);
  const [savingsData, setSavingsData] = useState<PieChartEntry[]>([]);

  useEffect(() => {
    setSpendingData(generateMockSpendingData());
    setSavingsData(generateMockSavingsData());
  }, []);

  const spendingChartConfig = {
    value: { label: "Amount" },
    ...spendingData.reduce((acc, entry, index) => {
      acc[entry.name] = {
        label: entry.name,
        color: `hsl(var(--chart-${(index % 5) + 1}))`, // Cycle through 5 chart colors
      };
      return acc;
    }, {} as any) 
  };
  
  const savingsChartConfig = {
    value: { label: "Amount" },
    "Amount Saved": { label: "Amount Saved", color: "hsl(var(--chart-1))" },
    "Remaining Goal": { label: "Remaining Goal", color: "hsl(var(--chart-2))" },
  };


  return (
    <>
      <Header title="Financial Reports" />
      <main className="flex-1 p-4 md:p-8 space-y-6 bg-background">
        <IncomeExpenseChart />
        
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline"><Zap className="text-accent" /> Spending Habits</CardTitle>
              <CardDescription>Breakdown of your expenses by category for the current period.</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[300px] sm:min-h-[350px] flex items-center justify-center">
              {spendingData.length > 0 ? (
                <CategoryPieChart data={spendingData} config={spendingChartConfig} />
              ) : (
                <p className="text-muted-foreground">Loading spending data...</p>
              )}
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline"><PiggyBank className="text-primary" /> Savings Analysis</CardTitle>
              <CardDescription>Track your progress towards your primary savings goal.</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[300px] sm:min-h-[350px] flex items-center justify-center">
               {savingsData.length > 0 ? (
                <CategoryPieChart data={savingsData} config={savingsChartConfig} />
              ) : (
                <p className="text-muted-foreground">Loading savings data...</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
