import { Header } from "@/components/layout/header";
import { TransactionForm } from "@/components/forms/transaction-form";

export default function IncomePage() {
  return (
    <>
      <Header title="Income Tracker" />
      <main className="flex-1 p-4 md:p-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <TransactionForm type="income" />
        </div>
      </main>
    </>
  );
}
