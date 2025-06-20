"use client";
import type { Budget } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { CATEGORIES_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BudgetItemCardProps {
  budget: Budget;
  onEdit: (budget: Budget) => void;
  onDelete: (budgetId: string) => void;
}

export function BudgetItemCard({ budget, onEdit, onDelete }: BudgetItemCardProps) {
  const progress = budget.allocated > 0 ? (budget.spent / budget.allocated) * 100 : 0;
  const remaining = budget.allocated - budget.spent;
  const categoryConfig = CATEGORIES_CONFIG[budget.category] || {};

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className={cn("text-xl capitalize font-headline", categoryConfig.color)}>{budget.category}</CardTitle>
            <CardDescription>
              {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(budget.month)}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={() => onEdit(budget)} aria-label={`Edit ${budget.category} budget`}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(budget.id)} aria-label={`Delete ${budget.category} budget`}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm">
          <div className="flex justify-between">
            <span>Spent:</span>
            <span className="font-semibold">${budget.spent.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
          </div>
          <div className="flex justify-between">
            <span>Allocated:</span>
            <span className="font-semibold">${budget.allocated.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
          </div>
           <div className={`flex justify-between font-semibold ${remaining < 0 ? 'text-red-500' : 'text-green-600'}`}>
            <span>Remaining:</span>
            <span>${remaining.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
          </div>
        </div>
        <Progress value={Math.min(progress, 100)} aria-label={`${budget.category} budget progress: ${progress.toFixed(0)}%`} className={progress > 100 ? "[&>div]:bg-destructive" : ""} />
        <div className="text-xs text-muted-foreground text-right">
          {progress.toFixed(0)}% of budget used
        </div>
      </CardContent>
    </Card>
  );
}
