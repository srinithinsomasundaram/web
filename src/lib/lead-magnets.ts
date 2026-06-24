export type LeadMagnetSlug =
  | "ai-adoption-framework"
  | "enterprise-ai-readiness-scorecard"
  | "ai-transformation-checklist"
  | "revenue-operations-playbook";

export type LeadMagnet = {
  slug: LeadMagnetSlug;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
};

export const leadMagnets: LeadMagnet[] = [
  {
    slug: "ai-adoption-framework",
    title: "AI Adoption Framework",
    subtitle: "Plan, prioritize, and sequence enterprise AI adoption.",
    description:
      "A practical framework for enterprise teams building AI capability across business, data, governance, and delivery.",
    bullets: [
      "Clarify where AI can create measurable value.",
      "Align leadership, operating model, and funding priorities.",
      "Define governance, ownership, and adoption milestones.",
      "Sequence pilots so they become production capabilities.",
    ],
  },
  {
    slug: "enterprise-ai-readiness-scorecard",
    title: "Enterprise AI Readiness Scorecard",
    subtitle: "Assess whether your organization is ready to scale AI.",
    description:
      "A scorecard to evaluate leadership alignment, data maturity, governance controls, and delivery readiness before you invest heavily.",
    bullets: [
      "Score your AI program across strategy, data, and governance.",
      "Identify gaps that slow delivery or create risk.",
      "Prioritize the next actions that unlock momentum.",
      "Use the scorecard as a discussion guide with leadership.",
    ],
  },
  {
    slug: "ai-transformation-checklist",
    title: "AI Transformation Checklist",
    subtitle: "A concise checklist for enterprise AI programs.",
    description:
      "A checklist covering operating model design, stakeholder alignment, implementation guardrails, and rollout readiness.",
    bullets: [
      "Check whether your use case is operationally ready.",
      "Review ownership, data, and governance dependencies.",
      "Validate what must be in place before go-live.",
      "Use it to structure internal planning workshops.",
    ],
  },
  {
    slug: "revenue-operations-playbook",
    title: "Revenue Operations Playbook",
    subtitle: "Improve pipeline, forecasting, and commercial execution.",
    description:
      "A playbook for teams that need better CRM discipline, forecasting confidence, and more aligned revenue operations.",
    bullets: [
      "Strengthen pipeline hygiene and stage definitions.",
      "Improve forecasting and account planning rhythms.",
      "Connect CRM data quality to commercial outcomes.",
      "Use analytics to prioritize growth opportunities.",
    ],
  },
];

export function findLeadMagnet(slug: string) {
  return leadMagnets.find((item) => item.slug === slug);
}
