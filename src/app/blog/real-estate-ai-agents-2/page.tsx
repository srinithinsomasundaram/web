"use client";

import { motion } from 'framer-motion';
import {
    ArrowLeft, TrendingUp, Zap, Target, Users,
    CheckCircle2, Clock, MessageSquare,
    Share2, ArrowRight, MousePointer2
} from 'lucide-react';
import Link from 'next/link';

export default function RealEstateAIAgents2() {
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
                                    <TrendingUp className="w-3.5 h-3.5" />
                                    <span>Sales Intelligence</span>
                                </div>
                                <div className="flex items-center space-x-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                    <Clock className="w-3 h-3" />
                                    <span>6 Min Read</span>
                                </div>
                            </div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-7xl md:text-8xl lg:text-[10rem] font-black text-slate-950 tracking-tighter leading-[0.8] uppercase italic"
                            >
                                The Secret <br />
                                <span className="text-emerald-600 outline-text-emerald">Weapon.</span>
                            </motion.h1>

                            <p className="text-3xl md:text-4xl font-medium text-slate-500 leading-tight max-w-3xl border-l-8 border-emerald-600 pl-10 italic">
                                Why modern real estate brokerages are abandoning old-school follow-ups for high-velocity AI conversion engines.
                            </p>
                        </div>

                        <div className="lg:col-span-4 flex lg:justify-end">
                            <div className="p-10 rounded-[3rem] bg-slate-950 border border-slate-800 space-y-8 w-full max-w-sm shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/10 blur-3xl group-hover:bg-emerald-600/20 transition-colors"></div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Growth Division</p>
                                <div className="flex items-center space-x-5">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-emerald-600/20">Y</div>
                                    <div>
                                        <p className="text-lg font-black text-white leading-none mb-2">Systems Strategy</p>
                                        <div className="flex items-center space-x-2">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Protocol</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-white/5">
                                    <button className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors text-[10px] font-black uppercase tracking-widest">
                                        <Share2 className="w-3.5 h-3.5" />
                                        <span>Export Strategy</span>
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
                            "Marketing generates leads, but systems generate revenue. In a high-stakes market, consistency is the ultimate competitive advantage."
                        </p>

                        <p>
                            Most real estate agencies have a "marketing" problem that's actually a "conversion" problem. They spend thousands on ads, but the leads decay because the follow-up is inconsistent. AI agents solve the decay problem by providing relentless, high-quality follow-up.
                        </p>

                        <div className="my-24 grid grid-cols-2 gap-8 not-prose">
                            <div className="p-10 rounded-[3rem] bg-emerald-50 border border-emerald-100 flex flex-col justify-between h-64">
                                <Users className="w-10 h-10 text-emerald-600" />
                                <div>
                                    <h4 className="text-2xl font-black text-slate-950 mb-2">Social Scale</h4>
                                    <p className="text-slate-500 font-medium leading-relaxed">Handling 10,000+ simultaneous conversations with ease.</p>
                                </div>
                            </div>
                            <div className="p-10 rounded-[3rem] bg-slate-950 border border-slate-900 flex flex-col justify-between h-64">
                                <MousePointer2 className="w-10 h-10 text-emerald-500" />
                                <div>
                                    <h4 className="text-2xl font-black text-white mb-2">Intent Scoring</h4>
                                    <p className="text-slate-400 font-medium leading-relaxed">Identifying high-value buyers through behavioral data.</p>
                                </div>
                            </div>
                        </div>

                        <h2>01. Immediate Speed to Lead</h2>
                        <p>
                            The likelihood of converting a lead is 100x higher if you contact them within 5 minutes versus 30 minutes. AI agents react in seconds, starting a conversation while the property is still fresh in the lead's mind.
                        </p>

                        <blockquote className="border-l-8 border-emerald-600 pl-10 my-20 not-prose">
                            <p className="text-3xl font-black text-slate-900 italic tracking-tight uppercase">
                                "The fortune is in the follow-up, but the speed is the entry fee."
                            </p>
                        </blockquote>

                        <h2>02. Data Enrichment and Scoring</h2>
                        <p>
                            Not all leads are created equal. AI agents score leads based on their interactions, ensuring that your human agents only spend their time on "hot" leads who are ready for a viewing or a valuation.
                        </p>

                        <div className="my-24 p-16 rounded-[4rem] bg-gradient-to-br from-teal-600 to-emerald-700 shadow-3xl relative overflow-hidden not-prose group">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[100px] -z-10 rounded-full animate-pulse"></div>
                            <div className="relative z-10 space-y-10">
                                <div className="p-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] w-fit">
                                    <Target className="w-12 h-12 text-white" />
                                </div>
                                <h3 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
                                    Relentless <br />
                                    Consistency.
                                </h3>
                                <p className="text-emerald-50 text-2xl font-medium leading-relaxed max-w-xl">
                                    AI agents maintain conversations over weeks and months, checking in with cold leads and bridging the gap to a closed contract.
                                </p>
                            </div>
                        </div>

                        <h2>03. Automated Nurture Sequences</h2>
                        <p>
                            Instead of generic email blasts, AI agents send personalized property matches and market updates via WhatsApp—the channel where leads actually engage.
                        </p>
                    </div>

                    {/* NEXT ARTICLE PREVIEW */}
                    <div className="not-prose pt-20 border-t border-slate-100">
                        <Link href="/blog/real-estate-ai-agents-1" className="group block p-12 rounded-[4rem] bg-slate-50 border border-slate-100 hover:border-emerald-400 transition-all">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Back to Part 1</p>
                                    <h4 className="text-4xl font-black text-slate-950 tracking-tight leading-none group-hover:text-emerald-600 transition-colors uppercase italic">The 24/7 Closer: <br />Virtual Sales Force</h4>
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
                                Conversion Logic
                            </h4>
                            <div className="space-y-8">
                                {[
                                    { label: "Lead Response", val: "Under 2m", trend: "Optimized" },
                                    { label: "Appointment Rate", val: "+45%", trend: "Upward" },
                                    { label: "Lead Acquisition Cost", val: "-30%", trend: "Efficient" },
                                    { label: "Nurture Engagement", val: "70%", trend: "High Impact" }
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

                        <div className="p-12 rounded-[3.5rem] bg-indigo-950 shadow-2xl space-y-10 text-white relative overflow-hidden group">
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-600/20 blur-[100px] group-hover:bg-emerald-600/30 transition-colors"></div>

                            <div className="space-y-6 relative z-10">
                                <h4 className="text-3xl font-black uppercase tracking-tight italic leading-tight">Scale Your <br /> Conversion.</h4>
                                <p className="text-indigo-200 font-medium text-lg leading-relaxed">Turn every inquiry into a listing valuation with our automated sales protocols.</p>
                            </div>

                            <Link href="/contact" className="w-full py-6 bg-emerald-600 text-white rounded-3xl font-black text-center block hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl relative z-10 border border-emerald-400/20">
                                Deploy Engine
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
