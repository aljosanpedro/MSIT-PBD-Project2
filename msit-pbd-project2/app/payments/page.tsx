import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Payments() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-[rgb(215_203_169)]">
      <Header />
      <div className="flex-1">
        <h1 className="p-8 text-center text-3xl font-semibold text-[#153f2e]">
          Payments
        </h1>
        <section className="px-8">
          <input
            type="text"
            placeholder="Place your booking code here"
            className="mx-auto block w-1/3 rounded border border-gray-300 bg-white px-3 py-2 text-center text-black placeholder:text-gray-400 lg:w-[11.111%]"
          />
          <div className="mt-4 flex flex-nowrap justify-center gap-3">
            <button
              type="button"
              className="inline-flex h-5 cursor-pointer items-center justify-center rounded-full border border-black bg-transparent px-3 text-[0.5rem] font-semibold leading-none text-black transition-transform duration-100 active:translate-y-0.5"
            >
              View Bill
            </button>
            <button
              type="button"
              className="inline-flex h-5 cursor-pointer items-center justify-center rounded-full border border-black bg-transparent px-3 text-[0.5rem] font-semibold leading-none text-black transition-transform duration-100 active:translate-y-0.5"
            >
              Request Bill Changes
            </button>
            <button
              type="button"
              className="inline-flex h-5 cursor-pointer items-center justify-center rounded-full border border-black bg-transparent px-3 text-[0.5rem] font-semibold leading-none text-black transition-transform duration-100 active:translate-y-0.5"
            >
              Apply Discount
            </button>
          </div>
          <button
            type="button"
            className="mx-auto mt-5 block rounded-full border border-black bg-[#315b46] px-6 py-1.5 text-sm font-semibold text-white transition-transform duration-100 active:translate-y-0.5"
          >
            Pay
          </button>
        </section>
      </div>
      <Footer />
    </main>
  );
}
