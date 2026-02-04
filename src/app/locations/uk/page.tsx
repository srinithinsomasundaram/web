import { Metadata } from 'next';
import UKClient from './UKClient';

export const metadata: Metadata = {
    title: 'AI Automation Agency UK | AI Agents Development UK | Yesp Studio',
    description: 'Premier AI automation agency in the UK. We specialize in AI agents development, business process automation, and custom AI solutions for UK SMEs and startups.',
    keywords: 'AI automation agency UK, AI agents development UK, Business process automation UK, AI consulting company UK, Custom AI solutions UK, AI chatbot development UK, AI workflow automation UK, AI solutions for small businesses UK, AI tools for startups UK, CRM automation with AI UK, Lead generation automation UK, AI for finance automation UK, AI for real estate UK, AI for ecommerce automation UK',
    alternates: {
        canonical: '/locations/uk',
        languages: {
            'en-GB': '/locations/uk',
            'en-US': '/locations/usa',
            'en-IN': '/locations/india',
            'de-DE': '/locations/germany',
        },
    },
};

export default function UKLocation() {
    return <UKClient />;
}
