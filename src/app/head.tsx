export default function Head() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Yesp Studio",
                        "alternateName": "Yesp Corporation",
                        "url": "https://yespstudio.com",
                        "logo": "https://yespstudio.com/logo.png",
                        "description": "AI automation agency specializing in business process automation, AI agents development, and custom workflow solutions for service businesses and agencies.",
                        "founder": {
                            "@type": "Person",
                            "name": "Srinithin Somasundaram"
                        },
                        "address": {
                            "@type": "PostalAddress",
                            "addressCountry": "IN"
                        },
                        "sameAs": [
                            "https://www.linkedin.com/company/yesptech/",
                            "https://www.instagram.com/yespstudio"
                        ],
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "email": "hello@yespstudio.com",
                            "contactType": "Customer Service",
                            "availableLanguage": ["English"]
                        },
                        "areaServed": [
                            {
                                "@type": "Country",
                                "name": "United Kingdom"
                            },
                            {
                                "@type": "Country",
                                "name": "United States"
                            },
                            {
                                "@type": "Country",
                                "name": "India"
                            },
                            {
                                "@type": "Country",
                                "name": "Germany"
                            }
                        ],
                        "serviceType": [
                            "AI Automation Services",
                            "Business Process Automation",
                            "AI Agents Development",
                            "Custom AI Solutions",
                            "Workflow Automation",
                            "CRM Automation",
                            "Lead Operations Automation"
                        ]
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "Yesp Studio",
                        "url": "https://yespstudio.com",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": "https://yespstudio.com/search?q={search_term_string}",
                            "query-input": "required name=search_term_string"
                        }
                    })
                }}
            />
        </>
    );
}
