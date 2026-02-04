"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    MessageSquare, Cpu, RotateCw, Calendar, Terminal, Database,
    ArrowRight, Zap, Target, CheckCircle2
} from 'lucide-react';

export default function Services() {
    const services = [
        {
            icon: MessageSquare,
            title: "Lead Operations",
            desc: "Automate lead capture from WhatsApp, Email, or Web and push directly into your CRM with zero manual entry.",
            href: "/services/lead-operations",
            tags: ["WhatsApp", "Email", "CRM Sync"]
        },
        {
            icon: Cpu,
            title: "AI Sales Brain",
            desc: "Use LLMs to qualify leads, classify intent, and draft personalized responses before your team even wakes up.",
            href: "/services/ai-sales-brain",
            tags: ["OpenAI", "Qualification", "Auto-Draft"]
        },
        {
            icon: RotateCw,
            title: "Smart Follow-ups",
            desc: "Multi-channel follow-up sequences that pause automatically when a human takes over or a meeting is booked.",
            href: "/services/smart-follow-ups",
            tags: ["Omni-channel", "Pause Logic", "DRIP"]
        },
        {
            icon: Calendar,
            title: "Booking Logic",
            desc: "Connect Calendly or custom engines to handle complex scheduling, conflict resolution, and confirmation loops.",
            href: "/services/booking-logic",
            tags: ["Calendly", "SMS Alerts", "Sync"]
        },
        {
            icon: Terminal,
            title: "Custom Microservices",
            desc: "Need a unique tool? We build lightweight custom APIs and logic controllers to solve specific business problems.",
            href: "/services/custom-microservices",
            tags: ["Custom APIs", "Custom Logic", "Node.js"]
        },
        {
            icon: Database,
            title: "System Syncing",
            desc: "Maintain a single source of truth by syncing data across Notion, AirTable, CRM, and internal databases in real-time.",
            href: "/services/system-syncing",
            tags: ["Notion", "Airtable", "Real-time"]
        }
    ];

    return (
        <div className="pt-32 pb-40 space-y-40 overflow-hidden">
            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 relative">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/40 blur-[150px] -z-10 rounded-full"></div>

                <div className="max-w-3xl space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest"
                    >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Our Expertise</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[0.9]"
                    >
                        Lead & Workflow <br />
                        <span className="text-blue-600">Automation.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl font-medium text-slate-500 leading-relaxed max-w-2xl"
                    >
                        A breakdown of the technical infrastructure we build to support your business operations and growth.
                    </motion.p>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.map((item, i) => (
                        <Link key={i} href={item.href}>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="group relative p-10 rounded-[3rem] bg-white border border-slate-100 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 h-full flex flex-col"
                            >
                                <div className="p-4 bg-slate-50 rounded-2xl w-fit mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500 shadow-inner">
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-blue-600 transition-colors">{item.title}</h4>
                                <p className="text-slate-500 text-lg font-medium leading-relaxed flex-1 mb-8">{item.desc}</p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {item.tags.map((tag, j) => (
                                        <span key={j} className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2 py-1 bg-slate-50 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors border border-slate-100">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto pt-8 border-t border-slate-50 flex items-center text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-slate-900 transition-colors">
                                    <span>Detailed breakdown</span>
                                    <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* CUSTOM SOLUTIONS */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="glass bg-slate-950 rounded-[4rem] p-12 md:p-24 overflow-hidden relative shadow-2xl">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/10 blur-[150px] -z-10"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                        <div className="max-w-2xl space-y-8">
                            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">Need a Bespoke <br />Logic Hub?</h2>
                            <p className="text-slate-400 text-xl font-medium leading-relaxed">
                                Our services are not templates. If you have a complex, multi-step process that doesn't fit into a standard box, we'll architect a custom solution from scratch.
                            </p>
                        </div>
                        <Link
                            href="https://calendly.com/hello-yespstudio/30min"
                            target="_blank"
                            className="btn-primary py-6 px-16 text-2xl flex items-center justify-center space-x-4 shadow-xl shadow-blue-600/30 active:scale-95 transition-all whitespace-nowrap"
                        >
                            <span>Discuss your logic</span>
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
