"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormData = {
  name: string;
  phone: string;
  service: string;
  message: string;
};

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("request_failed");
      }

      toast.success("Talebiniz bize ulasti. En kisa surede sizi arayacagiz.");
      reset();
    } catch {
      toast.error("Su anda gonderim yapilamadi. Lutfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const inputClassName =
    "w-full rounded-2xl border border-[var(--sand-300)] bg-[var(--sand-50)] px-4 py-3 text-sm text-[var(--ink-900)] outline-none transition placeholder:text-[var(--ink-500)] focus:border-[var(--leaf-500)] focus:bg-white";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--ink-900)]">
            Ad Soyad
          </label>
          <input
            {...register("name", { required: "Ad soyad gerekli." })}
            className={inputClassName}
            placeholder="Ornek: Ahmet Yilmaz"
          />
          {errors.name ? (
            <p className="mt-2 text-sm text-[var(--terracotta-600)]">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--ink-900)]">
            Telefon
          </label>
          <input
            {...register("phone", { required: "Telefon numarasi gerekli." })}
            className={inputClassName}
            placeholder="05xx xxx xx xx"
          />
          {errors.phone ? (
            <p className="mt-2 text-sm text-[var(--terracotta-600)]">
              {errors.phone.message}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[var(--ink-900)]">
          Hizmet Turu
        </label>
        <select
          {...register("service", { required: "Lutfen bir hizmet secin." })}
          className={inputClassName}
          defaultValue=""
        >
          <option value="" disabled>
            Hizmet seciniz
          </option>
          <option value="Agac Budama">Agac Budama</option>
          <option value="Cim Bicme">Cim Bicme</option>
          <option value="Peyzaj Tasarimi">Peyzaj Tasarimi</option>
          <option value="Bahce Temizligi">Bahce Temizligi</option>
        </select>
        {errors.service ? (
          <p className="mt-2 text-sm text-[var(--terracotta-600)]">
            {errors.service.message}
          </p>
        ) : null}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[var(--ink-900)]">
          Bahceniz Hakkinda Kisa Not
        </label>
        <textarea
          {...register("message")}
          rows={5}
          className={inputClassName}
          placeholder="Alan buyuklugu, agac sayisi veya istediginiz isleri yazabilirsiniz."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-[var(--leaf-700)] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[var(--leaf-800)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Talep gonderiliyor..." : "Ucretsiz Kesif Talebi Gonder"}
      </button>
    </form>
  );
}
