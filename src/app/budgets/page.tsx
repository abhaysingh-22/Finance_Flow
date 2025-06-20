"use client";
import { Header } from "@/components/layout/header";
import { BudgetItemCard } from "@/components/budgets/budget-item-card";
import { CreateBudgetDialog } from "@/components/budgets/create-budget-dialog";
import { Button } from "@/components/ui/button";
import type { Budget, BudgetFormValues } from "@/lib/types"; // BudgetFormValues is defined in CreateBudgetDialog
import { PlusCircle, Target } from "lucide-react";
import React, { useState, useEffect } from "react";
import { startOfMonth } from 'date-fns';

const initialMockBudgets: Budget[] = [];

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>(initialMockBudgets);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  useEffect(() => {
    // Simulate fetching initial budgets
    const fetchedBudgets: Budget[] = [
      { id: "1", category: "Groceries", allocated: 400, spent: Math.random() * 400, month: startOfMonth(new Date(2024, 5, 1)) },
      { id: "2", category: "Entertainment", allocated: 150, spent: Math.random() * 150, month: startOfMonth(new Date(2024, 5, 1)) },
      { id: "3", category: "Transportation", allocated: 100, spent: Math.random() * 100, month: startOfMonth(new Date(2024, 4, 1)) },
      { id: "4", category: "Dining Out", allocated: 200, spent: Math.random() * 250, month: startOfMonth(new Date(2024, 5, 1)) }, // Example of overspending
    ];
    setBudgets(fetchedBudgets);
  }, []);


  const handleSaveBudget = (data: any, id?: string) => { // data type is BudgetFormValues, but it's defined in dialog
    if (id) {
      setBudgets(budgets.map(b => b.id === id ? { ...b, ...data, spent: b.spent } : b)); // Keep existing spent amount on edit
    } else {
      // For new budget, spent is 0. ID should be unique.
      const newBudget: Budget = { ...data, id: Date.now().toString(), spent: 0 };
      setBudgets([...budgets, newBudget]);
    }
    setEditingBudget(null);
    setIsDialogOpen(false);
  };

  const handleEditBudget = (budget: Budget) => {
    setEditingBudget(budget);
    setIsDialogOpen(true); // Open the dialog for editing
  };
  
  const openCreateDialog = () => {
    setEditingBudget(null); // Ensure we're creating, not editing
    setIsDialogOpen(true);
  }

  const handleDeleteBudget = (budgetId: string) => {
    // Add confirmation dialog in real app
    setBudgets(budgets.filter(b => b.id !== budgetId));
  };
  
  // Filter budgets for current month (example, could be selectable)
  // For now, displaying all budgets
  const displayedBudgets = budgets.sort((a,b) => b.month.getTime() - a.month.getTime());


  return (
    <>
      <Header title="Budgeting Tools" />
      <main className="flex-1 p-4 md:p-8 space-y-6 bg-background">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground font-headline flex items-center">
              <Target className="mr-3 h-7 w-7 text-primary" />
              Monthly Budgets
            </h2>
            <p className="text-muted-foreground">Set goals and track your spending for each category.</p>
          </div>
          
          <CreateBudgetDialog existingBudget={editingBudget} onSave={handleSaveBudget}>
            <Button onClick={openCreateDialog}>
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Budget
            </Button>
          </CreateBudgetDialog>

        </div>

        {displayedBudgets.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedBudgets.map((budget) => (
              <BudgetItemCard 
                key={budget.id} 
                budget={budget} 
                onEdit={handleEditBudget}
                onDelete={handleDeleteBudget}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Target className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Budgets Yet</h3>
            <p className="text-muted-foreground mb-4">Start by creating a new budget to manage your finances.</p>
            <CreateBudgetDialog existingBudget={null} onSave={handleSaveBudget}>
               <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Create Your First Budget
              </Button>
            </CreateBudgetDialog>
          </div>
        )}
      </main>
    </>
  );
}
