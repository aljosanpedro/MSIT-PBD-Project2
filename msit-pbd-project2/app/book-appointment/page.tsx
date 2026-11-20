"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Clinician = {
  id: number;
  name: string;
  role: string;
  description: string;
  days_available: string;
  times_available: string;
};

export default function BookAppointment() {
  const [search, setSearch] = useState("");
  const [clinicians, setClinicians] = useState<Clinician[]>([]);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    const searchTerm = search.trim();
    let isActive = true;
    const timeout = window.setTimeout(async () => {
      if (!searchTerm) {
        setClinicians([]);
        setSearchError("");
        return;
      }

      const escapedTerm = searchTerm.replace(/[%_(),]/g, "\\$&");
      const supabase = createClient();
      const { data, error } = await supabase
        .from("clinicians")
        .select(
          "id, name, role, description, days_available, times_available",
        )
        .or(
          `name.ilike.%${escapedTerm}%,role.ilike.%${escapedTerm}%,description.ilike.%${escapedTerm}%,days_available.ilike.%${escapedTerm}%,times_available.ilike.%${escapedTerm}%`,
        )
        .order("name")
        .limit(20);

      if (!isActive) {
        return;
      }

      if (error) {
        setSearchError(error.message);
        setClinicians([]);
        return;
      }

      setSearchError("");
      setClinicians(data ?? []);
    }, 250);

    return () => {
      isActive = false;
      window.clearTimeout(timeout);
    };
  }, [search]);

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
              placeholder="Search by day of week, service, symptoms, clinician name..."
              className="w-full rounded border border-gray-300 bg-white px-10 py-2 text-sm text-black placeholder:text-xs placeholder:text-gray-400"
            />
          </div>
          {searchError && (
            <p role="alert" className="mt-6 text-center text-sm text-red-700">
              {searchError}
            </p>
          )}
          {clinicians.length > 0 && (
            <div className="mt-10 grid w-full max-w-5xl gap-6 md:grid-cols-3">
              {clinicians.map((clinician) => (
                <article
                  key={clinician.name}
                  className="flex flex-col rounded-xl bg-[#b9c99b] p-6 text-black"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {clinician.name}
                      </h2>
                      <p className="mt-2 font-semibold text-[#315b46]">
                        {clinician.role}
                      </p>
                    </div>
                    <div className="shrink-0 rounded bg-[#d7cba9] px-2 py-1 text-right text-[0.55rem] leading-3">
                      <p className="font-semibold">Available</p>
                      <p>{clinician.days_available}</p>
                      <p>{clinician.times_available}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm">{clinician.description}</p>
                  <div className="mt-auto pt-6">
                    <Link
                      href={`/appointment-calendar?clinician=${encodeURIComponent(
                        clinician.name,
                      )}&days=${encodeURIComponent(
                        clinician.days_available,
                      )}&times=${encodeURIComponent(
                        clinician.times_available,
                      )}&role=${encodeURIComponent(clinician.role)}`}
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
