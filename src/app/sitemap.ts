import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://yespstudio.com';

    return [
        // CORE PAGES
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
            alternates: {
                languages: {
                    'en-GB': `${baseUrl}/locations/uk`,
                    'en-US': `${baseUrl}/locations/usa`,
                    'en-IN': `${baseUrl}/locations/india`,
                    'de-DE': `${baseUrl}/locations/germany`,
                },
            },
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/partnership`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/clinics`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/locations/uk`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },

        // SERVICE DETAIL PAGES
        {
            url: `${baseUrl}/services/lead-operations`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/smart-follow-ups`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/booking-logic`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/system-syncing`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/custom-microservices`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/services/ai-sales-brain`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },

        // BLOG HUB
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },

        // BLOG POSTS (MONTHLY)
        ...[
            'healthcare-ai-agents-1',
            'healthcare-ai-agents-2',
            'real-estate-ai-agents-1',
            'real-estate-ai-agents-2',
            'founders-story',
            'logic-beats-hype',
            'roi-of-whatsapp',
            'ditching-the-csv'
        ].map(slug => ({
            url: `${baseUrl}/blog/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        })),

        // LOCATION PAGES
        {
            url: `${baseUrl}/locations/usa`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/locations/india`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/locations/germany`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },

        // UTILITY & SUPPORT
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.4,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.4,
        },
        {
            url: `${baseUrl}/follow-us`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/subscribe`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.2,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.2,
        },
    ];
}
