"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    const storageKey = `kalagyo-scroll-position:${pathname}`;
    const savedPosition = Number(sessionStorage.getItem(storageKey));

    window.history.scrollRestoration = "manual";

    const restorePosition = window.setTimeout(() => {
      if (Number.isFinite(savedPosition)) {
        window.scrollTo(0, savedPosition);
      }
    }, 0);

    const savePosition = () => {
      sessionStorage.setItem(storageKey, String(window.scrollY));
    };

    window.addEventListener("scroll", savePosition, { passive: true });

    return () => {
      window.clearTimeout(restorePosition);
      savePosition();
      window.removeEventListener("scroll", savePosition);
    };
  }, [pathname]);

  return null;
}
