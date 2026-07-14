// app/events/[id]/EventGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

export default function EventGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex h-72 w-full items-center justify-center rounded-2xl bg-twilight-900 text-foreground/30 sm:h-96">
        No image available
      </div>
    );
  }

  return (
    <div>
      <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-twilight-900 sm:h-96">
        <Image
          src={images[active]}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                i === active ? "border-amber-400" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt={`${title} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}