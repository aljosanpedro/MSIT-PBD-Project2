"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Signup() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const emailValue = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if (
      typeof emailValue !== "string" ||
      typeof password !== "string" ||
      typeof confirmPassword !== "string"
    ) {
      setMessage("Complete all required fields.");
      setIsSubmitting(false);
      return;
    }

    const email = emailValue.trim().toLowerCase();

    if (!email) {
      setMessage("Enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      router.push("/");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to create your account. Please try again.",
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
            Sign Up
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
                minLength={6}
                required
                className="rounded border border-gray-300 bg-white px-3 py-2"
              />
            </label>
            <label className="flex flex-col gap-1 text-black">
              <span className="font-semibold">Confirm Password</span>
              <input
                type="password"
                name="confirm-password"
                minLength={6}
                required
                className="rounded border border-gray-300 bg-white px-3 py-2"
              />
            </label>
            {message && (
              <p role="status" className="text-center text-sm text-black">
                {message}
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mx-auto rounded-full border border-black bg-[#315b46] px-6 py-2 font-semibold text-white transition-transform duration-100 active:translate-y-0.5 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
            <p className="text-center text-sm text-black">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-900 underline">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
