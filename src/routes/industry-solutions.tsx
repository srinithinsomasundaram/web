import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, Factory, HeartPulse, ShoppingBag, Truck } from "lucide-react";
import { PageHero, Section, SectionHeader } from "@/components/site/Section";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/industry-solutions")({
  head: () => ({
    meta: buildSeoMeta({
      title: "Industry Solutions — Yesp Studio",
      description:
        "Industry-specific AI, data engineering, and transformation solutions for manufacturing, logistics, healthcare, financial services, and retail.",
      keywords: [
        "AI for manufacturing",
        "AI for logistics",
        "AI for healthcare",
        "AI for financial services",
        "data engineering for retail",
      ],
    }),
  }),
  component: IndustrySolutions,
});

const solutions = [
  {
    id: "manufacturing",
    icon: Factory,
    title: "AI for Manufacturing",
    summary:
      "Reduce unplanned downtime, forecast asset risk, and connect plant-floor data to maintenance decisions.",
    proof: ["22% reduction in unplanned downtime", "10 asset classes modeled", "6-week first model live"],
    link: "/case-studies/enterprise-manufacturer-predictive-maintenance",
  },
  {
    id: "logistics",
    icon: Truck,
    title: "AI for Logistics",
    summary:
      "Build a control tower for shipment visibility, exception handling, and carrier performance management.",
    proof: ["100% network visibility", "18% less expedited freight", "4 carriers integrated"],
    link: "/case-studies/enterprise-logistics-control-tower",
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    title: "AI for Healthcare",
    summary:
      "Unify clinical and operational data, reduce administrative overhead, and support trusted reporting.",
    proof: ["30% less admin load", "60+ sources unified", "100% audit pass rate"],
    link: "/case-studies/enterprise-healthcare-data-platform",
  },
  {
    id: "financial-services",
    icon: Building2,
    title: "AI for Financial Services",
    summary:
      "Modernize core platforms with secure, governed data foundations and automation that improves economics.",
    proof: ["40% lower infra cost", "9-month payback", "5x deploy frequency"],
    link: "/case-studies/sme-fintech-cloud-platform",
  },
  {
    id: "retail",
    icon: ShoppingBag,
    title: "Data Engineering for Retail",
    summary:
      "Create a unified commerce data layer that improves conversion, experimentation, and inventory decisions.",
    proof: ["27% conversion lift", "14-month delivery", "3 markets launched"],
    link: "/case-studies/sme-retailer-headless-commerce",
  },
];

function IndustrySolutions() {
  return (
    <>
      <PageHero
        eyebrow="Industry solutions"
        title="Specific pages for the problems enterprise buyers actually search for."
        description="We pair each industry with a measurable outcome story so buyers can understand the use case, the delivery model, and the proof."
      />

      <Section>
        <div className="grid gap-6">
          {solutions.map((solution) => (
            <article
              key={solution.id}
              id={solution.id}
              className="rounded-3xl border border-border bg-card p-8 md:p-10"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3">
                    <solution.icon className="h-7 w-7 text-brand" strokeWidth={1.5} />
                    <div className="eyebrow">{solution.id.replace("-", " ")}</div>
                  </div>
                  <h2 className="mt-5 font-display text-3xl md:text-4xl tracking-tight">
                    {solution.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {solution.summary}
                  </p>
                </div>

                <Link
                  to={solution.link}
                  className="inline-flex items-center gap-2 border-b border-foreground pb-0.5 text-sm font-medium self-start"
                >
                  View case study <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-3">
                {solution.proof.map((item) => (
                  <div key={item} className="bg-background p-5">
                    <div className="font-display text-lg tracking-tight">{item}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
