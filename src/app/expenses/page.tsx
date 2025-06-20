import { Header } from "@/components/layout/header";
import { TransactionForm } from "@/components/forms/transaction-form";

export default function ExpensesPage() {
  return (
    <>
      <Header title="Expense Tracker" />
      <main className="flex-1 p-4 md:p-8 bg-background">
         <div className="max-w-3xl mx-auto">
          <TransactionForm type="expense" />
        </div>
      </main>
    </>
  );
}
