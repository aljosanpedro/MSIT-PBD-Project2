"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [bookPressed, setBookPressed] = useState(false);

  const openQuestions = () => {
    setBookPressed(true);
    window.setTimeout(() => {
      router.push("/questions");
    }, 120);
  };

  return (
    <main className="flex min-h-screen w-full flex-col bg-[rgb(215_203_169)]">
      <header className="flex h-16 w-full items-center px-4 border-b border-[#153f2e]/50">
        <Image
          src="/kalagyo_logo_full.png"
          alt="Kalagyo Davao Tele-Mental Health"
          width={240}
          height={64}
          priority
          className="h-full w-auto object-contain"
        />
        <Link
          href="/book-appointment"
          className={`ml-6 inline-flex h-5 w-24 -translate-y-px self-center items-center justify-center rounded-full border border-black bg-[#315b46] px-0 text-[0.5rem] font-semibold leading-none text-white transition-transform duration-100 active:translate-y-0.5 ${
            bookPressed ? "translate-y-0.5" : ""
          }`}
        >
          Book Appointment
        </Link>
        <button
          type="button"
          onClick={openQuestions}
          className="ml-2 inline-flex h-5 w-24 translate-y-px self-center items-center justify-center rounded-full border border-black bg-transparent px-0 text-[0.5rem] font-semibold leading-none text-black transition-transform duration-100 active:translate-y-0.5"
        >
          Ask Questions
        </button>
        <Link
          href="/payments"
          className="ml-2 inline-flex h-5 translate-y-px self-center items-center justify-center whitespace-nowrap rounded-full border border-black bg-transparent px-2 text-[0.45rem] font-semibold leading-none text-black transition-transform duration-100 active:translate-y-0.5"
        >
          Make a Payment
        </Link>
        <Link
          href="/login"
          className="ml-2 inline-flex h-5 w-20 translate-y-px self-center items-center justify-center rounded-full border border-black bg-[rgb(200_150_100)] px-0 text-[0.5rem] font-semibold leading-none text-black transition-transform duration-100 active:translate-y-0.5"
        >
          Log In
        </Link>
      </header>
      <div className="flex-1" />
      <footer
        aria-label="Footer"
        className="flex h-16 w-full shrink-0 items-center justify-between border-t border-[#153f2e]/50 px-4"
      >
        <Image
          src="/kalagyo_logo_full.png"
          alt="Kalagyo Davao Tele-Mental Health"
          width={120}
          height={32}
          className="h-1/2 w-auto object-contain"
        />
        <nav
          aria-label="Footer navigation"
          className="flex flex-col justify-center text-[0.5rem] leading-3 text-blue-900 underline"
        >
          <Link href="/book-appointment">Book Appointment</Link>
          <Link href="/questions">Ask Questions</Link>
          <Link href="/payments">Make a Payment</Link>
          <Link href="/login">Log In</Link>
        </nav>
        <div className="flex flex-col justify-center text-[0.5rem] leading-3 text-black">
          <span>0918 689 7244</span>
          <span>kalagyo.dvo@gmail.com</span>
          <Image
            src="/socmed_logos.png"
            alt="Social media"
            width={219}
            height={39}
            className="h-[18px] w-auto object-contain"
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
    </main>
  );
}
