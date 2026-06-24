import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PageHero, Section } from "@/components/site/Section";
import { studies } from "@/lib/case-studies";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/case-studies/")({
  head: () => ({
    meta: buildSeoMeta({
      title: "Case Studies — Enterprise Outcomes | Yesp Studio",
      description:
        "Browse our case studies and open each engagement for the full implementation story, outcomes, and delivery detail.",
      keywords: ["case studies", "enterprise outcomes", "delivery detail", "ROI"],
      type: "article",
    }),
  }),
  component: CaseStudies,
});

function CaseStudies() {
  const gradient = "from-slate-950 via-slate-800 to-slate-600";

  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Real engagements. Quantified outcomes."
        description="Enterprise buyers want to see numbers, not just narratives. Each study below includes measurable impact, implementation detail, and the operating model behind the result."
      />

      <Section className="bg-[linear-gradient(180deg,rgba(7,17,31,0.02),rgba(7,17,31,0.06))]">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {studies.map((study) => {
            const isFeatured = study.slug === "workflow-intelligence-slm";

            return (
              <Link
                key={study.slug}
                to="/case-studies/$slug"
                params={{ slug: study.slug }}
                className={`group flex h-full flex-col overflow-hidden rounded-[28px] border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                  isFeatured
                    ? "border-brand/35 shadow-[0_18px_50px_-18px_rgba(8,145,178,0.35)] xl:col-span-2"
                    : "border-border/70 hover:border-foreground/15"
                }`}
              >
                <div
                  className={`relative ${isFeatured ? "h-32" : "h-28"} overflow-hidden bg-gradient-to-br ${gradient}`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_32%)]" />
                  <div
                    className="absolute inset-0 opacity-12"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,.24) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.24) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 text-ink-foreground">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-[0.16em] backdrop-blur">
                          {study.industry}
                        </div>
                        {isFeatured && (
                          <div className="inline-flex rounded-full border border-white/20 bg-brand/30 px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-[0.16em] backdrop-blur">
                            Featured
                          </div>
                        )}
                      </div>
                      <h2
                        className={`mt-2 max-w-[14rem] font-display leading-tight tracking-tight ${isFeatured ? "text-xl" : "text-lg"}`}
                      >
                        {study.client}
                      </h2>
                    </div>
                    <div className="rounded-full border border-white/20 bg-white/10 p-1.5 text-ink-foreground/90 backdrop-blur transition-colors group-hover:bg-white/20">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex flex-wrap gap-2">
                    <Tag>{study.service}</Tag>
                    <Tag>{study.tech}</Tag>
                  </div>

                  <div className="mt-3 space-y-2 text-[11px] leading-relaxed text-foreground/75">
                    <p>{excerpt(study.outcome, 84)}</p>
                  </div>

                  <div className="mt-auto pt-4">
                    <div
                      className={`grid gap-2 ${isFeatured ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
                    >
                      <div className="rounded-2xl border border-border bg-background p-2">
                        <div className="font-display text-base font-semibold tracking-tight text-foreground">
                          {study.metrics[0]?.value}
                        </div>
                        <div className="mt-1 text-[9px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                          {study.metrics[0]?.label}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-border bg-background p-2">
                        <div className="font-display text-base font-semibold tracking-tight text-foreground">
                          {study.roi.split("·")[0].trim()}
                        </div>
                        <div className="mt-1 text-[9px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                          ROI signal
                        </div>
                      </div>
                      {isFeatured && (
                        <div className="rounded-2xl border border-brand/20 bg-brand/5 p-2">
                          <div className="font-display text-base font-semibold tracking-tight text-foreground">
                            {study.metrics[1]?.value ?? study.metrics[0]?.value}
                          </div>
                          <div className="mt-1 text-[9px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                            {study.metrics[1]?.label ?? "Highlight"}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.16em] text-muted-foreground transition-colors group-hover:text-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand" />
                      View full case study
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>
    </>
  );
}

function excerpt(text: string, maxLength = 96) {
  const firstSentence = text.split(".")[0]?.trim() ?? text;
  if (firstSentence.length <= maxLength) return firstSentence;
  return `${firstSentence.slice(0, maxLength - 1).trimEnd()}…`;
}

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-border bg-white/50 px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.14em] text-foreground/65 backdrop-blur">
      {children}
    </span>
  );
}
