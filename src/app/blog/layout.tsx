import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'The Archive | Blog & Founders Story | Yesp Studio',
    description: 'Insights on AI automation, engineering reliability, and the story behind Yesp Studio by founder Srinithin Somasundaram.',
    keywords: 'srinithin somasundaram, srinithin, yesp founder, yesp, AI automation blog, automation strategy'
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
