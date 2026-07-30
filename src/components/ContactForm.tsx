"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { Arrow } from "./Icons";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = () => {
    const msg = `New enquiry from ${form.name || "—"} (${form.phone || "—"}, ${
      form.email || "—"
    }): ${form.message || "—"}`;
    window.open(`${site.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  const field = "input";
  const label = "mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-ink-muted";

  return (
    <div className="card p-6 sm:p-8">
      <h3 className="card-title-lg">Send a message</h3>

      <div className="mt-6 grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>Full Name</label>
            <input className={field} placeholder="Rahul Sharma" value={form.name} onChange={set("name")} />
          </div>
          <div>
            <label className={label}>Phone Number</label>
            <input className={field} placeholder="98765 43210" value={form.phone} onChange={set("phone")} />
          </div>
        </div>
        <div>
          <label className={label}>Email Address</label>
          <input className={field} placeholder="rahul@example.com" value={form.email} onChange={set("email")} />
        </div>
        <div>
          <label className={label}>Message</label>
          <textarea
            rows={4}
            className={`${field} resize-none`}
            placeholder="I want to book a cab from Bareilly to Nainital on…"
            value={form.message}
            onChange={set("message")}
          />
        </div>

        <button onClick={submit} className="btn-taxi w-full">
          Send Message <Arrow className="h-4 w-4" />
        </button>

        <p className="text-center text-xs text-ink-muted">
          {sent
            ? "Opening WhatsApp — we typically reply within 2 hours."
            : "We typically respond within 2 hours during business hours."}
        </p>
      </div>
    </div>
  );
}
