import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'White-Label Automation Partner for Agencies',
    description: 'Yesp Studio functions as a behind-the-scenes automation delivery partner for agencies. Scale your revenue without increasing headcount with our white-label solutions.',
    keywords: 'white-label automation for agencies, agency automation partner, workflow automation for digital agencies, lead automation partner'
};

export default function PartnershipLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
