"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Service = {
  title: string;
  category: string;
  description: string;
  image: string;
  badge: string;
};

type ServiceFilterProps = {
  services: Service[];
};

const filterLabels: Record<string, string> = {
  all: "Tum Hizmetler",
  pruning: "Agac Bakimi",
  lawn: "Cim ve Zemin",
  design: "Peyzaj",
  cleanup: "Temizlik",
};

export function ServiceFilter({ services }: ServiceFilterProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const visibleServices = useMemo(() => {
    if (activeFilter === "all") {
      return services;
    }

    return services.filter((service) => service.category === activeFilter);
  }, [activeFilter, services]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-center gap-3">
        {Object.entries(filterLabels).map(([value, label]) => {
          const active = activeFilter === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => setActiveFilter(value)}
              className={`rounded-full border px-5 py-3 text-sm font-semibold transition duration-300 ${
                active
                  ? "border-[var(--leaf-700)] bg-[var(--leaf-700)] text-white shadow-[0_12px_30px_rgba(45,94,61,0.22)]"
                  : "border-[var(--sand-300)] bg-white/80 text-[var(--leaf-700)] hover:border-[var(--leaf-500)] hover:bg-[var(--sand-100)]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {visibleServices.map((service) => (
          <article
            key={service.title}
            className="group overflow-hidden rounded-[28px] border border-white/65 bg-white/90 shadow-[0_18px_50px_rgba(33,72,48,0.08)] backdrop-blur"
          >
            <div className="relative h-60 overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,44,31,0.7)] via-transparent to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[var(--leaf-700)]">
                {service.badge}
              </span>
            </div>

            <div className="space-y-4 p-6">
              <h3 className="text-2xl font-semibold text-[var(--ink-900)]">
                {service.title}
              </h3>
              <p className="text-sm leading-7 text-[var(--ink-600)]">
                {service.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
