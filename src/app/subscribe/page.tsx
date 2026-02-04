import type { Metadata } from 'next';
import { NewsletterForm } from '@/components/NewsletterForm';

export const metadata: Metadata = {
    title: 'Subscribe to Our Newsletter | Yesp Studio',
    description: 'Get the latest insights on business automation and AI directly to your inbox. Subscribe to the Yesp Studio newsletter.',
};

export default function SubscribePage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-6 relative overflow-hidden flex items-center justify-center">
            {/* Background Technical Grid */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            <div className="max-w-2xl w-full mx-auto relative z-10">
                <div className="text-center mb-12">
                    <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4 block">Newsletter</span>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6">
                        Stay Ahead of the <span className="text-blue-500">Curve</span>
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed max-w-lg mx-auto">
                        Get exclusive strategies on automation, AI implementation, and agency scaling delivered straight to your inbox. No fluff, just actionable systems.
                    </p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
                    <NewsletterForm />
                    <p className="text-slate-500 text-xs text-center mt-6">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </div>
    );
}
