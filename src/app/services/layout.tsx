import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Lead & Workflow Automation Services for Businesses',
    description: 'Explore our specialized automation protocols for service businesses: lead operations, AI sales brain, booking logic, and custom workflow sync.',
    keywords: 'lead automation for service businesses, workflow automation services, CRM automation, lead handling systems'
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
