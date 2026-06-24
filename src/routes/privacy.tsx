import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: buildSeoMeta({
      title: "Privacy Policy | Yesp Studio",
      description:
        "Yesp Studio privacy policy covering data handling, cookies, security, and contact information.",
      keywords: ["privacy policy", "cookies", "data handling", "security"],
    }),
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Policy"
        title="Privacy Policy"
        description="How Yesp Studio handles information collected through our website and services."
      />

      <Section>
        <div className="max-w-3xl space-y-6 text-base leading-relaxed text-foreground/85">
          <p>
            We collect only the information needed to respond to inquiries, improve site
            performance, and support business conversations.
          </p>
          <p>
            We do not sell personal information. We may share limited data with service providers
            that help operate the site, subject to appropriate safeguards.
          </p>
          <p>
            If you have questions about privacy or data use, contact us at
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
