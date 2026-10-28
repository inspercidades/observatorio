import Image, { StaticImageData } from "next/image";
import type { ReactNode } from "react";

interface AgendaCardProps {
  title: string;
  /** Linha abaixo do título: data, local, instituição. */
  meta: string;
  image?: StaticImageData;
  href?: string;
}

function CardLink({ href, children }: { href?: string; children: ReactNode }) {
  if (!href) return <>{children}</>;
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : undefined}
      className="block w-full cursor-pointer"
    >
      {children}
    </a>
  );
}

function CardImage({ title, image, sizes }: { title: string; image?: StaticImageData; sizes: string }) {
  return image ? (
    <Image
      src={image}
      alt={title}
      fill
      className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
      sizes={sizes}
    />
  ) : (
    <div className="absolute inset-0 bg-[#e7e4da]" />
  );
}

/** Card vertical, usado em "Na agenda" e "Eventos passados". */
export function PortraitCard({ title, meta, image, href }: AgendaCardProps) {
  return (
    <div className="flex flex-col items-start text-left w-[320px] group">
      <CardLink href={href}>
        <div className="relative overflow-hidden h-[380px] w-[320px]">
          <CardImage title={title} image={image} sizes="320px" />
        </div>
      </CardLink>
      <h3 className="mt-4 text-sm font-medium">{title}</h3>
      <p className="text-xs text-gray-600 mt-2">{meta}</p>
    </div>
  );
}

/** Card horizontal, usado na Sexta da Mobilidade e nos cursos. */
export function WideCard({ title, meta, image, href }: AgendaCardProps) {
  return (
    <div className="flex flex-col items-start text-left group">
      <CardLink href={href}>
        <div className="relative overflow-hidden w-full aspect-[7/4]">
          <CardImage
            title={title}
            image={image}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </CardLink>
      <h3 className="mt-4 text-sm font-medium line-clamp-2">{title}</h3>
      <p className="text-xs text-gray-600 mt-2">{meta}</p>
    </div>
  );
}

export function PortraitGrid({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-6 justify-center xl:justify-start">{children}</div>;
}

export function WideGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{children}</div>;
}
