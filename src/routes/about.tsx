import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero, Section, SectionHeader } from "@/components/site/Section";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: buildSeoMeta({
      title: "About Yesp Studio — Enterprise AI Transformation Partner",
      description:
        "Learn about Yesp Studio’s mission, operating model, and values behind enterprise planning, data, AI, and transformation services.",
      keywords: ["about Yesp Studio", "enterprise AI partner", "transformation consulting"],
    }),
  }),
  component: About,
});

const values = [
  {
    title: "Outcomes before activity",
    desc: "We focus on measurable business value, not isolated technology outputs.",
  },
  {
    title: "Integrated by design",
    desc: "Planning, data, AI, and operations are built as one connected system.",
  },
  {
    title: "Responsible by default",
    desc: "Governance, traceability, and accountability are embedded into every delivery.",
  },
  {
    title: "Capability that compounds",
    desc: "Each engagement strengthens long-term enterprise capability, not just short-term wins.",
  },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Yesp Studio"
        title="An AI-ingrained transformation partner for modern enterprise teams."
        description="We help organizations unify enterprise planning, data engineering, AI capability, and revenue execution into one scalable operating model."
      />

      <Section>
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="eyebrow">Mission</div>
            <h2 className="mt-5 font-display text-3xl md:text-4xl leading-tight tracking-tight">
              To deliver measurable enterprise outcomes through integrated planning, data, and
              responsible AI.
            </h2>
          </div>
          <div className="lg:col-span-7 text-base leading-relaxed text-foreground/80 space-y-4">
            <p>
              Founded in 2023, Yesp Studio was built on a clear conviction: enterprise
              transformation succeeds when strategy, execution, and technology move in lockstep.
            </p>
            <p>
              We work across banking, healthcare, manufacturing, retail, logistics, and technology
              to turn fragmented initiatives into a unified transformation engine.
            </p>
            <p>
              Our teams emphasize senior accountability, rigorous delivery, and responsible AI
              practices that sustain value beyond the initial program.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Values" title="How we operate." />
        <div className="mt-14 grid md:grid-cols-2 gap-px bg-border border border-border">
          {values.map((v, idx) => (
            <div key={v.title} className="bg-background p-10">
              <div className="font-mono text-xs text-muted-foreground">V/0{idx + 1}</div>
              <h3 className="mt-6 font-display text-2xl tracking-tight">{v.title}</h3>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-card">
        <SectionHeader
          eyebrow="Leadership"
          title="Make the people behind the logo visible."
          description="Enterprise buyers want to see who leads the work and how the team is structured before they commit."
        />
        <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2">
          <article className="bg-background p-8">
            <div className="eyebrow">Founder</div>
            <h3 className="mt-4 font-display text-2xl tracking-tight">Srinithin Somasundaram</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Leads the company vision, client relationships, and the enterprise point of view.
            </p>
          </article>
          <article className="bg-background p-8">
            <div className="eyebrow">Leadership team</div>
            <h3 className="mt-4 font-display text-2xl tracking-tight">
              Senior delivery and technical pods
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Specialists across strategy, delivery, architecture, data, and AI support each
              engagement.
            </p>
          </article>
        </div>
        <div className="mt-8">
          <Link
            to="/leadership"
            className="inline-flex items-center gap-2 text-sm font-medium border-b border-foreground pb-0.5"
          >
            View the leadership page <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}
