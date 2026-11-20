"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Payments() {
  const router = useRouter();
  const [bookingCode, setBookingCode] = useState("");
  const [showBill, setShowBill] = useState(false);
  const [showBillChanges, setShowBillChanges] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [billChangeMessage, setBillChangeMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBillChangeSubmitting, setIsBillChangeSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showBillChangeConfirmation, setShowBillChangeConfirmation] =
    useState(false);
  const canUseActions = bookingCode.length === 6;
  const canPay = canUseActions && !showBillChanges;
  const actionButtonClass = canUseActions
    ? "inline-flex h-5 cursor-pointer items-center justify-center rounded-full border border-black bg-transparent px-3 text-[0.5rem] font-semibold leading-none text-black transition-transform duration-100 active:translate-y-0.5"
    : "inline-flex h-5 cursor-not-allowed items-center justify-center rounded-full border border-gray-400 bg-gray-300 px-3 text-[0.5rem] font-semibold leading-none text-gray-500";

  const handlePay = async () => {
    if (!canPay || isSubmitting) {
      return;
    }

    setPaymentMessage("");
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("payments")
        .insert({ booking_code: bookingCode });

      if (error) {
        setPaymentMessage(error.message);
        return;
      }

      setShowConfirmation(true);
    } catch (error) {
      setPaymentMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit payment. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBillChangeSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    setBillChangeMessage("");
    setIsBillChangeSubmitting(true);

    const formData = new FormData(form);
    const requestedChange = formData.get("bill-change");
    const details = formData.get("bill-change-details");

    if (typeof requestedChange !== "string" || typeof details !== "string") {
      setBillChangeMessage("Complete all required fields.");
      setIsBillChangeSubmitting(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.from("bill_change_requests").insert({
        booking_code: bookingCode,
        requested_change: requestedChange,
        details,
      });

      if (error) {
        setBillChangeMessage(error.message);
        return;
      }

      form.reset();
      setShowBillChangeConfirmation(true);
    } catch (error) {
      setBillChangeMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit your request. Please try again.",
      );
    } finally {
      setIsBillChangeSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col bg-[rgb(215_203_169)]">
      <Header />
      <div className="flex-1">
        <h1 className="p-8 text-center text-3xl font-semibold text-[#153f2e]">
          Payments
        </h1>
        <section className="px-8 pb-8">
          <input
            type="text"
            placeholder="Place your booking code here"
            value={bookingCode}
            maxLength={6}
            onChange={(event) => {
              const value = event.target.value;
              setBookingCode(value);
              if (value.length !== 6) {
                setShowBill(false);
                setShowBillChanges(false);
              }
            }}
            className="mx-auto block w-1/3 rounded border border-gray-300 bg-white px-3 py-2 text-center text-black placeholder:text-gray-400 lg:w-[11.111%]"
          />
          <div className="mt-4 flex flex-nowrap justify-center gap-3">
            <button
              type="button"
              disabled={!canUseActions}
              onClick={() => {
                setShowBill((visible) => !visible);
                setShowBillChanges(false);
              }}
              className={actionButtonClass}
            >
              View Bill
            </button>
            <button
              type="button"
              disabled={!canUseActions}
              onClick={() => {
                setShowBillChanges((visible) => !visible);
                setShowBill(false);
              }}
              className={actionButtonClass}
            >
              Request Bill Changes
            </button>
          </div>
          {showBill && (
            <div className="mx-auto mt-4 w-1/3 rounded-lg bg-gray-200 p-4 text-sm text-black">
              <div className="flex justify-between">
                <span>Consultation</span>
                <span>₱1,000.00</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span>Service fee</span>
                <span>₱100.00</span>
              </div>
              <div className="mt-3 flex justify-between border-t border-gray-400 pt-2 font-semibold">
                <span>Total</span>
                <span>₱1,100.00</span>
              </div>
            </div>
          )}
          {showBillChanges && (
            <form
              onSubmit={handleBillChangeSubmit}
              className="mx-auto mt-4 flex w-1/3 flex-col gap-4 rounded-lg bg-gray-200 p-4 text-sm text-black"
            >
              <fieldset className="flex flex-col gap-2">
                <legend className="font-semibold">
                  What change would you like to request?
                </legend>
                <label className="mt-2 flex items-center gap-2">
                  <input
                    type="radio"
                    name="bill-change"
                    value="amount"
                    required
                  />
                  Bill amount
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="bill-change"
                    value="service"
                  />
                  Service details
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="bill-change"
                    value="personal-details"
                  />
                  Personal details
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="bill-change" value="other" />
                  Other
                </label>
              </fieldset>
              <label className="flex flex-col gap-1">
                <span className="font-semibold">
                  Any details that could help us?
                </span>
                <textarea
                  name="bill-change-details"
                  rows={4}
                  required
                  className="resize-y rounded border border-gray-400 bg-white px-2 py-1"
                />
              </label>
              <button
                type="submit"
                disabled={isBillChangeSubmitting}
                className="mx-auto rounded-full border border-black bg-[#315b46] px-4 py-1 font-semibold text-white transition-transform duration-100 active:translate-y-0.5 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
              >
                {isBillChangeSubmitting ? "Submitting..." : "Submit"}
              </button>
              {billChangeMessage && (
                <p role="status" className="text-center text-sm">
                  {billChangeMessage}
                </p>
              )}
            </form>
          )}
          <button
            type="button"
            disabled={!canPay}
            onClick={handlePay}
            className={`mx-auto mt-5 block rounded-full border px-6 py-1.5 text-sm font-semibold ${
              canPay
                ? "cursor-pointer border-black bg-[#315b46] text-white transition-transform duration-100 active:translate-y-0.5"
                : "cursor-not-allowed border-gray-400 bg-gray-300 text-gray-500"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Pay"}
          </button>
          {paymentMessage && (
            <p role="status" className="mt-3 text-center text-sm text-black">
              {paymentMessage}
            </p>
          )}
        </section>
      </div>
      {showConfirmation && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 px-4"
        >
          <div className="w-full max-w-md rounded-xl bg-[#b9c99b] p-6 text-center text-black shadow-lg">
            <h2 className="text-xl font-semibold">
              Payment request submitted.
            </h2>
            <p className="mt-3 text-sm">
              Thank you. Your payment request has been received.
            </p>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="mt-6 rounded-full border border-black bg-[#315b46] px-5 py-2 font-semibold text-white transition-transform duration-100 active:translate-y-0.5"
            >
              Return Home
            </button>
          </div>
        </div>
      )}
      {showBillChangeConfirmation && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 px-4"
        >
          <div className="w-full max-w-md rounded-xl bg-[#b9c99b] p-6 text-center text-black shadow-lg">
            <h2 className="text-xl font-semibold">
              Bill changes request submitted.
            </h2>
            <p className="mt-3 text-sm">
              Thank you. Your request has been received.
            </p>
            <button
              type="button"
              onClick={() => router.push("/")}
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
