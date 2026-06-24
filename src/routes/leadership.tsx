import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, Users, ShieldCheck, MapPinned } from "lucide-react";
import { PageHero, Section, SectionHeader } from "@/components/site/Section";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/leadership")({
  head: () => ({
    meta: buildSeoMeta({
      title: "Leadership — Yesp Studio",
      description:
        "Meet the founder, delivery leadership, technical leads, and consulting approach behind Yesp Studio.",
      keywords: ["Yesp Studio leadership", "founder", "delivery leadership", "technical leads"],
    }),
  }),
  component: Leadership,
});

const leaders = [
  {
    name: "Srinithin Somasundaram",
    role: "Founder & CEO",
    body: "Owns client strategy, the public point of view, and the operating discipline behind enterprise engagements.",
  },
  {
    name: "Senior Delivery Pod",
    role: "Delivery Leadership",
    body: "Runs discovery, assessment, pilot, deployment, governance, and support with clear accountability.",
  },
  {
    name: "Principal Architect",
    role: "Technical Leadership",
    body: "Leads solution architecture, security posture, and the delivery standards for modern platforms.",
  },
  {
    name: "Consulting Bench",
    role: "Key Consultants",
    body: "Specialists in data engineering, AI enablement, product delivery, and enterprise change management.",
  },
];

const trustFacts = [
  {
    icon: Users,
    title: "Senior-led pods",
    body: "Small, accountable delivery teams matched to engagement scope and complexity.",
  },
  {
    icon: ShieldCheck,
    title: "Security-minded delivery",
    body: "Governance, auditability, and access control are planned into the engagement from day one.",
  },
  {
    icon: MapPinned,
    title: "Global coverage",
    body: "The team operates across India, the UK, the US, Germany, and broader remote delivery zones.",
  },
  {
    icon: Building2,
    title: "Technology partnerships",
    body: "Built to work across AWS, Azure, Snowflake, Vercel, and modern data and AI stacks.",
  },
];

function Leadership() {
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="Enterprise buyers want to know who is accountable."
        description="This page makes the leadership structure visible so stakeholders can see the people, the roles, and the delivery discipline behind the work."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
          >
            Request Strategy Session <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 border border-border px-5 py-3 text-sm font-medium"
          >
            Review outcomes
          </Link>
        </div>
      </PageHero>

      <Section>
        <SectionHeader
          eyebrow="Leadership team"
          title="Founder, delivery, technical, and consulting leadership."
        />
        <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2">
          {leaders.map((leader) => (
            <article key={leader.role} className="bg-background p-8">
              <div className="eyebrow">{leader.role}</div>
              <h2 className="mt-4 font-display text-2xl tracking-tight">{leader.name}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{leader.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-card">
        <SectionHeader
          eyebrow="Enterprise trust"
          title="What enterprise buyers expect to see."
        />
        <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-4">
          {trustFacts.map((fact) => (
            <article key={fact.title} className="bg-background p-7">
              <fact.icon className="h-6 w-6 text-brand" strokeWidth={1.5} />
              <h3 className="mt-5 font-display text-xl tracking-tight">{fact.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{fact.body}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
