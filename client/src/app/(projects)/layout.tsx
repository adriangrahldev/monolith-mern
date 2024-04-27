import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SideBar } from "@/components/ui/SideBar";
import { Header } from "@/components/ui/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monolith - Freelancer project management tool",
  description: "Monolith is a project management tool for freelancers. It helps you to manage your projects, clients, and invoices in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`font-inter min-h-screen flex flex-col ${inter.className}`}>
      <div className="flex flex-row min-h-screen">
        <div className="bg-gray-200">
          <SideBar />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-end w-100 mt-4 mr-4">
            <Header />
          </div>
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
