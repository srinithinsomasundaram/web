import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'The Origin Logic | Srinithin Somasundaram | Yesp Studio',
    description: 'Discover the vision behind Yesp Studio. Why we prioritize reliability over novelty in business automation. The mission of Srinithin Somasundaram and Yesp Corporation.',
    keywords: 'yesp studio founder, srinithin somasundaram, business automation philosophy, yesp corporation mission, reliability in automation',
    openGraph: {
        title: 'The Origin Logic | Yesp Studio',
        description: 'Predictable, efficient, and invisible automation systems. Read the founder\'s mission.',
        images: [
            {
                url: '/srinithin.jpg',
                width: 1200,
                height: 630,
                alt: 'Srinithin Somasundaram - Founder of Yesp Studio',
            },
        ],
    },
};

export default function FoundersStoryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
