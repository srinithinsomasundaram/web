import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/modern-slavery-statement")({
  head: () => ({
    meta: buildSeoMeta({
      title: "Modern Slavery Statement | Yesp Studio",
      description:
        "Yesp Studio modern slavery statement and commitment to ethical business practices.",
      keywords: ["modern slavery statement", "ethical sourcing", "business conduct"],
    }),
  }),
  component: ModernSlaveryStatementPage,
});

function ModernSlaveryStatementPage() {
  return (
    <>
      <PageHero
        eyebrow="Policy"
        title="Modern Slavery Statement"
        description="Our commitment to ethical sourcing, fair labor practices, and responsible business conduct."
      />

      <Section>
        <div className="max-w-3xl space-y-6 text-base leading-relaxed text-foreground/85">
          <p>
            Yesp Studio expects ethical conduct from its team members, vendors, and partners. We do
            not tolerate forced labor, human trafficking, or exploitative working conditions.
          </p>
          <p>
            If you need to raise a concern related to supplier conduct or ethical sourcing, contact
            <a href="mailto:hello@yespstudio.com" className="ml-1 underline underline-offset-4">
              hello@yespstudio.com
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
