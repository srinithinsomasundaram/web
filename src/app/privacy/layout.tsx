import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Protocol | Data Security | Yesp Studio',
    description: 'Our commitment to data privacy and security. Learn how Yesp Studio handles information and maintains the highest standards of confidentiality.',
    keywords: 'privacy policy, data security, AI privacy, Yesp Studio privacy'
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
