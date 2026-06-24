import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { z } from "zod";
import heroImg from "@/assets/hero-enterprise.jpg";
import { PageHero, Section, SectionHeader } from "@/components/site/Section";
import { escapeHtml, sendResendEmail } from "@/lib/resend";
import { absoluteUrl } from "@/lib/site";
import { buildSeoHead } from "@/lib/seo";
import { findLeadMagnet, leadMagnets, type LeadMagnetSlug } from "@/lib/lead-magnets";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().min(1).max(150),
  leadMagnet: z.enum([
    "ai-adoption-framework",
    "enterprise-ai-readiness-scorecard",
    "ai-transformation-checklist",
    "revenue-operations-playbook",
  ]),
});

export const Route = createFileRoute("/resources")({
  head: () => ({
    ...buildSeoHead({
      title: "Resources and Lead Magnets | Yesp Studio",
      description:
        "Request Yesp Studio enterprise resources including the AI Adoption Framework, Enterprise AI Readiness Scorecard, AI Transformation Checklist, and Revenue Operations Playbook.",
      keywords: [
        "AI adoption framework",
        "enterprise AI readiness scorecard",
        "AI transformation checklist",
        "revenue operations playbook",
        "enterprise AI resources",
      ],
      canonical: absoluteUrl("/resources"),
      image: {
        url: absoluteUrl(heroImg),
        alt: "Yesp Studio enterprise transformation resources",
      },
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              name: "Resources and Lead Magnets | Yesp Studio",
              url: absoluteUrl("/resources"),
              description:
                "Request Yesp Studio enterprise resources including the AI Adoption Framework, Enterprise AI Readiness Scorecard, AI Transformation Checklist, and Revenue Operations Playbook.",
            },
            {
              "@type": "ItemList",
              name: "Yesp Studio Lead Magnets",
              itemListElement: leadMagnets.map((item, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                name: item.title,
              })),
            },
          ],
        }),
      },
    ],
  }),
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

          const magnet = findLeadMagnet(result.data.leadMagnet);
          if (!magnet) {
            return Response.json({ ok: false, error: "Lead magnet not found." }, { status: 404 });
          }

          const enterpriseSummary = `${magnet.title} for ${result.data.company}`;
          const teamFields = [
            { label: "Requester", value: result.data.name },
            { label: "Organization", value: result.data.company },
            { label: "Email", value: result.data.email },
            { label: "Requested asset", value: magnet.title },
            { label: "Delivery", value: "Email follow-up and resource summary" },
          ];
          const customerFields = [
            { label: "Account", value: result.data.company },
            { label: "Asset", value: magnet.title },
            { label: "Access", value: "Email follow-up and resource summary" },
            { label: "Support", value: "Reply to this email for follow-up" },
          ];

          await sendResendEmail({
            from: "Yesp Studio Resources <services@yespstudio.com>",
            to: "srinithinoffl@gmail.com",
            replyTo: result.data.email,
            subject: `[Resource Request] ${enterpriseSummary}`,
            text: buildEnterpriseEmailText({
              title: "Lead magnet request received",
              description: `A new enterprise resource request was submitted for ${magnet.title}.`,
              fields: teamFields,
              closing:
                "Review the request, validate the account context, and follow up if additional support is required.",
            }),
            html: buildEnterpriseEmailHtml({
              eyebrow: "Lead magnet request",
              title: "Request received from the website",
              description: `A new enterprise resource request was submitted for ${magnet.title}.`,
              fields: teamFields,
              ctaLabel: "Open request details",
            }),
          });

          await sendResendEmail({
            from: "Yesp Studio Resources <services@yespstudio.com>",
            to: result.data.email,
            subject: `Your requested resource from Yesp Studio: ${magnet.title}`,
            text: buildEnterpriseEmailText({
              title: "Your resource request was received",
              description: `Hello ${result.data.name}, your requested resource request is confirmed and we will follow up with the appropriate summary.`,
              fields: customerFields,
              closing:
                "If you need a team-specific version or want to discuss implementation, reply to this message and we will follow up.",
            }),
            html: buildEnterpriseEmailHtml({
              eyebrow: "Resource delivery",
              title: `Your ${magnet.title} request is confirmed`,
              description: `Hello ${result.data.name}, your requested resource request is confirmed and we will follow up with the appropriate summary.`,
              fields: customerFields,
              ctaLabel: "View request details",
            }),
          });

          return Response.json({ ok: true, title: magnet.title });
        } catch (error) {
          console.error("Lead magnet request failed:", error);
          return Response.json(
            {
              ok: false,
              error:
                error instanceof Error
                  ? error.message
                  : "We could not process the request right now.",
            },
            { status: 500 },
          );
        }
      },
    },
  },
  component: ResourcesPage,
});

function ResourcesPage() {
  const [selected, setSelected] = useState<LeadMagnetSlug>(leadMagnets[0].slug);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const selectedMagnet = useMemo(() => findLeadMagnet(selected) ?? leadMagnets[0], [selected]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/resources", {
        method: "POST",
        body: form,
      });
      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        title?: string;
      } | null;

      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error ?? "We could not process the request right now.");
      }

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setSubmitError(
        error instanceof Error ? error.message : "We could not process the request right now.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Useful resources for enterprise buyers."
        description="Request practical resources that help teams evaluate AI readiness, align leadership, and plan transformation before the first meeting."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-ink-foreground px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink-foreground/90"
          >
            Request Strategy Session
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="Lead capture"
              title="Request a resource by email."
              description="Choose a resource, fill out your details, and we will email a confirmation along with the relevant summary."
            />
            <div className="mt-8 rounded-3xl border border-border bg-card p-6">
              <div className="eyebrow">Selected resource</div>
              <div className="mt-3 font-display text-2xl leading-tight tracking-tight">
                {selectedMagnet.title}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {selectedMagnet.description}
              </p>
              <button
                type="button"
                onClick={() => {
                  formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-card"
              >
                <Mail className="h-4 w-4" />
                Use this resource
              </button>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="grid gap-4 md:grid-cols-2">
              {leadMagnets.map((item) => (
                <article
                  key={item.slug}
                  className="rounded-3xl border border-border bg-background p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-full border border-border bg-card px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                      Resource
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(item.slug);
                        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className="inline-flex items-center gap-1.5 text-sm font-medium"
                    >
                      Request
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                  <h3 className="mt-6 font-display text-2xl leading-tight tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <ul className="mt-5 space-y-2 text-sm text-foreground/80">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="text-brand">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div ref={formRef} className="mt-10 rounded-3xl border border-border bg-card p-7">
              <div className="eyebrow">Email gate</div>
              <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight">
                Get the selected resource by email.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Enter your details and we will send a confirmation to your inbox. The team will also
                receive the request so we can follow up if needed.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-2xl border border-border bg-background p-6">
                  <div className="eyebrow">Request sent</div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Your request has been sent. We will follow up with the resource summary.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 border border-border bg-background px-5 py-3 text-sm font-medium transition-colors hover:bg-card"
                    >
                      Talk to us
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
                  <input type="hidden" name="leadMagnet" value={selected} />
                  <Field label="Full name" name="name" required />
                  <Field label="Work email" name="email" type="email" required />
                  <Field label="Company" name="company" required className="md:col-span-2" />
                  <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                    <div className="text-xs text-muted-foreground">
                      {submitError ? (
                        <span className="text-destructive">{submitError}</span>
                      ) : (
                        "We only use this to send your requested resource summary."
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? "Sending..." : "Email me the resource"}
                      <Mail className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function buildEnterpriseEmailHtml({
  eyebrow,
  title,
  description,
  fields,
  ctaLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  fields: Array<{ label: string; value: string }>;
  ctaLabel: string;
}) {
  const fieldRows = fields
    .map(
      (field) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:12px;line-height:18px;color:#64748b;width:150px;vertical-align:top;">
            ${escapeHtml(field.label)}
          </td>
          <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:12px;line-height:18px;color:#0f172a;vertical-align:top;">
            ${escapeHtml(field.value)}
          </td>
        </tr>
      `,
    )
    .join("");

  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;margin:0;padding:0;width:100%;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="width:640px;max-width:640px;background:#ffffff;border:1px solid #e2e8f0;border-collapse:collapse;">
            <tr>
              <td style="background:#111827;padding:28px 32px;color:#ffffff;">
                <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#bfdbfe;margin-bottom:12px;">
                  Yesp Studio
                </div>
                <div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#93c5fd;margin-bottom:12px;">
                  ${escapeHtml(eyebrow)}
                </div>
                <div style="font-size:28px;line-height:34px;font-weight:600;letter-spacing:-0.03em;margin-bottom:12px;">
                  ${escapeHtml(title)}
                </div>
                <div style="font-size:14px;line-height:22px;color:#dbeafe;max-width:520px;">
                  ${escapeHtml(description)}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                  ${fieldRows}
                </table>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:28px;border-collapse:collapse;">
                  <tr>
                    <td style="background:#eff6ff;border:1px solid #dbeafe;padding:18px 20px;">
                      <div style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#1d4ed8;margin-bottom:8px;">Primary access</div>
                      <div style="font-size:14px;line-height:22px;color:#0f172a;margin-bottom:14px;">
                        This request has been received and the team will follow up with the relevant resource summary.
                      </div>
                      <span style="display:inline-block;background:#111827;color:#ffffff;text-decoration:none;padding:12px 18px;font-size:13px;font-weight:600;">
                        ${escapeHtml(ctaLabel)}
                      </span>
                    </td>
                  </tr>
                </table>
                <div style="margin-top:24px;font-size:12px;line-height:18px;color:#64748b;">
                  If you have any questions about implementation or want a tailored version of this resource for your team, reply to this email.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

function buildEnterpriseEmailText({
  title,
  description,
  fields,
  closing,
}: {
  title: string;
  description: string;
  fields: Array<{ label: string; value: string }>;
  closing: string;
}) {
  return [
    title,
    "",
    description,
    "",
    ...fields.map((field) => `${field.label}: ${field.value}`),
    "",
    closing,
  ].join("\n");
}

function Field({
  label,
  name,
  type = "text",
  required,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="eyebrow">
        {label}
        {required && " *"}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-3 w-full border-0 border-b border-border bg-transparent py-2 text-base focus:border-foreground focus:outline-none"
      />
    </div>
  );
}
