"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WorkflowAnimation } from '@/components/WorkflowAnimation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight, Mail, CheckCircle2, Zap, Clock, Code, Link2, UserCheck, Bell, TrendingUp, Target, ShieldCheck, Search, BarChart3, Layout, Rocket, Terminal, MessageSquare, Cpu, RotateCw, Database } from 'lucide-react';

export default function Home() {
    const [activePhase, setActivePhase] = useState(0);

    const phases = [
        {
            title: "Discovery",
            sub: "Goal Alignment",
            icon: Search,
            desc: "We map your existing workflows to identify where manual labor is slowing your team down.",
            outcomes: ["ROI projections", "Process map"],
            action: "60-min discovery session",
            code: `{ "phase": "Discovery", "status": "completed" }`
        },
        {
            title: "Analysis",
            sub: "Process Mapping",
            icon: BarChart3,
            desc: "Our architects break down every trigger and action to find the optimal logic flow.",
            outcomes: ["Failure points identified", "Gap analysis"],
            action: "Deep technical audit",
            code: `{ "phase": "Analysis", "audit": "comprehensive" }`
        },
        {
            title: "Design",
            sub: "Logic Architecture",
            icon: Layout,
            desc: "We design a clear, redundant automation flow that mirrors your business rules precisely.",
            outcomes: ["Flow architecture", "Tool selection"],
            action: "Prototype walk-through",
            code: `{ "system": "n8n_stack", "logic": "custom" }`
        },
        {
            title: "Build",
            sub: "Development",
            icon: Code,
            desc: "Our engineers build and test the system in an isolated environment before going live.",
            outcomes: ["Production-ready system", "Test logs"],
            action: "API integration & logic",
            code: `{ "build": "stable", "vers": "2.4.0-pro" }`
        },
        {
            title: "Deploy",
            sub: "System Launch",
            icon: Rocket,
            desc: "We launch the system and provide 24/7 monitoring to ensure peak performance.",
            outcomes: ["Live automated ops", "Monthly reporting"],
            action: "Final launch & support",
            code: `{ "deploy": "success", "monitor": "active" }`
        }
    ];

    return (
        <div className="space-y-32 mb-20 overflow-hidden">
            {/* HERO SECTION */}
            <section className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[90vh]">
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-10 relative z-10"
                >
                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold tracking-wide uppercase">
                        <Sparkles className="w-4 h-4" />
                        <span>Business-first automation</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-slate-900">
                        Custom <span className="text-gradient">Automation</span> for Service Businesses & Agencies
                    </h1>
                    <div className="space-y-6 max-w-lg">
                        <p className="text-slate-500 text-xl leading-relaxed">
                            Yesp Studio architects bulletproof lead handling, follow-up automation, and internal workflow systems — so nothing slips through the cracks.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-6 items-center">
                        <Link href="https://calendly.com/hello-yespstudio/30min" target="_blank" className="btn-primary text-xl px-10 py-5 flex items-center space-x-3">
                            <span>Book a call</span>
                            <Calendar className="w-6 h-6" />
                        </Link>
                        <Link href="/partnership" className="group text-lg font-bold text-slate-900 flex items-center space-x-2 hover:text-blue-600 transition-colors">
                            <span>Partnership</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="relative group lg:ml-12"
                >
                    <div className="absolute -inset-10 bg-gradient-to-tr from-blue-100/50 to-indigo-100/50 rounded-[5rem] blur-3xl opacity-60"></div>
                    <div className="relative glass bg-white/20 rounded-[3rem] p-8 shadow-2xl border-white/50 backdrop-blur-xl transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-blue-500/20">
                        <WorkflowAnimation />
                    </div>

                    <motion.div
                        animate={{ y: [-15, 15, -15] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-10 -left-10 glass p-6 rounded-3xl shadow-xl border-white hidden lg:block"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-emerald-100 rounded-2xl">
                                <Zap className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Efficiency</p>
                                <p className="text-xl font-black text-slate-900">+45%</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* TRUST STATEMENT / VALUES */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-50/50 rounded-[4rem] -z-10 blur-3xl"></div>
                    <div className="glass rounded-[3.5rem] p-16 border-white/50 shadow-2xl shadow-blue-500/5 relative overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 relative z-10">
                            <div className="space-y-6 group">
                                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-500">
                                    <TrendingUp className="w-7 h-7 text-blue-600 group-hover:text-white" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-slate-900 leading-tight">Business-first <br />automation</h3>
                                    <p className="text-slate-500 text-lg font-medium">Focused on your growth.</p>
                                </div>
                            </div>

                            <div className="space-y-6 group">
                                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:scale-110 transition-all duration-500">
                                    <Target className="w-7 h-7 text-indigo-600 group-hover:text-white" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-slate-900 leading-tight">Clear <br />processes</h3>
                                    <p className="text-slate-500 text-lg font-medium">No complexity, just clarity.</p>
                                </div>
                            </div>

                            <div className="space-y-6 group">
                                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:scale-110 transition-all duration-500">
                                    <ShieldCheck className="w-7 h-7 text-emerald-600 group-hover:text-white" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-slate-900 leading-tight">Long-term <br />reliability</h3>
                                    <p className="text-slate-500 text-lg font-medium">Systems that just work.</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
                            <p className="text-3xl font-black text-slate-900 italic tracking-tighter">
                                "No hype. No unnecessary tools."
                            </p>
                            <div className="flex items-center space-x-2 text-slate-400 font-bold uppercase tracking-widest text-xs">
                                <span className="w-8 h-[1px] bg-slate-200"></span>
                                <span>The Yesp Standard</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE PROBLEMS WE SOLVE */}
            <section className="max-w-6xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">The Problems <br />We Solve</h2>
                    <p className="text-slate-500 text-xl font-medium">
                        Many service businesses and agencies face the same hidden operational challenges:
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { text: "Leads are missed or replied to too late", icon: Clock },
                        { text: "Follow-ups depend on people remembering", icon: Bell },
                        { text: "Manual processes waste time every day", icon: Zap },
                        { text: "Tools don’t talk to each other", icon: Link2 }
                    ].map((problem, i) => (
                        <div key={i} className="group glass p-10 rounded-[2.5rem] border-white/50 shadow-xl shadow-slate-200/40 flex items-start space-x-6 hover:scale-[1.02] transition-all duration-300">
                            <div className="mt-1 p-3 bg-red-50 rounded-2xl group-hover:bg-red-500 transition-colors duration-300">
                                <problem.icon className="w-6 h-6 text-red-500 group-hover:text-white" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-xl font-bold text-slate-900 leading-snug">{problem.text}</p>
                                <div className="w-12 h-1 bg-red-100 rounded-full group-hover:w-full transition-all duration-500"></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16 max-w-xl mx-auto py-8 glass border-slate-100 rounded-3xl bg-slate-50/50">
                    <p className="text-xl font-bold text-slate-400">
                        These issues quietly cost <span className="text-slate-900">revenue</span>, <span className="text-slate-900">focus</span>, and <span className="text-slate-900">growth</span>.
                    </p>
                </div>
            </section>

            {/* WHAT WE DO */}
            <section className="relative px-6 py-20 overflow-hidden">
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-50/50 blur-[150px] -z-10 rounded-full"></div>

                <div className="max-w-7xl mx-auto space-y-32">
                    {/* Section Header */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                        <div className="max-w-2xl space-y-8">
                            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest">
                                <Zap className="w-3.5 h-3.5" />
                                <span>Core Capabilities</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">What We Do</h2>
                            <p className="text-slate-500 text-2xl font-medium leading-relaxed">
                                We design and build custom automation ecosystems that turn manual chores into autonomous business logic.
                            </p>
                        </div>
                        <div className="hidden lg:block pb-4">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center shadow-sm">
                                        <div className="w-6 h-6 bg-slate-200 rounded-full animate-pulse"></div>
                                    </div>
                                ))}
                                <div className="w-12 h-12 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center shadow-lg text-white font-bold text-xs ring-4 ring-blue-50">
                                    +10
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Workflow Visualization Node */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-slate-900/5 rounded-[4.5rem] blur-2xl group-hover:bg-slate-900/10 transition-colors"></div>
                        <div className="relative glass bg-white/40 rounded-[4.5rem] p-4 md:p-12 border-slate-200/50 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] backdrop-blur-3xl">
                            <div className="mb-10 flex items-center justify-between px-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Live Automation Canvas</span>
                            </div>
                            <WorkflowAnimation />
                        </div>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[
                            {
                                icon: MessageSquare,
                                title: "Lead Capture Automation",
                                desc: "You'll never miss a lead again. Capture every inquiry from WhatsApp, Email, and Website forms instantly.",
                                href: "/services/lead-operations"
                            },
                            {
                                icon: Cpu,
                                title: "AI Sales Brain",
                                desc: "Your team talks only to serious buyers. AI qualifies leads, classifies intent, and drafts replies automatically.",
                                href: "/services/ai-sales-brain"
                            },
                            {
                                icon: RotateCw,
                                title: "Smart Follow-Ups",
                                desc: "Follow-ups happen even when you sleep. Automated sequences that stop when a human replies or meeting is booked.",
                                href: "/services/smart-follow-ups"
                            },
                            {
                                icon: Calendar,
                                title: "Booking & Scheduling",
                                desc: "Meetings booked without back-and-forth. Handles availability, confirmations, and reminders automatically.",
                                href: "/services/booking-logic"
                            },
                            {
                                icon: Database,
                                title: "System Syncing",
                                desc: "Clean data. One version of reality. Real-time sync between Notion, Airtable, CRM, and databases.",
                                href: "/services/system-syncing"
                            },
                            {
                                icon: Terminal,
                                title: "Custom Solutions",
                                desc: "You get exactly what your business needs. Custom APIs and logic controllers for high-volume operations.",
                                href: "/services/custom-microservices"
                            }
                        ].map((item, i) => (
                            <Link key={i} href={item.href}>
                                <div className="group relative p-10 rounded-[3rem] bg-white border border-slate-100 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                                    <div className="p-4 bg-slate-50 rounded-2xl w-fit mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500 shadow-inner">
                                        <item.icon className="w-7 h-7" />
                                    </div>
                                    <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-blue-600 transition-colors">{item.title}</h4>
                                    <p className="text-slate-500 text-lg font-medium leading-relaxed flex-1">{item.desc}</p>

                                    <div className="mt-8 pt-8 border-t border-slate-50 flex items-center text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-slate-900 transition-colors">
                                        <span>Learn more</span>
                                        <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* WORKFLOW SETUP (HOW WE WORK) */}
            <section className="max-w-7xl mx-auto px-6 py-32">
                <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">Workflow Setup</h2>
                    <p className="text-slate-500 text-xl font-medium">How we architect and deploy your automated systems.</p>
                </div>

                <div className="glass bg-slate-50/50 rounded-[3rem] p-8 md:p-12 border-slate-200/60 shadow-2xl relative overflow-hidden backdrop-blur-3xl min-h-[600px] flex flex-col lg:flex-row gap-12">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 blur-[120px] -z-10 rounded-full"></div>

                    {/* Step Sidebar */}
                    <div className="lg:w-1/3 flex flex-col space-y-4 relative z-10">
                        <div className="mb-8 pl-4">
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Project Timeline</span>
                        </div>
                        {phases.map((step, i) => (
                            <div
                                key={i}
                                onClick={() => setActivePhase(i)}
                                className={`group p-5 rounded-2xl flex items-center space-x-6 cursor-pointer transition-all duration-300 ${activePhase === i ? 'bg-white shadow-xl scale-[1.05] ring-1 ring-blue-500/10' : 'hover:bg-white/50 opacity-60 hover:opacity-100 hover:scale-[1.02]'}`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${activePhase === i ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:text-blue-500'}`}>
                                    <step.icon className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col">
                                    <span className={`text-sm font-black tracking-tight ${activePhase === i ? 'text-slate-900' : 'text-slate-500'}`}>{step.title}</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{step.sub}</span>
                                </div>
                                {activePhase === i && <motion.span layoutId="dot" className="ml-auto w-2 h-2 rounded-full bg-blue-500" />}
                            </div>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 bg-white/40 rounded-[2.5rem] border border-white p-8 md:p-12 relative z-10 overflow-hidden shadow-inner">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activePhase}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="h-full flex flex-col"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                            <ShieldCheck className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Phase 0{activePhase + 1}: {phases[activePhase].title}</h3>
                                    </div>
                                    <span className="w-fit px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full uppercase tracking-widest border border-blue-100">Live Workspace</span>
                                </div>

                                <div className="flex-1 space-y-10">
                                    <p className="text-xl font-medium text-slate-600 leading-relaxed max-w-lg">
                                        {phases[activePhase].desc}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="glass bg-white p-6 rounded-3xl border-slate-100 shadow-sm space-y-4">
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Expected Outcomes</span>
                                            <ul className="space-y-2">
                                                {phases[activePhase].outcomes.map((item, idx) => (
                                                    <li key={idx} className="text-slate-700 font-bold flex items-center space-x-2">
                                                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="glass bg-white p-6 rounded-3xl border-slate-100 shadow-sm space-y-4">
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Key Action</span>
                                            <p className="text-slate-700 font-bold">{phases[activePhase].action}</p>
                                        </div>
                                    </div>

                                    {/* Technical Config Preview */}
                                    <div className="mt-8 bg-slate-950 rounded-3xl p-6 relative overflow-hidden group border border-white/5">
                                        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                                                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
                                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></div>
                                                <span className="ml-4 text-[10px] font-mono text-slate-500 tracking-wider">workspace_v2.0.json</span>
                                            </div>
                                            <Terminal className="w-4 h-4 text-slate-700" />
                                        </div>
                                        <pre className="text-blue-400/90 font-mono text-xs leading-relaxed overflow-x-auto">
                                            <code>{phases[activePhase].code}</code>
                                        </pre>
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full"></div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="text-center mt-24">
                    <div className="inline-flex items-center space-x-4 px-6 py-3 rounded-full bg-slate-50 border border-slate-100">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center">
                                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                                </div>
                            ))}
                        </div>
                        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
                            Simple • Structured • Reliable
                        </p>
                    </div>
                </div>
            </section>

            {/* WHO WE WORK WITH */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="glass bg-slate-950 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-24 overflow-hidden relative shadow-2xl">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/10 blur-[150px] -z-10"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-20">
                        <div className="max-w-xl space-y-10">
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">Who We <br />Work With</h2>
                            <div className="grid grid-cols-1 gap-6">
                                {[
                                    "Service-based businesses",
                                    "Small teams (2–30 people)",
                                    "Agencies serving SMB clients"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center space-x-6 group">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                                            <CheckCircle2 className="w-6 h-6 text-blue-400 group-hover:text-white" />
                                        </div>
                                        <span className="text-white/80 text-2xl font-bold tracking-tight">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 max-w-lg relative">
                            <div className="absolute -top-10 -left-10 text-9xl text-white/5 font-serif">“</div>
                            <p className="text-4xl font-black text-white leading-tight tracking-tighter">
                                "If your business depends on enquiries, follow-ups, or internal coordination, automation creates immediate value."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="max-w-7xl mx-auto px-6 py-40">
                <div className="relative glass bg-white/40 rounded-[2.5rem] md:rounded-[4.5rem] p-8 md:p-32 border-white/60 shadow-2xl overflow-hidden backdrop-blur-3xl text-center">
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100/30 blur-[120px] -z-10 rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-100/30 blur-[120px] -z-10 rounded-full"></div>

                    <div className="max-w-3xl mx-auto space-y-16 relative z-10">
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest"
                            >
                                <Rocket className="w-3.5 h-3.5" />
                                <span>Get Started Today</span>
                            </motion.div>

                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
                                Ready to simplify operations & remove manual work?
                            </h2>
                        </div>

                        <div className="flex flex-col items-center space-y-10">
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <Link
                                    href="https://calendly.com/hello-yespstudio/30min"
                                    target="_blank"
                                    className="btn-primary py-6 px-16 text-2xl flex items-center space-x-4 shadow-xl shadow-blue-600/30 active:scale-95 transition-all"
                                >
                                    <span>Book your call</span>
                                    <Calendar className="w-6 h-6" />
                                </Link>

                                <Link
                                    href="/contact"
                                    className="p-6 px-12 text-xl font-black text-slate-900 border border-slate-200 rounded-3xl hover:bg-slate-50 transition-colors flex items-center space-x-3"
                                >
                                    <span>Contact us</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>

                            <div className="pt-8 flex flex-col items-center space-y-4">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Prefer traditional email?</span>
                                <a href="mailto:hello@yespstudio.com" className="text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors inline-flex items-center group">
                                    hello@yespstudio.com
                                    <div className="ml-3 w-8 h-px bg-slate-200 group-hover:w-12 group-hover:bg-blue-500 transition-all" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
