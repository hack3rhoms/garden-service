import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "./components/contact-form";
import { ServiceFilter } from "./components/service-filter";

const services = [
  {
    title: "Agac Budama",
    category: "pruning",
    badge: "Guvenli",
    description:
      "Uzun omurlu, saglikli ve guvenli agaclar icin mevsime uygun budama ve dal temizligi uyguluyoruz.",
    image: "/images/pruning-service.svg",
  },
  {
    title: "Cim Bicme ve Kenar Duzeni",
    category: "lawn",
    badge: "Duzenli",
    description:
      "Bahcenizin her zaman bakimli gorunmesi icin cim bicme, kenar temizligi ve genel zemin duzeni sagliyoruz.",
    image: "/images/lawn-service.svg",
  },
  {
    title: "Peyzaj Tasarimi",
    category: "design",
    badge: "Estetik",
    description:
      "Yasam alaniniza uygun bitki secimi, yuruyus akslari ve dogal doku ile sakin bir bahce kurguluyoruz.",
    image: "/images/landscape-service.svg",
  },
  {
    title: "Bahce Temizligi",
    category: "cleanup",
    badge: "Ferah",
    description:
      "Yaprak, dal ve mevsimsel atiklari toplayarak bahcenizi yeni sezon icin temiz ve hazir hale getiriyoruz.",
    image: "/images/cleanup-service.svg",
  },
];

const highlights = [
  "Sakarya, Sapanca ve Izmit civarinda hizli servis",
  "Yerinde kesif ve ihtiyaca gore planlama",
  "Musteri bahcelerine ozel duzenli bakim yaklasimi",
];

const stats = [
  { value: "120+", label: "tamamlanan bahce isi" },
  { value: "1 gun", label: "icinde geri donus hedefi" },
  { value: "4 mevsim", label: "surekli bakim destegi" },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[var(--sand-50)] text-[var(--ink-900)]">
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(113,168,111,0.24),_transparent_36%),radial-gradient(circle_at_right,_rgba(214,163,91,0.18),_transparent_30%),linear-gradient(180deg,_#f5f1e8_0%,_#f7fbf6_55%,_#ffffff_100%)]" />

        <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--leaf-700)] text-sm font-bold uppercase tracking-[0.22em] text-white">
              GS
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--leaf-800)]">
              Garden Service
            </span>
          </Link>

          <nav className="hidden items-center gap-3 rounded-full border border-white/70 bg-white/70 px-3 py-2 shadow-[0_10px_30px_rgba(45,94,61,0.08)] backdrop-blur md:flex">
            <a className="nav-link" href="#services">
              Hizmetler
            </a>
            <a className="nav-link" href="#about">
              Hakkimizda
            </a>
            <a className="nav-link" href="#contact">
              Iletisim
            </a>
          </nav>
        </header>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-12">
          <div className="space-y-8">
            <span className="inline-flex rounded-full border border-[var(--sand-300)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--leaf-700)]">
              Sakarya Bahce Bakim ve Peyzaj
            </span>

            <div className="space-y-6">
              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--ink-900)] sm:text-6xl lg:text-7xl">
                Tek sayfada guzel, bakimli ve guven veren bir bahce deneyimi.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--ink-600)] sm:text-lg">
                Agac budamadan cim bicmeye, peyzaj duzeninden sezonluk temizlige
                kadar tum hizmetleri tek bir sayfada topladik. Ziyaretciler hem
                hizli bilgi aliyor hem de ayni ekrandan kesif talebi
                olusturabiliyor.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-[var(--leaf-700)] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[var(--leaf-800)]"
              >
                Ucretsiz Kesif Al
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full border border-[var(--leaf-300)] bg-white/80 px-7 py-4 text-sm font-semibold text-[var(--leaf-800)] transition hover:border-[var(--leaf-500)] hover:bg-white"
              >
                Hizmetleri Incele
              </a>
            </div>

            <ul className="grid gap-3 text-sm text-[var(--ink-700)] sm:grid-cols-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/70 bg-white/75 px-4 py-4 shadow-[0_10px_24px_rgba(31,61,43,0.06)] backdrop-blur"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute inset-x-6 -bottom-6 -z-10 h-20 rounded-full bg-[rgba(46,91,61,0.15)] blur-3xl" />
            <div className="grid gap-5 sm:grid-cols-[1.15fr_0.85fr]">
              <div className="relative min-h-[420px] overflow-hidden rounded-[36px] border border-white/70 bg-white/60 shadow-[0_26px_80px_rgba(30,62,41,0.12)]">
                <Image
                  src="/images/hero-garden.svg"
                  alt="Bakimli bahce ve peyzaj hizmeti illustrasyonu"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="grid gap-5">
                <div className="rounded-[30px] border border-[var(--sand-300)] bg-[var(--sand-100)] p-6 shadow-[0_18px_40px_rgba(102,83,47,0.08)]">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--leaf-700)]">
                    Neden bu tasarim?
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
                    Hedefimiz ziyaretciyi farkli sayfalarda kaybetmeden, hizmet,
                    guven ve iletisim adimlarini ayni akis icinde gostermekti.
                  </p>
                </div>

                <div className="grid gap-4 rounded-[30px] border border-white/70 bg-white/80 p-6 shadow-[0_18px_40px_rgba(33,72,48,0.08)]">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-[var(--sand-200)] bg-[var(--sand-50)] px-4 py-4"
                    >
                      <p className="text-3xl font-semibold tracking-[-0.04em] text-[var(--leaf-800)]">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-sm text-[var(--ink-600)]">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-kicker">Hizmetler</span>
          <h2 className="section-title">
            Guzel bir filtre ile hizmetleri tek bakista ayirin.
          </h2>
          <p className="section-copy">
            Kullanici ister agac bakimina ister peyzaj islerine bakiyor olsun,
            tek tikla ilgilendigi hizmet grubuna gecerek kararini daha hizli
            verir.
          </p>
        </div>

        <div className="mt-12">
          <ServiceFilter services={services} />
        </div>
      </section>

      <section id="about" className="relative isolate py-20">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,_rgba(236,246,239,0.25)_0%,_rgba(236,246,239,0.92)_38%,_rgba(255,255,255,1)_100%)]" />

        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="relative min-h-[340px] overflow-hidden rounded-[34px] border border-white/70 bg-white shadow-[0_22px_60px_rgba(28,65,41,0.12)]">
            <Image
              src="/images/about-garden.svg"
              alt="Bahce ustasinin proje planlamasi yaptigi illustrasyon"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="section-kicker">Hakkimizda</span>
            <h2 className="section-title max-w-2xl text-left">
              Bahceyi sadece temizlemiyor, kullanimi kolay bir yasam alani haline
              getiriyoruz.
            </h2>
            <p className="section-copy max-w-2xl text-left">
              Garden Service, kucuk bahcelerden villa peyzajina kadar farkli
              olceklerde bahce bakim hizmeti verir. Is planini once yerinde
              inceler, ardindan budama, bicme, duzenleme ve temizlik adimlarini
              ihtiyaca gore siralar.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-[var(--sand-300)] bg-white p-6 shadow-[0_14px_34px_rgba(39,74,52,0.07)]">
                <h3 className="text-xl font-semibold text-[var(--ink-900)]">
                  Planli Surec
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--ink-600)]">
                  Her bahce icin uygulanacak is kalemlerini netlestirip gereksiz
                  masraflari azaltiriz.
                </p>
              </div>
              <div className="rounded-[28px] border border-[var(--sand-300)] bg-white p-6 shadow-[0_14px_34px_rgba(39,74,52,0.07)]">
                <h3 className="text-xl font-semibold text-[var(--ink-900)]">
                  Dogal Gorunum
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--ink-600)]">
                  Hedefimiz fazla yapay gorunmeyen, yasayan ve bakimli bir bahce
                  atmosferi olusturmak.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="rounded-[34px] bg-[var(--leaf-900)] p-8 text-white shadow-[0_24px_80px_rgba(20,44,31,0.28)] sm:p-10">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--sand-100)]">
              Iletisim
            </span>
            <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.04em]">
              Ayni sayfada hemen talep birakin, biz size donelim.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-8 text-[rgba(245,241,232,0.82)]">
              Ziyaretci artik ayri bir iletisim sayfasina gitmek zorunda degil.
              Form, bilgiler ve guven veren detaylar tek yerde toplandi.
            </p>

            <div className="mt-8 space-y-4 text-sm text-[rgba(245,241,232,0.88)]">
              <div className="rounded-3xl border border-white/10 bg-white/8 p-5">
                Telefon: 0555 555 55 55
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/8 p-5">
                WhatsApp: 7 gun boyunca hizli donus
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/8 p-5">
                Bolge: Sakarya, Sapanca, Izmit ve yakin cevre
              </div>
            </div>
          </div>

          <div className="rounded-[34px] border border-white/70 bg-white p-8 shadow-[0_24px_80px_rgba(30,62,41,0.1)] sm:p-10">
            <div className="mb-8">
              <span className="section-kicker">Kesif Formu</span>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--ink-900)]">
                Bahceniz icin en uygun hizmeti secin.
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--ink-600)]">
                Form basit tutuldu; ziyaretci zorlanmadan talep birakabiliyor.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
