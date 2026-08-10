"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { site } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { getTranslation } from "@/data/translations";

type Status = "idle" | "loading" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  // Honeypot: bots fill this hidden field; humans never see it.
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState<string>("");
  const { lang } = useLanguage();
  const t = getTranslation(lang).contact;

  function validate(): boolean {
    const e: Errors = {};
    if (!values.name.trim()) e.name = t.errors.name;
    if (!values.email.trim()) e.email = t.errors.email;
    else if (!emailRe.test(values.email)) e.email = t.errors.emailInvalid;
    if (!values.message.trim()) e.message = t.errors.message;
    else if (values.message.trim().length < 10)
      e.message = t.errors.messageShort;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setServerMsg("");
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setServerMsg(data.error ?? t.form.errorDefault);
        return;
      }
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setServerMsg(t.form.networkError);
    }
  }

  function field(name: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
    if (status !== "idle") setStatus("idle");
  }

  return (
    <section id="contact" className="relative py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson-700/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Left: direct channels */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <a
              href={site.links.email}
              className="card-surface flex items-center gap-3 rounded-xl p-4 transition-colors hover:border-crimson-500/40"
            >
              <Mail className="h-5 w-5 text-crimson-500" />
              <div>
                <p className="text-xs text-white/40">{t.channels.email}</p>
                <p className="text-sm text-white">{site.email}</p>
              </div>
            </a>
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="card-surface flex items-center gap-3 rounded-xl p-4 transition-colors hover:border-crimson-500/40"
            >
              <Github className="h-5 w-5 text-crimson-500" />
              <div>
                <p className="text-xs text-white/40">{t.channels.github}</p>
                <p className="text-sm text-white">@{site.githubUsername}</p>
              </div>
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="card-surface flex items-center gap-3 rounded-xl p-4 transition-colors hover:border-crimson-500/40"
            >
              <Linkedin className="h-5 w-5 text-crimson-500" />
              <div>
                <p className="text-xs text-white/40">{t.channels.linkedin}</p>
                <p className="text-sm text-white">in/miguelmedinamml</p>
              </div>
            </a>
            <div className="card-surface flex items-center gap-3 rounded-xl p-4">
              <MapPin className="h-5 w-5 text-crimson-500" />
              <div>
                <p className="text-xs text-white/40">{t.channels.location}</p>
                <p className="text-sm text-white">{site.location}</p>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.form
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={onSubmit}
            noValidate
            className="card-surface relative rounded-2xl p-6 sm:p-8"
          >
            {/* Honeypot — hidden from users and assistive tech */}
            <div className="pointer-events-none absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="company">
                {lang === "es" ? "Empresa (dejar vacío)" : "Company (leave empty)"}
              </label>
              <input
                id="company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="mb-1.5 block text-sm text-white/70">
                  {t.form.nameLabel}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={(e) => field("name", e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={cn(
                    "w-full rounded-xl border bg-ink-950/60 px-4 py-2.5 text-sm text-white placeholder-white/30 transition-colors focus:outline-none",
                    errors.name
                      ? "border-crimson-500"
                      : "border-white/10 focus:border-crimson-500/60",
                  )}
                  placeholder={t.form.namePlaceholder}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-crimson-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="email" className="mb-1.5 block text-sm text-white/70">
                  {t.form.emailLabel}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => field("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={cn(
                    "w-full rounded-xl border bg-ink-950/60 px-4 py-2.5 text-sm text-white placeholder-white/30 transition-colors focus:outline-none",
                    errors.email
                      ? "border-crimson-500"
                      : "border-white/10 focus:border-crimson-500/60",
                  )}
                  placeholder={t.form.emailPlaceholder}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-crimson-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm text-white/70"
                >
                  {t.form.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={(e) => field("message", e.target.value)}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={cn(
                    "w-full resize-none rounded-xl border bg-ink-950/60 px-4 py-2.5 text-sm text-white placeholder-white/30 transition-colors focus:outline-none",
                    errors.message
                      ? "border-crimson-500"
                      : "border-white/10 focus:border-crimson-500/60",
                  )}
                  placeholder={t.form.messagePlaceholder}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-xs text-crimson-400">
                    {errors.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-crimson-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-crimson-500 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> {t.form.sending}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> {t.form.send}
                  </>
                )}
              </button>

              {status === "success" && (
                <span
                  role="status"
                  className="inline-flex items-center gap-1.5 text-sm text-emerald-400"
                >
                  <CheckCircle2 className="h-4 w-4" /> {t.form.successMsg}
                </span>
              )}
              {status === "error" && (
                <span
                  role="alert"
                  className="inline-flex items-center gap-1.5 text-sm text-crimson-400"
                >
                  <AlertCircle className="h-4 w-4" /> {serverMsg}
                </span>
              )}
            </div>

            <p className="mt-4 text-xs text-white/30">{t.form.note}</p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
