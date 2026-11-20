import Image from "next/image";

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
      </header>
    </main>
  );
}
