import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--sand-50)] px-4 py-16 sm:px-6">
      <div className="max-w-2xl rounded-[34px] border border-white/70 bg-white p-8 text-center shadow-[0_24px_80px_rgba(30,62,41,0.1)] sm:p-12">
        <span className="section-kicker">Tek Sayfa Deneyimi</span>
        <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-900)]">
          Iletisim formu artik ana sayfada.
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--ink-600)]">
          Kullanici deneyimini sade tutmak icin hizmetler, hakkimizda ve iletisim
          bolumlerini ayni sayfada topladik. Asagidaki butonla dogrudan iletisim
          alanina gecebilirsiniz.
        </p>
        <Link
          href="/#contact"
          className="mt-8 inline-flex rounded-full bg-[var(--leaf-700)] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[var(--leaf-800)]"
        >
          Ana Sayfada Iletisime Git
        </Link>
      </div>
    </main>
  );
}
