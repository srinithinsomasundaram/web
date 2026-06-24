import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/solutions")({
  loader: () => {
    throw redirect({ to: "/ai-lab" });
  },
});
