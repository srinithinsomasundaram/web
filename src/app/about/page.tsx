"use client";

import { motion } from 'framer-motion';
import { Rocket, Lightbulb, ShieldCheck, Target, Zap, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function About() {
    return (
        <div className="pt-32 pb-40 space-y-40 overflow-hidden">
            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 blur-[150px] -z-10 rounded-full"></div>

                <div className="max-w-3xl space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest"
                    >
                        <Target className="w-3.5 h-3.5" />
                        <span>Our mission</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[0.9]"
                    >
                        Architects of <br />
                        <span className="text-blue-600">Reliability.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl font-medium text-slate-500 leading-relaxed max-w-2xl"
                    >
                        Yesp Studio was founded on a simple premise: Business automation is only valuable if it's bulletproof. We solve the technical debt of manual operations.
                    </motion.p>
                </div>
            </section>

            {/* VISION & FOCUS */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="p-12 rounded-[3.5rem] bg-white border border-slate-100 shadow-2xl shadow-slate-200/40 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[4rem] group-hover:bg-blue-600 transition-colors duration-500 flex items-center justify-center p-8">
                            <Zap className="w-8 h-8 text-blue-600 group-hover:text-white" />
                        </div>
                        <div className="space-y-6 relative z-10">
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight">The Vision</h3>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                Automation should solve real business problems, be easy to understand, and work quietly and consistently in the background of your daily operations.
                            </p>
                            <ul className="space-y-3 pt-4">
                                {["Human-centric design", "Bulletproof logic", "Scalable infrastructure"].map((item, i) => (
                                    <li key={i} className="flex items-center space-x-3 text-slate-800 font-bold text-sm">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="p-12 rounded-[3.5rem] bg-slate-950 border border-slate-900 shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-900 rounded-bl-[4rem] group-hover:bg-blue-600 transition-colors duration-500 flex items-center justify-center p-8 text-slate-500 group-hover:text-white">
                            <Cpu className="w-8 h-8" />
                        </div>
                        <div className="space-y-6 relative z-10">
                            <h3 className="text-3xl font-black text-white tracking-tight">The Focus</h3>
                            <p className="text-lg text-slate-400 font-medium leading-relaxed">
                                Our focus is long-term systems, not short-term demos. We build the middle-ware that allows your team to focus on high-leverage creative work.
                            </p>
                            <div className="pt-10 flex items-center space-x-4">
                                <div className="h-px bg-slate-800 flex-1"></div>
                                <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Technical Depth</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* HOW WE THINK */}
            <section className="bg-slate-50/50 py-40 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-24 space-y-4">
                        <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">Foundation Principles</h2>
                        <p className="text-slate-500 text-xl font-medium">The non-negotiables of every Yesp system.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {[
                            { title: "Business outcomes first", desc: "We don't automate for the sake of technology. We automate for measurable ROI and focus.", icon: Rocket },
                            { title: "Clarity over complexity", desc: "If you can't explain the logic in 30 seconds, it's a bad system. We prioritize transparent flows.", icon: Lightbulb },
                            { title: "Reliability over novelty", desc: "We use tools that survived the test of time, not tools that are just trending on social media.", icon: ShieldCheck }
                        ].map((val, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                key={i}
                                className="space-y-8"
                            >
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200 border border-slate-50">
                                    <val.icon className="w-7 h-7 text-blue-600" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{val.title}</h3>
                                    <p className="text-slate-500 text-lg font-medium leading-relaxed">{val.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* QUOTE SECTION */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="relative glass bg-white/40 rounded-[4.5rem] p-12 md:p-32 border-white/60 shadow-2xl overflow-hidden backdrop-blur-3xl text-center">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100/30 blur-[100px] -z-10 rounded-full"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-100/30 blur-[100px] -z-10 rounded-full"></div>

                    <div className="max-w-4xl mx-auto space-y-12 relative z-10">
                        <motion.p
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="text-4xl md:text-5xl font-black text-slate-900 italic tracking-tighter leading-tight"
                        >
                            "Automation should make work easier — <br className="hidden md:block" />not introduce new problems."
                        </motion.p>
                        <div className="flex items-center justify-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold tracking-tighter">Y</div>
                            <div className="text-left">
                                <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Our North Star</p>
                                <p className="text-xs font-bold text-slate-400">Yesp Studio Philosophy</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
