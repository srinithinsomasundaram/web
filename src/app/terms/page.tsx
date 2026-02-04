"use client";

import { motion } from 'framer-motion';
import { FileText, Scale, ShieldAlert, Cpu, ArrowLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function Terms() {
    return (
        <div className="pt-24 pb-40 space-y-32 overflow-hidden bg-white">
            {/* TERMS HERO */}
            <section className="max-w-7xl mx-auto px-6 relative">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/40 blur-[150px] -z-10 rounded-full animate-pulse"></div>

                <Link href="/" className="inline-flex items-center space-x-2 text-slate-400 hover:text-blue-600 transition-colors mb-16 font-black uppercase tracking-widest text-[10px]">
                    <ArrowLeft className="w-3 h-3" />
                    <span>Return to Headquarters</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
                    <div className="lg:col-span-8 space-y-10">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                            <Scale className="w-3.5 h-3.5 text-blue-400" />
                            <span>Service Framework</span>
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-950 tracking-tighter leading-[0.85] uppercase"
                        >
                            System <br />
                            <span className="text-blue-600 outline-text">Terms.</span>
                        </motion.h1>

                        <p className="text-2xl md:text-3xl font-medium text-slate-500 leading-tight max-w-2xl">
                            The operational logic for Yesp Corporation services. Clarity in delivery, reliability in execution.
                        </p>
                    </div>

                    <div className="lg:col-span-4 flex lg:justify-end">
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-6 w-full max-w-xs">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Operational Year</p>
                            <div className="flex items-center space-x-4">
                                <p className="text-3xl font-black text-slate-950 tracking-tighter uppercase leading-none">2026</p>
                                <div className="h-4 w-px bg-slate-200"></div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocol Stance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TERMS CONTENT */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20">
                <div className="lg:col-span-8 prose prose-slate prose-xl max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-950 prose-p:text-slate-500 prose-p:font-medium prose-p:leading-relaxed prose-strong:text-slate-900">
                    <p className="text-3xl font-bold text-slate-900 leading-tight mb-16 border-l-4 border-blue-600 pl-8">
                        "Reliability is a contract. We ensure our terms are as bulletproof as our automation logic."
                    </p>

                    <p>
                        By engaging with Yesp Studio, you agree to our operational framework. We ensure absolute clarity in delivery and total reliability in execution of every system we architect.
                    </p>

                    <h2>01. Service Delivery</h2>
                    <p>
                        Yesp Studio delivers bespoke automation systems as outlined in the specific project scope. We provide a <strong>30-day "hyper-care" period</strong> following deployment to ensure logic stability and system fine-tuning.
                    </p>

                    <div className="my-20 p-12 rounded-[3.5rem] bg-slate-50 border border-slate-100 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[120px] -z-10 rounded-full"></div>
                        <h3 className="text-slate-900 text-4xl font-black mb-6 uppercase tracking-tight">The 30-Day Protocol</h3>
                        <p className="text-slate-500 text-xl leading-relaxed font-medium">
                            During the hyper-care phase, our engineering team monitors all automated triggers and syncs. Any logic drift is corrected instantly to ensure your system reaches peak 1st-party reliability.
                        </p>
                    </div>

                    <h2>02. Client Responsibilities</h2>
                    <p>
                        Clients must provide necessary API access and documentation for third-party tools (HubSpot, Notion, etc.) to allow for successful system integration. Delays in access may shift delivery timelines.
                    </p>

                    <h2>03. Intellectual Property</h2>
                    <p>
                        Upon full payment, clients own the specific implementation of the workflows we build for them. Yesp Studio retains ownership of proprietary internal middleware and generic logic patterns that power our delivery framework.
                    </p>

                    <h2>04. Liability</h2>
                    <p>
                        While we build "bulletproof" systems, Yesp Studio is not liable for service outages caused by third-party API changes or provider downtime beyond our control. We architect for resilience, but cannot control the global internet infrastructure.
                    </p>
                </div>

                {/* SIDEBAR */}
                <div className="lg:col-span-4 space-y-12">
                    <div className="sticky top-32 space-y-12">
                        <div className="p-10 rounded-[2.5rem] bg-slate-950 shadow-2xl space-y-8 text-white">
                            <h4 className="text-xl font-black uppercase tracking-tight">System Compliance</h4>
                            <div className="space-y-6">
                                {[
                                    "Project Scope Integrity",
                                    "IP Transfer Protections",
                                    "Hyper-care Commitment",
                                    "Resilient Logic Guarantee"
                                ].map((point, i) => (
                                    <div key={i} className="flex items-center space-x-4">
                                        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-3 h-3 text-white" />
                                        </div>
                                        <p className="text-sm font-bold text-slate-300 tracking-tight">{point}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-4">Corporate Jurisdiction</p>
                            <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                                <p className="text-sm font-bold text-slate-900">Governed by the business laws of India. Operated globally by Yesp Corp.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ACTION SECTION */}
            <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100 text-center">
                <div className="max-w-2xl mx-auto space-y-8">
                    <h2 className="text-4xl font-black text-slate-900 uppercase">Ready to scale securely?</h2>
                    <Link href="/contact" className="px-12 py-6 bg-slate-950 text-white rounded-[2rem] text-xl font-black shadow-2xl hover:bg-black transition-all inline-flex items-center space-x-4">
                        <span>Initiate Project</span>
                        <ChevronRight className="w-6 h-6 text-blue-500" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
