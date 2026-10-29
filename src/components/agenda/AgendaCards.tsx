import Image, { StaticImageData } from "next/image";
import type { ReactNode } from "react";

interface AgendaCardProps {
  title: string;
  /** Linha abaixo do título: data, local, instituição. */
  meta: string;
  image?: StaticImageData;
  href?: string;
  /** Selo em destaque sobre a imagem, como "Inscrições abertas até 05/11/2026". */
  badge?: string;
}

function Badge({ text }: { text: string }) {
  return (
    <span className="absolute left-3 top-3 z-10 bg-[#F7A703] px-3 py-1 text-xs font-semibold text-black">{text}</span>
  );
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
export function WideCard({
  title,
  meta,
  image,
  href,
  badge,
  details,
  description,
}: AgendaCardProps & { details?: string; description?: string }) {
  return (
    <div className="flex flex-col items-start text-left group">
      <CardLink href={href}>
        <div className="relative overflow-hidden w-full aspect-[7/4]">
          {badge ? <Badge text={badge} /> : null}
          <CardImage
            title={title}
            image={image}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </CardLink>
      <h3 className="mt-4 text-sm font-medium line-clamp-2">{title}</h3>
      <p className="text-xs text-gray-600 mt-2">{meta}</p>
      {details ? <p className="mt-3 text-xs font-medium text-gray-900">{details}</p> : null}
      {description ? <p className="mt-1 text-sm text-gray-600">{description}</p> : null}
    </div>
  );
}

export function PortraitGrid({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-6 justify-center xl:justify-start">{children}</div>;
}

export function WideGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{children}</div>;
}

/** Card grande para o curso com inscrições abertas. */
export function FeaturedCourseCard({
  title,
  description,
  details,
  image,
  href,
  badge,
}: {
  title: string;
  description: string;
  details: string[];
  image?: StaticImageData;
  href?: string;
  badge?: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-8 border border-[#F7A703] bg-white lg:grid-cols-2">
      <div className="relative aspect-[7/4] overflow-hidden lg:aspect-auto lg:min-h-[320px]">
        {badge ? <Badge text={badge} /> : null}
        <CardImage title={title} image={image} sizes="(max-width: 1024px) 100vw, 50vw" />
      </div>
      <div className="flex flex-col justify-center gap-4 p-8">
        <h3 className="text-2xl font-medium">{title}</h3>
        <p className="text-gray-700">{description}</p>
        <ul className="flex flex-col gap-1 text-sm text-gray-700">
          {details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block w-fit bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Inscreva-se
          </a>
        ) : null}
      </div>
    </div>
  );
}
