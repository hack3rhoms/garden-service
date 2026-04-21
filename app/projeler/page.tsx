import Link from "next/link";
import { BeforeAfterSection } from "../components/Before-After-Section";
import { supabase } from "../lib/supabase";

async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return [];

  return data.map((p: any) => ({
    ...p,
    before: p.before_url,
    after: p.after_url,
  }));
}

export default async function ProjelerPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-[var(--sand-50)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--leaf-700)] text-xs font-bold uppercase tracking-[0.22em] text-white">
              GS
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--leaf-800)]">
              Garden Service
            </span>
          </Link>
          <Link href="/" className="rounded-full border border-[var(--sand-300)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--ink-700)] transition hover:bg-[var(--sand-50)]">
            ← Ana Sayfa
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="section-kicker">Projelerimiz</span>
          <h1 className="section-title mt-4">Tamamlanan tum bahce calismalari.</h1>
          <p className="section-copy">
            {projects.length > 0
              ? `${projects.length} tamamlanan projemizi inceleyin.`
              : "Henuz proje eklenmedi."}
          </p>
        </div>
      </div>

      <BeforeAfterSection projects={projects} />
    </main>
  );
}
