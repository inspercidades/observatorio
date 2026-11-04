import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalogo/CatalogPage";

export const metadata: Metadata = {
  title: "Catálogo de Dados",
};

export default function CatalogoDeDadosPage() {
  return (
    <div className="bg-[#f9f9f6]">
      <Suspense>
        <CatalogPage />
      </Suspense>
    </div>
  );
}
