"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 248,
    suffix: "+",
    label: "Tamamlanan Proje",
    description: "Kucuk bahceden villa peyzajina",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 17L8 12L11 15L15 9L19 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 8V13H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    value: 21,
    suffix: "",
    label: "Yıl Deneyim",
    description: "Sektorde kesintisiz hizmet",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M11 7V11L14 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    value: 98,
    suffix: "%",
    label: "Musteri Memnuniyeti",
    description: "Geri donus ve tavsiye orani",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3C11 3 5 6 5 11.5C5 14.5 7.5 17 11 17C14.5 17 17 14.5 17 11.5C17 6 11 3 11 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M8 12L10 14L14 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    value: 4,
    suffix: "",
    label: "Hizmet Bölgesi",
    description: "Sakarya, Sapanca, Izmit ve cevre",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2C7.686 2 5 4.686 5 8C5 12.5 11 20 11 20C11 20 17 12.5 17 8C17 4.686 14.314 2 11 2Z" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="11" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
  },
];

function useCountUp(target: number, duration: number = 1800, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(ease(progress) * target));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    };

    requestAnimationFrame(animate);
  }, [target, duration, start]);

  return count;
}

function StatCard({ stat, index, visible }: {
  stat: typeof stats[0];
  index: number;
  visible: boolean;
}) {
  const count = useCountUp(stat.value, 1600, visible);

  return (
    <div
      className="group relative overflow-hidden rounded-[28px] border border-white/70 bg-white p-7 shadow-[0_14px_40px_rgba(28,65,41,0.08)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(28,65,41,0.14)] hover:-translate-y-1"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, box-shadow 0.3s ease, translate 0.3s ease`,
      }}
    >
      {/* Subtle background gradient on hover */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(113,168,111,0.08),_transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Icon */}
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--leaf-700)]/10 text-[var(--leaf-700)]">
        {stat.icon}
      </div>

      {/* Number */}
      <div className="flex items-end gap-1">
        <span className="text-5xl font-semibold leading-none tracking-[-0.04em] text-[var(--leaf-800)]">
          {count}
        </span>
        <span className="mb-1 text-2xl font-semibold text-[var(--leaf-600)]">
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <p className="mt-2 text-sm font-semibold text-[var(--ink-900)]">{stat.label}</p>
      <p className="mt-1 text-xs leading-5 text-[var(--ink-600)]">{stat.description}</p>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[var(--leaf-300)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

export function StatsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Header */}
      <div
        className="mb-12 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <span className="section-kicker">Rakamlarla Biz</span>
        <h2 className="section-title">
          21 yıllık deneyimin <br className="hidden sm:block" /> rakamlarla yansımasi.
        </h2>
      </div>

      {/* Stats grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} visible={visible} />
        ))}
      </div>
    </section>
  );
}
