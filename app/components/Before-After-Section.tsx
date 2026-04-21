"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";

export interface Project {
  id: string;
  title: string;
  location: string;
  badge: string;
  category: string;
  before: string;
  after: string;
  createdAt: string;
}

// ─── Slider Card ──────────────────────────────────────────────
function SliderCard({ project }: { project: Project }) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => { if (isDragging) updatePosition(e.clientX); };
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, updatePosition]);

  return (
    <div className="group overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_22px_60px_rgba(28,65,41,0.12)] transition hover:shadow-[0_28px_70px_rgba(28,65,41,0.18)]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <span className="inline-flex rounded-full border border-[var(--sand-300)] bg-[var(--sand-50)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--leaf-700)]">
            {project.badge}
          </span>
          <p className="mt-1 text-base font-semibold text-[var(--ink-900)]">{project.title}</p>
        </div>
        <span className="text-xs text-[var(--ink-600)]">📍 {project.location}</span>
      </div>

      {/* Slider */}
      <div
        ref={containerRef}
        className="relative h-56 w-full select-none overflow-hidden"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onMouseDown={() => setIsDragging(true)}
        onTouchMove={(e) => updatePosition(e.touches[0].clientX)}
      >
        <img src={project.after} alt="Sonra" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <img
            src={project.before}
            alt="Once"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ width: "100%", minWidth: containerRef.current?.offsetWidth ?? 400 }}
            draggable={false}
          />
        </div>

        {/* Labels */}
        <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">Önce</div>
        <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-[var(--leaf-700)]/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">Sonra</div>

        {/* Divider */}
        <div className="absolute inset-y-0 z-10 w-0.5 bg-white/90 shadow-[0_0_8px_rgba(0,0,0,0.3)]" style={{ left: `${position}%` }}>
          <div
            className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
            onMouseDown={(e) => { e.stopPropagation(); setIsDragging(true); }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M6 3L2 9L6 15" stroke="#2D5E3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 3L16 9L12 15" stroke="#2D5E3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <p className="px-5 py-3 text-center text-xs text-[var(--ink-600)]">← Kaydirarak once/sonra goruntuleyin →</p>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────
interface BeforeAfterSectionProps {
  projects: Project[];
  preview?: boolean; // true = الصفحة الرئيسية (max 3 + زر), false = كل المشاريع
}

export function BeforeAfterSection({ projects, preview = false }: BeforeAfterSectionProps) {
  const displayed = preview ? projects.slice(0, 3) : projects;

  if (displayed.length === 0) return null;

  return (
    <section className="relative isolate py-20">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(236,246,239,0.5)_50%,_rgba(255,255,255,1)_100%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {preview && (
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-kicker">Projelerimiz</span>
            <h2 className="section-title">Gercek bahcelerde gercek sonuclar.</h2>
            <p className="section-copy">
              Her projeyi once yerinde degerlendiriyor, ardindan planliyoruz.
              Kaydirarak once ve sonra goruntulerini karsilastirin.
            </p>
          </div>
        )}

        <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${preview ? "mt-12" : "mt-0"}`}>
          {displayed.map((project) => (
            <SliderCard key={project.id} project={project} />
          ))}
        </div>

        {/* زر "شاهد كل الأعمال" — يظهر فقط في الصفحة الرئيسية */}
        {preview && projects.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/projeler"
              className="group inline-flex items-center gap-3 rounded-full border border-[var(--leaf-300)] bg-white px-8 py-4 text-sm font-semibold text-[var(--leaf-800)] shadow-[0_8px_24px_rgba(45,94,61,0.1)] transition hover:border-[var(--leaf-500)] hover:bg-[var(--leaf-700)] hover:text-white hover:shadow-[0_12px_32px_rgba(45,94,61,0.2)]"
            >
              <span>Tum Projeleri Gor</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--leaf-100)] transition group-hover:bg-white/20">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7H11M8 4L11 7L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
            {projects.length > 3 && (
              <p className="mt-3 text-xs text-[var(--ink-600)]">
                +{projects.length - 3} daha fazla proje
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
