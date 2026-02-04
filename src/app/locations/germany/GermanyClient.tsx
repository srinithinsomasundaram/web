"use client";

import { motion } from 'framer-motion';
import { Zap, ArrowRight, Globe, Shield } from 'lucide-react';
import Link from 'next/link';

export default function GermanyClient() {
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
                        <Globe className="w-3.5 h-3.5" />
                        <span>Engineering Excellence for Germany</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-7xl lg:text-9xl font-black text-slate-900 tracking-tight leading-[0.85]"
                    >
                        AI Automation <br />
                        <span className="text-blue-600">Agency Germany.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl font-medium text-slate-500 leading-relaxed max-w-2xl"
                    >
                        The leading **AI automation agency in Germany**. We engineer **GDPR-compliant AI services** and high-precision **business process automation** for the German Mittelstand and industry.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Link href="https://calendly.com/hello-yespstudio/30min" target="_blank" className="btn-primary py-5 px-10 text-xl shadow-xl shadow-blue-500/20">
                            Book Germany Strategy Session
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ENGINEERING & COMPLIANCE FOCUS */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { title: "Industrial AI Solutions", desc: "Technical automation for engineering and manufacturing sectors." },
                        { title: "Secure AI Germany", desc: "Privacy-first AI implementation focused on data security and compliance." },
                        { title: "Process Optimization", desc: "Rigorous workflow engineering for enterprise-grade efficiency." }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
                        >
                            <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* MITTELSTAND FOCUS */}
            <section className="bg-slate-50 py-40 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6 space-y-24">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                        <h2 className="text-5xl font-black text-slate-900 tracking-tight text-center">Mittelstand AI Engineering</h2>
                        <p className="text-slate-500 text-xl font-medium text-center">Supporting Germany's small and medium-sized enterprises with intelligent systems.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {[
                            { title: "AI for SMEs Germany", desc: "Tailored automation hubs for established German businesses." },
                            { title: "GDPR Compliant AI", desc: "Strict adherence to European data protection standards." },
                            { title: "Manufacturing Ops", desc: "Intelligent supply chain and logistics automation." }
                        ].map((item, i) => (
                            <div key={i} className="space-y-6">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                                    <Shield className="w-8 h-8 text-blue-600" />
                                </div>
                                <h4 className="text-2xl font-black text-slate-900">{item.title}</h4>
                                <p className="text-slate-500 font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* UNIVERSAL SLIVER */}
            <section className="max-w-7xl mx-auto px-6 text-center space-y-12">
                <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic opacity-20">
                    AI AGENTS • WORKFLOWS • INTEGRATION • OPTIMIZATION
                </h3>
            </section>
        </div>
    );
}
