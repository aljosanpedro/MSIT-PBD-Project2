"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-[rgb(215_203_169)]">
      <Header />
      <section className="flex-1 space-y-10 px-8 py-12 text-black">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold">Kalagyo</h1>
          <p className="text-xl font-normal">Davao Tele-Mental Health</p>
        </div>
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
      </section>
      <div className="flex-1" />
      <Footer />
    </main>
  );
}
