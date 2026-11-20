import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[rgb(215_203_169)]">
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
          className="ml-6 inline-flex h-5 items-center justify-center rounded-full border border-black bg-[#315b46] px-3 text-[0.5rem] font-semibold text-white transition-transform duration-100 active:translate-y-0.5"
        >
          Book Appointment
        </Link>
      </header>
    </main>
  );
}
