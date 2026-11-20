"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSupabaseClient } from "@/utils/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

export default function AppointmentCalendar() {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 5, 1));
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [clinicianName, setClinicianName] = useState("Selected clinician");
  const [selectedTime, setSelectedTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const monthLabel = currentMonth.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0,
  ).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  const changeMonth = (amount: number) => {
    setCurrentMonth(
      (month) => new Date(month.getFullYear(), month.getMonth() + amount, 1),
    );
    setSelectedDate(null);
    setSelectedTime("");
    setErrorMessage("");
  };

  const requestAppointment = async (time: string) => {
    if (selectedDate === null || isSubmitting) {
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const selectedClinician =
        new URLSearchParams(window.location.search).get("clinician") ??
        clinicianName;
      setClinicianName(selectedClinician);
      const supabase = getSupabaseClient();
      const appointmentDate = `${currentMonth.getFullYear()}-${String(
        currentMonth.getMonth() + 1,
      ).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`;
      const { error } = await supabase.from("appointments").insert({
        clinician_name: selectedClinician,
        appointment_date: appointmentDate,
        time_slot: time,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setSelectedTime(time);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to send appointment request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col bg-[rgb(215_203_169)]">
      <Header />
      <div className="flex-1 px-8 py-8">
        <h1 className="text-center text-3xl font-semibold text-[#153f2e]">
          Appointment Calendar
        </h1>
        <section className="mt-8 w-full max-w-3xl rounded-xl bg-[#b9c99b] p-6 text-black">
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#315b46] text-2xl leading-none text-white transition-colors hover:bg-[#244534]"
              aria-label="Previous month"
            >
              ←
            </button>
            <h2 className="text-xl font-semibold">{monthLabel}</h2>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#315b46] text-2xl leading-none text-white transition-colors hover:bg-[#244534]"
              aria-label="Next month"
            >
              →
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold">
            {weekdays.map((weekday) => (
              <span key={weekday}>{weekday}</span>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-7 gap-2">
            {dates.map((date) => (
              <button
                type="button"
                key={date}
                aria-pressed={selectedDate === date}
                onClick={() => setSelectedDate(date)}
                className={`aspect-square rounded border border-[#153f2e]/30 text-sm transition-colors ${
                  selectedDate === date
                    ? "bg-[#315b46] text-white"
                    : "bg-white hover:bg-[#d7cba9]"
                }`}
              >
                {date}
              </button>
            ))}
          </div>
          {selectedDate !== null && (
            <div className="mt-6 rounded-lg bg-[#d7cba9] p-4">
              <h3 className="text-center font-semibold">
                Available times for {monthLabel} {selectedDate}
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
                {timeSlots.map((time) => (
                  <button
                    type="button"
                    key={time}
                    disabled={isSubmitting}
                    onClick={() => requestAppointment(time)}
                    className="rounded border border-[#153f2e]/50 bg-white px-3 py-2 text-sm transition-colors hover:bg-[#315b46] hover:text-white"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
          {errorMessage && (
            <p role="alert" className="mt-4 text-center text-sm text-red-700">
              {errorMessage}
            </p>
          )}
        </section>
      </div>
      {selectedTime && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 px-4"
        >
          <div className="w-full max-w-md rounded-xl bg-[#b9c99b] p-6 text-center text-black shadow-lg">
            <h2 className="text-xl font-semibold">
              Appointment request has been sent.
            </h2>
            <p className="mt-3 text-sm">
              {clinicianName} on {monthLabel} {selectedDate} at {selectedTime}.
            </p>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="mt-6 rounded-full border border-black bg-[#315b46] px-5 py-2 font-semibold text-white transition-transform duration-100 active:translate-y-0.5"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
}
