import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Why Logic Beats Hype in AI Automation | Yesp Studio Blog',
    description: 'Learn why engineering reliability and bulletproof logic are more important than AI hype for building sustainable business automation.',
    keywords: 'AI automation logic, engineering reliability, AI hype vs reality, bulletproof systems'
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
