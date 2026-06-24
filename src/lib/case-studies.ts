export type Study = {
  slug: string;
  client: string;
  industry: string;
  service: string;
  tech: string;
  challenge: string;
  solution: string;
  outcome: string;
  roi: string;
  approach: string[];
  metrics: { label: string; value: string }[];
  timeline: string;
  team: string;
  detailed: {
    context: string;
    objectives: string[];
    execution: string[];
    governance: string;
    businessImpact: string;
    nextPhase: string;
  };
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    avatar?: string;
  };
  milestones?: {
    phase: string;
    duration: string;
    title: string;
    description: string;
    bulletPoints: string[];
  }[];
  architecture?: {
    legacyDesc: string;
    modernDesc: string;
  };
};

export const studies: Study[] = [
  {
    slug: "sme-fintech-cloud-platform",
    client: "Confidential · SME Fintech",
    industry: "Banking",
    service: "Cloud Transformation",
    tech: "AWS",
    challenge:
      "Fragmented systems, brittle manual deployments, and severe database lockups were crippling operations. The legacy stack consisted of three tightly-coupled services running on end-of-life virtualized hardware. Every deployment required a 4-hour midnight maintenance window, often followed by critical hotfixes. Database lock contention during peak SME trading volumes frequently resulted in API transaction times escalating from 200ms to over 8.5 seconds, triggering cascaded failures in consumer-facing billing and ledger modules.",
    solution:
      "We completely rebuilt the core platform as an event-driven, cloud-native architecture on AWS. We decomposed the monolith using the Strangler-Fig pattern, moving critical operations to AWS ECS on AWS Fargate. We introduced Amazon EventBridge for event propagation, Amazon RDS for PostgreSQL with Amazon ElastiCache for Redis to eliminate database bottlenecks, and built a custom AI triage agent utilizing Amazon Bedrock (Claude 3.5 Sonnet) to instantly categorize and route complex transaction disputes. The platform was secured with AWS KMS encryption, IAM boundary roles, and integrated into a robust CI/CD pipeline via GitHub Actions, supported by comprehensive Datadog and AWS CloudWatch observability.",
    outcome:
      "A unified data fabric, predictable automated releases, and a high-performance foundation the team can scale on for the next 3 years without overhead spikes.",
    roi: "40% lower infra cost · 9-month payback.",
    approach: [
      "Two-week discovery to map service dependencies, data states, and GxP/PCI-DSS risk surface.",
      "Strangler-fig migration of three legacy ledger, billing, and routing services with zero downtime.",
      "Embedded Bedrock LLM workflows for automated transaction dispute classification and fraud triage.",
      "SRE handover with automated runbooks, target SLO dashboard, and incident alerts.",
    ],
    metrics: [
      { value: "40%", label: "Infra cost reduction" },
      { value: "9 mo", label: "Payback period" },
      { value: "5×", label: "Deploy frequency" },
    ],
    timeline: "5 months",
    team: "1 architect · 3 engineers · 1 PM",
    detailed: {
      context:
        "The client was scaling quickly, but core product and operations were constrained by fragmented legacy systems, release instability, and database transaction bottlenecks that caused severe customer churn.",
      objectives: [
        "Decompose fragile monolithic billing, core ledger, and API router modules into highly scalable, containerized microservices.",
        "Eliminate transaction failure rates and database lock contention to ensure a transaction API SLA of sub-250ms under peak load.",
        "Incorporate an automated AI-driven triage layer to categorize billing disputes, routing high-priority anomalies to fraud specialists.",
        "Automate CI/CD pipelines to allow zero-downtime progressive blue-green deployments, moving from monthly manual releases to multiple automated daily deploys.",
      ],
      execution: [
        "Completed architecture decomposition and transaction dependency mapping in a rigorous 2-week discovery sprint.",
        "Migrated high-frequency ledger and billing services in phases using a strangler pattern with AWS API Gateway traffic proxying.",
        "Implemented real-time data replication using AWS Database Migration Service (DMS), maintaining dual-write synchronization for 10 days before final cut-over.",
        "Engineered the Bedrock LLM dispute classification engine, reducing customer ticket resolution loops from 48 hours to less than 15 minutes.",
        "Deployed an automated CI/CD pipeline with terraformed environments, blue-green deployment rules, Datadog observability, and SLO tracking.",
      ],
      governance:
        "Delivery was run through weekly architecture and risk reviews with shared KPI tracking for product, engineering, and operations.",
      businessImpact:
        "The client achieved predictable release operations, lower run-cost, zero transactional database locking under high load, and a solid foundation to support multi-year growth plans.",
      nextPhase:
        "Phase two focuses on deeper revenue analytics and expansion of AI-assisted operations across customer and risk teams.",
    },
    testimonial: {
      quote:
        "Yesp Studio didn't just write code; they completely re-engineered our operational capability. Our release cycle went from a high-stress monthly fire drill to a completely silent, automated non-event. The performance of our transactional ledger under peak load is now a non-issue.",
      author: "Jonathan Mercer",
      role: "Head of Infrastructure & Platform Engineering",
    },
    milestones: [
      {
        phase: "Phase 1",
        duration: "Weeks 1 - 4",
        title: "Discovery & Gateway Proxying",
        description:
          "Map all microservices boundaries, build target database schemas, and deploy AWS API Gateway to control request routing.",
        bulletPoints: [
          "Mapped 47 distinct transactional legacy database tables into cohesive domains.",
          "Deployed API Gateway as a reverse proxy with path-based strangler routing.",
          "Created fully simulated staging environment to stress-test microservice endpoints under 10x historical peak load.",
        ],
      },
      {
        phase: "Phase 2",
        duration: "Weeks 5 - 10",
        title: "Strangler-Fig Ledger Migration",
        description:
          "Extract the core transactional ledger, configure live dual-write database replication, and route live ledger requests to AWS ECS.",
        bulletPoints: [
          "Setup AWS DMS for continuous transactional replication with zero-lag dual-write verification.",
          "Migrated the high-frequency billing engine to ECS containerized tasks on Fargate.",
          "Initiated strangler routing for ledger queries, shifting 100% of live traffic with zero dropped transactions.",
        ],
      },
      {
        phase: "Phase 3",
        duration: "Weeks 11 - 14",
        title: "AI Triage & Event Fabric Integration",
        description:
          "Deploy Bedrock LLM classification agents and hook up Amazon EventBridge to enable asynchronous fraud analysis and support ticketing.",
        bulletPoints: [
          "Constructed LLM prompt pipelines using Bedrock, handling dispute classifications in under 300ms.",
          "Integrated EventBridge to trigger real-time Slack/PagerDuty alerts for critical ledger anomalies.",
          "Built administrative human-in-the-loop dashboard to review AI triage routing overrides.",
        ],
      },
      {
        phase: "Phase 4",
        duration: "Weeks 15 - 20",
        title: "Observability, Handover & Launch",
        description:
          "Implement SRE SLO monitors, incident playbooks, on-call alert channels, and perform total mainframe cut-over.",
        bulletPoints: [
          "Configured exhaustive Datadog monitoring for APM, container metrics, and RDS performance.",
          "Established on-call rotations, runbooks, and disaster recovery automated dry-runs.",
          "Executed final cut-over, shutting down legacy monolith servers permanently with zero downtime.",
        ],
      },
    ],
    architecture: {
      legacyDesc:
        "Three tightly-coupled applications sharing a single monolithic relational database with no connection pooling. Deployment required fully stopping servers, and a single ledger failure crashed the entire platform.",
      modernDesc:
        "An event-driven microservices architecture on AWS ECS Fargate, coordinated asynchronously via Amazon EventBridge. API requests are handled by AWS API Gateway and routed with low latency. Data is partitioned across Amazon RDS PostgreSQL databases with ElastiCache Redis for caching, while an AI triage queue powered by Bedrock handles anomalies in real time.",
    },
  },
  {
    slug: "enterprise-healthcare-data-platform",
    client: "Confidential · Enterprise Healthcare",
    industry: "Healthcare",
    service: "Data & Analytics",
    tech: "Snowflake",
    challenge: "Disconnected source systems were blocking clinical and operational insight.",
    solution:
      "A governed lakehouse with a FHIR-native semantic layer, role-based access, and analyst-ready marts.",
    outcome:
      "30% reduction in administrative load and a single source of truth across the organization.",
    roi: "Material operational savings annually.",
    approach: [
      "Source-system inventory and PHI risk assessment.",
      "Lakehouse on Snowflake with column-level access controls.",
      "FHIR-native semantic models for clinical and ops domains.",
      "Analyst enablement with dbt and notebook templates.",
    ],
    metrics: [
      { value: "30%", label: "Less admin load" },
      { value: "60+", label: "Sources unified" },
      { value: "100%", label: "Audit pass rate" },
    ],
    timeline: "7 months",
    team: "1 lead · 2 data engineers · 1 analytics engineer",
    detailed: {
      context:
        "Clinical, finance, and operations teams were each maintaining their own reporting layers, which meant leaders were reconciling conflicting numbers across multiple spreadsheets and scheduled exports. The lack of a governed model also made compliance review slower than necessary and created a persistent trust gap in daily reporting.",
      objectives: [
        "Create a governed data foundation with clinical and operational domains that could support executive reporting and frontline analytics.",
        "Enable role-based access, lineage, and auditability for sensitive data without slowing down analyst workflows.",
        "Improve speed and quality of analytics consumption so operational teams could work from a single source of truth.",
        "Reduce manual reconciliation and reporting overhead across recurring business reviews.",
      ],
      execution: [
        "Built a Snowflake-based governed lakehouse with domain-specific semantic models for clinical and operational data products.",
        "Implemented FHIR-aligned domain modeling and analyst marts so downstream teams could work with familiar healthcare structures.",
        "Standardized transformation workflows, test gates, and quality controls to keep new source onboarding predictable.",
        "Rolled out reusable notebook templates and dbt patterns to accelerate self-service analytics.",
      ],
      governance:
        "Access controls, lineage, and compliance checks were embedded as mandatory release gates for every data product, with ownership, certification, and access review tied into the operating cadence.",
      businessImpact:
        "Leaders gained a trusted enterprise view across clinical and operational performance, enabling faster insight-to-decision cycles and reducing the effort spent debating which report was correct.",
      nextPhase:
        "The next phase focuses on predictive capacity planning, cohort-level forecasting, and AI-enabled care pathway optimization on top of the governed foundation.",
    },
    testimonial: {
      quote:
        "We finally had one version of the truth across clinical and operational reporting. That alone changed the speed of every leadership meeting.",
      author: "Director of Data Strategy",
      role: "Enterprise Healthcare Client",
    },
    architecture: {
      legacyDesc:
        "Multiple departmental data silos, duplicated definitions, and inconsistent access patterns made reporting slow and hard to audit.",
      modernDesc:
        "A governed Snowflake lakehouse with FHIR-aligned semantic layers, role-based access control, and analyst-ready marts that could be reused across teams.",
    },
  },
  {
    slug: "enterprise-manufacturer-predictive-maintenance",
    client: "Confidential · Enterprise Manufacturer",
    industry: "Manufacturing",
    service: "AI & Automation",
    tech: "Azure",
    challenge: "Aging OT and unplanned downtime were eroding throughput across multiple lines.",
    solution:
      "Predictive maintenance powered by digital twins on Azure IoT with closed-loop work-order automation.",
    outcome: "22% reduction in unplanned downtime and proactive scheduling for critical assets.",
    roi: "Significant production uplift in year one.",
    approach: [
      "Sensor inventory and signal quality assessment.",
      "Digital twin modeling for top-10 asset classes.",
      "ML models for failure prediction and remaining-useful-life.",
      "Integration with CMMS for automatic work-order creation.",
    ],
    metrics: [
      { value: "22%", label: "Less downtime" },
      { value: "10", label: "Asset classes modeled" },
      { value: "6 wk", label: "First model live" },
    ],
    timeline: "6 months",
    team: "1 ML lead · 2 engineers · 1 OT specialist",
    detailed: {
      context:
        "Several production lines were experiencing avoidable downtime because maintenance was largely reactive and the telemetry being collected was not standardized enough to support reliable forecasting. The plant had strong technical expertise, but no shared reliability model across lines or sites.",
      objectives: [
        "Reduce unplanned downtime on the highest-impact asset classes without disrupting existing maintenance workflows.",
        "Improve maintenance planning confidence by giving planners early warning signals they could trust.",
        "Integrate predictions into frontline operations so the plant floor could act on them, not just inspect dashboards.",
        "Create a repeatable pattern that could be rolled out to other sites.",
      ],
      execution: [
        "Established sensor quality baselines, model targets, and digital twin definitions for the top asset classes.",
        "Trained failure prediction models using maintenance history, downtime logs, and live telemetry signals.",
        "Integrated alerts and work-order automation into the CMMS so planners received action, not just predictions.",
        "Introduced reliability review dashboards to compare predicted failures against actual outcomes.",
      ],
      governance:
        "Model performance, false-positive rates, and asset coverage were reviewed in a cross-functional reliability board every sprint, with plant leadership signing off on rollout thresholds.",
      businessImpact:
        "Plant reliability improved with proactive intervention patterns, stronger maintenance-resource allocation, and less unplanned disruption to production schedules.",
      nextPhase:
        "Expansion to additional sites is underway, along with energy optimization signals that can be layered into the same digital-twin foundation.",
    },
    testimonial: {
      quote:
        "The biggest change was not the model itself, it was that maintenance teams started trusting the alerts enough to act before downtime happened.",
      author: "VP of Operations",
      role: "Enterprise Manufacturer",
    },
    architecture: {
      legacyDesc:
        "Reactive maintenance processes, fragmented machine telemetry, and no standard model for prioritizing asset risk.",
      modernDesc:
        "Azure IoT digital twins connected to predictive models, CMMS automation, and plant-level reliability dashboards for closed-loop maintenance.",
    },
  },
  {
    slug: "sme-retailer-headless-commerce",
    client: "Confidential · SME Retailer",
    industry: "Retail",
    service: "Custom Software",
    tech: "GCP",
    challenge:
      "A legacy commerce stack was blocking omnichannel growth and slowing experimentation.",
    solution:
      "A headless commerce platform with a modern CMS, edge caching, and a unified product catalog.",
    outcome: "27% conversion lift and a 14-month delivery from kickoff to multi-market rollout.",
    roi: "Strong incremental GMV in year two.",
    approach: [
      "Customer journey audit and conversion baseline.",
      "Headless storefront with edge rendering and personalization.",
      "Catalog and inventory unification across markets.",
      "Experimentation framework with A/B testing built in.",
    ],
    metrics: [
      { value: "27%", label: "Conversion lift" },
      { value: "14 mo", label: "Delivery" },
      { value: "3", label: "Markets launched" },
    ],
    timeline: "14 months",
    team: "1 architect · 3 engineers · 1 designer",
    detailed: {
      context:
        "The retailer was constrained by a commerce stack that made merchandising changes expensive, slowed marketing experiments, and forced the team to manage channel-specific exceptions in too many places. Every new market launch introduced more inconsistency into catalog, pricing, and fulfillment workflows.",
      objectives: [
        "Launch a modular headless commerce foundation that could support future channels without another rewrite.",
        "Unify product, pricing, and inventory data across markets so campaigns could be launched consistently.",
        "Increase conversion through personalization, faster page delivery, and structured experimentation.",
        "Give merchandising and growth teams more control without adding engineering bottlenecks.",
      ],
      execution: [
        "Delivered a composable storefront with API-driven commerce services and edge-aware rendering paths.",
        "Consolidated catalog, pricing, and inventory domains with governance rules that supported multi-market operation.",
        "Introduced A/B experimentation, analytics tagging, and performance observability to support rapid iteration.",
        "Built reusable launch templates to reduce the effort required for new-market rollout.",
      ],
      governance:
        "Weekly growth and platform reviews aligned product KPIs, release health, and market rollout readiness, with merchandising and engineering sharing a single launch checklist.",
      businessImpact:
        "The client increased conversion, improved speed-to-market for campaigns and product launches, and reduced the coordination cost of adding new markets.",
      nextPhase:
        "The roadmap now focuses on AI-assisted merchandising, demand-aware inventory allocation, and more advanced customer segmentation.",
    },
    testimonial: {
      quote:
        "We stopped treating every campaign as a one-off engineering project. The platform gave us a repeatable way to launch and learn.",
      author: "Ecommerce Director",
      role: "SME Retail Client",
    },
    architecture: {
      legacyDesc:
        "A tightly coupled commerce stack with market-specific exceptions, slow content updates, and manual coordination between inventory and storefronts.",
      modernDesc:
        "A composable headless commerce layer with edge rendering, unified product catalog services, and structured experimentation for growth teams.",
    },
  },
  {
    slug: "enterprise-logistics-control-tower",
    client: "Confidential · Enterprise Logistics",
    industry: "Logistics",
    service: "AI & Automation",
    tech: "AWS",
    challenge: "No real-time shipment visibility across a multi-carrier network.",
    solution:
      "A supply chain control tower with ML-based ETAs, exception detection, and carrier scorecards.",
    outcome: "End-to-end shipment visibility and a measurable drop in expedited freight.",
    roi: "Sharp reduction in expedited freight.",
    approach: [
      "Carrier API integration and event normalization.",
      "ML-based ETA model with continual retraining.",
      "Exception workflows and operator dashboards.",
      "Scorecards and weekly carrier business reviews.",
    ],
    metrics: [
      { value: "100%", label: "Network visibility" },
      { value: "18%", label: "Less expedited freight" },
      { value: "4", label: "Carriers integrated" },
    ],
    timeline: "5 months",
    team: "1 lead · 2 engineers · 1 data scientist",
    detailed: {
      context:
        "Shipment events from carriers, brokers, and internal systems were arriving in different formats and at different times, which made it difficult to trust ETAs or prioritize exceptions. The operations team was doing a lot of manual work just to figure out where shipments really were.",
      objectives: [
        "Establish real-time shipment visibility across the network and remove manual tracking dependencies.",
        "Improve ETA prediction confidence so planners could intervene before service issues escalated.",
        "Reduce expedited freight and exception costs by shifting to proactive exception handling.",
        "Create a scalable operating model that could onboard more carriers without adding headcount linearly.",
      ],
      execution: [
        "Integrated and normalized multi-carrier event streams into a common operational model.",
        "Built ML ETA models with continuous retraining loops and monitored the impact of model drift.",
        "Implemented operator workflows for proactive exception handling, escalation, and customer updates.",
        "Added carrier scorecards to make service quality visible and actionable in weekly reviews.",
      ],
      governance:
        "Operational dashboards and carrier scorecards were reviewed weekly with logistics leadership, and exception thresholds were tuned with customer service, operations, and carrier management together.",
      businessImpact:
        "Operations shifted from reactive tracking to proactive control, with measurable cost savings, better shipment visibility, and fewer expensive expedites.",
      nextPhase:
        "The next phase includes predictive network risk simulation and dynamic carrier allocation to optimize service and cost by lane.",
    },
    testimonial: {
      quote:
        "We moved from chasing shipments to managing exceptions. That shift alone changed the rhythm of the whole operations team.",
      author: "VP Supply Chain",
      role: "Enterprise Logistics Client",
    },
    architecture: {
      legacyDesc:
        "Carrier events, ETA updates, and exception signals were trapped in separate systems and spreadsheets, with no single control layer.",
      modernDesc:
        "A cloud control tower that normalizes events, predicts ETAs, and triggers operator workflows for shipment exceptions in near real time.",
    },
  },
  {
    slug: "sme-saas-platform-scale",
    client: "Confidential · SME SaaS",
    industry: "Technology",
    service: "Managed IT",
    tech: "Kubernetes",
    challenge: "The platform needed to scale event volumes by 7× without a hiring spike.",
    solution:
      "Platform engineering plus 24/7 SRE with progressive delivery and incident automation.",
    outcome: "Zero incident regressions at 7× scale and flat infrastructure spend.",
    roi: "MTTR reduced 70%, infra cost flat.",
    approach: [
      "Platform audit and reliability baseline.",
      "Progressive delivery on Kubernetes with feature flags.",
      "Observability stack with SLOs and error budgets.",
      "24/7 on-call with runbook automation.",
    ],
    metrics: [
      { value: "7×", label: "Event scale" },
      { value: "70%", label: "MTTR reduction" },
      { value: "0", label: "Sev-1 regressions" },
    ],
    timeline: "Ongoing",
    team: "1 SRE lead · 2 SREs · 1 platform engineer",
    detailed: {
      context:
        "The SaaS business was growing quickly, and event volume was increasing faster than the team could add people. Reliability issues were starting to appear in edge cases, and the founders needed a way to scale without turning every growth spurt into an incident response exercise.",
      objectives: [
        "Scale throughput without increasing major incidents or introducing brittle workarounds.",
        "Improve incident response and recovery speed so the team could focus on product work again.",
        "Keep infrastructure spend stable during growth and avoid a runaway platform cost curve.",
        "Give the engineering team a more predictable release and support model.",
      ],
      execution: [
        "Implemented progressive delivery and reliability guardrails around the Kubernetes platform.",
        "Defined SLOs, error budgets, and ownership runbooks tied to alerting and release control.",
        "Automated high-frequency operational interventions such as restarts, scaling actions, and common rollback paths.",
        "Created on-call playbooks that reduced the friction of handing off incidents.",
      ],
      governance:
        "Reliability governance combined weekly SRE reviews with product engineering leadership alignment, ensuring the growth roadmap and platform risk stayed in the same conversation.",
      businessImpact:
        "The platform sustained significant volume growth while maintaining reliability and cost control, and the engineering team could absorb more traffic without adding operational chaos.",
      nextPhase:
        "The roadmap includes deeper platform self-healing, improved developer productivity automation, and stronger cost attribution for teams.",
    },
    testimonial: {
      quote:
        "The platform stopped feeling fragile. We could scale traffic and still sleep at night because our operating model was finally mature.",
      author: "Co-founder",
      role: "SME SaaS Client",
    },
    architecture: {
      legacyDesc:
        "A growing event-driven platform with insufficient guardrails, inconsistent incident procedures, and too much manual intervention during spikes.",
      modernDesc:
        "A Kubernetes platform with progressive delivery, SLO-driven operations, and automated reliability workflows that scale with demand.",
    },
  },
  {
    slug: "enterprise-insurer-claims-ai",
    client: "Confidential · Enterprise Insurer",
    industry: "Banking",
    service: "AI & Automation",
    tech: "Azure",
    challenge: "High-volume manual claims handling capped throughput and customer experience.",
    solution: "An agentic AI claims platform with human-in-the-loop review for edge cases.",
    outcome: "92% straight-through processing and faster cycle times across high-volume lines.",
    roi: "Significant operating cost reduction.",
    approach: [
      "Process mapping for top-3 claim types.",
      "Document understanding pipeline with LLM extraction.",
      "Decision policies with auditable reasoning logs.",
      "Human-in-the-loop UI for exceptions.",
    ],
    metrics: [
      { value: "92%", label: "Straight-through" },
      { value: "3×", label: "Faster cycle" },
      { value: "100%", label: "Audit traceable" },
    ],
    timeline: "8 months",
    team: "1 lead · 2 AI engineers · 1 designer",
    detailed: {
      context:
        "Claims specialists were spending too much time on repetitive extraction and triage work, which limited throughput and extended customer cycle times. The insurer wanted automation, but only if the control model remained auditable and safe for exceptions.",
      objectives: [
        "Increase straight-through processing safely without sacrificing review quality on edge cases.",
        "Maintain transparent and auditable decisions for all automated recommendations.",
        "Improve claims cycle times in high-volume lines and reduce manual backlog pressure.",
        "Let human reviewers focus on the exceptions that actually required judgment.",
      ],
      execution: [
        "Mapped the top claim journeys and the decision bottlenecks that caused the longest delays.",
        "Implemented document extraction and policy reasoning workflows with explicit decision tracing.",
        "Built exception-handling interfaces so reviewers could override, approve, or escalate decisions.",
        "Added analytics for model confidence, cycle time, and exception categories to support tuning.",
      ],
      governance:
        "A governance model combined policy controls, audit logs, and human override checkpoints, with risk and compliance validating the operating thresholds before broader rollout.",
      businessImpact:
        "Claims operations gained higher throughput and a stronger customer experience with controlled risk exposure, while reviewers spent more time on complex cases instead of repetitive data entry.",
      nextPhase:
        "Upcoming releases include expanded claim-type coverage, fraud-pattern intelligence, and deeper policy recommendation support.",
    },
    testimonial: {
      quote:
        "The AI handled the repetitive work well enough that our adjusters could focus on the cases that genuinely needed them.",
      author: "Claims Transformation Lead",
      role: "Enterprise Insurer",
    },
    architecture: {
      legacyDesc:
        "Manual claims triage, document-heavy workflows, and decision tracking spread across too many tools to scale efficiently.",
      modernDesc:
        "An auditable AI claims workflow with extraction, policy reasoning, and human-in-the-loop review for exception handling.",
    },
  },
  {
    slug: "enterprise-pharma-legacy-modernization",
    client: "Confidential · Enterprise Pharma",
    industry: "Healthcare",
    service: "Legacy Modernization",
    tech: "AWS",
    challenge: "GxP systems on an end-of-life mainframe with regulatory deadlines closing in.",
    solution:
      "A strangler-fig modernization over 22 months with validated migration of each subsystem.",
    outcome: "A clean cut-over with zero audit findings and a 60% lower run-the-business cost.",
    roi: "60% lower run-the-business cost.",
    approach: [
      "Validation strategy aligned to GxP requirements.",
      "Service-by-service strangler-fig migration plan.",
      "Parallel-run testing and automated reconciliation.",
      "Final cut-over with rollback windows.",
    ],
    metrics: [
      { value: "0", label: "Audit findings" },
      { value: "60%", label: "Lower TCO" },
      { value: "22 mo", label: "Duration" },
    ],
    timeline: "22 months",
    team: "1 architect · 4 engineers · 1 QA lead",
    detailed: {
      context:
        "The organization was running GxP systems on an end-of-life mainframe, and the modernization program had to complete before regulatory deadlines closed the window. Any solution had to preserve auditability, protect validated workflows, and avoid operational disruption.",
      objectives: [
        "Migrate validated workloads without compliance risk or loss of historical traceability.",
        "Reduce run-the-business costs and platform fragility across the core platform estate.",
        "Ensure safe cut-over with rollback protections and explicit validation checkpoints.",
        "Preserve the operating model required by regulated teams during the transition.",
      ],
      execution: [
        "Designed a subsystem-by-subsystem migration plan with validation checkpoints aligned to regulated processes.",
        "Ran parallel validation and automated reconciliation across legacy and target environments.",
        "Executed phased cutovers with controlled rollback windows and documented approvals.",
        "Retired mainframe dependencies only after downstream consumers had completed acceptance testing.",
      ],
      governance:
        "Program governance aligned engineering, compliance, and QA checkpoints throughout migration waves, with documented sign-off at each cut-over milestone.",
      businessImpact:
        "The organization modernized critical systems with full audit confidence and materially lower operating cost, while reducing the fragility of the underlying platform estate.",
      nextPhase:
        "Current focus is extending modernization benefits into advanced analytics, AI-enabled operations, and additional validated workflows.",
    },
    testimonial: {
      quote:
        "We met the deadline without creating a compliance headache. That was the outcome the board cared about most.",
      author: "Head of Platform Modernization",
      role: "Enterprise Pharma Client",
    },
    architecture: {
      legacyDesc:
        "An end-of-life mainframe estate with validated workflows, high operating cost, and significant operational fragility.",
      modernDesc:
        "A phased modernization path that preserved validation, separated critical workloads, and reduced total run-cost while keeping compliance controls intact.",
    },
  },
  {
    slug: "workflow-intelligence-slm",
    client: "AI Yesp Labs",
    industry: "Enterprise AI Research & Knowledge Systems",
    service: "Research & Development",
    tech: "SLM / RAG / Semantic Search / Vector Databases",
    challenge: "Teams struggle to find the right internal knowledge fast enough.",
    solution:
      "AI Yesp Labs explored a Workflow Intelligence SLM for retrieval and workflow support.",
    outcome: "A lightweight foundation for context-aware enterprise assistance.",
    roi: "Research-led enterprise AI foundation.",
    approach: ["Defined the scope.", "Mapped the core layers.", "Reviewed deployment patterns."],
    metrics: [
      { value: "4", label: "Research pillars" },
      { value: "4", label: "System layers" },
      { value: "1", label: "SLM initiative" },
    ],
    timeline: "Ongoing R&D initiative",
    team: "AI research lead · product strategist · enterprise architect",
    detailed: {
      context: "The initiative explores faster knowledge access and workflow guidance.",
      objectives: [
        "Improve knowledge access.",
        "Support workflow execution.",
        "Reduce discovery time.",
      ],
      execution: [
        "Outlined the research areas.",
        "Defined the SLM and retrieval stack.",
        "Reviewed semantic search patterns.",
      ],
      governance: "Focused on practical adoption, domain specificity, and deployment flexibility.",
      businessImpact: "Creates a base for future workflow and knowledge products.",
      nextPhase: "Next: refine retrieval quality and workflow reasoning.",
    },
    architecture: {
      legacyDesc: "Knowledge scattered across documents and repositories.",
      modernDesc: "A Workflow Intelligence SLM with retrieval and a structured knowledge layer.",
    },
  },
  {
    slug: "automotive-workshop-management-system",
    client: "Confidential Automotive Service Center",
    industry: "Automotive Aftermarket & Vehicle Service Operations",
    service: "Digital Transformation",
    tech: "React / Node / PostgreSQL / AWS",
    challenge:
      "The workshop relied on spreadsheets, phone calls, WhatsApp messages, and paper records to manage vehicle intake, repair tracking, inventory, billing, and customer updates. As the business grew, the manual process created lost paperwork, duplicate entries, weak visibility into technician workload, stock discrepancies, and slow service updates for customers.",
    solution:
      "Yesp Studio designed and delivered a custom Workshop Management System (WMS) that centralized the full workshop lifecycle. The platform digitized vehicle registration, job card creation, technician assignment, repair tracking, inventory control, invoicing, customer notifications, and analytics in one web-based management portal tailored to the workshop's daily operations.",
    outcome:
      "The workshop moved from fragmented manual coordination to a centralized digital operating model with real-time visibility, faster processing, stronger inventory control, and better customer communication across the entire service flow.",
    roi: "70% less paperwork · 50% faster job card processing.",
    approach: [
      "Workshop process analysis and stakeholder interviews to map the actual service workflow.",
      "Role-based web portal for service advisors, technicians, managers, and administrators.",
      "Integrated job card, technician, inventory, billing, and notification workflows in one system.",
      "Deployment, training, data migration, and go-live support to ensure adoption.",
    ],
    metrics: [
      { value: "70%", label: "Reduction in manual paperwork" },
      { value: "50%", label: "Faster job card processing" },
      { value: "6", label: "Core modules delivered" },
    ],
    timeline: "Implementation over 4 phases",
    team: "1 solution lead · 2 engineers · 1 implementation support",
    detailed: {
      context:
        "The client is a multi-brand automotive repair and maintenance workshop in India that provides servicing, diagnostics, repairs, preventive maintenance, and spare parts replacement for passenger vehicles. Before the project, workshop operations were controlled through paper files, spreadsheets, phone calls, and messaging threads, which made it difficult to manage vehicles in service, track part usage, and keep customers informed.",
      objectives: [
        "Digitize workshop operations and eliminate paper-based processing.",
        "Improve technician utilization, service flow, and workshop capacity planning.",
        "Give management real-time visibility into vehicle status, workload, inventory, and revenue.",
        "Improve customer communication, transparency, and service turnaround times.",
      ],
      execution: [
        "Built a web-based management portal for service advisors, workshop managers, technicians, and administrators.",
        "Implemented vehicle registration, job card management, technician assignment, repair progress tracking, inventory management, billing, and communication modules.",
        "Added analytics dashboards for active vehicles, repair completion, revenue, inventory usage, and technician productivity.",
        "Completed training, deployment, data migration, and go-live support to help the team transition from manual operations to the new platform.",
      ],
      governance:
        "The system used role-based access control, secure authentication, and data encryption to protect operational and customer data while keeping service workflows auditable and easy to manage.",
      businessImpact:
        "The workshop reduced administrative effort, improved service coordination, increased operational visibility, accelerated billing, and enabled better decision-making through centralized operational data.",
      nextPhase:
        "Future enhancements can extend into predictive maintenance reminders, customer self-service, advanced inventory optimization, and deeper KPI tracking for workshop profitability.",
    },
    testimonial: {
      quote:
        "Yesp Studio helped transform our workshop operations from manual paperwork and fragmented communication into a centralized digital platform. The system improved visibility, streamlined service management, and enabled our team to operate more efficiently.",
      author: "Operations Manager",
      role: "Automotive Service Center",
    },
    milestones: [
      {
        phase: "Phase 1",
        duration: "Discovery",
        title: "Business Process Analysis",
        description:
          "Mapped the workshop workflow, gathered requirements, and interviewed stakeholders to understand how service intake, repair tracking, inventory, and billing actually worked.",
        bulletPoints: [
          "Assessed current workshop workflows and pain points.",
          "Collected requirements from service advisors, managers, and technicians.",
          "Defined the core operating process to digitize first.",
        ],
      },
      {
        phase: "Phase 2",
        duration: "Design",
        title: "System Design",
        description:
          "Mapped workflows into a system architecture and designed the UI, data model, and module boundaries for the platform.",
        bulletPoints: [
          "Created workflow maps for vehicle intake, job cards, repairs, and billing.",
          "Designed the user interface and database structure.",
          "Defined module interactions and reporting needs.",
        ],
      },
      {
        phase: "Phase 3",
        duration: "Build",
        title: "Development and Testing",
        description:
          "Developed the modules, connected workflows, and validated the system through testing and user acceptance.",
        bulletPoints: [
          "Built the management portal and core operational modules.",
          "Integrated workflow status tracking and reporting dashboards.",
          "Completed integration testing and user acceptance testing.",
        ],
      },
      {
        phase: "Phase 4",
        duration: "Deploy",
        title: "Deployment and Go-Live",
        description:
          "Migrated data, trained staff, and supported the rollout so the workshop could move to the new operating model with confidence.",
        bulletPoints: [
          "Migrated existing records into the new platform.",
          "Trained staff on the new workflows and reporting tools.",
          "Provided go-live support and stabilization assistance.",
        ],
      },
    ],
    architecture: {
      legacyDesc:
        "Paper job cards, manual inventory logs, disconnected communication channels, and fragmented reporting spread across spreadsheets and messages.",
      modernDesc:
        "A centralized Workshop Management System with role-based access, digital job cards, technician assignment, inventory control, invoicing, customer notifications, and analytics.",
    },
  },
  {
    slug: "on-demand-service-marketplace-platform",
    client: "Confidential Service Marketplace Startup",
    industry: "Home Services & On-Demand Service Marketplace",
    service: "Product Engineering",
    tech: "React / Flutter / Node / PostgreSQL / AWS",
    challenge:
      "The startup managed service discovery, booking, scheduling, and provider coordination through phone calls, WhatsApp inquiries, Google Sheets, and manual scheduling. That approach created missed bookings, double bookings, scheduling conflicts, poor provider visibility, slow assignment, and no real-time customer updates as demand increased.",
    solution:
      "Yesp Studio designed and developed an end-to-end on-demand service booking platform with customer applications, service provider applications, admin dashboards, booking automation, secure payments, notifications, analytics, and cloud infrastructure. The platform covered the full booking lifecycle from discovery and scheduling to completion and payment settlement.",
    outcome:
      "The business transitioned from a manually managed service operation into a scalable digital marketplace with faster bookings, stronger provider utilization, real-time transparency, and a foundation for rapid geographic expansion.",
    roi: "85% less manual scheduling · Faster bookings in minutes.",
    approach: [
      "Customer, provider, and admin experiences designed as one connected marketplace ecosystem.",
      "Booking engine with availability validation, time-slot control, and automated provider assignment.",
      "Payments, notifications, Google Maps integration, and analytics connected into the core workflow.",
      "Cloud deployment, testing, training, and rollout support to drive adoption.",
    ],
    metrics: [
      { value: "85%", label: "Reduction in manual scheduling" },
      { value: "Min", label: "Booking completion time" },
      { value: "3", label: "Core applications delivered" },
    ],
    timeline: "Multi-phase delivery",
    team: "1 product lead · 2 engineers · 1 mobile developer",
    detailed: {
      context:
        "The client is a confidential service marketplace startup in India that connects customers with verified professionals for home and business services. Before digital transformation, the business relied on phone calls, WhatsApp, spreadsheets, and manual coordination to manage requests, which limited scale and created service inconsistencies.",
      objectives: [
        "Build a customer-facing booking experience with discovery, scheduling, secure payment, and live updates.",
        "Give service providers a dedicated application to manage bookings, availability, earnings, and schedules.",
        "Create an admin dashboard for operations, verification, revenue tracking, payouts, and escalation handling.",
        "Replace manual coordination with automation that could support high booking volumes and expansion.",
      ],
      execution: [
        "Designed and built customer, provider, and admin applications as one integrated platform.",
        "Implemented the smart booking engine, provider assignment workflow, payment processing, notifications, and rating system.",
        "Added analytics for bookings, provider utilization, cancellations, retention, and revenue performance.",
        "Deployed the platform on AWS and connected mobile and web experiences to the same backend services.",
      ],
      governance:
        "Role-based access control, secure authentication, and centralized reporting ensured the marketplace could scale while maintaining operational oversight and trust.",
      businessImpact:
        "The platform eliminated most manual scheduling overhead, improved customer experience, increased provider efficiency, and created a digital foundation for multi-city marketplace growth.",
      nextPhase:
        "The roadmap can extend into dynamic pricing, route optimization, loyalty programs, and AI-assisted matching between demand and provider capacity.",
    },
    testimonial: {
      quote:
        "Yesp Studio helped us move from manual coordination to a platform that customers and providers can use reliably at scale. We now have the foundation for real marketplace growth.",
      author: "Founder",
      role: "Confidential Service Marketplace Startup",
    },
    milestones: [
      {
        phase: "Phase 1",
        duration: "Discovery",
        title: "Marketplace Analysis",
        description:
          "Mapped the booking workflow, service categories, provider operations, and operational constraints across the current manual model.",
        bulletPoints: [
          "Analyzed customer booking journeys and provider workflows.",
          "Identified scheduling bottlenecks and operational risks.",
          "Defined the marketplace MVP scope across web and mobile.",
        ],
      },
      {
        phase: "Phase 2",
        duration: "Design",
        title: "Platform Architecture and UX",
        description:
          "Designed the customer, provider, and admin experiences and defined the backend architecture for the marketplace.",
        bulletPoints: [
          "Created booking flows, dashboards, and payment journeys.",
          "Designed provider availability and service-zone controls.",
          "Defined database, API, and notification architecture.",
        ],
      },
      {
        phase: "Phase 3",
        duration: "Build",
        title: "Product Development",
        description:
          "Built the applications, core workflows, and integrations required to run the marketplace end to end.",
        bulletPoints: [
          "Delivered React and Flutter experiences connected to Node and PostgreSQL services.",
          "Integrated payments, SMS, push notifications, and Google Maps APIs.",
          "Added analytics and admin controls for business management.",
        ],
      },
      {
        phase: "Phase 4",
        duration: "Launch",
        title: "Deployment and Adoption",
        description:
          "Deployed the platform to AWS, supported training, and stabilized the rollout for customer and provider use.",
        bulletPoints: [
          "Completed cloud deployment and production hardening.",
          "Trained the team on operations and workflows.",
          "Supported launch and initial usage stabilization.",
        ],
      },
    ],
    architecture: {
      legacyDesc:
        "Manual booking coordination via phone, WhatsApp, and spreadsheets with no central view of demand, provider availability, or payment status.",
      modernDesc:
        "An on-demand service marketplace with customer and provider apps, admin dashboards, booking automation, payments, notifications, analytics, and cloud infrastructure.",
    },
  },
];

export const findStudy = (slug: string) => studies.find((s) => s.slug === slug);
