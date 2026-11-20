import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
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
  );
}
