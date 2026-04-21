"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";

interface Project {
  id: string;
  title: string;
  location: string;
  badge: string;
  category: string;
  before_url: string;
  after_url: string;
  created_at: string;
}

const CATEGORIES = [
  { value: "pruning", label: "Agac Bakimi" },
  { value: "lawn", label: "Cim ve Zemin" },
  { value: "design", label: "Peyzaj" },
  { value: "cleanup", label: "Temizlik" },
];

// ─── Password Gate ────────────────────────────────────────────
function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async () => {
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: value }),
    });
    if (res.ok) {
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--sand-50)]">
      <div
        className="w-full max-w-sm rounded-[28px] border border-white/70 bg-white p-10 shadow-[0_24px_80px_rgba(30,62,41,0.1)]"
        style={shake ? { animation: "shake 0.4s ease" } : {}}
      >
        <div className="mb-8 text-center">
          <span className="flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-[var(--leaf-700)] text-sm font-bold uppercase tracking-[0.22em] text-white">GS</span>
          <h1 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[var(--ink-900)]">Admin Paneli</h1>
          <p className="mt-2 text-sm text-[var(--ink-600)]">Devam etmek icin sifrenizi girin</p>
        </div>
        <div className="space-y-4">
          <input
            type="password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Sifre"
            className={`w-full rounded-2xl border px-4 py-3.5 text-sm outline-none transition ${
              error
                ? "border-red-300 bg-red-50 text-red-800"
                : "border-[var(--sand-300)] bg-[var(--sand-50)] text-[var(--ink-900)] focus:border-[var(--leaf-500)] focus:bg-white"
            }`}
          />
          {error && <p className="text-xs text-red-500">Sifre yanlis. Tekrar deneyin.</p>}
          <button
            onClick={handleSubmit}
            className="w-full rounded-full bg-[var(--leaf-700)] py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--leaf-800)]"
          >
            Giris Yap
          </button>
        </div>
      </div>
      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-5px)}
          80%{transform:translateX(5px)}
        }
      `}</style>
    </div>
  );
}

// ─── Image Upload Box ─────────────────────────────────────────
function ImageUploadBox({
  label, preview, onChange, uploading,
}: {
  label: string;
  preview: string | null;
  onChange: (file: File) => void;
  uploading: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="relative flex h-36 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[var(--leaf-300)] bg-[var(--sand-50)] transition hover:border-[var(--leaf-500)] hover:bg-white"
    >
      {preview ? (
        <>
          <img src={preview} alt={label} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[var(--ink-900)]">Degistir</span>
          </div>
        </>
      ) : uploading ? (
        <div className="flex flex-col items-center gap-2">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--leaf-700)] border-t-transparent" />
          <span className="text-xs text-[var(--ink-600)]">Yukleniyor...</span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-[var(--ink-600)]">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 6V22M6 14H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-xs font-medium">{label}</span>
          <span className="text-[10px] text-[var(--ink-500)]">JPG, PNG, WEBP</span>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { if (e.target.files?.[0]) onChange(e.target.files[0]); }}
      />
    </div>
  );
}

// ─── Add Project Form ─────────────────────────────────────────
function AddProjectForm({ onAdd }: { onAdd: (p: Project) => void }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingBefore, setUploadingBefore] = useState(false);
  const [uploadingAfter, setUploadingAfter] = useState(false);
  const [form, setForm] = useState({
    title: "", location: "", badge: "", category: "pruning",
    before_url: "", after_url: "",
  });
  const [previewBefore, setPreviewBefore] = useState<string | null>(null);
  const [previewAfter, setPreviewAfter] = useState<string | null>(null);

  const uploadImage = async (file: File, type: "before" | "after") => {
    const setter = type === "before" ? setUploadingBefore : setUploadingAfter;
    const previewSetter = type === "before" ? setPreviewBefore : setPreviewAfter;
    setter(true);
    previewSetter(URL.createObjectURL(file));

    const ext = file.name.split(".").pop();
    const fileName = `${type}-${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("projects")
      .upload(fileName, file, { upsert: true });

    if (error) {
      alert("Resim yuklenemedi: " + error.message);
      setter(false);
      return;
    }

    const { data } = supabase.storage.from("projects").getPublicUrl(fileName);
    setForm((prev) => ({ ...prev, [`${type}_url`]: data.publicUrl }));
    setter(false);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.location || !form.before_url || !form.after_url) {
      alert("Lutfen tum alanlari doldurun ve iki resim yukleyin.");
      return;
    }
    setLoading(true);

    const { data, error } = await supabase
      .from("projects")
      .insert({
        title: form.title,
        location: form.location,
        badge: form.badge || "Yeni",
        category: form.category,
        before_url: form.before_url,
        after_url: form.after_url,
      })
      .select()
      .single();

    if (error) {
      alert("Hata: " + error.message);
    } else {
      onAdd(data);
      setForm({ title: "", location: "", badge: "", category: "pruning", before_url: "", after_url: "" });
      setPreviewBefore(null);
      setPreviewAfter(null);
      setOpen(false);
    }
    setLoading(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-[20px] border-2 border-dashed border-[var(--leaf-300)] bg-[var(--sand-50)] py-8 text-sm font-semibold text-[var(--leaf-700)] transition hover:border-[var(--leaf-500)] hover:bg-white"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Yeni Proje Ekle
      </button>
    );
  }

  return (
    <div className="rounded-[20px] border border-[var(--sand-300)] bg-white p-6 shadow-[0_8px_24px_rgba(28,65,41,0.07)]">
      <h3 className="mb-5 font-semibold text-[var(--ink-900)]">Yeni Proje</h3>
      <div className="space-y-4">

        {/* رفع الصور */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="mb-1.5 text-xs font-medium text-[var(--ink-700)]">Önce Resmi</p>
            <ImageUploadBox label="Önce resim ekle" preview={previewBefore} uploading={uploadingBefore} onChange={(f) => uploadImage(f, "before")} />
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium text-[var(--ink-700)]">Sonra Resmi</p>
            <ImageUploadBox label="Sonra resim ekle" preview={previewAfter} uploading={uploadingAfter} onChange={(f) => uploadImage(f, "after")} />
          </div>
        </div>

        {/* البيانات */}
        <div className="grid gap-3 sm:grid-cols-2">
          <input placeholder="Proje adi (örn: Agac Budama)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-xl border border-[var(--sand-300)] bg-[var(--sand-50)] px-4 py-3 text-sm outline-none focus:border-[var(--leaf-500)] focus:bg-white" />
          <input placeholder="Konum (örn: Sakarya)" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="rounded-xl border border-[var(--sand-300)] bg-[var(--sand-50)] px-4 py-3 text-sm outline-none focus:border-[var(--leaf-500)] focus:bg-white" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <input placeholder="Rozet (örn: Guvenli)" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })}
            className="rounded-xl border border-[var(--sand-300)] bg-[var(--sand-50)] px-4 py-3 text-sm outline-none focus:border-[var(--leaf-500)] focus:bg-white" />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="rounded-xl border border-[var(--sand-300)] bg-[var(--sand-50)] px-4 py-3 text-sm outline-none focus:border-[var(--leaf-500)] focus:bg-white">
            {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>

        <div className="flex gap-3 pt-1">
          <button onClick={handleSubmit} disabled={loading || uploadingBefore || uploadingAfter}
            className="flex-1 rounded-full bg-[var(--leaf-700)] py-3 text-sm font-semibold text-white transition hover:bg-[var(--leaf-800)] disabled:opacity-60">
            {loading ? "Kaydediliyor..." : "Projeyi Kaydet"}
          </button>
          <button onClick={() => { setOpen(false); setPreviewBefore(null); setPreviewAfter(null); }}
            className="flex-1 rounded-full border border-[var(--sand-300)] py-3 text-sm font-semibold text-[var(--ink-700)] transition hover:bg-[var(--sand-50)]">
            Iptal
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────
function ProjectCard({ project, onDelete }: { project: Project; onDelete: (id: string) => void }) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="overflow-hidden rounded-[20px] border border-[var(--sand-300)] bg-white shadow-[0_8px_24px_rgba(28,65,41,0.07)]">
      <div className="grid grid-cols-2 gap-0.5">
        <div className="relative h-32 overflow-hidden">
          <img src={project.before_url} alt="Once" className="h-full w-full object-cover" />
          <span className="absolute left-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">ÖNCE</span>
        </div>
        <div className="relative h-32 overflow-hidden">
          <img src={project.after_url} alt="Sonra" className="h-full w-full object-cover" />
          <span className="absolute right-2 top-2 rounded-full bg-[var(--leaf-700)]/80 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">SONRA</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-semibold text-[var(--ink-900)]">{project.title}</p>
            <p className="text-xs text-[var(--ink-600)]">📍 {project.location} · {project.badge}</p>
          </div>
          <span className="rounded-full border border-[var(--sand-300)] bg-[var(--sand-50)] px-2 py-1 text-[10px] font-medium text-[var(--ink-600)]">
            {project.created_at?.split("T")[0]}
          </span>
        </div>
        <div className="mt-3">
          {!confirming ? (
            <button onClick={() => setConfirming(true)} className="w-full rounded-xl border border-red-200 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50">Sil</button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => onDelete(project.id)} className="flex-1 rounded-xl bg-red-500 py-2 text-xs font-semibold text-white transition hover:bg-red-600">Evet, sil</button>
              <button onClick={() => setConfirming(false)} className="flex-1 rounded-xl border border-[var(--sand-300)] py-2 text-xs font-semibold text-[var(--ink-700)] transition hover:bg-[var(--sand-50)]">Iptal</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => { setProjects(data ?? []); setLoading(false); });
  }, [authed]);

  const handleDelete = async (id: string) => {
    await supabase.from("projects").delete().eq("id", id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  if (!authed) return <PasswordGate onSuccess={() => setAuthed(true)} />;

  return (
    <main className="min-h-screen bg-[var(--sand-50)] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--leaf-700)] text-xs font-bold uppercase tracking-[0.2em] text-white">GS</span>
            <div>
              <h1 className="text-xl font-semibold text-[var(--ink-900)]">Admin Paneli</h1>
              <p className="text-xs text-[var(--ink-600)]">{projects.length} proje</p>
            </div>
          </div>
          <a href="/" className="rounded-full border border-[var(--sand-300)] bg-white px-4 py-2 text-xs font-semibold text-[var(--ink-700)] transition hover:bg-[var(--sand-50)]">
            ← Siteye Don
          </a>
        </div>

        <div className="mb-8">
          <AddProjectForm onAdd={(p) => setProjects((prev) => [p, ...prev])} />
        </div>

        {loading ? (
          <div className="py-20 text-center text-sm text-[var(--ink-600)]">Yukleniyor...</div>
        ) : projects.length === 0 ? (
          <div className="py-20 text-center text-sm text-[var(--ink-600)]">Henuz proje eklenmedi.</div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => <ProjectCard key={p.id} project={p} onDelete={handleDelete} />)}
          </div>
        )}
      </div>
    </main>
  );
}
