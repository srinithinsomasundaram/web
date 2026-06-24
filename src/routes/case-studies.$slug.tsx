import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  CheckCircle2,
  Clock,
  Code,
  Layers,
  Terminal,
  Users,
  Zap,
} from "lucide-react";
import { findStudy, type Study } from "@/lib/case-studies";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }): { study: Study } => {
    const study = findStudy(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => ({
    meta: buildSeoMeta({
      title: `${loaderData?.study.client} — Case Study | Yesp Studio`,
      description: loaderData?.study.outcome ?? "Case study",
      keywords: [
        loaderData?.study.client ?? "case study",
        loaderData?.study.industry ?? "enterprise transformation",
        "Yesp Studio case study",
      ],
      type: "article",
    }),
  }),
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="font-display text-3xl">Case study not found</h1>
      <Link to="/case-studies" className="mt-6 inline-block underline">
        Back to case studies
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container-x py-32 text-center">
      <h1 className="font-display text-3xl">Something went wrong</h1>
      <p className="mt-4 text-muted-foreground text-sm">{error.message}</p>
      <Link to="/case-studies" className="mt-6 inline-block underline">
        Back to case studies
      </Link>
    </div>
  ),
  component: StudyPage,
});

const codeExamples = {
  "dispute-router.ts": `import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({ region: "us-east-1" });

export async function triageDispute(disputeText: string) {
  const prompt = \`
  You are an SRE Fraud and Ledger anomaly triage agent. 
  Categorize the following dispute and extract the priority (HIGH/MEDIUM/LOW).
  
  Dispute: "\${disputeText}"
  
  Output JSON format exactly: { "category": string, "priority": "HIGH"|"MEDIUM"|"LOW", "confidence": number }
  \`;

  const response = await client.send(new InvokeModelCommand({
    modelId: "anthropic.claude-3-5-sonnet-v1:0",
    contentType: "application/json",
    body: JSON.stringify({
      max_tokens: 150,
      prompt: prompt,
      temperature: 0.1
    })
  }));
  
  return JSON.parse(new TextDecoder().decode(response.body));
}`,
  "routing-rules.json": `{
  "source": ["yesp.fintech.ledger"],
  "detail-type": ["TransactionFailed"],
  "detail": {
    "errorCode": ["DB_LOCK_TIMEOUT", "TRANSACTION_TIMEOUT"],
    "retryCount": [{ "numeric": [">=", 3] }]
  },
  "targets": [
    {
      "arn": "arn:aws:sns:us-east-1:123456789012:FraudTriageQueue",
      "deadLetterConfig": {
        "arn": "arn:aws:sqs:us-east-1:123456789012:EventBridgeLedgerDLQ"
      }
    }
  ]
}`,
  "fargate-task.tf": `resource "aws_ecs_task_definition" "ledger_service" {
  family                   = "yesp-ledger-service"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "1024"
  memory                   = "2048"
  execution_role_arn       = aws_iam_role.ecs_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([{
    name      = "ledger-app"
    image     = "\${var.repository_url}:latest"
    essential = true
    portMappings = [{
      containerPort = 8080
      hostPort      = 8080
    }]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = "/ecs/yesp-ledger-service"
        "awslogs-region"        = "us-east-1"
        "awslogs-stream-prefix" = "ledger"
      }
    }
  }])
}`,
} satisfies Record<string, string>;

function StudyPage() {
  const { study } = Route.useLoaderData();
  const [activeArchTab, setActiveArchTab] = useState<"legacy" | "modern">("modern");
  const [activeMilestone, setActiveMilestone] = useState<number | null>(0);
  const [activeCodeTab, setActiveCodeTab] =
    useState<keyof typeof codeExamples>("dispute-router.ts");

  const isFintech = study.slug === "sme-fintech-cloud-platform";

  return (
    <article className="relative overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(59,130,246,0.18), transparent 46%), linear-gradient(to bottom, rgba(15,23,42,0.04), transparent 34%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      />

      <section className="relative border-b border-border/70 bg-ink text-ink-foreground">
        <div className="container-x relative py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="eyebrow-ink">Case study</div>
              <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-ink-foreground/70">
                <MetaPill>{study.industry}</MetaPill>
                <MetaPill>{study.service}</MetaPill>
                <MetaPill>{study.tech}</MetaPill>
              </div>
              <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[0.98] tracking-tight md:text-6xl">
                {study.client}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-foreground/78 md:text-xl">
                {study.outcome}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-ink-foreground px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-ink-foreground/90"
                >
                  Discuss an engagement
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/case-studies"
                  className="inline-flex items-center gap-2 border border-hairline-ink px-6 py-3.5 text-sm font-medium text-ink-foreground/90 transition-colors hover:bg-ink-foreground/8"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to case studies
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-hairline-ink bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur">
                <div className="eyebrow-ink">Engagement at a glance</div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <HeroStat
                    icon={<Clock className="h-4 w-4 text-brand" />}
                    label="Timeline"
                    value={study.timeline}
                  />
                  <HeroStat
                    icon={<Users className="h-4 w-4 text-brand" />}
                    label="Team"
                    value={study.team}
                  />
                  <HeroStat
                    icon={<Layers className="h-4 w-4 text-brand" />}
                    label="Industry"
                    value={study.industry}
                  />
                  <HeroStat
                    icon={<CheckCircle2 className="h-4 w-4 text-brand" />}
                    label="ROI"
                    value={study.roi}
                  />
                </div>
                <div className="mt-6 rounded-xl border border-hairline-ink bg-black/10 p-4">
                  <div className="eyebrow-ink text-[10px]">Engagement summary</div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-foreground/80">
                    {study.challenge}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="container-x py-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-12">
            <aside className="space-y-6 lg:col-span-4 lg:sticky lg:top-24 self-start">
              <SummaryCard title="What changed" icon={<Zap className="h-4 w-4 text-brand" />}>
                <p className="text-sm leading-relaxed text-muted-foreground">{study.solution}</p>
              </SummaryCard>

              <SummaryCard title="Approach" icon={<Code className="h-4 w-4 text-brand" />}>
                <ul className="space-y-3">
                  {study.approach.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-foreground/80"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </SummaryCard>

              <SummaryCard title="Metrics" icon={<Activity className="h-4 w-4 text-brand" />}>
                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  {study.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-xl border border-border bg-card p-4">
                      <div className="font-display text-3xl font-semibold tracking-tight text-brand">
                        {metric.value}
                      </div>
                      <div className="mt-2 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </SummaryCard>

              {study.testimonial && (
                <SummaryCard
                  title="Client signal"
                  icon={<CheckCircle2 className="h-4 w-4 text-brand" />}
                >
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    “{study.testimonial.quote}”
                  </p>
                  <div className="mt-4 border-l border-border pl-4">
                    <div className="text-sm font-medium text-foreground">
                      {study.testimonial.author}
                    </div>
                    <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                      {study.testimonial.role}
                    </div>
                  </div>
                </SummaryCard>
              )}
            </aside>

            <main className="space-y-8 lg:col-span-8">
              <SectionCard
                eyebrow="Engagement overview"
                title="Context, scope, and success criteria"
              >
                <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <p className="text-base leading-relaxed text-foreground/80">
                      {study.detailed.context}
                    </p>
                    <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-5">
                      <div className="eyebrow">Project snapshot</div>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <InfoTile label="Timeline" value={study.timeline} />
                        <InfoTile label="Team" value={study.team} />
                        <InfoTile label="Industry" value={study.industry} />
                        <InfoTile label="Primary stack" value={`${study.tech} cloud native`} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="eyebrow">Objectives</div>
                    <ul className="mt-4 space-y-3">
                      {study.detailed.objectives.map((objective) => (
                        <li
                          key={objective}
                          className="flex gap-3 text-sm leading-relaxed text-foreground/80"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SectionCard>

              <SectionCard eyebrow="Challenge" title="Why the work started">
                <p className="text-base leading-relaxed text-foreground/80">{study.challenge}</p>
              </SectionCard>

              <SectionCard eyebrow="Solution" title="What we built">
                <p className="text-base leading-relaxed text-foreground/80">{study.solution}</p>
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {study.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl border border-border bg-muted/40 p-4"
                    >
                      <div className="font-display text-2xl font-semibold tracking-tight text-foreground">
                        {metric.value}
                      </div>
                      <div className="mt-2 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {study.architecture && (
                <SectionCard eyebrow="Architecture" title="Legacy versus modern flow">
                  <div className="rounded-2xl border border-border bg-card shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
                      <div className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                        Platform structure
                      </div>
                      <div className="inline-flex rounded-full bg-muted p-1 text-[10px] font-mono uppercase tracking-[0.16em]">
                        <button
                          onClick={() => setActiveArchTab("legacy")}
                          className={`rounded-full px-3 py-1.5 transition-colors ${
                            activeArchTab === "legacy"
                              ? "bg-background text-foreground shadow-sm"
                              : "text-muted-foreground"
                          }`}
                        >
                          Legacy
                        </button>
                        <button
                          onClick={() => setActiveArchTab("modern")}
                          className={`rounded-full px-3 py-1.5 transition-colors ${
                            activeArchTab === "modern"
                              ? "bg-background text-foreground shadow-sm"
                              : "text-muted-foreground"
                          }`}
                        >
                          Modern
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-px bg-border md:grid-cols-2">
                      <div className="bg-background p-6">
                        <div className="eyebrow">
                          {activeArchTab === "legacy" ? "Legacy stack" : "Legacy state"}
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {study.architecture.legacyDesc}
                        </p>
                      </div>
                      <div className="bg-background p-6">
                        <div className="eyebrow">
                          {activeArchTab === "modern" ? "Modern stack" : "Target state"}
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {study.architecture.modernDesc}
                        </p>
                      </div>
                    </div>
                  </div>
                </SectionCard>
              )}

              {isFintech && (
                <SectionCard eyebrow="Engineering" title="Playbook excerpt">
                  <div className="rounded-2xl border border-border bg-card shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                        <Code className="h-4 w-4 text-brand" />
                        Technical spec
                      </div>
                      <div className="inline-flex rounded-full bg-muted p-1 text-[10px] font-mono uppercase tracking-[0.16em]">
                        {Object.keys(codeExamples).map((key) => (
                          <button
                            key={key}
                            onClick={() => setActiveCodeTab(key as keyof typeof codeExamples)}
                            className={`rounded-full px-3 py-1.5 transition-colors ${
                              activeCodeTab === key
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground"
                            }`}
                          >
                            {key}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="overflow-x-auto bg-ink p-5 text-[11px] font-mono text-ink-foreground md:p-6 md:text-xs">
                      <pre className="whitespace-pre">{codeExamples[activeCodeTab]}</pre>
                    </div>
                    <div className="border-t border-border bg-muted/40 p-4 text-xs text-muted-foreground">
                      {activeCodeTab === "dispute-router.ts" &&
                        "Figure 2.1: Asynchronous Bedrock wrapper routing dispute text into high-confidence classifications."}
                      {activeCodeTab === "routing-rules.json" &&
                        "Figure 2.2: EventBridge rule set for failed transactions and triage queue handoff."}
                      {activeCodeTab === "fargate-task.tf" &&
                        "Figure 2.3: ECS Fargate task definition with logging, networking, and capacity controls."}
                    </div>
                  </div>
                </SectionCard>
              )}

              {study.milestones && (
                <SectionCard eyebrow="Execution" title="Migration timeline">
                  <p className="text-base leading-relaxed text-muted-foreground">
                    The engagement ran as a phased migration. Each stage below can be expanded to
                    inspect the delivery shape.
                  </p>
                  <div className="mt-8 space-y-4">
                    {study.milestones.map((milestone, index) => {
                      const isActive = activeMilestone === index;
                      return (
                        <button
                          key={milestone.phase}
                          onClick={() => setActiveMilestone(isActive ? null : index)}
                          className="w-full rounded-2xl border border-border bg-card p-5 text-left transition-colors hover:border-foreground/20"
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`mt-1 h-3 w-3 shrink-0 rounded-full border ${
                                isActive
                                  ? "border-brand bg-brand"
                                  : "border-muted-foreground/40 bg-background"
                              }`}
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-3">
                                <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-brand">
                                  {milestone.phase}
                                </span>
                                <span className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                                  {milestone.duration}
                                </span>
                              </div>
                              <h3 className="mt-3 font-display text-lg tracking-tight text-foreground md:text-xl">
                                {milestone.title}
                              </h3>
                              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                {milestone.description}
                              </p>

                              {isActive && (
                                <div className="mt-5 rounded-xl border border-border bg-muted/30 p-4">
                                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                                    <Terminal className="h-3.5 w-3.5" />
                                    Technical deliverables
                                  </div>
                                  <ul className="mt-3 space-y-2">
                                    {milestone.bulletPoints.map((point) => (
                                      <li
                                        key={point}
                                        className="flex gap-3 text-sm leading-relaxed text-foreground/80"
                                      >
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                                        <span>{point}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </SectionCard>
              )}

              <SectionCard eyebrow="Delivery" title="How the work was executed">
                <div className="grid gap-4">
                  {study.detailed.execution.map((step, index) => (
                    <div key={step} className="rounded-2xl border border-border bg-background p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-mono font-semibold text-brand">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <p className="text-sm leading-relaxed text-foreground/80">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard eyebrow="Governance" title="Controls and delivery rhythm">
                <p className="text-base leading-relaxed text-foreground/80">
                  {study.detailed.governance}
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {study.detailed.businessImpact}
                </p>
              </SectionCard>

              <SectionCard eyebrow="Outcome" title="Results and next steps">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <div className="eyebrow">Business outcome</div>
                    <div className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand">
                      {study.roi}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {study.outcome}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-muted/30 p-6">
                    <div className="eyebrow">Next phase</div>
                    <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                      {study.detailed.nextPhase}
                    </p>
                  </div>
                </div>
              </SectionCard>
            </main>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card/40">
        <div className="container-x py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-brand/20 bg-brand/10 text-brand">
              <Zap className="h-5 w-5" />
            </div>
            <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Have similar architecture bottlenecks?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              We can map the same modernization pattern to your infrastructure, release process, and
              operating model.
            </p>
            <div className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary px-6 py-3.5 text-xs font-mono font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-primary/95"
              >
                Discuss an engagement
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-background">
        <div className="container-x py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="eyebrow">Continue exploring</div>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground">
              Back to the case study index or get in touch.
            </h3>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 border border-border bg-card px-6 py-3.5 text-xs font-mono font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-background"
              >
                All case studies
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary px-6 py-3.5 text-xs font-mono font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-primary/95"
              >
                Discuss an engagement
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}

function MetaPill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-hairline-ink bg-white/5 px-3 py-1.5">
      {children}
    </span>
  );
}

function HeroStat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-hairline-ink bg-black/10 p-4">
      <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-ink-foreground/60">
        {icon}
        {label}
      </div>
      <div className="mt-3 text-sm font-medium leading-snug text-ink-foreground">{value}</div>
    </div>
  );
}

function SummaryCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
        {icon}
        {title}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 text-sm font-medium leading-snug text-foreground">{value}</div>
    </div>
  );
}

function SectionCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="mt-3 font-display text-2xl tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
