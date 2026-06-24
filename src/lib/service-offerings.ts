export type ServiceOffering = {
  slug: string;
  title: string;
  summary: string;
  details: string;
  audience: string;
  approach: string[];
  capabilities: string[];
  outcomes: string[];
  sections: { heading: string; body: string }[];
  phases: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
  cta: string;
};

export const serviceOfferings: ServiceOffering[] = [
  {
    slug: "enterprise-business-planning",
    title: "Enterprise Business Planning",
    summary:
      "Align technology, operations, and business strategy to accelerate growth, improve efficiency, and drive measurable outcomes.",
    details:
      "We integrate strategic, financial, operational, and technology planning into one execution model so priorities, investments, and delivery outcomes stay aligned.",
    audience:
      "Strategy, finance, operations, and transformation leaders who need one planning model across the enterprise.",
    approach: [
      "Assess current planning cadence and decision bottlenecks.",
      "Align operating assumptions across teams and business units.",
      "Build scenario models and governance for review cycles.",
      "Translate priorities into measurable quarterly execution plans.",
    ],
    capabilities: [
      "Strategic and operating plan alignment",
      "Cross-functional planning governance",
      "Scenario and portfolio optimization",
    ],
    outcomes: [
      "Faster planning cycles",
      "Better resource utilization",
      "Improved execution accountability",
    ],
    sections: [
      {
        heading: "Where it helps most",
        body: "This service is built for organizations that need one planning rhythm across strategy, finance, operations, and technology, especially when priorities are changing faster than the annual planning cycle can handle.",
      },
      {
        heading: "Typical deliverables",
        body: "Operating-plan templates, scenario models, governance cadences, investment prioritization frameworks, and execution scorecards that keep leadership aligned after planning is complete.",
      },
      {
        heading: "Outcome focus",
        body: "The goal is not just a better planning deck. It is a repeatable operating model that connects goals, capacity, and delivery so teams can execute with fewer surprises.",
      },
    ],
    phases: [
      {
        title: "Discovery and alignment",
        body: "We map the planning cycle, identify decision bottlenecks, and establish a shared view of priorities and constraints.",
      },
      {
        title: "Scenario and operating model design",
        body: "We build the governance rhythm, scenarios, and planning artifacts that connect strategy to execution.",
      },
      {
        title: "Rollout and cadence support",
        body: "We help operationalize the model so leadership can keep planning current and execution-focused.",
      },
    ],
    faqs: [
      {
        question: "How quickly can this start?",
        answer:
          "Most engagements begin with a short discovery sprint focused on current-state planning, decision rights, and output quality.",
      },
      {
        question: "Do you replace existing planning tools?",
        answer:
          "Not usually. We align process and governance around the tools you already use, then improve the way planning actually runs.",
      },
    ],
    cta: "Talk to our planning experts",
  },
  {
    slug: "data-engineering-and-analytics",
    title: "Data Engineering & Analytics",
    summary:
      "Build modern data foundations that transform information into actionable insights, predictive intelligence, and business value.",
    details:
      "We design reliable, scalable data platforms that turn fragmented data into trusted intelligence for decision-making, automation, and AI-driven growth.",
    audience:
      "Data, analytics, and technology teams that need a governed, reusable foundation for reporting and AI.",
    approach: [
      "Inventory source systems and define trusted business domains.",
      "Establish governed pipelines, quality controls, and lineage.",
      "Build semantic layers and analytics products for consumers.",
      "Operationalize self-service usage and ownership.",
    ],
    capabilities: [
      "Modern data platform architecture",
      "Data quality and governance",
      "Analytics and intelligence enablement",
    ],
    outcomes: ["Trusted decision intelligence", "Faster insight-to-action", "Higher analytics ROI"],
    sections: [
      {
        heading: "Where it helps most",
        body: "Best for teams dealing with fragmented sources, inconsistent definitions, or analytics programs that generate reports but not trusted decisions.",
      },
      {
        heading: "Reference architecture",
        body: "A typical delivery uses source-system ingestion, quality and lineage controls, a governed lakehouse or warehouse layer, semantic models for business consumption, and analytics products that can also feed AI or automation workflows.",
      },
      {
        heading: "Typical deliverables",
        body: "Lakehouse architecture, domain models, data quality controls, governed semantic layers, and analytics products that support both BI and AI use cases.",
      },
      {
        heading: "Common use cases",
        body: "Executive reporting, customer 360, operational scorecards, forecasting, anomaly detection, and AI-ready feature pipelines are all good fits for this service.",
      },
      {
        heading: "Outcome focus",
        body: "We aim to create a data foundation that teams can reuse across reporting, automation, forecasting, and AI initiatives without rebuilding the stack each time.",
      },
    ],
    phases: [
      {
        title: "Data landscape assessment",
        body: "We inventory sources, consumers, and quality gaps to identify the highest-value foundation work.",
      },
      {
        title: "Platform and governance build",
        body: "We implement the architecture, pipelines, semantic model, quality controls, and ownership model needed to trust the data.",
      },
      {
        title: "Adoption and optimization",
        body: "We enable analytics teams, define ownership, and tune the platform based on consumer usage and value.",
      },
    ],
    faqs: [
      {
        question: "Can this support AI use cases too?",
        answer:
          "Yes. The architecture is designed to support both analytics and AI workloads when governance and semantics are in place.",
      },
      {
        question: "What if our data is very fragmented?",
        answer:
          "That is common. We usually start with a thin governed foundation and then phase in the most important domains first.",
      },
      {
        question: "Do we need to standardize every source first?",
        answer:
          "No. We prioritize the highest-value domains and create a repeatable pattern that can be extended over time.",
      },
    ],
    cta: "Build your data foundation",
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    summary:
      "Reimagine business processes, modernize legacy systems, and create seamless digital experiences across the enterprise.",
    details:
      "We help enterprises modernize operating models through automation, process redesign, and digital experience transformation across core workflows.",
    audience:
      "Business and technology leaders modernizing legacy processes, customer experiences, or operating models.",
    approach: [
      "Map current-state workflows and bottlenecks.",
      "Redesign the operating model around digital-first experiences.",
      "Automate high-friction processes and handoffs.",
      "Measure adoption, efficiency, and customer impact.",
    ],
    capabilities: [
      "Workflow modernization",
      "Legacy system transformation",
      "Digital experience engineering",
    ],
    outcomes: [
      "Higher operational efficiency",
      "Reduced process friction",
      "Improved customer experiences",
    ],
    sections: [
      {
        heading: "Where it helps most",
        body: "A fit when manual handoffs, legacy interfaces, and siloed workflows slow down revenue, operations, or customer delivery.",
      },
      {
        heading: "Typical deliverables",
        body: "Workflow maps, automation opportunities, target-state journeys, service blueprints, and delivery plans that phase in improvements without disrupting business operations.",
      },
      {
        heading: "Outcome focus",
        body: "The goal is to simplify how work gets done, reduce time wasted on low-value tasks, and make the experience better for both customers and employees.",
      },
    ],
    phases: [
      {
        title: "Process discovery",
        body: "We identify the highest-friction journeys, handoffs, and systems that create the most operational drag.",
      },
      {
        title: "Target-state design",
        body: "We define the future workflow, automation points, and experience improvements before implementation starts.",
      },
      {
        title: "Implementation and adoption",
        body: "We phase in the changes, support adoption, and track the business outcomes that matter most.",
      },
    ],
    faqs: [
      {
        question: "Will this disrupt daily operations?",
        answer:
          "We phase work carefully so teams can adopt new workflows without losing operational continuity.",
      },
      {
        question: "Do you only modernize software?",
        answer:
          "No. We also redesign the process and decision flow so technology changes actually create business value.",
      },
    ],
    cta: "Start your transformation",
  },
  {
    slug: "ai-center-of-excellence",
    title: "AI Center of Excellence",
    summary:
      "Establish enterprise-wide AI capabilities, governance frameworks, innovation programs, and scalable AI adoption strategies.",
    details:
      "We turn fragmented AI initiatives into a unified enterprise capability with shared standards, governance controls, and repeatable innovation pathways.",
    audience:
      "Executives and innovation leaders who need AI adoption to scale safely and consistently across teams.",
    approach: [
      "Define the AI operating model, standards, and control points.",
      "Prioritize use cases by value, feasibility, and risk.",
      "Build reusable assets and governance guardrails.",
      "Support adoption with delivery playbooks and enablement.",
    ],
    capabilities: [
      "AI operating model design",
      "Responsible AI governance",
      "AI innovation and scale programs",
    ],
    outcomes: ["Faster AI adoption", "Consistent governance", "Measurable business value"],
    sections: [
      {
        heading: "Where it helps most",
        body: "This is for organizations that have isolated AI pilots but no consistent way to prioritize, govern, or scale them across the business.",
      },
      {
        heading: "Typical deliverables",
        body: "AI operating model design, use-case intake and prioritization, governance controls, reusable standards, and adoption playbooks for teams building on the platform.",
      },
      {
        heading: "Outcome focus",
        body: "The CoE should become the mechanism that lets AI move from experiments to durable enterprise capability without losing control or momentum.",
      },
    ],
    phases: [
      {
        title: "AI capability assessment",
        body: "We identify the current AI maturity, operating gaps, and the first use cases worth standardizing.",
      },
      {
        title: "CoE operating model",
        body: "We define governance, intake, review, and delivery mechanisms for scale.",
      },
      {
        title: "Enablement and scale-out",
        body: "We support teams with reusable assets, standards, and rollout support so adoption continues after launch.",
      },
    ],
    faqs: [
      {
        question: "Is this only for large enterprises?",
        answer:
          "No. Any organization that needs repeatable AI delivery and governance can benefit, regardless of size.",
      },
      {
        question: "Do you handle policy and controls too?",
        answer:
          "Yes. Responsible AI governance is part of the operating model, not an afterthought.",
      },
    ],
    cta: "Scale AI with confidence",
  },
  {
    slug: "enterprise-slm-development",
    title: "Enterprise SLM Development",
    summary:
      "Design and deploy smaller language models for focused enterprise use cases where privacy, cost, latency, and domain specialization matter.",
    details:
      "We help enterprises select, fine-tune, evaluate, and operationalize smaller language models for specific workflows such as support automation, knowledge retrieval, document intelligence, and decision support.",
    audience:
      "AI, data, and platform teams that need compact, domain-tuned models for production use.",
    approach: [
      "Identify the use case, latency, privacy, and cost constraints.",
      "Select the right base model and adaptation strategy.",
      "Fine-tune, evaluate, and harden the model for production use.",
      "Deploy with observability, guardrails, and retrieval integration.",
    ],
    capabilities: [
      "Model selection and adaptation strategy",
      "Fine-tuning and evaluation",
      "RAG and enterprise knowledge integration",
    ],
    outcomes: ["Lower inference cost", "Improved domain accuracy", "Better latency and control"],
    sections: [
      {
        heading: "Where it helps most",
        body: "Best for high-volume, narrow-domain use cases where a compact model can outperform a general one on cost, speed, privacy, or controllability.",
      },
      {
        heading: "Typical deliverables",
        body: "Use-case analysis, model selection, fine-tuning pipelines, evaluation frameworks, retrieval integration, guardrails, and production monitoring for drift and quality.",
      },
      {
        heading: "Outcome focus",
        body: "The objective is to ship enterprise SLMs that are small enough to be efficient, but tuned enough to be reliable inside real workflows.",
      },
    ],
    phases: [
      {
        title: "Use-case and model selection",
        body: "We identify where a smaller model is the right fit and choose the base model and adaptation path.",
      },
      {
        title: "Fine-tuning and evaluation",
        body: "We train, test, and benchmark the model against the target workflow and quality standards.",
      },
      {
        title: "Production deployment",
        body: "We integrate the model with retrieval, guardrails, and monitoring so it performs reliably in the enterprise.",
      },
    ],
    faqs: [
      {
        question: "Why build an SLM instead of using a larger model?",
        answer:
          "An SLM can be better when you need lower cost, lower latency, more privacy, or tighter domain control.",
      },
      {
        question: "Can this work with our internal knowledge base?",
        answer:
          "Yes. Retrieval integration is a standard part of the implementation when knowledge grounding is needed.",
      },
    ],
    cta: "Build enterprise SLMs",
  },
  {
    slug: "revenue-and-sales",
    title: "Revenue & Sales",
    summary:
      "Optimize sales operations, customer engagement, lead management, and revenue growth through intelligent automation and data-driven insights.",
    details:
      "We combine AI, CRM modernization, and revenue process design to improve pipeline velocity, engagement quality, and predictable growth outcomes.",
    audience:
      "Revenue, sales operations, and customer teams that need better forecasting and conversion performance.",
    approach: [
      "Analyze the revenue process and CRM data quality.",
      "Embed intelligence into seller and manager workflows.",
      "Automate reporting, coaching, and follow-up actions.",
      "Measure impact on conversion, velocity, and forecast accuracy.",
    ],
    capabilities: [
      "Sales process optimization",
      "AI-enabled CRM intelligence",
      "Revenue performance analytics",
    ],
    outcomes: [
      "Higher conversion rates",
      "Improved sales productivity",
      "Stronger revenue forecasting",
    ],
    sections: [
      {
        heading: "Where it helps most",
        body: "Effective when pipeline hygiene, forecast accuracy, or seller productivity are inconsistent and the CRM has become a reporting system rather than a growth engine.",
      },
      {
        heading: "Typical deliverables",
        body: "Revenue process redesign, CRM intelligence, pipeline analytics, seller prompts, coaching workflows, and dashboards tied to conversion and forecast KPIs.",
      },
      {
        heading: "Outcome focus",
        body: "We aim to make revenue teams faster, more consistent, and more informed so growth becomes more predictable and less manual.",
      },
    ],
    phases: [
      {
        title: "Revenue process review",
        body: "We examine the full funnel, data quality, and the bottlenecks that limit forecast and conversion performance.",
      },
      {
        title: "Workflow redesign and automation",
        body: "We embed intelligence into the CRM and revenue workflow so teams can act faster and more consistently.",
      },
      {
        title: "Performance optimization",
        body: "We tune dashboards, prompts, and coaching loops against conversion, velocity, and forecast accuracy.",
      },
    ],
    faqs: [
      {
        question: "Do you work with existing CRM systems?",
        answer:
          "Yes. The goal is to improve the workflow and intelligence around the CRM you already use.",
      },
      {
        question: "What if our data quality is weak?",
        answer:
          "We usually start by fixing the signal quality and process discipline before layering on AI recommendations.",
      },
    ],
    cta: "Accelerate revenue growth",
  },
  {
    slug: "cloud-and-infrastructure-modernization",
    title: "Cloud & Infrastructure Modernization",
    summary:
      "Enhance agility, scalability, and performance with cloud-native architectures, platform engineering, and infrastructure transformation.",
    details:
      "We modernize cloud and infrastructure foundations to improve resilience, scalability, and delivery speed across enterprise technology landscapes.",
    audience:
      "Engineering and infrastructure teams modernizing platforms, improving reliability, or reducing operating overhead.",
    approach: [
      "Assess current infrastructure, risks, and migration priorities.",
      "Design cloud-native target architectures and landing zones.",
      "Migrate workloads and strengthen operational resilience.",
      "Introduce platform engineering and reliability guardrails.",
    ],
    capabilities: [
      "Cloud architecture and migration",
      "Platform engineering",
      "Infrastructure reliability and optimization",
    ],
    outcomes: [
      "Scalable digital foundations",
      "Improved system performance",
      "Lower infrastructure risk",
    ],
    sections: [
      {
        heading: "Where it helps most",
        body: "A fit for teams with legacy infrastructure, reliability issues, or cloud estates that are growing without clear operating guardrails.",
      },
      {
        heading: "Typical deliverables",
        body: "Cloud landing zones, migration plans, platform engineering capabilities, reliability guardrails, observability standards, and operational runbooks.",
      },
      {
        heading: "Outcome focus",
        body: "The service is designed to reduce risk while improving speed, resilience, and the ability to scale engineering delivery with confidence.",
      },
    ],
    phases: [
      {
        title: "Current-state review",
        body: "We assess the infrastructure, resilience, and delivery constraints that are holding the platform back.",
      },
      {
        title: "Target architecture and migration",
        body: "We design the target environment and migrate workloads in a controlled way with reliability safeguards.",
      },
      {
        title: "Platform engineering and hardening",
        body: "We introduce guardrails, observability, and operational practices that make the platform easier to scale.",
      },
    ],
    faqs: [
      {
        question: "Can this include on-prem and cloud systems?",
        answer:
          "Yes. We work across hybrid estates and focus on the safest path to improved resilience and delivery speed.",
      },
      {
        question: "Do you only handle migrations?",
        answer:
          "No. We also build the operating model, guardrails, and platform engineering practices needed after migration.",
      },
    ],
    cta: "Modernize your cloud foundation",
  },
];

export const findServiceOffering = (slug: string) =>
  serviceOfferings.find((item) => item.slug === slug);
