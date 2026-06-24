import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";

import appCss from "../styles.css?url";
import yespLogo from "@/assets/yesp-logo.png";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { absoluteUrl } from "@/lib/site";

const stylesheetHref = import.meta.env.PROD ? `${appCss}?v=20260602` : appCss;

const siteNavigation = [
  { name: "Home", url: absoluteUrl("/") },
  { name: "Services", url: absoluteUrl("/services") },
  { name: "Industries", url: absoluteUrl("/industries") },
  { name: "AI Lab", url: absoluteUrl("/ai-lab") },
  { name: "Case Studies", url: absoluteUrl("/case-studies") },
  { name: "Insights", url: absoluteUrl("/insights") },
  { name: "Careers", url: absoluteUrl("/careers") },
  { name: "About", url: absoluteUrl("/about") },
  { name: "Contact", url: absoluteUrl("/contact") },
] as const;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="eyebrow">Error 404</div>
        <h1 className="mt-4 font-display text-5xl tracking-tight">Page not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl tracking-tight">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong on our end. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Try again
          </button>
          <a href="/" className="border border-input px-4 py-2 text-sm font-medium">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Yesp Studio — AI-Ingrained Enterprise Transformation" },
      {
        name: "description",
        content:
          "Yesp Studio integrates planning, data, AI, digital operations, and revenue execution to accelerate measurable enterprise outcomes.",
      },
      { name: "author", content: "Yesp Studio Technologies" },
      { property: "og:title", content: "Yesp Studio — AI-Ingrained Enterprise Solutions" },
      {
        property: "og:description",
        content: "Responsible AI transformation across enterprise planning, operations, and growth.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: stylesheetHref },
      { rel: "icon", href: yespLogo, type: "image/png" },
      { rel: "shortcut icon", href: yespLogo, type: "image/png" },
      { rel: "apple-touch-icon", href: yespLogo },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "Yesp Studio",
              alternateName: "Yesp Corporation",
              url: absoluteUrl("/"),
              logo: absoluteUrl("/logo.png"),
              description:
                "Enterprise planning, data, AI, and transformation services delivered with clarity, structure, and measurable outcomes.",
              founder: {
                "@type": "Person",
                name: "Srinithin Somasundaram",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.linkedin.com/company/yesptech/",
                "https://www.instagram.com/yespstudio/",
                "https://x.com/YespTech",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                email: "hello@yespstudio.com",
                contactType: "Customer Service",
                availableLanguage: ["English"],
              },
              areaServed: [
                { "@type": "Country", name: "United Kingdom" },
                { "@type": "Country", name: "United States" },
                { "@type": "Country", name: "India" },
                { "@type": "Country", name: "Germany" },
              ],
              serviceType: [
                "Enterprise Business Planning",
                "Data Engineering and Analytics",
                "AI Center of Excellence",
                "Digital Transformation",
                "Revenue & Sales",
              ],
            },
            {
              "@type": "WebSite",
              name: "Yesp Studio",
              url: absoluteUrl("/"),
            },
            ...siteNavigation.map((item) => ({
              "@type": "SiteNavigationElement",
              name: item.name,
              url: item.url,
            })),
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [showCookies, setShowCookies] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setShowCookies(window.localStorage.getItem("yesp_cookie_consent") !== "accepted");
  }, []);

  const acceptCookies = () => {
    window.localStorage.setItem("yesp_cookie_consent", "accepted");
    setShowCookies(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        {showCookies && (
          <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur">
            <div className="container-x flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                We use cookies to improve the experience.
              </p>
              <button
                type="button"
                onClick={acceptCookies}
                className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Accept cookies
              </button>
            </div>
          </div>
        )}
      </div>
    </QueryClientProvider>
  );
}
