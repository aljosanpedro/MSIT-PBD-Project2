"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen w-full flex-col bg-[rgb(215_203_169)]">
      <Header />
      <div className="flex-1">
        <div className="flex flex-col items-center p-8">
          <h1 className="text-center text-3xl font-semibold text-[#153f2e]">
            Log In
          </h1>
          <form
            className="mt-8 flex w-full max-w-md flex-col gap-5"
            onSubmit={(event) => {
              event.preventDefault();
              router.push("/");
            }}
          >
            <label className="flex flex-col gap-1 text-black">
              <span className="font-semibold">Email</span>
              <input
                type="email"
                name="email"
                required
                className="rounded border border-gray-300 bg-white px-3 py-2"
              />
            </label>
            <label className="flex flex-col gap-1 text-black">
              <span className="font-semibold">Password</span>
              <input
                type="password"
                name="password"
                required
                className="rounded border border-gray-300 bg-white px-3 py-2"
              />
            </label>
            <button
              type="submit"
              className="mx-auto rounded-full border border-black bg-[#315b46] px-6 py-2 font-semibold text-white transition-transform duration-100 active:translate-y-0.5"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
