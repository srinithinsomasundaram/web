import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Linkedin } from "lucide-react";
import founderPortrait from "@/assets/DSC07731 2.jpg";
import { PageHero, Section, SectionHeader } from "@/components/site/Section";
import { insights } from "@/lib/insights";
import { absoluteUrl } from "@/lib/site";
import { buildSeoHead } from "@/lib/seo";

const featuredArticleSlugs = [
  "integrated-business-planning-with-ai",
  "building-ai-ready-data-foundations",
  "responsible-ai-at-enterprise-scale",
] as const;

const featuredArticles = featuredArticleSlugs
  .map((slug) => insights.find((item) => item.slug === slug))
  .filter((item): item is (typeof insights)[number] => Boolean(item));

const founderPrinciples = [
  {
    title: "Clear ownership",
    body: "Enterprise buyers need to know who is accountable, what gets measured, and how decisions are made.",
  },
  {
    title: "Integrated delivery",
    body: "Planning, data, AI, and execution should move together instead of becoming disconnected workstreams.",
  },
  {
    title: "Responsible AI by default",
    body: "Governance and traceability are built into the operating model, not added after the fact.",
  },
  {
    title: "Capability that compounds",
    body: "Every engagement should leave the organization stronger, clearer, and easier to operate.",
  },
];

const founderStory = [
  "Yesp Studio was founded in 2023 to help enterprises avoid fragmented transformation programs that solve one problem and create three more.",
  "The company focuses on practical change across planning, data, AI, digital operations, and revenue execution.",
  "The public profile matters because enterprise buyers want to see the operator behind the company, not just the logo on the homepage.",
];

export const Route = createFileRoute("/founder")({
  head: () => ({
    ...buildSeoHead({
      title: "Founder — Srinithin Somasundaram | Yesp Studio",
      description:
        "Meet Srinithin Somasundaram, founder and CEO of Yesp Studio, and explore the thinking, LinkedIn presence, and thought leadership behind the company.",
      keywords: [
        "Srinithin Somasundaram",
        "Yesp Studio founder",
        "founder story",
        "enterprise AI leadership",
      ],
      canonical: absoluteUrl("/founder"),
      image: {
        url: absoluteUrl(founderPortrait),
        alt: "Portrait of Srinithin Somasundaram, founder of Yesp Studio",
      },
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              name: "Founder — Srinithin Somasundaram | Yesp Studio",
              url: absoluteUrl("/founder"),
              description:
                "Meet Srinithin Somasundaram, founder and CEO of Yesp Studio, and explore the thinking, LinkedIn presence, and thought leadership behind the company.",
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: absoluteUrl(founderPortrait),
              },
            },
            {
              "@type": "Person",
              name: "Srinithin Somasundaram",
              jobTitle: "Founder & CEO",
              url: absoluteUrl("/founder"),
              image: absoluteUrl(founderPortrait),
              sameAs: [
                "https://www.linkedin.com/in/srinithinsomasundaram/",
                "https://www.instagram.com/srinithin.somasundaram/",
                "https://x.com/Ssrinithin",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Yesp Studio",
                url: absoluteUrl("/"),
              },
              description:
                "Founder and CEO of Yesp Studio, focused on enterprise planning, data, AI, and digital transformation.",
              nationality: "Indian",
            },
          ],
        }),
      },
    ],
  }),
  component: FounderPage,
});

function FounderPage() {
  return (
    <>
      <PageHero
        eyebrow="Founder"
        title="Srinithin Somasundaram leads Yesp Studio with a public enterprise point of view."
        description="Enterprise buyers should be able to see who runs the company, how the work is led, and where the thinking comes from. This page makes that visible."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="https://www.linkedin.com/in/srinithinsomasundaram/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-ink-foreground px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink-foreground/90"
          >
            <Linkedin className="h-4 w-4" />
            View LinkedIn profile
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-ink-foreground/30 px-5 py-3 text-sm font-medium transition-colors hover:bg-ink-foreground/10"
          >
            Request Strategy Session
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
              <div className="relative">
                <img
                  src={founderPortrait}
                  alt="Portrait of Srinithin Somasundaram, founder of Yesp Studio"
                  width={1600}
                  height={1024}
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent p-6 text-ink-foreground">
                  <div className="eyebrow-ink">Founder & CEO</div>
                  <div className="mt-2 font-display text-2xl tracking-tight">
                    Srinithin Somasundaram
                  </div>
                  <div className="mt-2 text-sm text-ink-foreground/70">
                    Yesp Studio · Founded 2023 · Based in India
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="Founder story"
              title="Why Yesp Studio exists."
              description="The company was built for enterprise teams that need one accountable partner across planning, data, AI, and execution."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {founderStory.map((item, idx) => (
                <article key={item} className="rounded-3xl border border-border bg-background p-6">
                  <div className="font-mono text-xs text-muted-foreground">0{idx + 1}</div>
                  <p className="mt-4 text-base leading-relaxed text-foreground/80">{item}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 rounded-3xl border border-border bg-card p-7">
              <div className="eyebrow">Public profile</div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                The LinkedIn profile is the clearest place to verify background, connect directly,
                and follow the founder's updates and commentary.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/srinithinsomasundaram/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  <Linkedin className="h-4 w-4" />
                  Connect on LinkedIn
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-card"
                >
                  Book AI Transformation Assessment
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section ink>
        <SectionHeader
          ink
          eyebrow="Operating principles"
          title="What the founder expects from the work."
          description="The company is designed to deliver measurable outcomes with clarity, discipline, and long-term accountability."
        />
        <div className="mt-14 grid gap-px border border-hairline-ink bg-hairline-ink md:grid-cols-2 xl:grid-cols-4">
          {founderPrinciples.map((item, idx) => (
            <article key={item.title} className="bg-ink p-8">
              <div className="font-mono text-xs text-ink-foreground/45">P/0{idx + 1}</div>
              <h3 className="mt-6 font-display text-2xl tracking-tight">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-foreground/70">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Thought leadership"
          title="Recent writing from the founder."
          description="These articles show how the founder thinks about enterprise planning, AI readiness, and responsible scale."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredArticles.map((article) => (
            <Link
              key={article.slug}
              to="/insights/$slug"
              params={{ slug: article.slug }}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden bg-ink">
                <img
                  src={article.image}
                  alt={article.title}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center gap-3 text-xs">
                  <span className="eyebrow">{article.tag}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">{article.date}</span>
                </div>
                <h3 className="mt-4 font-display text-2xl leading-tight tracking-tight">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {article.excerpt}
                </p>
                <div className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-medium">
                  Read article
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-card">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <div className="eyebrow">LinkedIn integration</div>
            <h2 className="mt-4 font-display text-3xl md:text-4xl leading-tight tracking-tight">
              Follow the founder where enterprise buyers actually verify people.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              If a buyer wants to validate the company behind the website, LinkedIn is the fastest
              path to the founder's background, public updates, and direct connection.
            </p>
          </div>
          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <a
              href="https://www.linkedin.com/in/srinithinsomasundaram/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Open LinkedIn profile
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
