"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function BookAppointment() {
  const [search, setSearch] = useState("");

  return (
    <main className="flex min-h-screen w-full flex-col bg-[rgb(215_203_169)]">
      <Header />
      <div className="flex-1">
        <div className="flex flex-col items-center p-8">
          <h1 className="text-center text-3xl font-semibold text-[#153f2e]">
            Book Appointment
          </h1>
          <div className="relative mt-8 w-full max-w-md">
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by date, service, symptoms, clinician..."
              className="w-full rounded border border-gray-300 bg-white px-10 py-2 text-sm text-black placeholder:text-xs placeholder:text-gray-400"
            />
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl leading-none text-gray-500"
            >
              ×
            </button>
          </div>
          <div className="mt-10 grid w-full max-w-5xl gap-6 md:grid-cols-3">
            <article className="flex flex-col rounded-xl bg-[#b9c99b] p-6 text-black">
              <h2 className="text-xl font-semibold">Dr. Maria Santos</h2>
              <p className="mt-2 font-semibold text-[#315b46]">
                Clinical Psychologist
              </p>
              <p className="mt-4 text-sm">
                Provides compassionate support for anxiety, stress, and
                personal growth.
              </p>
              <div className="mt-auto pt-6">
                <button
                  type="button"
                  className="mx-auto block rounded-full border border-black bg-[#315b46] px-4 py-1 text-sm font-semibold text-white transition-transform duration-100 active:translate-y-0.5"
                >
                  Book
                </button>
              </div>
            </article>
            <article className="flex flex-col rounded-xl bg-[#b9c99b] p-6 text-black">
              <h2 className="text-xl font-semibold">Dr. Paolo Reyes</h2>
              <p className="mt-2 font-semibold text-[#315b46]">
                Psychiatrist
              </p>
              <p className="mt-4 text-sm">
                Helps clients understand their mental health and find
                practical paths toward wellness.
              </p>
              <div className="mt-auto pt-6">
                <button
                  type="button"
                  className="mx-auto block rounded-full border border-black bg-[#315b46] px-4 py-1 text-sm font-semibold text-white transition-transform duration-100 active:translate-y-0.5"
                >
                  Book
                </button>
              </div>
            </article>
            <article className="flex flex-col rounded-xl bg-[#b9c99b] p-6 text-black">
              <h2 className="text-xl font-semibold">Dr. Ana Cruz</h2>
              <p className="mt-2 font-semibold text-[#315b46]">
                Counseling Therapist
              </p>
              <p className="mt-4 text-sm">
                Supports individuals and families through life transitions and
                relationship concerns.
              </p>
              <div className="mt-auto pt-6">
                <button
                  type="button"
                  className="mx-auto block rounded-full border border-black bg-[#315b46] px-4 py-1 text-sm font-semibold text-white transition-transform duration-100 active:translate-y-0.5"
                >
                  Book
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
