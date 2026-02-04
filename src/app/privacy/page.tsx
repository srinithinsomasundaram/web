"use client";

import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function Privacy() {
    return (
        <div className="pt-24 pb-40 space-y-32 overflow-hidden bg-white">
            {/* PROTOCOL HERO */}
            <section className="max-w-7xl mx-auto px-6 relative">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/40 blur-[150px] -z-10 rounded-full animate-pulse"></div>

                <Link href="/" className="inline-flex items-center space-x-2 text-slate-400 hover:text-blue-600 transition-colors mb-16 font-black uppercase tracking-widest text-[10px]">
                    <ArrowLeft className="w-3 h-3" />
                    <span>Return to Headquarters</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
                    <div className="lg:col-span-8 space-y-10">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                            <Lock className="w-3.5 h-3.5 text-blue-400" />
                            <span>Security Directive</span>
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-950 tracking-tighter leading-[0.85] uppercase"
                        >
                            Privacy <br />
                            <span className="text-blue-600 outline-text">Protocol.</span>
                        </motion.h1>

                        <p className="text-2xl md:text-3xl font-medium text-slate-500 leading-tight max-w-2xl">
                            How Yesp Corporation protects your operational intelligence. Our commitment to data integrity and bulletproof security.
                        </p>
                    </div>

                    <div className="lg:col-span-4 flex lg:justify-end">
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-6 w-full max-w-xs">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Protocol Status</p>
                            <div className="flex items-center space-x-4">
                                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                                <p className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none">V 2.0 • Active</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROTOCOL CONTENT */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20">
                <div className="lg:col-span-8 prose prose-slate prose-xl max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-950 prose-p:text-slate-500 prose-p:font-medium prose-p:leading-relaxed prose-strong:text-slate-900">
                    <p className="text-3xl font-bold text-slate-900 leading-tight mb-16 border-l-4 border-blue-600 pl-8">
                        "Data is the technical lifeblood of your business. We architect our systems to respect that absolute truth."
                    </p>

                    <p>
                        At Yesp Studio, we treat your business data with the same level of integrity that we apply to our automation logic. This protocol outlines our commitment to your privacy and technical security.
                    </p>

                    <h2>01. Data Infrastructure</h2>
                    <p>
                        We build systems that prioritize direct connections. Where possible, your data stays within your own infrastructure (Notion, CRMs, etc.) and only passes through our middleware temporarily for processing. We do not build "data silos."
                    </p>

                    <div className="my-20 p-12 rounded-[3.5rem] bg-slate-950 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/30 blur-[120px] -z-10 rounded-full"></div>
                        <ShieldCheck className="w-12 h-12 text-blue-500 mb-8" />
                        <h3 className="text-white text-4xl font-black mb-6 uppercase tracking-tight">Zero-Capture Logic</h3>
                        <p className="text-slate-400 text-xl leading-relaxed">
                            Our technical protocol is designed to minimize data footprint. We prioritize temporary processing buffers over permanent storage, ensuring your lead data remains yours alone.
                        </p>
                    </div>

                    <h2>02. Information Collection</h2>
                    <p>
                        We collect information necessary to deliver and optimize our automation services. This includes contact details and technical specifications required for system integration.
                    </p>

                    <h2>03. Confidentiality</h2>
                    <p>
                        Yesp Studio will never sell, lease, or distribute your business intelligence to third parties. Our internal access to your systems is restricted to the minimum required for engineering and maintenance.
                    </p>

                    <h2>04. Compliance</h2>
                    <p>
                        We architect our systems to be compliant with major data protection regulations, including GDPR for our European and German clients.
                    </p>
                </div>

                {/* SIDEBAR */}
                <div className="lg:col-span-4 space-y-12">
                    <div className="sticky top-32 space-y-12">
                        <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-8">
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Security Pillars</h4>
                            <div className="space-y-6">
                                {[
                                    "Encrypted Handshakes",
                                    "Direct CRM Injection",
                                    "Minimal Data Retention",
                                    "GDPR Alignment"
                                ].map((point, i) => (
                                    <div key={i} className="flex items-center space-x-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                        <p className="text-sm font-bold text-slate-600">{point}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-10 rounded-[2.5rem] bg-slate-950 shadow-2xl space-y-8 text-white">
                            <h4 className="text-xl font-black uppercase tracking-tight">GDPR Ready</h4>
                            <p className="text-slate-400 font-medium tracking-tight">Operating with European-standard data protocols globally.</p>
                            <div className="flex items-center space-x-2 text-blue-500 text-xs font-black uppercase tracking-widest">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Certified Approach</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ACTION SECTION */}
            <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="space-y-2">
                        <p className="text-2xl font-black text-slate-900 tracking-tight">Have security questions?</p>
                        <p className="text-slate-500 font-medium">Direct line to our technical compliance team.</p>
                    </div>
                    <Link href="/contact" className="px-12 py-6 bg-blue-600 text-white rounded-[2rem] text-xl font-black shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all flex items-center space-x-4">
                        <span>Get in Touch</span>
                        <ChevronRight className="w-6 h-6" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
