import { Suspense } from "react";
import { CatalogPage } from "@/components/catalogo/CatalogPage";

export default function CatalogoDeDadosPage() {
  return (
    <div className="bg-[#f9f9f6]">
      <Suspense>
        <CatalogPage />
      </Suspense>
    </div>
  );
}
