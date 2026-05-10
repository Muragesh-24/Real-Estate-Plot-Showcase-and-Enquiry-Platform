"use client";

import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

type EnquiryFormProps = {
  interestOptions?: string[];
};

export default function EnquiryForm({ interestOptions = [] }: EnquiryFormProps) {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!turnstileToken) {
      setStatusMessage("Please complete the human verification.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      phoneNumber: String(formData.get("phoneNumber") ?? ""),
      email: String(formData.get("email") ?? ""),
      interestedIn: String(formData.get("interestedIn") ?? ""),
      purpose: String(formData.get("purpose") ?? ""),
      preferredDate: String(formData.get("preferredDate") ?? ""),
      message: String(formData.get("message") ?? ""),
      turnstileToken,
    };

    try {
      setIsSubmitting(true);
      setStatusMessage(null);

      const res = await fetch(process.env.NEXT_PUBLIC_ENQUIRY_API_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatusMessage(data.message || "Something went wrong. Please try again.");
        return;
      }

      form.reset();
      setTurnstileToken(null);
      setStatusMessage("Thank you! We will contact you soon.");
    } catch (error) {
      setStatusMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {statusMessage ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          {statusMessage}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Full Name</span>
          <input name="fullName" required className="w-full rounded-2xl border px-4 py-3 text-sm" />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Phone Number</span>
          <input name="phoneNumber" required inputMode="tel" className="w-full rounded-2xl border px-4 py-3 text-sm" />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input name="email" type="email" className="w-full rounded-2xl border px-4 py-3 text-sm" />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Interested Plot/Layout</span>
          <select name="interestedIn" defaultValue="" className="w-full rounded-2xl border px-4 py-3 text-sm">
            <option value="">Select a plot or layout</option>
            {interestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Purpose</span>
          <select name="purpose" defaultValue="Site Visit" className="w-full rounded-2xl border px-4 py-3 text-sm">
            <option>Site Visit</option>
            <option>Pricing Details</option>
            <option>Callback</option>
            <option>General Enquiry</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Preferred Date</span>
          <input name="preferredDate" type="date" className="w-full rounded-2xl border px-4 py-3 text-sm" />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">Message</span>
        <textarea name="message" rows={5} className="w-full rounded-2xl border px-4 py-3 text-sm" />
      </label>

      <Turnstile
  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
  onSuccess={(token) => {
    console.log("Turnstile success:", token);
    setTurnstileToken(token);
  }}
  onError={(error) => {
    console.log("Turnstile error:", error);
    setStatusMessage("Human verification failed. Refresh and try again.");
    setTurnstileToken(null);
  }}
  onExpire={() => {
    console.log("Turnstile expired");
    setTurnstileToken(null);
  }}
/>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Submit Enquiry"}
      </button>
    </form>
  );
}
// + Cloudflare Turnstile
// + Lambda Function URL
// + SES
// + DynamoDB rate limit
// + strict validation