"use client";

import { motion } from 'framer-motion';
import { ArrowLeft, Database, Zap, RefreshCw, Layers, CheckCircle2, Clock, Star, Share2, Activity } from 'lucide-react';
import Link from 'next/link';

export default function DitchingTheCSV() {
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
                                <Activity className="w-3.5 h-3.5" />
                                <span>Process Engineering</span>
                            </div>
                            <div className="flex items-center space-x-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                <Clock className="w-3 h-3" />
                                <span>5 Min Read</span>
                            </div>
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-950 tracking-tighter leading-[0.85] uppercase"
                        >
                            Real-time <br />
                            <span className="text-blue-600 outline-text">Sync.</span>
                        </motion.h1>

                        <p className="text-2xl md:text-3xl font-medium text-slate-500 leading-tight max-w-2xl">
                            The technical protocol for zero-manual-entry workflows. Why static data exports are the silent killer of agency growth.
                        </p>
                    </div>

                    <div className="lg:col-span-4 flex lg:justify-end">
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-6 w-full max-w-xs">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Published By</p>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-white text-xs font-black">Y</div>
                                <div>
                                    <p className="text-sm font-black text-slate-900 leading-none mb-1">Architecture Lab</p>
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
                        "Manually exporting and importing CSV files is the digital equivalent of carrying water in a leaky bucket. It's slow and prone to error."
                    </p>

                    <p>
                        Most businesses run on a fragmented stack of tools. Sales is in the CRM, operations is in Notion, and marketing is in Airtable. The "tape" holding these together is usually a junior employee manually moving data once a week. This is where businesses go to die.
                    </p>

                    <h2>01. The Death of the Spreadsheet</h2>
                    <p>
                        A spreadsheet is a snapshot of the past. In a high-leverage environment, you need an x-ray of the present. Manual entry introduces a latency that makes real-time decision-making impossible. When your data is static, your business is stagnant.
                    </p>

                    <div className="my-20 p-12 rounded-[3.5rem] bg-slate-950 shadow-2xl relative overflow-hidden group border border-slate-900">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/30 blur-[120px] -z-10 rounded-full"></div>
                        <RefreshCw className="w-12 h-12 text-blue-500 mb-8 animate-spin-slow" />
                        <h3 className="text-white text-4xl font-black mb-6 uppercase tracking-tight">Liquid Data</h3>
                        <p className="text-slate-400 text-xl leading-relaxed">
                            We build "Liquid Data" environments: when a record is updated in Source A, it is instantly reflected in Source B. No human intervention. No exports. No errors.
                        </p>
                    </div>

                    <h2>02. The Pulse Protocol</h2>
                    <p>
                        We build **Real-time Synchronization Bridges**. When a record is updated in Source A, it is instantly reflected in Sources B, C, and D.
                    </p>
                    <p>
                        Our technical sync protocol includes:
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start space-x-4">
                            <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                            <span><strong>Webhook Listeners:</strong> High-priority detection of changes at the source.</span>
                        </li>
                        <li className="flex items-start space-x-4">
                            <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                            <span><strong>Data Transformation:</strong> Normalizing phone numbers, currencies, and timestamps across platforms.</span>
                        </li>
                        <li className="flex items-start space-x-4">
                            <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                            <span><strong>Conflict Resolution:</strong> Logic to determine which source "wins" during concurrent edits.</span>
                        </li>
                    </ul>

                    <h2>Conclusion</h2>
                    <p>
                        Stop being a data courier. Let the machines handle the transfer while your team handles the strategy. Real-time sync isn't a luxury; it's the foundation of a modern agency.
                    </p>
                </div>

                {/* SIDEBAR */}
                <div className="lg:col-span-4 space-y-12">
                    <div className="sticky top-32 space-y-12">
                        <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-8">
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Sync Efficiency</h4>
                            <div className="space-y-6">
                                {[
                                    { label: "Human Hours Saved", val: "15h/wk" },
                                    { label: "Data Accuracy", val: "100%" },
                                    { label: "Latency", val: "< 2s" },
                                    { label: "Manual Exports", val: "Zero" }
                                ].map((stat, i) => (
                                    <div key={i} className="flex justify-between items-center pb-4 border-b border-slate-200">
                                        <p className="text-sm font-bold text-slate-500 uppercase">{stat.label}</p>
                                        <p className="text-sm font-black text-blue-600">{stat.val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-10 rounded-[2.5rem] bg-blue-600 shadow-2xl space-y-8 text-white">
                            <h4 className="text-xl font-black uppercase tracking-tight">Ditch the CSV</h4>
                            <p className="text-blue-100 font-medium">Modernize your data infrastructure with real-time bridges.</p>
                            <Link href="/contact" className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-center block hover:scale-[1.02] transition-all">
                                Audit My Data
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
