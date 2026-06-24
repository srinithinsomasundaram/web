import { createFileRoute } from "@tanstack/react-router";
import { Building2, Compass, ShieldCheck, Users } from "lucide-react";
import { PageHero, Section, SectionHeader } from "@/components/site/Section";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/enterprise")({
  head: () => ({
    meta: buildSeoMeta({
      title: "Enterprise — Yesp Studio",
      description:
        "Enterprise planning, data, AI, and transformation services for complex organizations.",
      keywords: ["enterprise transformation", "enterprise AI", "data strategy", "operating model"],
    }),
  }),
  component: EnterprisePage,
});

function EnterprisePage() {
  return (
    <>
      <PageHero
        eyebrow="Enterprise"
        title="Systems, operating models, and AI capability for complex organizations."
        description="This page summarizes the enterprise lens we apply across planning, data, automation, and revenue delivery."
      />

      <Section>
        <SectionHeader
          eyebrow="Focus"
          title="Built for scale, governance, and measurable outcomes."
        />
        <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-3">
          <Card
            title="Planning"
            body="Align strategy, finance, operations, and delivery into one execution model."
          />
          <Card
            title="Data and AI"
            body="Create trusted foundations that support analytics, automation, and responsible AI adoption."
          />
          <Card
            title="Execution"
            body="Translate priorities into repeatable programs with clear ownership and measurable value."
          />
        </div>
      </Section>

      <Section className="bg-card">
        <SectionHeader
          eyebrow="Delivery model"
          title="A clear process that reduces perceived risk."
          description="Discovery, assessment, pilot, deployment, governance, and support are explained up front so stakeholders know what happens next."
        />
        <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
          {[
            ["Discovery", "Understand goals, constraints, and success metrics before any build begins."],
            ["Assessment", "Map the current state, data maturity, and risk surface for the engagement."],
            ["Pilot", "Prove value with a narrowly scoped, measurable first release."],
            ["Deployment", "Move the pilot into production with release controls and monitoring."],
            ["Governance", "Keep decision-making, security, and auditability visible to stakeholders."],
            ["Support", "Provide handover, optimization, and ongoing operational support after launch."],
          ].map(([title, body]) => (
            <article key={title} className="bg-background p-8">
              <div className="eyebrow">Step</div>
              <h3 className="mt-4 font-display text-2xl tracking-tight">{title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Enterprise trust" title="The proof points buyers expect to see." />
        <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: Users,
              title: "Senior-led delivery",
              body: "A founder-led team with specialist pods matched to scope and complexity.",
            },
            {
              icon: Building2,
              title: "Technology partnerships",
              body: "Experience across AWS, Azure, Snowflake, Vercel, and modern data stacks.",
            },
            {
              icon: ShieldCheck,
              title: "Security practices",
              body: "Governance, role-based access, auditability, and controlled deployments by default.",
            },
            {
              icon: Compass,
              title: "Geographic coverage",
              body: "Support and delivery across India, the UK, the US, Germany, and remote teams.",
            },
          ].map((item) => (
            <article key={item.title} className="bg-background p-7">
              <item.icon className="h-6 w-6 text-brand" strokeWidth={1.5} />
              <h3 className="mt-5 font-display text-xl tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <article className="bg-background p-8">
      <h2 className="font-display text-2xl tracking-tight">{title}</h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </article>
  );
}
