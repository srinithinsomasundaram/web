import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  Layers,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { Section } from "@/components/site/Section";
import {
  findServiceOffering,
  serviceOfferings,
  type ServiceOffering,
} from "@/lib/service-offerings";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }): { service: ServiceOffering } => {
    const service = findServiceOffering(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: buildSeoMeta({
      title: `${loaderData?.service.title} | Yesp Studio`,
      description: loaderData?.service.summary ?? "Service offering details",
      keywords: [
        loaderData?.service.title ?? "service offering",
        "Yesp Studio services",
        "enterprise consulting",
      ],
    }),
  }),
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="font-display text-3xl">Service not found</h1>
      <Link to="/services" className="mt-6 inline-block underline">
        Back to services
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container-x py-32 text-center">
      <h1 className="font-display text-3xl">Something went wrong</h1>
      <p className="mt-4 text-muted-foreground text-sm">{error.message}</p>
      <Link to="/services" className="mt-6 inline-block underline">
        Back to services
      </Link>
    </div>
  ),
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { service } = Route.useLoaderData();
  const related = serviceOfferings.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <article className="relative overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(59,130,246,0.18), transparent 46%), linear-gradient(to bottom, rgba(15,23,42,0.04), transparent 34%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      />

      <section className="relative border-b border-border/70 bg-ink text-ink-foreground">
        <div className="container-x relative py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="eyebrow-ink">Service offering</div>
              <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-ink-foreground/70">
                <MetaPill>{service.slug.replace(/-/g, " ")}</MetaPill>
                <MetaPill>Enterprise service</MetaPill>
              </div>
              <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[0.98] tracking-tight md:text-6xl">
                {service.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-foreground/78 md:text-xl">
                {service.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-ink-foreground px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-ink-foreground/90"
                >
                  Discuss an engagement
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 border border-hairline-ink px-6 py-3.5 text-sm font-medium text-ink-foreground/90 transition-colors hover:bg-ink-foreground/8"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to services
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-hairline-ink bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur">
                <div className="eyebrow-ink">Engagement at a glance</div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <HeroStat
                    icon={<Users className="h-4 w-4 text-brand" />}
                    label="Audience"
                    value={service.audience}
                  />
                  <HeroStat
                    icon={<Layers className="h-4 w-4 text-brand" />}
                    label="Focus"
                    value={service.capabilities[0]}
                  />
                  <HeroStat
                    icon={<Zap className="h-4 w-4 text-brand" />}
                    label="Outcome"
                    value={service.outcomes[0]}
                  />
                  <HeroStat
                    icon={<Clock className="h-4 w-4 text-brand" />}
                    label="Engagement"
                    value={service.cta}
                  />
                </div>
                <div className="mt-6 rounded-xl border border-hairline-ink bg-black/10 p-4">
                  <div className="eyebrow-ink text-[10px]">What this service solves</div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-foreground/80">
                    {service.details}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <aside className="space-y-6 lg:col-span-4 lg:sticky lg:top-24 self-start">
            <SummaryCard
              title="Engagement model"
              icon={<Sparkles className="h-4 w-4 text-brand" />}
            >
              <div className="space-y-3">
                {service.approach.map((step, idx) => (
                  <div key={step} className="flex gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[10px] font-mono font-semibold text-brand">
                      {idx + 1}
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/80">{step}</p>
                  </div>
                ))}
              </div>
            </SummaryCard>

            <SummaryCard
              title="Outcome profile"
              icon={<CheckCircle2 className="h-4 w-4 text-brand" />}
            >
              <div className="space-y-3">
                {service.outcomes.map((outcome) => (
                  <div
                    key={outcome}
                    className="rounded-xl border border-border bg-background p-4 text-sm leading-relaxed text-foreground/85"
                  >
                    {outcome}
                  </div>
                ))}
              </div>
            </SummaryCard>

            <SummaryCard title="Audience" icon={<Users className="h-4 w-4 text-brand" />}>
              <p className="text-sm leading-relaxed text-muted-foreground">{service.audience}</p>
            </SummaryCard>

            <div className="border border-border bg-card p-7 rounded-2xl">
              <div className="eyebrow">Ready to start?</div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Let&apos;s map this service to your current priorities and delivery roadmap.
              </p>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground"
              >
                {service.cta} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>

          <main className="space-y-8 lg:col-span-8">
            <SectionCard eyebrow="Overview" title="How this service works">
              <p className="text-lg leading-relaxed text-foreground/85">{service.details}</p>
            </SectionCard>

            <SectionCard eyebrow="Service detail" title="Context, scope, and value">
              <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <p className="text-base leading-relaxed text-foreground/80">
                    {service.sections[0]?.body}
                  </p>
                  <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-5">
                    <div className="eyebrow">Service snapshot</div>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <InfoTile label="Slug" value={service.slug.replace(/-/g, " ")} />
                      <InfoTile label="Audience" value={service.audience} />
                      <InfoTile label="Primary outcome" value={service.outcomes[0]} />
                      <InfoTile label="Core capability" value={service.capabilities[0]} />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="eyebrow">Why this matters</div>
                  <ul className="mt-4 space-y-3">
                    {service.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="flex gap-3 text-sm leading-relaxed text-foreground/80"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SectionCard>

            {service.sections.map((section) => (
              <SectionCard key={section.heading} eyebrow="Service detail" title={section.heading}>
                <p className="text-base leading-relaxed text-foreground/85">{section.body}</p>
              </SectionCard>
            ))}

            <SectionCard eyebrow="Capabilities" title="What we deliver">
              <div className="grid gap-4 md:grid-cols-2">
                {service.capabilities.map((capability) => (
                  <div key={capability} className="rounded-2xl border border-border bg-card p-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-brand" />
                      <p className="text-sm leading-relaxed text-foreground/85">{capability}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard eyebrow="Outcomes" title="What success looks like">
              <div className="grid gap-4 md:grid-cols-3">
                {service.outcomes.map((outcome) => (
                  <div key={outcome} className="rounded-2xl border border-border bg-muted/30 p-5">
                    <div className="flex items-start gap-3">
                      <Sparkles className="mt-0.5 h-4 w-4 text-brand" />
                      <p className="text-sm leading-relaxed text-foreground/85">{outcome}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard eyebrow="Delivery path" title="How the engagement unfolds">
              <div className="space-y-4">
                {service.phases.map((phase, idx) => (
                  <div
                    key={phase.title}
                    className="rounded-2xl border border-border bg-background p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-mono font-semibold text-brand">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display text-lg tracking-tight text-foreground">
                          {phase.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {phase.body}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard eyebrow="FAQ" title="Common questions">
              <div className="space-y-4">
                {service.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="rounded-2xl border border-border bg-background p-5"
                  >
                    <summary className="cursor-pointer list-none font-medium text-foreground">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </SectionCard>

            {service.slug === "enterprise-slm-development" && (
              <SectionCard
                eyebrow="Enterprise SLM"
                title="Built for narrow, high-value enterprise workflows"
              >
                <p className="text-base leading-relaxed text-foreground/85">
                  This service is especially relevant when you need privacy, low latency, lower
                  inference cost, and tighter domain specialization than a general-purpose large
                  model can provide.
                </p>
              </SectionCard>
            )}
          </main>
        </div>
      </Section>

      <Section className="bg-card/40">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow">Continue exploring</div>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Back to services or talk to the team.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border border-border bg-card px-6 py-3.5 text-xs font-mono font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-background"
            >
              All services
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary px-6 py-3.5 text-xs font-mono font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-primary/95"
            >
              Discuss an engagement
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow">Related services</div>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground">
              More service offerings
            </h3>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
          >
            All services
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-px border border-border bg-border md:grid-cols-3">
          {related.map((item) => (
            <Link
              key={item.slug}
              to="/services/$slug"
              params={{ slug: item.slug }}
              className="group bg-card p-6 transition-colors hover:bg-background"
            >
              <div className="eyebrow">{item.slug.replace(/-/g, " ")}</div>
              <h4 className="mt-3 font-display text-xl tracking-tight text-foreground transition-colors group-hover:text-brand">
                {item.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
              <div className="mt-6 inline-flex items-center gap-1 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-foreground">
                Explore
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </article>
  );
}

function MetaPill({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-hairline-ink bg-white/5 px-3 py-1.5">
      {children}
    </span>
  );
}

function HeroStat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-hairline-ink bg-black/10 p-4">
      <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-ink-foreground/60">
        {icon}
        {label}
      </div>
      <div className="mt-3 text-sm font-medium leading-snug text-ink-foreground">{value}</div>
    </div>
  );
}

function SummaryCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
        {icon}
        {title}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 text-sm font-medium leading-snug text-foreground">{value}</div>
    </div>
  );
}

function SectionCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="mt-3 font-display text-2xl tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
