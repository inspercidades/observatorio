"use client"

import Image from "next/image"
import { useState } from "react"

interface VideoCardProps {
  youtubeId: string
  title: string
  date: string
  format: string
  href: string
}

function thumbnailUrl(youtubeId: string, quality: "maxresdefault" | "hqdefault") {
  return `https://i.ytimg.com/vi/${youtubeId}/${quality}.jpg`
}

export function VideoCard({ youtubeId, title, date, format, href }: VideoCardProps) {
  const [src, setSrc] = useState(() => thumbnailUrl(youtubeId, "maxresdefault"))

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-start text-left group cursor-pointer"
    >
      <div className="relative overflow-hidden w-full aspect-[7/4] bg-gray-200">
        <Image
          key={src}
          src={src}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => {
            const fallback = thumbnailUrl(youtubeId, "hqdefault")
            if (src !== fallback) setSrc(fallback)
          }}
        />
      </div>
      <h3 className="mt-4 text-sm font-medium line-clamp-2">{title}</h3>
      <p className="text-xs text-gray-600 mt-2">{date} • {format}</p>
    </a>
  )
}
