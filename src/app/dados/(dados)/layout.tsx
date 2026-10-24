"use client";
import { Header } from "@/components/header";
import { usePathname } from "next/navigation";

export default function ProjetosLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isGeoportalPage = pathname.includes("geoportal");
  
  return (
    <>
      {!isGeoportalPage && (
        <div className="bg-white sticky top-0 left-0 w-full z-50">
          <Header />
        </div>
      )}
      {children}
    </>
  );
}