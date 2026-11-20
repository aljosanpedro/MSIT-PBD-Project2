"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [bookPressed, setBookPressed] = useState(false);
  const isCurrentPage = (href: string) => pathname === href;

  const openQuestions = () => {
    setBookPressed(true);
    window.setTimeout(() => {
      router.push("/questions", { scroll: false });
    }, 120);
  };
  const logo = (
    <Image
      src="/kalagyo_logo_full.png"
      alt="Kalagyo Davao Tele-Mental Health"
      width={240}
      height={64}
      priority
      className="h-full w-auto object-contain"
    />
  );

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center gap-2 border-b border-[#153f2e]/50 bg-[rgb(215_203_169)] px-4">
      {isCurrentPage("/") ? (
        logo
      ) : (
        <Link
          href="/"
          scroll={false}
          aria-label="Go to home page"
          className="inline-flex h-full w-auto transition-transform duration-100 active:translate-y-0.5"
        >
          {logo}
        </Link>
      )}
      {isCurrentPage("/book-appointment") ? (
        <span className="ml-auto inline-flex h-5 w-24 translate-y-px self-center items-center justify-center rounded-full border border-black bg-gray-300 px-0 text-[0.5rem] font-semibold leading-none text-black">
          Book Appointment
        </span>
      ) : (
        <Link
          href="/book-appointment"
          scroll={false}
          className={`ml-auto inline-flex h-5 w-24 translate-y-px self-center items-center justify-center rounded-full border border-black bg-[#315b46] px-0 text-[0.5rem] font-semibold leading-none text-white transition-transform duration-100 active:translate-y-0.5 ${
            bookPressed ? "translate-y-0.5" : ""
          }`}
        >
          Book Appointment
        </Link>
      )}
      <button
        type="button"
        onClick={openQuestions}
        disabled={isCurrentPage("/questions")}
        className={`inline-flex h-5 w-24 translate-y-px self-center items-center justify-center rounded-full border border-black px-0 text-[0.5rem] font-semibold leading-none ${
          isCurrentPage("/questions")
            ? "bg-gray-300 text-black"
            : "cursor-pointer bg-transparent text-black transition-transform duration-100 active:translate-y-0.5"
        }`}
      >
        Ask Questions
      </button>
      {isCurrentPage("/payments") ? (
        <span className="inline-flex h-5 translate-y-px self-center items-center justify-center whitespace-nowrap rounded-full border border-black bg-gray-300 px-2 text-[0.45rem] font-semibold leading-none text-black">
          Make a Payment
        </span>
      ) : (
        <Link
          href="/payments"
          scroll={false}
          className="inline-flex h-5 translate-y-px self-center items-center justify-center whitespace-nowrap rounded-full border border-black bg-transparent px-2 text-[0.45rem] font-semibold leading-none text-black transition-transform duration-100 active:translate-y-0.5"
        >
          Make a Payment
        </Link>
      )}
      {isCurrentPage("/login") ? (
        <span className="inline-flex h-5 w-20 translate-y-px self-center items-center justify-center rounded-full border border-black bg-gray-300 px-0 text-[0.5rem] font-semibold leading-none text-black">
          Log In
        </span>
      ) : (
        <Link
          href="/login"
          scroll={false}
          className="inline-flex h-5 w-20 translate-y-px self-center items-center justify-center rounded-full border border-black bg-[rgb(200_150_100)] px-0 text-[0.5rem] font-semibold leading-none text-black transition-transform duration-100 active:translate-y-0.5"
        >
          Log In
        </Link>
      )}
    </header>
  );
}
