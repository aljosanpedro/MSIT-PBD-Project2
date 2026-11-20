import Header from "@/components/Header";
import Footer from "@/components/Footer";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dates = Array.from({ length: 31 }, (_, index) => index + 1);

export default function AppointmentCalendar() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-[rgb(215_203_169)]">
      <Header />
      <div className="flex-1 px-8 py-8">
        <h1 className="text-center text-3xl font-semibold text-[#153f2e]">
          Appointment Calendar
        </h1>
        <section className="mt-8 w-full max-w-3xl rounded-xl bg-[#b9c99b] p-6 text-black">
          <div className="mb-6 flex items-center justify-between">
            <button type="button" className="text-xl" aria-label="Previous month">
              ←
            </button>
            <h2 className="text-xl font-semibold">June 2026</h2>
            <button type="button" className="text-xl" aria-label="Next month">
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
                className="aspect-square rounded border border-[#153f2e]/30 bg-white text-sm transition-colors hover:bg-[#d7cba9]"
              >
                {date}
              </button>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
