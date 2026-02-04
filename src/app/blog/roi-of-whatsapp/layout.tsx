import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'The ROI of WhatsApp for Business | Yesp Studio Blog',
    description: 'Discover how to handle 10,000+ leads without scaling your headcount using intelligent WhatsApp automation and AI agents.',
    keywords: 'WhatsApp automation, ROI for business, AI lead handling, WhatsApp for agencies, scale sales'
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
