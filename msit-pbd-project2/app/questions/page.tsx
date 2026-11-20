"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Dropdown from "@/components/Dropdown";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Questions() {
  const router = useRouter();
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const returnHome = () => {
    setSubmissionMessage("");
    setIsSubmitting(false);
    setShowConfirmation(false);
    router.push("/");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionMessage("");
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");
    const contact = formData.get("contact");
    const questionType = formData.get("question-type");
    const question = formData.get("question");
    const fileValue = formData.get("supporting-files");
    const file =
      fileValue instanceof File && fileValue.size > 0 ? fileValue : null;

    if (
      typeof name !== "string" ||
      typeof contact !== "string" ||
      typeof questionType !== "string" ||
      typeof question !== "string"
    ) {
      setSubmissionMessage("Complete all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const supabase = createClient();
      let fileUrl: string | null = null;

      if (file) {
        const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const filePath = `${crypto.randomUUID()}-${safeFileName}`;
        const { error: uploadError } = await supabase.storage
          .from("question-files")
          .upload(filePath, file);

        if (uploadError) {
          setSubmissionMessage(uploadError.message);
          return;
        }

        fileUrl = supabase.storage
          .from("question-files")
          .getPublicUrl(filePath).data.publicUrl;
      }

      const { error } = await supabase.from("questions").insert({
        name,
        contact,
        question_type: questionType,
        question,
        file_url: fileUrl,
      });

      if (error) {
        setSubmissionMessage(error.message);
        return;
      }

      form.reset();
      setShowConfirmation(true);
    } catch (error) {
      setSubmissionMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit your question. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <form
            className="mx-auto mt-6 flex max-w-2xl flex-col gap-5 rounded-lg bg-[#b9c99b] p-6 text-black"
            onSubmit={handleSubmit}
          >
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
              disabled={isSubmitting}
              className="self-center rounded-full border border-black bg-[#315b46] px-6 py-2 font-semibold text-white transition-transform duration-100 active:translate-y-0.5 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            {submissionMessage && (
              <p role="status" className="text-center text-sm">
                {submissionMessage}
              </p>
            )}
          </form>
        </div>
      </div>
      {showConfirmation && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 px-4"
        >
          <div className="w-full max-w-md rounded-xl bg-[#b9c99b] p-6 text-center text-black shadow-lg">
            <h2 className="text-xl font-semibold">
              Your question was submitted.
            </h2>
            <p className="mt-3 text-sm">
              Thank you for reaching out to Kalagyo. We appreciate your
              question and will get back to you soon.
            </p>
            <button
              type="button"
              onClick={returnHome}
              className="mt-6 rounded-full border border-black bg-[#315b46] px-5 py-2 font-semibold text-white transition-transform duration-100 active:translate-y-0.5"
            >
              Return Home
            </button>
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
}
