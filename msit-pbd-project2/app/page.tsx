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
          Kalagyo connects people in Davao and beyond with compassionate,
          accessible tele-mental health support from the comfort of home.
        </p>
        <p>
          Our platform makes it easier to find a clinician who understands
          your needs and to take the first step toward better mental
          well-being.
        </p>
        <p>
          Browse available professionals, learn about their areas of support,
          and book an appointment that fits your schedule.
        </p>
        <p>
          Whether you are managing stress, navigating a life transition, or
          looking for ongoing support, you do not have to face it alone.
        </p>
        <p>
          Start by exploring our services, asking a question, or booking a
          consultation with a member of the Kalagyo care community.
        </p>
      </section>
      <div className="flex-1" />
      <Footer />
    </main>
  );
}
