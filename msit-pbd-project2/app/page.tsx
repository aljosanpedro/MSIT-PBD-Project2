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
      <header className="sticky top-0 z-10 flex h-16 w-full items-center border-b border-[#153f2e]/50 bg-[rgb(215_203_169)] px-4">
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
          className={`ml-6 inline-flex h-5 w-24 translate-y-px self-center items-center justify-center rounded-full border border-black bg-[#315b46] px-0 text-[0.5rem] font-semibold leading-none text-white transition-transform duration-100 active:translate-y-0.5 ${
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
      <section className="flex-1 space-y-10 px-8 py-12 text-black">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          posuere, nisl at consequat tincidunt, libero justo tincidunt justo,
          vitae posuere sem erat a neque.
        </p>
        <p>
          Praesent commodo, massa a tincidunt faucibus, lectus nibh suscipit
          lorem, sed ullamcorper purus justo non erat. Curabitur vitae sapien
          sed nisl consequat posuere.
        </p>
        <p>
          Mauris finibus, arcu sed facilisis posuere, justo arcu suscipit
          lectus, a consequat nisl erat in neque. Donec eget libero vel nulla
          consequat volutpat.
        </p>
        <p>
          Suspendisse potenti. Aenean tincidunt, nisl at convallis feugiat,
          libero lacus feugiat lectus, vitae blandit risus sem at augue.
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.
        </p>
        <p>
          Nam euismod, erat vel tincidunt commodo, justo mauris tincidunt
          libero, at efficitur sem magna at arcu. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames.
        </p>
        <p>
          Donec volutpat, mi at accumsan fermentum, velit neque tincidunt
          mauris, id congue lectus nunc nec urna. Sed vitae lectus at augue
          malesuada consequat.
        </p>
        <p>
          Phasellus vitae orci non neque posuere tincidunt. Aliquam erat
          volutpat. Etiam at ex sed ipsum gravida tristique, quis aliquet
          mauris placerat.
        </p>
        <p>
          Nulla facilisi. Sed interdum, tortor at cursus aliquet, lorem arcu
          efficitur sem, vitae commodo justo augue nec lectus. Morbi at mauris
          ac sem feugiat luctus.
        </p>
      </section>
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
