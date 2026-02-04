"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Rocket, Zap, Globe, ShieldCheck, Quote, Target, Star, ChevronRight } from 'lucide-react';

export default function FoundersStory() {
    return (
        <div className="pt-24 pb-40 space-y-32 overflow-hidden bg-white">
            {/* PROGRESSIVE HERO */}
            <section className="max-w-7xl mx-auto px-6 relative">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/30 blur-[180px] -z-10 rounded-full animate-pulse"></div>

                <Link href="/blog" className="inline-flex items-center space-x-2 text-slate-400 hover:text-blue-600 transition-colors mb-16 font-black uppercase tracking-widest text-[10px]">
                    <ArrowLeft className="w-3 h-3" />
                    <span>Back to Intelligence Hub</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                    <div className="lg:col-span-7 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em]"
                        >
                            <Star className="w-3 h-3 text-blue-400" />
                            <span>A Yesp Corporation Production</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl lg:text-[10rem] font-black text-slate-950 tracking-tighter leading-[0.8] uppercase"
                        >
                            The <br />
                            <span className="text-blue-600">Origin</span> <br />
                            Logic.
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="p-8 md:p-12 glass bg-slate-50 border-l-4 border-blue-600 shadow-2xl shadow-slate-200/50 rounded-r-3xl"
                        >
                            <p className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight italic tracking-tight">
                                "In an era of artificial hype, we build absolute reliability. Most businesses don't need another AI demo; they need a system that works when they aren't looking."
                            </p>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-5 relative mt-12 lg:mt-0">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border border-slate-100 group bg-slate-900"
                        >
                            <Image
                                src="/srinithin.jpg"
                                alt="Srinithin Somasundaram - Founder of Yesp"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                            />
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/90 to-transparent" />
                            <div className="absolute bottom-12 left-12 right-12 space-y-2">
                                <p className="text-4xl font-black text-white leading-none">Srinithin <br />Somasundaram</p>
                                <p className="text-blue-400 font-bold uppercase tracking-[0.3em] text-[10px]">Founder • Yesp Corp</p>
                            </div>
                        </motion.div>
                        {/* Decorative Badge */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white border border-slate-100 rounded-full shadow-2xl flex flex-col items-center justify-center p-6 text-center transform rotate-12 hidden md:flex">
                            <ShieldCheck className="w-8 h-8 text-blue-600 mb-2" />
                            <p className="text-[10px] font-black text-slate-900 leading-tight uppercase tracking-widest">Architect of Reliability</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT BODY */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20 py-20">
                <div className="lg:col-span-4 space-y-16 lg:sticky lg:top-32 h-fit">
                    <div className="space-y-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Corporate Entity</p>
                        <h3 className="text-3xl font-black text-slate-900 leading-none">Yesp <br />Corporation.</h3>
                        <p className="text-slate-500 font-medium">Headquartered in India, serving high-leverage business globally.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {[
                            { icon: Zap, label: "Execution", sub: "Speed over perfection" },
                            { icon: Target, label: "Focus", sub: "Outcome-driven code" },
                            { icon: Globe, label: "Scale", sub: "Global-ready logic" }
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center space-x-6 group">
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-8 prose prose-slate prose-xl max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-950 prose-p:text-slate-500 prose-p:font-medium prose-p:leading-relaxed prose-strong:text-slate-900">
                    <p className="text-3xl font-bold text-slate-900 leading-tight mb-16">
                        When I founded Yesp Studio under the umbrella of **Yesp Corporation**, the market was flooded with "AI experts" building flashy but fragile tools. I saw businesses spending thousands on automations that broke within a week.
                    </p>

                    <p>
                        I decided to build something different. A studio that prioritizes <strong>Reliability</strong> over novelty. We don't just "plug and play"—we architect bulletproof infrastructures.
                    </p>

                    <h2>The Mission</h2>
                    <p>
                        My goal for Yesp is to eliminate the operational debt that drags down fast-moving companies. Whether it's high-volume lead capture or complex data syncing, the system should be a black box: predictable, efficient, and invisible.
                    </p>

                    <div className="bg-slate-950 p-12 md:p-20 rounded-[3.5rem] my-24 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/30 blur-[120px] -z-10 rounded-full"></div>
                        <Quote className="w-16 h-16 text-blue-500 mb-10 opacity-50" />
                        <h3 className="text-white text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tight uppercase">"We are not just automation builders; we are architects of focus."</h3>
                        <div className="h-px bg-slate-800 w-full mb-8"></div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">— The Yesp Manifesto</p>
                    </div>

                    <p>
                        Today, Yesp Studio serves as the technical backbone for agencies and service businesses globally. We bridge the gap between human creativity and machine execution.
                    </p>

                    <div className="pt-20">
                        <motion.div
                            whileHover={{ x: 10 }}
                            className="flex items-center space-x-6"
                        >
                            <Link href="/contact" className="px-12 py-6 bg-blue-600 text-white rounded-[2rem] text-xl font-black shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all flex items-center space-x-4">
                                <span>Initiate Project Consultation</span>
                                <ChevronRight className="w-6 h-6" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* BRANDING FOOTER */}
            <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100 text-center">
                <div className="flex flex-col items-center space-y-6">
                    <div className="flex items-center space-x-4 opacity-30 grayscale hover:grayscale-0 transition-all cursor-crosshair">
                        <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase">Yesp Corporation</span>
                        <div className="w-1 h-1 rounded-full bg-slate-900"></div>
                        <span className="text-xs font-bold uppercase tracking-[0.4em] text-slate-500 leading-none">HQ • 2026</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
