import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import { PageHero, Section, SectionHeader } from "@/components/site/Section";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/brand")({
  head: () => ({
    meta: buildSeoMeta({
      title: "Brand — Yesp Studio",
      description: "Yesp Studio brand positioning, tone, and visual identity guidance.",
      keywords: ["Yesp Studio brand", "brand guidelines", "visual identity", "tone of voice"],
    }),
  }),
  component: BrandPage,
});

function BrandPage() {
  return (
    <>
      <PageHero
        eyebrow="Brand"
        title="A clear, disciplined brand built on enterprise trust."
        description="Our brand is direct, technical when needed, and always grounded in measurable outcomes."
      />

      <Section>
        <SectionHeader eyebrow="Identity" title="What the brand should communicate." />
        <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-3">
          <Card
            title="Positioning"
            body="Enterprise planning, data, AI, and transformation delivered with rigor and accountability."
          />
          <Card
            title="Voice"
            body="Clear, concise, practical, and evidence-led. Avoid jargon unless it adds precision."
          />
          <Card
            title="Visual system"
            body="Structured layouts, restrained color use, and strong typography that signals confidence."
          />
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-card p-8">
          <div className="eyebrow">Founder profiles</div>
          <div className="mt-5 flex flex-wrap gap-3">
            <SocialLink
              href="https://www.linkedin.com/in/srinithinsomasundaram/"
              label="LinkedIn"
              icon={Linkedin}
            />
            <SocialLink
              href="https://www.instagram.com/srinithin.somasundaram/"
              label="Instagram"
              icon={Instagram}
            />
            <SocialLink href="https://x.com/Ssrinithin" label="X" icon={Twitter} />
          </div>
        </div>
      </Section>
    </>
  );
}

function SocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: typeof Linkedin;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
    >
      <Icon className="h-4 w-4" strokeWidth={1.9} />
      {label}
    </a>
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
