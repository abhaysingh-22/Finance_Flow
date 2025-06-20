"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Budget, TransactionCategory } from "@/lib/types";
import { transactionCategories } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { DatePicker } from "../ui/date-picker"; // Assuming DatePicker exists for month selection
import { format, startOfMonth } from 'date-fns';

const budgetFormSchema = z.object({
  category: z.enum(transactionCategories, {
    required_error: "Please select a category.",
  }),
  allocated: z.coerce.number().positive({
    message: "Allocated amount must be a positive number.",
  }),
  month: z.date({
    required_error: "Please select a month for the budget.",
  }),
});

type BudgetFormValues = z.infer<typeof budgetFormSchema>;

interface CreateBudgetDialogProps {
  children: React.ReactNode; // Trigger element
  existingBudget?: Budget | null;
  onSave: (budget: BudgetFormValues, id?: string) => void;
}

export function CreateBudgetDialog({ children, existingBudget, onSave }: CreateBudgetDialogProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = React.useState(false);

  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: existingBudget
      ? { category: existingBudget.category, allocated: existingBudget.allocated, month: startOfMonth(existingBudget.month) }
      : { allocated: 0, month: startOfMonth(new Date()) },
  });
  
  React.useEffect(() => {
    if (isOpen) {
      form.reset(
        existingBudget
          ? { category: existingBudget.category, allocated: existingBudget.allocated, month: startOfMonth(existingBudget.month) }
          : { category: undefined, allocated: 0, month: startOfMonth(new Date()) }
      );
    }
  }, [isOpen, existingBudget, form]);


  function onSubmit(values: BudgetFormValues) {
    onSave(values, existingBudget?.id);
    toast({
      title: `Budget ${existingBudget ? 'Updated' : 'Created'}!`,
      description: `Budget for ${values.category} successfully ${existingBudget ? 'updated' : 'created'}.`,
    });
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">{existingBudget ? "Edit Budget" : "Create New Budget"}</DialogTitle>
          <DialogDescription>
            {existingBudget ? "Update the details for this budget." : "Set a new monthly budget for a specific category."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Month</FormLabel>
                  <DatePicker
                    date={field.value}
                    setDate={field.onChange}
                    placeholder="Select budget month"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {transactionCategories.map((category) => (
                        <SelectItem key={category} value={category} className="capitalize">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="allocated"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allocated Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} step="0.01" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                 <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">{existingBudget ? "Save Changes" : "Create Budget"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
