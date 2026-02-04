import { Metadata } from 'next';
import USAClient from './USAClient';

export const metadata: Metadata = {
    title: 'AI Automation Agency USA | AI Agents Development Company | Yesp Studio',
    description: 'Premier AI automation agency in the USA. We specialize in enterprise AI solutions, AI agents development, and custom workflow automation for US businesses.',
    keywords: 'AI automation agency USA, AI agents development company, Enterprise AI solutions, Custom AI development services, AI workflow automation services, AI consulting services USA, AI-powered business automation, Intelligent automation services, AI integration services, No-code AI automation, AI for sales automation, AI lead generation tools, AI customer support automation',
    alternates: {
        canonical: '/locations/usa',
        languages: {
            'en-US': '/locations/usa',
            'en-GB': '/locations/uk',
            'en-IN': '/locations/india',
            'de-DE': '/locations/germany',
        },
    },
};

export default function USALocation() {
    return <USAClient />;
}
