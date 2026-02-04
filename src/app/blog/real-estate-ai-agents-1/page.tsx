"use client";

import { motion } from 'framer-motion';
import {
    ArrowLeft, Home, Zap, Target, Key,
    CheckCircle2, Clock, TrendingUp,
    Share2, ArrowRight, MapPin
} from 'lucide-react';
import Link from 'next/link';

export default function RealEstateAIAgents1() {
    return (
        <div className="pt-24 pb-40 space-y-32 overflow-hidden bg-white">
            {/* PROGRESS BAR */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="fixed top-0 left-0 right-0 h-1.5 bg-emerald-600 origin-left z-50"
            />

            {/* ARTICLE HERO */}
            <section className="max-w-7xl mx-auto px-6 relative">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-50/50 blur-[150px] -z-10 rounded-full animate-pulse"></div>

                <div className="flex flex-col space-y-12">
                    <Link href="/blog" className="inline-flex items-center space-x-2 text-slate-400 hover:text-emerald-600 transition-colors w-fit font-black uppercase tracking-widest text-[10px] group">
                        <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-emerald-50 transition-colors">
                            <ArrowLeft className="w-3 h-3" />
                        </div>
                        <span>Back to Archive</span>
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
                        <div className="lg:col-span-8 space-y-10">
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-600/20">
                                    <Home className="w-3.5 h-3.5" />
                                    <span>Real Estate 2.0</span>
                                </div>
                                <div className="flex items-center space-x-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                    <Clock className="w-3 h-3" />
                                    <span>7 Min Read</span>
                                </div>
                            </div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-7xl md:text-8xl lg:text-[10rem] font-black text-slate-950 tracking-tighter leading-[0.8] uppercase italic"
                            >
                                The 24/7 <br />
                                <span className="text-emerald-600 outline-text-emerald">Closer.</span>
                            </motion.h1>

                            <p className="text-3xl md:text-4xl font-medium text-slate-500 leading-tight max-w-3xl border-l-8 border-emerald-600 pl-10 italic">
                                Closing deals while human agents sleep. Why the "always-on" real estate culture is finally being automated.
                            </p>
                        </div>

                        <div className="lg:col-span-4 flex lg:justify-end">
                            <div className="p-10 rounded-[3rem] bg-slate-950 border border-slate-800 space-y-8 w-full max-w-sm shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/10 blur-3xl group-hover:bg-emerald-600/20 transition-colors"></div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">PropTech Unit</p>
                                <div className="flex items-center space-x-5">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-emerald-600/20">Y</div>
                                    <div>
                                        <p className="text-lg font-black text-white leading-none mb-2">Growth Systems</p>
                                        <div className="flex items-center space-x-2">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Scale</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-white/5">
                                    <button className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors text-[10px] font-black uppercase tracking-widest">
                                        <Share2 className="w-3.5 h-3.5" />
                                        <span>Share Insights</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ARTICLE CONTENT */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20">
                <div className="lg:col-span-8 space-y-20">
                    <div className="prose prose-slate prose-xl max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-950 prose-p:text-slate-600 prose-p:font-medium prose-p:leading-loose prose-strong:text-slate-900 prose-strong:font-black">
                        <p className="text-4xl font-black text-slate-900 tracking-tight leading-tight mb-20 bg-slate-50 p-12 rounded-[3.5rem] border border-slate-100 shadow-inner">
                            "Your best results shouldn't depend on your waking hours. In real estate, the first response isn't just a courtesy—it's the closing advantage."
                        </p>

                        <p>
                            Real estate is a game of speed and availability. Potential buyers and sellers often do their research in the evenings or on weekends—times when human agents deserve to be off the clock. AI agents bridge this gap, ensuring no lead goes unanswered.
                        </p>

                        <div className="my-24 grid grid-cols-2 gap-8 not-prose">
                            <div className="p-10 rounded-[3rem] bg-emerald-50 border border-emerald-100 flex flex-col justify-between h-64">
                                <Key className="w-10 h-10 text-emerald-600" />
                                <div>
                                    <h4 className="text-2xl font-black text-slate-950 mb-2">Instant Unlock</h4>
                                    <p className="text-slate-500 font-medium leading-relaxed">Automated delivery of property details and floor plans.</p>
                                </div>
                            </div>
                            <div className="p-10 rounded-[3rem] bg-slate-950 border border-slate-900 flex flex-col justify-between h-64">
                                <MapPin className="w-10 h-10 text-emerald-500" />
                                <div>
                                    <h4 className="text-2xl font-black text-white mb-2">Geo Intelligence</h4>
                                    <p className="text-slate-400 font-medium leading-relaxed">Providing local area insights and data instantly.</p>
                                </div>
                            </div>
                        </div>

                        <h2>01. Instant Inquiry Handling</h2>
                        <p>
                            When a lead asks about a property at 11 PM, an AI agent can provide price, floor plans, and area details instantly. It doesn't just provide data; it qualifies the lead by asking about their budget, timeline, and pre-approval status.
                        </p>

                        <blockquote className="border-l-8 border-emerald-600 pl-10 my-20 not-prose">
                            <p className="text-3xl font-black text-slate-900 italic tracking-tight uppercase">
                                "The midnight lead is often the most motivated. Don't make them wait for sunrise."
                            </p>
                        </blockquote>

                        <h2>02. Virtual Tour Coordination</h2>
                        <p>
                            AI agents can help leads find the right property and then immediately book a virtual or in-person tour, syncing directly with the agent's CRM and calendar without a single phone call.
                        </p>

                        <div className="my-24 p-16 rounded-[4rem] bg-gradient-to-br from-emerald-600 to-teal-700 shadow-3xl relative overflow-hidden not-prose group">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[100px] -z-10 rounded-full animate-pulse"></div>
                            <div className="relative z-10 space-y-10">
                                <div className="p-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] w-fit">
                                    <Zap className="w-12 h-12 text-white" />
                                </div>
                                <h3 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
                                    24/7 Sales <br />
                                    Presence.
                                </h3>
                                <p className="text-emerald-50 text-2xl font-medium leading-relaxed max-w-xl">
                                    Automation turns your website and socials into a 24/7 sales floor that qualified leads can navigate on their terms.
                                </p>
                            </div>
                        </div>

                        <h2>03. Multi-Channel Presence</h2>
                        <p>
                            Whether it's Instagram DM, WhatsApp, or Web Chat, AI agents maintain a consistent brand voice and handle inquiries globally, breaking the barriers of locale and language.
                        </p>
                    </div>

                    {/* NEXT ARTICLE PREVIEW */}
                    <div className="not-prose pt-20 border-t border-slate-100">
                        <Link href="/blog/real-estate-ai-agents-2" className="group block p-12 rounded-[4rem] bg-slate-50 border border-slate-100 hover:border-emerald-400 transition-all">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Next in Series</p>
                                    <h4 className="text-4xl font-black text-slate-950 tracking-tight leading-none group-hover:text-emerald-600 transition-colors uppercase italic">The Secret Weapon: <br />Conversion Optimization</h4>
                                </div>
                                <div className="p-6 bg-white rounded-3xl group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xl shadow-slate-200/50">
                                    <ArrowRight className="w-8 h-8 md:w-12 md:h-12" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* SIDEBAR */}
                <div className="lg:col-span-4 space-y-12">
                    <div className="sticky top-32 space-y-12">
                        <div className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 space-y-10 shadow-inner">
                            <h4 className="text-lg font-black text-slate-950 uppercase tracking-tighter flex items-center">
                                <span className="w-8 h-px bg-emerald-600 mr-4"></span>
                                Performance Benchmarks
                            </h4>
                            <div className="space-y-8">
                                {[
                                    { label: "Lead Response Time", val: "30s", trend: "Elite" },
                                    { label: "Qualified Leads", val: "+55%", trend: "Upward" },
                                    { label: "After-Hours ROI", val: "20x", trend: "Recurrent" },
                                    { label: "CRM Data Accuracy", val: "100%", trend: "Absolute" }
                                ].map((stat, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                            <p className="text-lg font-black text-emerald-600">{stat.val}</p>
                                        </div>
                                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '100%' }}
                                                transition={{ duration: 1.5, delay: i * 0.1 }}
                                                className="h-full bg-emerald-600"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-12 rounded-[3.5rem] bg-slate-950 shadow-2xl space-y-10 text-white relative overflow-hidden group border border-white/5">
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-600/20 blur-[100px] group-hover:bg-emerald-600/30 transition-colors"></div>

                            <div className="space-y-6 relative z-10">
                                <h4 className="text-3xl font-black uppercase tracking-tight italic leading-tight">Own your <br /> Market.</h4>
                                <p className="text-slate-400 font-medium text-lg leading-relaxed">Inject AI into your real estate agency for 24/7 growth and listing dominance.</p>
                            </div>

                            <Link href="/contact" className="w-full py-6 bg-emerald-600 text-white rounded-3xl font-black text-center block hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl relative z-10 border border-emerald-400/20">
                                Hire Agent Brain
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
