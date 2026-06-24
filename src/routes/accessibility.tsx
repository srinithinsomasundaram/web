import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: buildSeoMeta({
      title: "Accessibility | Yesp Studio",
      description: "Yesp Studio accessibility information and contact details for assistance.",
      keywords: ["accessibility", "inclusive design", "usability support"],
    }),
  }),
  component: AccessibilityPage,
});

function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Policy"
        title="Accessibility"
        description="We aim to keep the Yesp Studio website clear, readable, and usable for as many people as possible."
      />

      <Section>
        <div className="max-w-3xl space-y-6 text-base leading-relaxed text-foreground/85">
          <p>
            We use straightforward structure, strong contrast, and semantic navigation patterns to
            support accessibility across devices.
          </p>
          <p>
            If you need assistance accessing content or have feedback on usability, please email
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
