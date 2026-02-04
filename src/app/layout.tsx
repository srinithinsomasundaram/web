import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/Navigation";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CookieConsent } from "@/components/CookieConsent";
import { LeadPopup } from "@/components/LeadPopup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL('https://yespstudio.com'),
    title: {
        template: '%s | Yesp Studio',
        default: 'Custom Automation for Service Businesses & Agencies | Yesp Studio',
    },
    description: "Yesp Studio architects bulletproof automation systems for service businesses and agencies. Specialized in lead handling, follow-up automation, and custom workflow engineering.",
    keywords: "lead automation for service businesses, follow-up automation for agencies, business workflow automation services, CRM and lead automation, white-label automation for agencies, business process automation, yesp studio, automation partner for agencies",
    icons: {
        icon: "/logo.png",
        apple: "/logo.png",
    },
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: "Custom Automation for Service Businesses & Agencies | Yesp Studio",
        description: "Scale your operations with bulletproof lead handling and workflow automation systems built for high-leverage service businesses.",
        url: 'https://yespstudio.com',
        siteName: 'Yesp Studio',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Custom Automation for Service Businesses & Agencies | Yesp Studio",
        description: "Scale your operations with bulletproof lead handling and workflow automation systems built for high-leverage service businesses.",
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "Yesp Studio",
                            "alternateName": "Yesp Corporation",
                            "url": "https://yespstudio.com",
                            "logo": "https://yespstudio.com/logo.png",
                            "description": "AI automation agency specializing in business process automation and custom workflow solutions.",
                            "founder": {
                                "@type": "Person",
                                "name": "Srinithin Somasundaram"
                            },
                            "sameAs": [
                                "https://www.linkedin.com/company/yesptech/",
                                "https://www.instagram.com/yespstudio"
                            ],
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "email": "hello@yespstudio.com",
                                "contactType": "Customer Service"
                            }
                        })
                    }}
                />
                <Navbar />
                <main className="pt-24 min-h-screen">
                    {children}
                </main>
                <WhatsAppButton />
                <LeadPopup />
                <CookieConsent />
                <Footer />
            </body>
        </html>
    );
}
