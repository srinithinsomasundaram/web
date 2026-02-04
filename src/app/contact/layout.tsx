import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Yesp Studio | Request a Custom Automation Assessment',
    description: 'Get in touch with our architects to discuss your business automation needs. Lead handling, CRM sync, and custom workflow solutions.',
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
