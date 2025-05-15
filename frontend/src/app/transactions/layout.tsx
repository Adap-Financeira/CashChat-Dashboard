import Header from "@/components/header/Header";

interface TransactionsLayoutProps {
  children: React.ReactNode;
}

export default function TransactionsLayout({ children }: TransactionsLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <div className="py-20 px-[var(--padding)]">{children}</div>
    </div>
  );
}
