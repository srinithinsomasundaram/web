import { Metadata } from 'next';
import IndiaClient from './IndiaClient';

export const metadata: Metadata = {
    title: 'AI Automation Company India | AI Agency India | Yesp Studio',
    description: 'Premier AI automation company in India. We specialize in AI development services, WhatsApp automation with AI, and custom workflow solutions for Indian founders and SMBs.',
    keywords: 'AI automation company India, AI agency India, AI development services India, Affordable AI automation, AI chatbot development India, AI tools for small business India, Business automation services India, WhatsApp automation with AI, CRM automation India, OpenAI integration services, AI SaaS development India, AI workflow tools India',
    alternates: {
        canonical: '/locations/india',
        languages: {
            'en-IN': '/locations/india',
            'en-GB': '/locations/uk',
            'en-US': '/locations/usa',
            'de-DE': '/locations/germany',
        },
    },
};

export default function IndiaLocation() {
    return <IndiaClient />;
}
