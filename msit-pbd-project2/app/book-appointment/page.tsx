"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";

const clinicians = [
  {
    name: "Dr. Maria Santos",
    specialty: "Clinical Psychologist",
    description:
      "Provides compassionate support for anxiety, stress, and personal growth.",
  },
  {
    name: "Dr. Paolo Reyes",
    specialty: "Psychiatrist",
    description:
      "Helps clients understand their mental health and find practical paths toward wellness.",
  },
  {
    name: "Dr. Ana Cruz",
    specialty: "Counseling Therapist",
    description:
      "Supports individuals and families through life transitions and relationship concerns.",
  },
  {
    name: "Dr. Elena Garcia",
    specialty: "Behavioral Therapist",
    description:
      "Works with clients on healthy routines, coping strategies, and emotional resilience.",
  },
  {
    name: "Dr. Miguel Lim",
    specialty: "Clinical Counselor",
    description:
      "Offers a supportive space for self-discovery, adjustment, and personal development.",
  },
  {
    name: "Dr. Sofia Villanueva",
    specialty: "Family Therapist",
    description:
      "Helps families strengthen communication and navigate challenging experiences together.",
  },
];

export default function BookAppointment() {
  const [search, setSearch] = useState("");
  const visibleClinicians =
    search.length === 0
      ? 0
      : Math.min(clinicians.length, 1 + Math.floor((search.length - 1) / 3));

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
          {visibleClinicians > 0 && (
            <div className="mt-10 grid w-full max-w-5xl gap-6 md:grid-cols-3">
              {clinicians.slice(0, visibleClinicians).map((clinician) => (
                <article
                  key={clinician.name}
                  className="flex flex-col rounded-xl bg-[#b9c99b] p-6 text-black"
                >
                  <h2 className="text-xl font-semibold">{clinician.name}</h2>
                  <p className="mt-2 font-semibold text-[#315b46]">
                    {clinician.specialty}
                  </p>
                  <p className="mt-4 text-sm">{clinician.description}</p>
                  <div className="mt-auto pt-6">
                    <Link
                      href={`/appointment-calendar?clinician=${encodeURIComponent(clinician.name)}`}
                      className="mx-auto flex w-fit items-center justify-center rounded-full border border-black bg-[#315b46] px-4 py-1 text-sm font-semibold text-white transition-transform duration-100 active:translate-y-0.5"
                    >
                      Book
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
