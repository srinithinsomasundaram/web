"use client";

import { motion } from 'framer-motion';
import { ArrowLeft, MessageSquare, Zap, Target, Smartphone, CheckCircle2, Clock, Star, Share2, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function ROIOfWhatsApp() {
    return (
        <div className="pt-24 pb-40 space-y-32 overflow-hidden bg-white">
            {/* ARTICLE HERO */}
            <section className="max-w-7xl mx-auto px-6 relative">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/40 blur-[150px] -z-10 rounded-full animate-pulse"></div>

                <Link href="/blog" className="inline-flex items-center space-x-2 text-slate-400 hover:text-blue-600 transition-colors mb-16 font-black uppercase tracking-widest text-[10px]">
                    <ArrowLeft className="w-3 h-3" />
                    <span>Back to Archive</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
                    <div className="lg:col-span-8 space-y-10">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                                <TrendingUp className="w-3.5 h-3.5" />
                                <span>Strategy Deep-Dive</span>
                            </div>
                            <div className="flex items-center space-x-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                <Clock className="w-3 h-3" />
                                <span>7 Min Read</span>
                            </div>
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-950 tracking-tighter leading-[0.85] uppercase"
                        >
                            ROI of <br />
                            <span className="text-blue-600 outline-text">WhatsApp.</span>
                        </motion.h1>

                        <p className="text-2xl md:text-3xl font-medium text-slate-500 leading-tight max-w-2xl">
                            How to handle 10k leads without hiring a single rep. Discover the technical power of the 5-minute response rule.
                        </p>
                    </div>

                    <div className="lg:col-span-4 flex lg:justify-end">
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-6 w-full max-w-xs">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Published By</p>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-white text-xs font-black">Y</div>
                                <div>
                                    <p className="text-sm font-black text-slate-900 leading-none mb-1">Business Ops Unit</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Yesp Corporation</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ARTICLE CONTENT */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20">
                <div className="lg:col-span-8 prose prose-slate prose-xl max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-950 prose-p:text-slate-500 prose-p:font-medium prose-p:leading-relaxed prose-strong:text-slate-900">
                    <p className="text-3xl font-bold text-slate-900 leading-tight mb-16 border-l-4 border-blue-600 pl-8">
                        "Speed is the only currency that matters in modern lead handling. If you don't respond in 5 minutes, you've already lost."
                    </p>

                    <p>
                        Speed is the only currency that matters in modern lead handling. If a lead enquiries and doesn't get a response within 5 minutes, your conversion rate drops by 80%. Email is slow and crowded. WhatsApp is immediate and intimate.
                    </p>

                    <h2>01. The Channel of Choice</h2>
                    <p>
                        WhatsApp has a 98% open rate and a 45-60% click-through rate. Compare that to the 20% open rate of a "good" email campaign. By meeting your leads where they actually spend their time, you eliminate the friction of modern communication.
                    </p>

                    <div className="my-20 p-12 rounded-[3.5rem] bg-blue-600 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[120px] -z-10 rounded-full"></div>
                        <Smartphone className="w-12 h-12 text-white mb-8" />
                        <h3 className="text-white text-4xl font-black mb-6 uppercase tracking-tight">The 5-Minute Rule</h3>
                        <p className="text-blue-50 font-xl leading-relaxed">
                            Leads responded to in under 5 minutes are 21x more likely to enter the sales process than those responded to in 30 minutes. Automation is the only way to achieve this at scale.
                        </p>
                    </div>

                    <h2>02. Qualifying at Scale</h2>
                    <p>
                        A human sales rep can handle maybe 50 conversations a day effectively. An **AI Sales Brain** connected to the WhatsApp API can handle 10,000 simultaneously.
                    </p>
                    <p>
                        Our systems don't just "chat." They:
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start space-x-4">
                            <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                            <span><strong>Determine Intent:</strong> Categorizing leads by buying readiness instantly.</span>
                        </li>
                        <li className="flex items-start space-x-4">
                            <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                            <span><strong>Extract Data:</strong> Automated collection of budget, timeline, and goals.</span>
                        </li>
                        <li className="flex items-start space-x-4">
                            <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                            <span><strong>Drive Action:</strong> Directing qualified traffic to booking links or human high-touch.</span>
                        </li>
                    </ul>

                    <h2>03. The Math of Automation</h2>
                    <p>
                        Scaling a sales team to handle 10k monthly leads would cost $20k-$50k per month in base salaries alone. An automated WhatsApp pipeline performs the same function for a fraction of the cost, with 0% fatigue and 100% data accuracy.
                    </p>

                    <h2>Conclusion</h2>
                    <p>
                        WhatsApp isn't just a messaging app; it's a high-performance sales engine when paired with the right technical logic. Stop losing leads to slow response times.
                    </p>
                </div>

                {/* SIDEBAR */}
                <div className="lg:col-span-4 space-y-12">
                    <div className="sticky top-32 space-y-12">
                        <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-8">
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Metrics That Matter</h4>
                            <div className="space-y-6">
                                {[
                                    { label: "Open Rate", val: "98%" },
                                    { label: "Click Rate", val: "45%+" },
                                    { label: "Response Time", val: "< 1m" },
                                    { label: "Scale Capacity", val: "Unlimited" }
                                ].map((stat, i) => (
                                    <div key={i} className="flex justify-between items-center pb-4 border-b border-slate-200">
                                        <p className="text-sm font-bold text-slate-500 uppercase">{stat.label}</p>
                                        <p className="text-sm font-black text-blue-600">{stat.val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-10 rounded-[2.5rem] bg-slate-950 shadow-2xl space-y-8 text-white">
                            <h4 className="text-xl font-black uppercase tracking-tight">Scale Your Sales</h4>
                            <p className="text-slate-400 font-medium">Inject AI into your WhatsApp channel for zero-latency growth.</p>
                            <Link href="/contact" className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-center block hover:bg-blue-700 transition-all">
                                Discuss Setup
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
