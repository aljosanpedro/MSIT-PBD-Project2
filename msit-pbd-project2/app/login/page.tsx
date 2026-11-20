"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getSupabaseClient } from "@/utils/supabase";

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      setErrorMessage("Enter your email and password.");
      setIsSubmitting(false);
      return;
    }

    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      router.push("/");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to log in. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
            onSubmit={handleSubmit}
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
            {errorMessage && (
              <p role="alert" className="text-center text-sm text-red-700">
                {errorMessage}
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mx-auto rounded-full border border-black bg-[#315b46] px-6 py-2 font-semibold text-white transition-transform duration-100 active:translate-y-0.5"
            >
              {isSubmitting ? "Logging In..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
