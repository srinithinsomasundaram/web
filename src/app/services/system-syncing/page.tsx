"use client";

import { motion } from 'framer-motion';
import {
    ArrowLeft, Database, Zap, CheckCircle2,
    RefreshCw, Share2, ShieldCheck, Layers,
    Table, Search, ArrowRight, Server, Cloud
} from 'lucide-react';
import Link from 'next/link';

export default function SystemSyncing() {
    return (
        <div className="pt-32 pb-40 space-y-40 overflow-hidden">
            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 relative">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/40 blur-[150px] -z-10 rounded-full"></div>

                <Link href="/services" className="inline-flex items-center space-x-2 text-slate-400 hover:text-blue-600 transition-colors mb-12 font-bold uppercase tracking-widest text-xs">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Services</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-12">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest">
                            <Share2 className="w-3.5 h-3.5" />
                            <span>Inter-connectivity</span>
                        </div>
                        <h1 className="text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[0.9]">
                            Data <br />
                            <span className="text-blue-600">Syncing.</span>
                        </h1>
                        <p className="text-2xl font-medium text-slate-500 leading-relaxed max-w-xl">
                            Eliminate data silos. We maintain a single source of truth by synchronizing records across Notion, AirTable, CRMs, and internal databases in real-time.
                        </p>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-4 bg-blue-600/5 rounded-[4rem] blur-2xl transition-colors"></div>
                        <div className="relative glass bg-white p-12 rounded-[4rem] border border-slate-100 shadow-2xl space-y-12">
                            <div className="grid grid-cols-2 gap-8">
                                {[
                                    { icon: RefreshCw, label: "Real", sub: "Time" },
                                    { icon: ShieldCheck, label: "Safe", sub: "Transfer" },
                                    { icon: Server, label: "Cloud", sub: "Native" },
                                    { icon: Database, label: "Bidirec", sub: "Sync" }
                                ].map((stat, i) => (
                                    <div key={i} className="space-y-2">
                                        <stat.icon className="w-5 h-5 text-blue-500" />
                                        <p className="text-2xl font-black text-slate-900 leading-none">{stat.label}</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.sub}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-8 border-t border-slate-50">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Database Stack</h3>
                                <div className="flex flex-wrap gap-3">
                                    {["Airtable", "Notion API", "n8n", "Firebase"].map((tech, i) => (
                                        <span key={i} className="px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-black text-slate-500 border border-slate-100 uppercase tracking-wider">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="bg-slate-50/50 py-40 border-y border-slate-100 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-24 space-y-4">
                        <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">Data Handshake</h2>
                        <p className="text-slate-500 text-xl font-medium">Ensuring every tool in your stack has the right data at the right time.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                step: "01",
                                title: "Trigger Event",
                                desc: "Any update in Source A (like a CRM) is instantly detected by our middleware listeners.",
                                icon: Zap
                            },
                            {
                                step: "02",
                                title: "Format Mapping",
                                desc: "The system converts the data to match the format and structure of Source B (like Notion).",
                                icon: Table
                            },
                            {
                                step: "03",
                                title: "Safe Injection",
                                desc: "The update is validated and pushed, ensuring zero data duplication or loss.",
                                icon: Cloud
                            }
                        ].map((item, i) => (
                            <div key={i} className="relative p-10 rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/20 group">
                                <div className="absolute top-10 right-10 text-4xl font-black text-slate-50 italic opacity-10 group-hover:opacity-100 transition-opacity">
                                    {item.step}
                                </div>
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-blue-600 transition-colors duration-500">
                                    <item.icon className="w-6 h-6 text-blue-600 group-hover:text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-slate-500 text-lg font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CORE BENEFITS */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                    <div className="space-y-12">
                        <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-tight text-center md:text-left">One Truth. <br />Everywhere.</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {[
                                { title: "Ditch the CSVs", desc: "Manually exporting and importing data is officially obsolete." },
                                { title: "Error-Free Data", desc: "Eliminate human mistakes during cross-platform data entry." },
                                { title: "Real-time Dashboards", desc: "Your Notion or Airtable dashboards are always current, 24/7." },
                                { title: "System Flexibility", desc: "Use the best tool for each department while keeping data in sync." }
                            ].map((val, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <h4 className="text-xl font-black text-slate-900 tracking-tight">{val.title}</h4>
                                    <p className="text-slate-500 font-medium">{val.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative glass bg-slate-950 rounded-[4rem] p-12 md:p-20 border-slate-900 shadow-2xl overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] -z-10 rounded-full"></div>
                        <div className="space-y-10 relative z-10">
                            <p className="text-4xl font-black text-white leading-tight tracking-tighter">
                                "Siloed data is dead data. Syncing is how it stays liquid."
                            </p>
                            <div className="h-px bg-slate-900 w-full"></div>
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">Y</div>
                                <div>
                                    <p className="text-sm font-black text-white uppercase tracking-widest">Data Architecture</p>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Syncing Layer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="max-w-7xl mx-auto px-6 text-center py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="relative glass bg-blue-600 rounded-[4rem] p-12 md:p-32 text-white overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[150px] -z-10 rounded-full"></div>
                    <div className="max-w-3xl mx-auto space-y-12 relative z-10">
                        <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
                            Unify Your Data <br />Across Tools.
                        </h2>
                        <div className="flex flex-col items-center space-y-8">
                            <Link href="/contact" className="px-16 py-6 bg-white text-blue-600 rounded-[2rem] text-2xl font-black shadow-2xl shadow-blue-900/40 hover:scale-105 active:scale-95 transition-all flex items-center space-x-4">
                                <span>Get a Technical Audit</span>
                                <ArrowRight className="w-6 h-6" />
                            </Link>
                            <p className="text-blue-100 font-bold uppercase tracking-[0.3em] text-xs">API Authorization Required</p>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
