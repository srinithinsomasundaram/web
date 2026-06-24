import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const brandKitText = `Yesp Brand Kit

Media contact:
hello@yespstudio.com

Company snapshot:
Yesp is an enterprise technology company focused on AI Automation, Software Development, Cloud Management, Data Engineering & Analytics, Digital Transformation, and Enterprise Business Planning.

Founded:
2023

Based in:
India

Industry:
Enterprise Technology & AI

Leadership:
Srinithin Somasundaram, Founder & CEO

Official links:
- Website: https://yespstudio.com
- About: https://yespstudio.com/about
- Founder: https://yespstudio.com/founder
- Brand: https://yespstudio.com/brand
- Enterprise: https://yespstudio.com/enterprise
- Contact: https://yespstudio.com/contact

Social profiles:
- LinkedIn (company): https://www.linkedin.com/company/yesptech/
- Instagram (company): https://www.instagram.com/yespstudio/
- X (company): https://x.com/YespTech

Founder's profiles:
- LinkedIn: https://www.linkedin.com/in/srinithinsomasundaram/
- Instagram: https://www.instagram.com/srinithin.somasundaram/
- X: https://x.com/Ssrinithin

Brand assets available on request:
- Yesp Logo (Dark)
- Yesp Logo (Light)
- Brand Guidelines PDF
- Company Overview PDF
- Founder Headshots
- Office Photos

Notes:
This download is intentionally text-based so it reflects verified site data and provides a clean, immediate brand reference.`;

export const Route = createFileRoute("/brand-kit.txt")({
  server: {
    handlers: {
      GET: async () =>
        new Response(brandKitText, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Content-Disposition": 'attachment; filename="yesp-brand-kit.txt"',
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
