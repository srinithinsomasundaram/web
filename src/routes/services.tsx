import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero, Section } from "@/components/site/Section";
import { serviceOfferings } from "@/lib/service-offerings";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: buildSeoMeta({
      title: "Service Offerings | Yesp Studio",
      description:
        "Explore Yesp Studio service offerings across planning, data, digital transformation, AI capability, revenue growth, cloud modernization, software engineering, and managed technology services.",
      keywords: [
        "service offerings",
        "enterprise consulting",
        "data engineering",
        "AI transformation",
        "cloud modernization",
      ],
    }),
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Service Offerings"
        title="Simple, clear services built for enterprise outcomes."
        description="Explore each offering to see how we solve business challenges and deliver measurable value."
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
          {serviceOfferings.map((service) => (
            <article key={service.slug} className="bg-background p-8 md:p-10">
              <h2 className="font-display text-2xl leading-tight tracking-tight">
                {service.title}
              </h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {service.summary}
              </p>
              <Link
                to="/contact"
                className="mt-7 inline-flex items-center gap-2 border border-foreground px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Get Quote
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
