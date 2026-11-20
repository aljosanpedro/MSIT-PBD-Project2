import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Dropdown from "@/components/Dropdown";

export default function Questions() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-[rgb(215_203_169)]">
      <Header />
      <div className="flex-1">
        <div className="p-8">
          <h1 className="text-center text-3xl font-semibold text-[#153f2e]">
            Frequently Asked Questions
          </h1>
          <div className="mt-8 flex flex-col items-center gap-4">
            <Dropdown label="What is Kalagyo?">
              <p className="p-4 text-black">
                Kalagyo provides Davao-based tele-mental health services.
              </p>
            </Dropdown>
            <Dropdown label="Who can use Kalagyo?">
              <p className="p-4 text-black">
                Kalagyo is available to people seeking accessible mental
                health support.
              </p>
            </Dropdown>
            <Dropdown label="How do I book an appointment?">
              <p className="p-4 text-black">
                Use the Book Appointment button to begin scheduling a session.
              </p>
            </Dropdown>
          </div>
          <h2 className="mt-10 text-center text-2xl font-semibold text-[#153f2e]">
            Still have questions?
          </h2>
          <form className="mx-auto mt-6 flex max-w-2xl flex-col gap-5 rounded-lg bg-[#b9c99b] p-6 text-black">
            <label className="flex flex-col gap-1">
              <span className="font-semibold">Name</span>
              <input
                type="text"
                name="name"
                required
                className="rounded border border-[#153f2e]/50 bg-white px-3 py-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-semibold">Contact Details</span>
              <input
                type="text"
                name="contact"
                required
                className="rounded border border-[#153f2e]/50 bg-white px-3 py-2"
              />
            </label>
            <fieldset className="flex flex-col gap-2">
              <legend className="font-semibold">
                What kind of question do you have?
              </legend>
              <label className="mt-2 flex items-center gap-2">
                <input type="radio" name="question-type" value="general" required />
                General Information
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="question-type" value="appointment" />
                Appointment
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="question-type" value="payment" />
                Payment
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="question-type" value="support" />
                Mental Health Support
              </label>
            </fieldset>
            <label className="flex flex-col gap-1">
              <span className="font-semibold">What&apos;s your question?</span>
              <textarea
                name="question"
                required
                rows={5}
                className="resize-y rounded border border-[#153f2e]/50 bg-white px-3 py-2"
              />
            </label>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">
                Are there any pictures or files that could support your
                question?
              </span>
              <label
                htmlFor="supporting-files"
                className="w-fit cursor-pointer rounded border border-black bg-gray-200 px-3 py-2"
              >
                Choose File
                <input
                  id="supporting-files"
                  type="file"
                  name="supporting-files"
                  className="sr-only"
                />
              </label>
            </div>
            <button
              type="submit"
              className="self-center rounded-full border border-black bg-[#315b46] px-6 py-2 font-semibold text-white transition-transform duration-100 active:translate-y-0.5"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
