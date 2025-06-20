"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { TransactionCategory } from "@/lib/types";
import { transactionCategories } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, MinusCircle } from "lucide-react";
import React from "react";


const formSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }).max(100, {
    message: "Description must not exceed 100 characters."
  }),
  amount: z.coerce.number().positive({
    message: "Amount must be a positive number.",
  }),
  category: z.enum(transactionCategories, {
    required_error: "Please select a category.",
  }),
});

type TransactionFormValues = z.infer<typeof formSchema>;

interface TransactionFormProps {
  type: "income" | "expense";
  onSubmitSuccess?: () => void;
}

export function TransactionForm({ type, onSubmitSuccess }: TransactionFormProps) {
  const { toast } = useToast();
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      description: "",
      amount: 0,
    },
  });

  function onSubmit(values: TransactionFormValues) {
    // Simulate API call
    console.log({ type, ...values });
    toast({
      title: `${type === "income" ? "Income" : "Expense"} Added Successfully!`,
      description: (
        <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <p className="text-white">Date: {values.date.toLocaleDateString()}</p>
          <p className="text-white">Description: {values.description}</p>
          <p className="text-white">Amount: ${values.amount.toFixed(2)}</p>
          <p className="text-white">Category: {values.category}</p>
        </div>
      ),
      variant: "default",
    });
    form.reset();
    if (onSubmitSuccess) onSubmitSuccess();
  }

  const title = type === "income" ? "Track New Income" : "Track New Expense";
  const descriptionText = type === "income" ? "Log your earnings and other income sources." : "Record your expenditures and keep track of spending.";
  const buttonText = type === "income" ? "Add Income" : "Add Expense";
  const Icon = type === "income" ? PlusCircle : MinusCircle;

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Icon className={`h-6 w-6 ${type === 'income' ? 'text-green-500' : 'text-red-500'}`} />
          <CardTitle className="text-2xl font-headline">{title}</CardTitle>
        </div>
        <CardDescription>{descriptionText}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <DatePicker date={field.value} setDate={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={type === "income" ? "e.g., Monthly Salary, Freelance Project X" : "e.g., Groceries from SuperMart, Netflix Subscription"}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A brief note about this {type}.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} step="0.01" />
                  </FormControl>
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
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              <Icon className="mr-2 h-4 w-4" />
              {buttonText}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
