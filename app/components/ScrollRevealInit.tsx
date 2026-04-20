"use client";
import { useEffect } from "react";

export function ScrollRevealInit() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("scroll-visible");
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".scroll-reveal").forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, []);

  return null;
}
