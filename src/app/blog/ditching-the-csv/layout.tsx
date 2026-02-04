import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ditching the CSV: Real-time Data Sync | Yesp Studio Blog',
    description: 'Learn the technical protocol for achieving zero-manual-entry workflows through real-time data synchronization between Notion, Airtable, and CRMs.',
    keywords: 'data synchronization, real-time sync, Notion automation, Airtable sync, CRM integration'
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
