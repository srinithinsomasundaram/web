import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Brain,
  Building2,
  Cloud,
  Cpu,
  Database,
  Factory,
  FileText,
  HeartPulse,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Workflow,
  Layers3,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/site/Section";
import { findStudy } from "@/lib/case-studies";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/ai-lab")({
  head: () => ({
    meta: buildSeoMeta({
      title: "AI Yesp Lab | Enterprise AI Research | Yesp Studio",
      description:
        "AI Yesp Lab turns enterprise problems into products, accelerators, and small language model initiatives with practical research and production-ready delivery.",
      keywords: [
        "AI lab",
        "enterprise ai research",
        "SLM development",
        "AI agents",
        "industry accelerators",
        "workflow intelligence",
        "knowledge retrieval",
      ],
    }),
  }),
  component: Solutions,
});

const industries = [
  {
    accent: "from-cyan-300 via-sky-400 to-blue-500",
    title: "Financial Services",
    body: "Building AI solutions for risk intelligence, fraud detection, customer engagement, compliance automation, and operational efficiency.",
  },
  {
    accent: "from-fuchsia-300 via-violet-400 to-indigo-500",
    title: "Retail & Consumer Goods",
    body: "Researching intelligent commerce, customer personalization, demand forecasting, inventory optimization, and AI-powered shopping experiences.",
  },
  {
    accent: "from-emerald-300 via-teal-400 to-cyan-500",
    title: "MedTech & Healthcare",
    body: "Developing AI-driven healthcare platforms, clinical intelligence systems, patient engagement solutions, and healthcare workflow automation.",
  },
  {
    accent: "from-amber-200 via-orange-300 to-rose-400",
    title: "Manufacturing & Supply Chain",
    body: "Creating intelligent systems for predictive maintenance, production optimization, supply chain visibility, and industrial automation.",
  },
  {
    accent: "from-indigo-300 via-sky-400 to-cyan-400",
    title: "Technology & Communications",
    body: "Building AI copilots, developer productivity platforms, cloud optimization solutions, and next-generation digital experiences.",
  },
  {
    accent: "from-lime-300 via-emerald-400 to-teal-500",
    title: "Enterprise Operations",
    body: "Designing AI agents and automation platforms that streamline business processes, improve productivity, and accelerate decision-making.",
  },
];

const builds = [
  {
    accent: "from-cyan-300 via-sky-400 to-blue-500",
    title: "Industry AI Accelerators",
    body: "Pre-built AI frameworks and reusable components designed to solve common industry challenges faster.",
  },
  {
    accent: "from-fuchsia-300 via-violet-400 to-indigo-500",
    title: "AI Agents & Digital Workforce",
    body: "Autonomous AI agents that assist teams, automate workflows, and augment decision-making.",
  },
  {
    accent: "from-emerald-300 via-teal-400 to-cyan-500",
    title: "Enterprise AI Platforms",
    body: "Scalable platforms that integrate AI into existing business systems and operations.",
  },
  {
    accent: "from-amber-200 via-orange-300 to-rose-400",
    title: "Enterprise SLM Development",
    body: "Design, fine-tune, and deploy smaller language models for focused enterprise use cases where cost, latency, privacy, and domain specialization matter.",
  },
  {
    accent: "from-indigo-300 via-sky-400 to-cyan-400",
    title: "Innovation Prototypes",
    body: "Rapid experimentation and validation of emerging AI use cases before enterprise deployment.",
  },
  {
    accent: "from-lime-300 via-emerald-400 to-teal-500",
    title: "Research & Development",
    body: "Continuous exploration of new AI technologies, models, and applications to shape future-ready solutions.",
  },
];

const researchPillars = [
  {
    icon: Workflow,
    title: "Workflow Intelligence",
    body: "Exploring how AI can understand structured business processes, operational procedures, and organizational workflows.",
  },
  {
    icon: Search,
    title: "Knowledge Retrieval",
    body: "Investigating methods for retrieving and presenting relevant information from enterprise knowledge repositories using natural language queries.",
  },
  {
    icon: Sparkles,
    title: "Context-Aware Assistance",
    body: "Developing mechanisms that enable AI systems to generate responses based on organizational knowledge rather than generic internet information.",
  },
  {
    icon: Layers3,
    title: "Enterprise AI Architecture",
    body: "Evaluating scalable architectures for deploying lightweight AI models within enterprise environments.",
  },
];

const systemComponents = [
  {
    title: "Small Language Model",
    body: "A domain-focused language model designed for workflow assistance, knowledge support, and targeted enterprise reasoning.",
  },
  {
    title: "Retrieval-Augmented Intelligence",
    body: "Semantic search and retrieval layers that improve relevance, accuracy, and contextual grounding.",
  },
  {
    title: "Knowledge Layer",
    body: "Documentation, processes, frameworks, and operational knowledge assets organized for direct retrieval.",
  },
  {
    title: "Workflow Intelligence Engine",
    body: "A connective layer that maps user questions to the right process knowledge and contextual reference points.",
  },
];

const technicalFocus = [
  "Small Language Models",
  "Retrieval-Augmented Generation",
  "Semantic Search",
  "Vector Databases",
  "Enterprise Knowledge Systems",
  "Workflow Intelligence",
  "AI Assistants",
  "Cloud-Native Deployment",
];

const missionPoints = [
  "Bridge the gap between AI research and real-world business outcomes.",
  "Create reusable frameworks that can be adapted across industries.",
  "Develop practical AI solutions that are secure, measurable, and deployable.",
];

const featuredResearchStudy = findStudy("workflow-intelligence-slm");

function Solutions() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-cyan-400/10 bg-[#06101c] text-ink-foreground">
        <div className="absolute inset-0 hero-grid-bg opacity-20" />
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-cyan-400/18 blur-3xl animate-ai-drift" />
        <div className="absolute right-[-6rem] top-12 h-96 w-96 rounded-full bg-fuchsia-500/12 blur-3xl animate-ai-drift [animation-delay:1.6s]" />
        <div className="absolute bottom-[-8rem] left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-sky-400/12 blur-3xl animate-ai-glow" />

        <div className="container-x relative pt-24 pb-20 md:pt-32 md:pb-28">
          <div className="max-w-4xl">
            <div className="eyebrow-ink">AI Yesp Lab</div>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.22em] text-cyan-100">
              <Sparkles className="h-3.5 w-3.5 animate-ai-glow" />
              Research & Development Initiative by AI Yesp Labs
            </div>
            <h1 className="mt-6 font-display text-4xl leading-[0.96] tracking-tight md:text-6xl lg:text-[82px]">
              Build the next wave of{" "}
              <span className="bg-gradient-to-r from-cyan-200 via-sky-300 to-fuchsia-300 bg-[length:200%_100%] bg-clip-text text-transparent animate-ai-shimmer">
                enterprise AI
              </span>
              .
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-foreground/75 md:text-xl">
              AI Yesp Lab turns industry problems into products, accelerators, and enterprise SLMs
              through rapid experimentation, responsible governance, and production-ready delivery.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-ink-foreground px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-ink-foreground/90"
              >
                Discuss a pilot
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/20 px-6 py-3.5 text-sm font-medium text-ink-foreground transition-colors hover:bg-ink-foreground/10"
              >
                Browse case studies
              </Link>
            </div>

            <div className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { value: "4", label: "Research pillars" },
                { value: "6", label: "Industry focus areas" },
                { value: "8", label: "Technical building blocks" },
                { value: "ysk-1", label: "Featured SLM initiative" },
              ].map((item) => (
                <div key={item.label} className="bg-[#08101d]/85 p-6 backdrop-blur">
                  <div className="font-display text-3xl md:text-4xl">{item.value}</div>
                  <div className="mt-2 text-xs text-ink-foreground/60 leading-relaxed">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Mission"
              title="Research that moves from idea to deployable enterprise value."
              description="The lab exists to translate AI exploration into reusable patterns, practical products, and measurable outcomes."
            />
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border bg-card p-7 shadow-sm">
              <p className="text-base leading-relaxed text-foreground/85">
                We collaborate with businesses, technology leaders, domain experts, and academic
                institutions to research, experiment, validate, and develop AI-powered solutions,
                including enterprise SLMs, that create measurable business impact.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {missionPoints.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-brand">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-[linear-gradient(180deg,rgba(238,249,255,0.9),rgba(244,247,255,0.95))]">
        <SectionHeader
          eyebrow="Industries we innovate for"
          title="Deep domain research across regulated, complex environments."
          description="We focus on sectors where AI can create measurable gains without compromising security, governance, or operational integrity."
        />
        <div className="mt-14 grid gap-px border border-cyan-400/10 bg-cyan-400/10 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((item) => (
            <article
              key={item.title}
              className="group bg-white/90 p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-white"
            >
              <div
                className={`h-1.5 w-20 rounded-full bg-gradient-to-r ${item.accent} animate-ai-glow`}
              />
              <h3 className="mt-5 font-display text-xl leading-tight text-slate-900">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-[linear-gradient(180deg,rgba(7,17,31,0.03),rgba(7,17,31,0.08))]">
        <SectionHeader
          eyebrow="What we build"
          title="Products, prototypes, and enterprise SLMs."
          description="The lab covers both strategic exploration and practical delivery so promising ideas can become usable systems."
        />
        <div className="mt-14 grid gap-px border border-cyan-400/10 bg-cyan-400/10 md:grid-cols-2 lg:grid-cols-3">
          {builds.map((item) => (
            <article
              key={item.title}
              className="group bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-50"
            >
              <div
                className={`h-1.5 w-20 rounded-full bg-gradient-to-r ${item.accent} animate-ai-glow`}
              />
              <h3 className="mt-5 font-display text-xl leading-tight text-slate-900">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="ysk-1"
              title="ysk-1 is the current research thread."
              description="The initiative explores how a compact, enterprise-ready model can help teams access knowledge, understand workflows, and improve operational efficiency."
            />
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-px border border-border bg-border md:grid-cols-2">
              {researchPillars.map((item) => (
                <article key={item.title} className="bg-background p-7">
                  <item.icon className="h-6 w-6 text-brand" />
                  <h3 className="mt-5 font-display text-2xl leading-tight tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-card">
        <SectionHeader
          eyebrow="System components"
          title="The research architecture is built as four connected layers."
          description="Each layer supports targeted retrieval, grounded answers, and practical workflow assistance."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {systemComponents.map((item, idx) => (
            <article
              key={item.title}
              className="rounded-3xl border border-border bg-background p-7 shadow-sm"
            >
              <div className="font-mono text-xs text-muted-foreground">0{idx + 1}</div>
              <h3 className="mt-4 font-display text-2xl leading-tight tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Technical focus"
              title="The lab is centered on modern enterprise AI infrastructure."
              description="These are the building blocks that make the initiative useful in production settings."
            />
          </div>
          <div className="lg:col-span-7">
            <div className="flex flex-wrap gap-3">
              {technicalFocus.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-card">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="ysk-1"
              title="ysk-1"
              description="The lab’s current R&D initiative explores knowledge retrieval, workflow guidance, and context-aware assistance for enterprise teams."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/case-studies/$slug"
                params={{ slug: featuredResearchStudy?.slug ?? "workflow-intelligence-slm" }}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
              >
                View case study
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-background"
              >
                Explore resources
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-px border border-border bg-border md:grid-cols-3">
              {[
                {
                  title: "Challenge",
                  body:
                    featuredResearchStudy?.challenge ??
                    "Employees struggle to find relevant information across documentation, processes, frameworks, and internal repositories.",
                },
                {
                  title: "Solution",
                  body:
                    featuredResearchStudy?.solution ??
                    "A Workflow Intelligence SLM combining retrieval-augmented intelligence, semantic search, and enterprise knowledge layers.",
                },
                {
                  title: "Outcome",
                  body:
                    featuredResearchStudy?.outcome ??
                    "A research foundation for knowledge accessibility, workflow support, and enterprise deployment readiness.",
                },
              ].map((item) => (
                <article key={item.title} className="bg-background p-7">
                  <div className="eyebrow">{item.title}</div>
                  <p className="mt-4 text-base leading-relaxed text-foreground/85">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-[linear-gradient(180deg,rgba(7,17,31,0.03),rgba(7,17,31,0.08))]">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <div className="eyebrow">From research to reality</div>
            <p className="mt-4 max-w-3xl font-display text-3xl leading-tight tracking-tight md:text-4xl">
              Every idea explored within AI Yesp Lab is driven by a single goal: build practical AI
              solutions that solve meaningful industry problems and create lasting business value.
            </p>
          </div>
          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-border bg-background p-6">
              <div className="eyebrow">Current focus areas</div>
              <ul className="mt-4 space-y-3 text-sm text-foreground/80">
                {[
                  "Knowledge Systems",
                  "Workflow Intelligence",
                  "Applied AI Research",
                  "Enterprise AI",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-brand">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <section className="bg-ink text-ink-foreground border-t border-hairline-ink">
        <div className="container-x py-24 md:py-32 grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <div className="eyebrow-ink">Let's build what's next</div>
            <h2 className="mt-5 font-display text-4xl md:text-6xl tracking-tight leading-[1.02]">
              Ready to explore an enterprise AI pilot?
            </h2>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-ink-foreground text-ink px-6 py-4 text-sm font-medium"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
