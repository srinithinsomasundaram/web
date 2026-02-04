import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Healthcare & Clinic Lead Automation | Never Miss a Patient Enquiry | Yesp Studio',
    description: 'Simple lead-to-booking system for clinics. Capture enquiries, follow up automatically, confirm appointments, and reduce no-shows. Built for healthcare.',
    keywords: 'clinic lead automation, patient enquiry system, WhatsApp automation for clinics, healthcare lead management, clinic appointment booking, reduce no-shows, patient follow-up automation, clinic CRM, medical practice automation, dental clinic automation',
    alternates: {
        canonical: '/clinics',
    },
    openGraph: {
        title: 'Never Miss a Patient Enquiry — Automation for Clinics',
        description: 'Simple lead and appointment system built specifically for clinics. Automate WhatsApp, web, and email enquiries.',
        url: 'https://yespstudio.com/clinics',
        type: 'website',
    },
};

export default function ClinicsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
