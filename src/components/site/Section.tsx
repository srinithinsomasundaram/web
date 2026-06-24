import { type ReactNode } from "react";

export function Section({
  children,
  className = "",
  ink = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  ink?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`${ink ? "bg-ink text-ink-foreground" : ""} py-20 md:py-28 ${className}`}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  ink = false,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  ink?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <div className={ink ? "eyebrow-ink" : "eyebrow"}>{eyebrow}</div>}
      <h2 className="mt-4 font-display text-3xl md:text-5xl leading-[1.05] tracking-tight">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base md:text-lg ${ink ? "text-ink-foreground/70" : "text-muted-foreground"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="bg-ink text-ink-foreground border-b border-hairline-ink">
      <div className="container-x pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="eyebrow-ink">{eyebrow}</div>
        <h1 className="mt-5 font-display text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight max-w-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-8 max-w-2xl text-lg text-ink-foreground/75 leading-relaxed">
            {description}
          </p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
