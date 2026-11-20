"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const logo = (
    <Image
      src="/kalagyo_logo_full.png"
      alt="Kalagyo Davao Tele-Mental Health"
      width={120}
      height={32}
      className="h-1/2 w-auto object-contain"
    />
  );

  return (
    <footer
      aria-label="Footer"
      className="flex h-16 w-full shrink-0 items-center justify-between border-t border-[#153f2e]/50 px-4"
    >
      {pathname === "/" ? (
        <span className="inline-flex h-full w-auto items-center">{logo}</span>
      ) : (
        <Link
          href="/"
          aria-label="Go to home page"
          className="inline-flex h-full w-auto items-center transition-transform duration-100 active:translate-y-0.5"
        >
          {logo}
        </Link>
      )}
      <nav
        aria-label="Footer navigation"
        className="flex flex-col justify-center text-[0.5rem] leading-3 text-blue-900 underline"
      >
        <Link href="/book-appointment">Book Appointment</Link>
        <Link href="/questions">Ask Questions</Link>
        <Link href="/payments">Make a Payment</Link>
        <Link href="/login">Log In</Link>
      </nav>
      <div className="flex -translate-y-[3px] flex-col justify-center text-[0.5rem] leading-3 text-black">
        <a href="tel:09186897244" className="text-blue-900 underline">
          0918 689 7244
        </a>
        <a
          href="mailto:kalagyo.dvo@gmail.com"
          className="text-blue-900 underline"
        >
          kalagyo.dvo@gmail.com
        </a>
        <Image
          src="/socmed_logos.png"
          alt="Social media"
          width={219}
          height={39}
          className="h-[18px] w-auto translate-y-[6px] object-contain"
        />
      </div>
      <div className="flex flex-col justify-center text-[0.5rem] leading-3 text-black">
        <span>Unit #, Building Name,</span>
        <span>Lot #, Street Name,</span>
        <span>Subd. Name, Davao City,</span>
        <span>Davao del Sur, Philippines</span>
      </div>
      <div className="flex flex-col justify-center text-[0.5rem] leading-3 text-black">
        <a href="#english" className="text-blue-900 underline">
          English
        </a>
        <a href="#tagalog" className="text-blue-900 underline">
          Tagalog
        </a>
        <a href="#bisaya" className="text-blue-900 underline">
          Bisaya
        </a>
        <span>Legal stuff applies</span>
      </div>
    </footer>
  );
}
