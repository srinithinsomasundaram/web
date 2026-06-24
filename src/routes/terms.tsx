import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: buildSeoMeta({
      title: "Terms of Use | Yesp Studio",
      description:
        "Yesp Studio terms of use for website access, content usage, and service inquiries.",
      keywords: ["terms of use", "website terms", "content usage"],
    }),
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Policy"
        title="Terms of Use"
        description="The basic terms that apply when using the Yesp Studio website."
      />

      <Section>
        <div className="max-w-3xl space-y-6 text-base leading-relaxed text-foreground/85">
          <p>
            Content on this site is provided for general information only and may change without
            notice.
          </p>
          <p>
            You may not copy, reproduce, or redistribute site content without prior written
            permission, except where permitted by law.
          </p>
          <p>
            For questions about these terms, email
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
