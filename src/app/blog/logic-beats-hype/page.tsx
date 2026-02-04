"use client";

import { motion } from 'framer-motion';
import { ArrowLeft, Cpu, Zap, ShieldCheck, Rocket, CheckCircle2, Star, Clock, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function LogicBeatsHype() {
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
                                <Cpu className="w-3.5 h-3.5" />
                                <span>Technical Protocol</span>
                            </div>
                            <div className="flex items-center space-x-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                <Clock className="w-3 h-3" />
                                <span>6 Min Read</span>
                            </div>
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-950 tracking-tighter leading-[0.85] uppercase"
                        >
                            Logic Beats <br />
                            <span className="text-blue-600 outline-text">Hype.</span>
                        </motion.h1>

                        <p className="text-2xl md:text-3xl font-medium text-slate-500 leading-tight max-w-2xl">
                            Building systems that don't break when the API changes. Why engineering reliability is the ultimate business asset.
                        </p>
                    </div>

                    <div className="lg:col-span-4 flex lg:justify-end">
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-6 w-full max-w-xs">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Published By</p>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-white text-xs font-black">Y</div>
                                <div>
                                    <p className="text-sm font-black text-slate-900 leading-none mb-1">Engineering Core</p>
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
                        "If your automation requires daily monitoring to ensure it's still running, it's not automation—it's just another job for your team."
                    </p>

                    <p>
                        In the current landscape of rapid AI advancement, "hype" is easy to find. Every day, a new tool or model is released, promising to revolutionize business overnight. However, for a high-leverage service business, hype is a liability.
                    </p>

                    <p>
                        At Yesp Studio, we focus on the underlying <strong>Logic</strong>. Because while models change and trends fade, the logic of your business operations remains the constant.
                    </p>

                    <h2>01. The Fragility of Hype</h2>
                    <p>
                        Most "AI Solutions" you see on social media are fragile. They rely on a specific prompt or a specific tool working exactly as demonstrated. The moment a lead provides an edge-case response, or a third-party API updates its schema, the system collapses. This introduces technical debt and operational risk.
                    </p>

                    <div className="my-20 p-12 rounded-[3.5rem] bg-slate-950 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/30 blur-[120px] -z-10 rounded-full"></div>
                        <Star className="w-12 h-12 text-blue-500 mb-8" />
                        <h3 className="text-white text-4xl font-black mb-6 uppercase tracking-tight">The Hype Trap</h3>
                        <p className="text-slate-400 text-xl leading-relaxed">
                            Agencies chasing the latest viral "AI Hack" end up building house of cards. When the hype dies, the system breaks, and the client loses trust. We build for the long-term.
                        </p>
                    </div>

                    <h2>02. Engineering for Resilience</h2>
                    <p>
                        We prioritize <strong>Bulletproof Reliability</strong>. This means building systems that have:
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start space-x-4">
                            <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                            <span><strong>Error Interception:</strong> Catching and handling failed syncs before they reach your CRM.</span>
                        </li>
                        <li className="flex items-start space-x-4">
                            <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                            <span><strong>State Management:</strong> Ensuring the system knows exactly where a lead is, even with human intervention.</span>
                        </li>
                        <li className="flex items-start space-x-4">
                            <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                            <span><strong>Model Agnostic Architecture:</strong> Workflows that switch between AI models without rewriting code.</span>
                        </li>
                    </ul>

                    <h2>Conclusion</h2>
                    <p>
                        Don't chase the trend. Build the logic. When you focus on engineering reliability, you aren't just saving time; you're building a scalable asset that grows with your business.
                    </p>
                </div>

                {/* SIDEBAR */}
                <div className="lg:col-span-4 space-y-12">
                    <div className="sticky top-32 space-y-12">
                        <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-8">
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Key Takeaways</h4>
                            <div className="space-y-6">
                                {[
                                    "Logic over flashy demos",
                                    "Bulletproof error handling",
                                    "API-resilient architecture",
                                    "Scalable technical protocols"
                                ].map((point, i) => (
                                    <div key={i} className="flex items-center space-x-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                        <p className="text-sm font-bold text-slate-600">{point}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-10 rounded-[2.5rem] bg-blue-600 shadow-2xl shadow-blue-600/20 space-y-8 text-white">
                            <h4 className="text-xl font-black uppercase tracking-tight">Ready to Build?</h4>
                            <p className="text-blue-100 font-medium">Get a technical audit of your current systems.</p>
                            <Link href="/contact" className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-center block hover:scale-[1.02] active:scale-[0.98] transition-all">
                                Contact Engineering
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
