import type { Metadata } from 'next';
import Link from 'next/link';
import { Linkedin, Instagram } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Follow Us | Yesp Studio',
    description: 'Connect with Yesp Studio on social media. Join our community on LinkedIn and Instagram for insights on automation and agency growth.',
};

export default function FollowUsPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-6 relative overflow-hidden">
            {/* Background Technical Grid */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            <div className="max-w-4xl mx-auto relative z-10 text-center">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6">
                    Connect with <span className="text-blue-500">Yesp Studio</span>
                </h1>
                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed">
                    Join our growing community of agency owners and service businesses. We share daily insights on automation, systems scaling, and operational excellence.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                    {/* LinkedIn Card */}
                    <Link
                        href="https://www.linkedin.com/company/yesptech/"
                        target="_blank"
                        className="group flex flex-col items-center justify-center p-10 rounded-2xl bg-slate-900 border border-white/5 hover:border-blue-500/50 hover:bg-slate-900/80 transition-all duration-300"
                    >
                        <div className="p-4 bg-blue-600/10 rounded-xl mb-6 group-hover:bg-blue-600/20 transition-colors">
                            <Linkedin className="w-12 h-12 text-blue-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">LinkedIn</h2>
                        <p className="text-slate-400 text-center text-sm">Professional insights & company updates</p>
                    </Link>

                    {/* Instagram Card */}
                    <Link
                        href="https://www.instagram.com/yespstudio?igsh=MTlzODc2dDF6MjNxbA=="
                        target="_blank"
                        className="group flex flex-col items-center justify-center p-10 rounded-2xl bg-slate-900 border border-white/5 hover:border-pink-500/50 hover:bg-slate-900/80 transition-all duration-300"
                    >
                        <div className="p-4 bg-pink-600/10 rounded-xl mb-6 group-hover:bg-pink-600/20 transition-colors">
                            <Instagram className="w-12 h-12 text-pink-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Instagram</h2>
                        <p className="text-slate-400 text-center text-sm">Behind the scenes & visual stories</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
