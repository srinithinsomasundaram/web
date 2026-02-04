import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'System Terms | Service Framework | Yesp Studio',
    description: 'The operational framework for our automation services. Understand our terms of service and system delivery protocols.',
    keywords: 'terms of service, business terms, automation contract, Yesp Studio terms'
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
