"use client";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Legend as RechartsLegend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { MONTH_NAMES } from "@/lib/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const generateMockMonthlyData = (numMonths: number) => {
  return Array.from({ length: numMonths }, (_, i) => {
    const monthIndex = (new Date().getMonth() - (numMonths - 1) + i + 12) % 12; // Ensure monthIndex is positive
    return {
      month: MONTH_NAMES[monthIndex],
      income: Math.floor(Math.random() * 4000) + 1000, // Random income between 1000 and 5000
      expenses: Math.floor(Math.random() * 3000) + 500,  // Random expenses between 500 and 3500
    };
  }).sort((a,b) => MONTH_NAMES.indexOf(a.month) - MONTH_NAMES.indexOf(b.month)); // Sort by month order
};


const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function IncomeExpenseChart() {
  const [chartData, setChartData] = useState(generateMockMonthlyData(6));
  const [timeRange, setTimeRange] = useState("6"); // Default to 6 months

  useEffect(() => {
    setChartData(generateMockMonthlyData(parseInt(timeRange)));
  }, [timeRange]);
  

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <CardTitle className="text-2xl font-headline">Income vs. Expenses Overview</CardTitle>
            <CardDescription>Visualizing your financial flow over time.</CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Last 3 Months</SelectItem>
              <SelectItem value="6">Last 6 Months</SelectItem>
              <SelectItem value="12">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full aspect-video">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                  tickFormatter={(value) => `$${value / 1000}k`}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <RechartsLegend content={<ChartLegendContent />} />
                <Bar dataKey="income" fill="var(--color-income)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-[350px]">
            <p className="text-muted-foreground">No data available for the selected range.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
