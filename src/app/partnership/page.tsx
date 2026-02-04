"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Globe, Users, TrendingUp, Cpu, Zap, Handshake, ArrowRight, BarChart3 } from 'lucide-react';

export default function Partnership() {
    return (
        <div className="pt-32 pb-40 space-y-40 overflow-hidden">
            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 relative">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/40 blur-[150px] -z-10 rounded-full"></div>

                <div className="max-w-4xl space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest"
                    >
                        <Handshake className="w-3.5 h-3.5" />
                        <span>Silent Partner Growth</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[0.9]"
                    >
                        White-Label <br />
                        <span className="text-blue-600">Automation Partner.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl font-medium text-slate-500 leading-relaxed max-w-2xl"
                    >
                        We function as a behind-the-scenes automation delivery partner. You focus on high-level strategy and client relations; we handle the technical logic.
                    </motion.p>
                </div>
            </section>

            {/* PARTNERSHIP PILLARS */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        { title: "Fully White-Label", desc: "Our delivery is completely transparent. We operate under your brand and process.", icon: ShieldCheck },
                        { title: "Fixed Scalability", desc: "Predictable project pricing allows you to maintain healthy margins on every deal.", icon: BarChart3 },
                        { title: "Confidentiality", desc: "Strict NDA protection. We respect your client relationships as your primary asset.", icon: Users }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/20 space-y-8 group transition-all duration-500"
                        >
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-500 shadow-inner">
                                <item.icon className="w-7 h-7 text-blue-600 group-hover:text-white" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{item.title}</h3>
                                <p className="text-slate-500 text-lg font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* WHAT YOU CAN RESELL */}
            <section className="bg-slate-950 py-40 border-y border-slate-900 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:40px_40px] opacity-20"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-32">
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-5xl font-black text-white tracking-tight leading-tight">Capabilities <br />You Can Offer</h2>
                            <p className="text-slate-400 text-xl font-medium leading-relaxed">
                                Expand your service menu instantly without hiring a single technical specialist. We build the systems you sell.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                "Smart CRM Logic",
                                "Revenue Forecasting",
                                "Lead Response Hubs",
                                "Autonomous Support",
                                "API Integrations",
                                "Sales Pipeling Sync"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center space-x-3 bg-white/5 border border-white/10 p-4 rounded-2xl group hover:bg-white/10 transition-colors">
                                    <Zap className="w-4 h-4 text-blue-500 shrink-0" />
                                    <span className="text-sm font-bold text-slate-300 uppercase tracking-wider">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-16">
                        <h2 className="text-5xl font-black text-white tracking-tight leading-tight">Optimized For</h2>
                        <div className="space-y-10">
                            {[
                                { title: "Growth Agencies", desc: "Scaling systems for performance-first teams." },
                                { title: "Lead-Gen Experts", desc: "Ensuring zero-leakage for high-volume pipelines." },
                                { title: "CRM Strategists", desc: "Technical delivery for your architectural designs." }
                            ].map((item, i) => (
                                <div key={i} className="group space-y-4">
                                    <h3 className="text-2xl font-black text-blue-500 group-hover:text-white transition-colors flex items-center space-x-4">
                                        <span className="text-xs font-mono text-slate-700 tracking-tighter">0{i + 1}</span>
                                        <span>{item.title}</span>
                                    </h3>
                                    <p className="text-slate-400 text-lg font-medium pl-10 border-l border-slate-900 group-hover:border-blue-500 transition-colors">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* PARTNERSHIP CTA */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="relative glass bg-slate-50/50 rounded-[4.5rem] p-12 md:p-32 border-slate-200 shadow-2xl overflow-hidden backdrop-blur-3xl text-center">
                    <div className="max-w-3xl mx-auto space-y-12 relative z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]"
                        >
                            Scale your revenue, <br className="hidden md:block" />not your headcount.
                        </motion.h2>
                        <div className="flex flex-col items-center space-y-8">
                            <Link
                                href="https://calendly.com/hello-yespstudio/30min"
                                target="_blank"
                                className="btn-primary py-5 px-12 text-xl flex items-center justify-center space-x-4 shadow-xl shadow-blue-600/30 active:scale-95 transition-transform"
                            >
                                <span>Book Partnership Call</span>
                                <ArrowRight className="w-6 h-6" />
                            </Link>
                            <div className="flex items-center space-x-2 text-slate-400 font-bold uppercase tracking-widest text-xs">
                                <span className="w-8 h-[1px] bg-slate-200"></span>
                                <span>Private Delivery Network</span>
                                <span className="w-8 h-[1px] bg-slate-200"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
