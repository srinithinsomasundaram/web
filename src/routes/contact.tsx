import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { PageHero, Section } from "@/components/site/Section";
import { ArrowUpRight } from "lucide-react";
import { escapeHtml, sendResendEmail } from "@/lib/resend";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const formData = await request.formData();
          const data = Object.fromEntries(formData.entries());
          const result = schema.safeParse(data);

          if (!result.success) {
            return Response.json(
              { ok: false, error: result.error.issues[0]?.message ?? "Invalid submission." },
              { status: 400 },
            );
          }

          const { name, company, email, industry, size, requirements } = result.data;
          const safeName = escapeHtml(name);
          const safeCompany = escapeHtml(company);
          const safeEmail = escapeHtml(email);
          const safeIndustry = escapeHtml(industry);
          const safeSize = escapeHtml(size);
          const safeRequirements = escapeHtml(requirements).replaceAll("\n", "<br />");

          await sendResendEmail({
            from: "Yesp Studio No Reply <services@yespstudio.com>",
            to: "srinithinoffl@gmail.com",
            replyTo: email,
            subject: `New contact inquiry from ${name}`,
            text: [
              `Name: ${name}`,
              `Company: ${company}`,
              `Email: ${email}`,
              `Industry: ${industry}`,
              `Company size: ${size}`,
              "",
              "Project requirements:",
              requirements,
            ].join("\n"),
            html: `
              <h2>New contact inquiry</h2>
              <p><strong>Name:</strong> ${safeName}</p>
              <p><strong>Company:</strong> ${safeCompany}</p>
              <p><strong>Email:</strong> ${safeEmail}</p>
              <p><strong>Industry:</strong> ${safeIndustry}</p>
              <p><strong>Company size:</strong> ${safeSize}</p>
              <p><strong>Project requirements:</strong></p>
              <p>${safeRequirements}</p>
            `,
          });

          await sendResendEmail({
            from: "Yesp Studio No Reply <services@yespstudio.com>",
            to: email,
            subject: "Thanks for contacting Yesp Studio",
            text: `Hi ${name},\n\nThanks for reaching out to Yesp Studio. We received your inquiry and a senior team member will review it and respond within one business day.\n\nBest,\nYesp Studio`,
            html: `
              <p>Hi ${safeName},</p>
              <p>Thanks for reaching out to Yesp Studio. We received your inquiry and a senior team member will review it and respond within one business day.</p>
              <p>Best,<br />Yesp Studio</p>
            `,
          });

          return Response.json({ ok: true });
        } catch (error) {
          console.error("Contact form submit failed:", error);
          return Response.json(
            {
              ok: false,
              error:
                error instanceof Error
                  ? error.message
                  : "We could not send your inquiry right now.",
            },
            { status: 500 },
          );
        }
      },
    },
  },
  head: () => ({
    meta: buildSeoMeta({
      title: "Contact — Plan Your Enterprise AI Transformation | Yesp Studio",
      description:
        "Connect with Yesp Studio to align enterprise planning, data engineering, AI capability, and revenue transformation.",
      keywords: ["contact Yesp Studio", "enterprise AI consultation", "business transformation"],
    }),
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  company: z.string().trim().min(1).max(150),
  email: z.string().trim().email().max(255),
  industry: z.string().min(1),
  size: z.string().min(1),
  requirements: z.string().trim().min(20, "Please describe in at least 20 characters").max(2000),
});

const industries = [
  "Banking & Financial Services",
  "Healthcare",
  "Manufacturing",
  "Retail & E-Commerce",
  "Logistics",
  "Technology & SaaS",
  "Other",
];
const sizes = [
  "500–2,000 employees",
  "2,000–10,000 employees",
  "10,000–50,000 employees",
  "50,000+ employees",
];

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form) as Record<string, string>;
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) errs[issue.path[0] as string] = issue.message;
      setErrors(errs);
      return;
    }

    setErrors({});
    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/contact", {
        method: "POST",
        body: form,
      });
      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;
      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error ?? "We could not send your inquiry right now.");
      }
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setSubmitError(
        error instanceof Error ? error.message : "We could not send your inquiry right now.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to an AI-ingrained enterprise transformation expert."
        description="Share your planning, data, AI, or revenue challenge. A senior team member will respond within one business day."
      />
      <Section>
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="border border-border p-12 text-center">
                <div className="eyebrow">Thank you</div>
                <h2 className="mt-4 font-display text-3xl tracking-tight">
                  We've received your inquiry.
                </h2>
                <p className="mt-4 text-muted-foreground">
                  A senior team member will be in touch within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="grid sm:grid-cols-2 gap-px bg-border border border-border"
              >
                <Field label="Full name" name="name" required error={errors.name} />
                <Field label="Company" name="company" required error={errors.company} />
                <Field label="Work email" name="email" type="email" required error={errors.email} />
                <Select
                  label="Industry"
                  name="industry"
                  options={industries}
                  required
                  error={errors.industry}
                />
                <Select
                  label="Company size"
                  name="size"
                  options={sizes}
                  required
                  error={errors.size}
                  fullWidth
                />
                <div className="sm:col-span-2 bg-background p-6">
                  <label className="eyebrow">Project requirements *</label>
                  <textarea
                    name="requirements"
                    rows={6}
                    maxLength={2000}
                    placeholder="Describe your business challenge, current state, desired outcomes, timeline, and any procurement constraints."
                    className="mt-3 w-full border-0 border-b border-border bg-transparent text-base py-2 focus:outline-none focus:border-foreground resize-none"
                  />
                  {errors.requirements && (
                    <div className="mt-2 text-xs text-destructive">{errors.requirements}</div>
                  )}
                </div>
                <div className="sm:col-span-2 bg-background p-6 flex flex-wrap items-center justify-between gap-4 border-t border-border">
                  <div className="text-xs text-muted-foreground max-w-md">
                    By submitting, you agree to our processing of the information you provide to
                    respond to your inquiry.
                    <div className="mt-2">We may email you about this request.</div>
                    {submitError && <div className="mt-2 text-destructive">{submitError}</div>}
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Sending..." : "Submit inquiry"}{" "}
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
          <aside className="lg:col-span-5 space-y-10">
            <div className="border-t border-border pt-10">
              <div className="eyebrow">RFP & procurement</div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                For RFPs, vendor onboarding, or master service agreements, email{" "}
                <span className="text-foreground">hello@yespstudio.com</span>.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="bg-background p-6">
      <label className="eyebrow">
        {label}
        {required && " *"}
      </label>
      <input
        name={name}
        type={type}
        maxLength={255}
        className="mt-3 w-full border-0 border-b border-border bg-transparent text-base py-2 focus:outline-none focus:border-foreground"
      />
      {error && <div className="mt-2 text-xs text-destructive">{error}</div>}
    </div>
  );
}

function Select({
  label,
  name,
  options,
  required,
  error,
  fullWidth,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  error?: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={`bg-background p-6 ${fullWidth ? "sm:col-span-2" : ""}`}>
      <label className="eyebrow">
        {label}
        {required && " *"}
      </label>
      <select
        name={name}
        defaultValue=""
        className="mt-3 w-full border-0 border-b border-border bg-transparent text-base py-2 focus:outline-none focus:border-foreground"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && <div className="mt-2 text-xs text-destructive">{error}</div>}
    </div>
  );
}
