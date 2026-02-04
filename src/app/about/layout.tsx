import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Yesp Studio | Engineering Bulletproof Business Logic',
    description: 'Learn about the philosophy and engineering standards behind Yesp Studio. Architecting reliability for high-leverage service businesses.',
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
