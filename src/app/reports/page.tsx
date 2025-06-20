import { Header } from "@/components/layout/header";
import { IncomeExpenseChart } from "@/components/charts/income-expense-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank, Zap } from "lucide-react"; // Example icons

export default function ReportsPage() {
  return (
    <>
      <Header title="Financial Reports" />
      <main className="flex-1 p-4 md:p-8 space-y-6 bg-background">
        <IncomeExpenseChart />
        
        {/* Placeholder for more charts or report sections */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline"><Zap className="text-accent" /> Spending Habits (Placeholder)</CardTitle>
              <CardDescription>Breakdown of your expenses by category.</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px] flex items-center justify-center">
              <p className="text-muted-foreground">Pie chart coming soon!</p>
              <img src="https://placehold.co/300x200.png" alt="Placeholder pie chart" className="mt-4 rounded-md opacity-50" data-ai-hint="pie chart finance" />
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline"><PiggyBank className="text-primary" /> Savings Analysis (Placeholder)</CardTitle>
              <CardDescription>Track your progress towards savings goals.</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px] flex items-center justify-center">
              <p className="text-muted-foreground">Savings progress chart coming soon!</p>
               <img src="https://placehold.co/300x200.png" alt="Placeholder savings chart" className="mt-4 rounded-md opacity-50" data-ai-hint="line graph growth"/>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
