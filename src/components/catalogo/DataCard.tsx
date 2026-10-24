"use client";

import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CatalogItem } from "@/app/api/catalog/route";

interface DataCardProps {
  item: CatalogItem;
  initialOpen?: boolean;
}

export function DataCard({ item, initialOpen = false }: DataCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(initialOpen);

  const handleDatasetAccess = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  // Format updatedAt date for display
  const formattedDate = item.updatedAt
    ? new Date(item.updatedAt).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      <button
        type="button"
        className="bg-background-2 p-6 transition-shadow cursor-pointer hover:shadow-sm w-full text-left flex flex-col"
        onClick={() => setIsModalOpen(true)}
      >
        <h3 className="text-base font-semibold text-foreground mb-3 line-clamp-2">
          {item.title}
        </h3>

        <div className="mb-4 flex-1">
          <p className="text-muted-foreground text-sm line-clamp-3">
            {item.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {item.theme && (
            <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-foreground/6 text-foreground">
              {item.theme}
            </span>
          )}
          {item.subject && (
            <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-foreground/6 text-foreground">
              {item.subject}
            </span>
          )}
        </div>

        {(item.period || item.formats.length > 0) && (
          <p className="text-xs text-muted-foreground">
            {[item.period, item.formats.join(", ")].filter(Boolean).join(" · ")}
          </p>
        )}
      </button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-none px-6 py-10! gap-2"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-foreground">
              {item.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Descrição */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">
                Descrição
              </h4>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {item.description}
              </p>
            </div>

            {/* Período */}
            {item.period && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">
                  Período
                </h4>
                <p className="text-sm text-muted-foreground">{item.period}</p>
              </div>
            )}

            {/* Palavras-chave */}
            {item.keywords && item.keywords.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">
                  Palavras-chave
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-foreground/6 text-foreground"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Metadados em grid */}
            <div className="grid grid-cols-2 gap-4">
              {item.theme && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    Tema
                  </h4>
                  <p className="text-sm text-muted-foreground">{item.theme}</p>
                </div>
              )}
              {item.subject && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    Categoria
                  </h4>
                  <p className="text-sm text-muted-foreground">{item.subject}</p>
                </div>
              )}
              {item.formats && item.formats.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    Formato
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {item.formats.join(", ")}
                  </p>
                </div>
              )}
              {formattedDate && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    Última atualização
                  </h4>
                  <p className="text-sm text-muted-foreground">{formattedDate}</p>
                </div>
              )}
            </div>

            {/* Fonte original */}
            {item.source && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">
                  Fonte original dos dados
                </h4>
                {item.sourceLink ? (
                  <a
                    href={item.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                  >
                    {item.source}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground">{item.source}</p>
                )}
              </div>
            )}

            {/* Datasets */}
            {item.dataset_info && item.dataset_info.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">
                  Conjuntos de dados disponíveis ({item.dataset_info.length})
                </h4>
                <div className="space-y-3">
                  {item.dataset_info.map((dataset) => (
                    <div
                      key={dataset.dataset_link}
                      className="border border-foreground/10 bg-[#f9f9f6] p-4"
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-semibold text-foreground">
                            {dataset.dataset_title}
                          </h5>
                          {(dataset.dataset_period || dataset.dataset_format) && (
                            <div className="flex gap-2 mt-1.5">
                              {dataset.dataset_format && (
                                <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-foreground/6 text-foreground">
                                  {dataset.dataset_format}
                                </span>
                              )}
                              {dataset.dataset_period && (
                                <span className="text-xs text-muted-foreground pt-0.5">
                                  {dataset.dataset_period}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <Button
                          onClick={() => handleDatasetAccess(dataset.dataset_link)}
                          className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer shrink-0"
                          size="sm"
                        >
                          Acessar
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-[13px] text-muted-foreground whitespace-pre-line">
                        {dataset.dataset_description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
