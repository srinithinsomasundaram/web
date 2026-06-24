import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, HeartPulse, Factory, ShoppingBag, Truck } from "lucide-react";
import { PageHero, Section, SectionHeader } from "@/components/site/Section";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: buildSeoMeta({
      title: "Industries — Yesp Studio",
      description:
        "Industry-specific expertise applying integrated planning, AI-ready data foundations, and responsible AI at enterprise scale.",
      keywords: [
        "industry transformation",
        "regulated industries",
        "financial services",
        "retail AI",
        "healthcare modernization",
      ],
    }),
  }),
  component: Industries,
});

const industries = [
  {
    icon: Truck,
    name: "Technology & Communications",
    challenges:
      "Rapid technology shifts, infrastructure complexity, and pressure to modernize platforms while maintaining service quality.",
    solutions:
      "Cloud-native platform modernization, AI-enabled operations, observability, and customer experience optimization.",
    compliance: "ISO 27001, SOC 2, data privacy and telecom-aligned controls.",
    outcome: "Faster service innovation and resilient digital operations.",
  },
  {
    icon: Building2,
    name: "Financial Services",
    challenges: "Regulatory complexity, legacy cores, fraud, and digital-native competition.",
    solutions: "Core modernization, AI risk models, real-time payments, open banking platforms.",
    compliance: "SOC 2, PCI-DSS, FFIEC, GDPR, ISO 27001.",
    outcome: "$2.5M annual savings · 99.99% uptime · 40% lower run cost.",
  },
  {
    icon: ShoppingBag,
    name: "Retail & Consumer Goods",
    challenges:
      "Omnichannel orchestration, margin compression, and personalization expectations at scale.",
    solutions:
      "Unified commerce data, AI merchandising, supply-demand intelligence, and fulfillment optimization.",
    compliance: "PCI-DSS, GDPR, CCPA.",
    outcome: "Improved conversion, faster campaigns, and better inventory decisions.",
  },
  {
    icon: Factory,
    name: "Manufacturing & Supply Chain",
    challenges: "Aging OT systems, supply volatility, sustainability mandates, skilled-labor gaps.",
    solutions: "Industry 4.0 platforms, predictive maintenance, digital twins, MES modernization.",
    compliance: "ISA/IEC 62443, NIST CSF, ISO 27001.",
    outcome: "18% OEE improvement · 22% reduction in unplanned downtime.",
  },
  {
    icon: HeartPulse,
    name: "MedTech & Healthcare",
    challenges:
      "Interoperability challenges, rising care complexity, and pressure to improve patient outcomes with operational efficiency.",
    solutions:
      "Transform healthcare delivery through AI-driven diagnostics, digital health platforms, patient engagement solutions, and intelligent healthcare operations.",
    compliance: "HIPAA, HITRUST, FDA 21 CFR Part 11, GxP.",
    outcome:
      "Better patient engagement, smarter clinical workflows, and stronger care delivery outcomes.",
  },
];

function Industries() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Industry expertise for enterprise planning, data, and responsible AI transformation."
        description="We adapt our integrated transformation model to the regulatory, operational, and growth realities of your sector."
      />
      <Section>
        <SectionHeader
          eyebrow="Industry-specific solutions"
          title="Dedicated pages for the use cases buyers actually search for."
          description="Instead of generic transformation language, we make the industry angle explicit so stakeholders can find the right solution quickly."
        />
        <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-5">
          {[
            ["AI for Manufacturing", "/industry-solutions#manufacturing"],
            ["AI for Logistics", "/industry-solutions#logistics"],
            ["AI for Healthcare", "/industry-solutions#healthcare"],
            ["AI for Financial Services", "/industry-solutions#financial-services"],
            ["Data Engineering for Retail", "/industry-solutions#retail"],
          ].map(([label, href]) => (
            <Link key={label} to={href} className="bg-background p-6 hover:bg-card transition-colors">
              <div className="font-display text-xl leading-tight">{label}</div>
              <div className="mt-2 text-sm text-muted-foreground">Open solution page</div>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
          {industries.map((i) => (
            <article key={i.name} className="bg-background p-8 md:p-10 flex flex-col">
              <div className="flex items-start justify-between">
                <i.icon className="h-8 w-8 text-brand" strokeWidth={1.5} />
                <span className="eyebrow">Industry</span>
              </div>
              <h2 className="mt-6 font-display text-2xl md:text-3xl leading-tight tracking-tight">
                {i.name}
              </h2>

              <dl className="mt-8 space-y-5 text-sm">
                <Row label="Industry challenges" value={i.challenges} />
                <Row label="Our solutions" value={i.solutions} />
                <Row label="Compliance expertise" value={i.compliance} />
                <Row label="Business outcomes" value={i.outcome} highlight />
              </dl>

              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium border-b border-foreground self-start pb-0.5"
              >
                Learn More <ArrowUpRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-4 pt-4 border-t border-border">
      <dt className="eyebrow">{label}</dt>
      <dd
        className={highlight ? "font-medium text-foreground" : "text-foreground/80 leading-relaxed"}
      >
        {value}
      </dd>
    </div>
  );
}
