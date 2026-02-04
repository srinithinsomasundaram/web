"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
    Rocket, Cpu, Zap, ArrowRight,
    BookOpen, Clock, Calendar, Search,
    MessageSquare, Target, CheckCircle2,
    HeartPulse, Home, TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Blog() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [email, setEmail] = useState('');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('submitting');
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    source: 'Blog Newsletter',
                    timestamp: new Date().toISOString()
                }),
            });

            if (response.ok) {
                setStatus('success');
                setEmail('');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Subscription Error:', error);
            setStatus('error');
        }
    };

    return (
        <div className="pt-32 pb-40 space-y-40 overflow-hidden">
            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 relative">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/40 blur-[150px] -z-10 rounded-full"></div>

                <div className="max-w-3xl space-y-12 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest"
                    >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Intelligence Hub</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-7xl lg:text-9xl font-black text-slate-900 tracking-tight leading-[0.85]"
                    >
                        The <br />
                        <span className="text-blue-600">Archive.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl font-medium text-slate-500 leading-relaxed max-w-2xl"
                    >
                        Thoughts on the future of business automation, AI agents, and engineering reliability.
                    </motion.p>
                </div>
            </section>

            {/* RECENT POSTS */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {[
                        {
                            cat: "Profile",
                            title: "The Origin Logic: Why Yesp Studio Exists",
                            desc: "The philosophy of absolute reliability in an era of artificial hype.",
                            icon: Rocket,
                            slug: "founders-story"
                        },
                        {
                            cat: "Healthcare",
                            title: "AI Agents in Healthcare: The New Frontier",
                            desc: "Transforming patient experience from first click to post-op follow-up.",
                            icon: HeartPulse,
                            slug: "healthcare-ai-agents-1"
                        },
                        {
                            cat: "Healthcare",
                            title: "The No-Show Slayer: Clinic Automation",
                            desc: "How AI Agents are eliminating manual scheduling and reducing no-shows.",
                            icon: Calendar,
                            slug: "healthcare-ai-agents-2"
                        },
                        {
                            cat: "Real Estate",
                            title: "The 24/7 Closer: AI in Real Estate",
                            desc: "How AI Agents are closing deals while human agents sleep.",
                            icon: Home,
                            slug: "real-estate-ai-agents-1"
                        },
                        {
                            cat: "Real Estate",
                            title: "Lead Conversion Secrets for Agencies",
                            desc: "Why modern real estate brokerages are switching to AI-driven conversion.",
                            icon: TrendingUp,
                            slug: "real-estate-ai-agents-2"
                        },
                        {
                            cat: "Technical",
                            title: "Why Logic Beats Hype in AI Automation",
                            desc: "Building systems that don't break when the API changes.",
                            icon: Cpu,
                            slug: "logic-beats-hype"
                        },
                        {
                            cat: "Strategy",
                            title: "The ROI of WhatsApp for Business",
                            desc: "How to handle 10k leads without hiring a single rep.",
                            icon: MessageSquare,
                            slug: "roi-of-whatsapp"
                        },
                        {
                            cat: "Process",
                            title: "Ditching the CSV: Real-time Data Sync",
                            desc: "The technical protocol for zero-manual-entry workflows.",
                            icon: Zap,
                            slug: "ditching-the-csv"
                        }
                    ].map((post, i) => (
                        <Link key={i} href={`/blog/${post.slug}`} className="group p-10 rounded-[3rem] bg-white border border-slate-100 hover:border-blue-400/50 hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                            <div className="p-4 bg-slate-50 rounded-2xl w-fit mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                                <post.icon className="w-7 h-7" />
                            </div>
                            <div className="mb-4">
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-2 py-1 bg-blue-50 rounded-lg">{post.cat}</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-blue-600 transition-colors uppercase leading-[1.1]">{post.title}</h3>
                            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10 flex-1">{post.desc}</p>

                            <div className="pt-8 border-t border-slate-50 flex items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-slate-900 transition-colors">
                                <span>Read Full Post</span>
                                <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* NEWSLETTER */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="glass bg-blue-600 rounded-[4rem] p-12 md:p-24 text-center space-y-12 overflow-hidden relative shadow-2xl">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[150px] -z-10 rounded-full"></div>
                    <div className="max-w-2xl mx-auto space-y-8 relative z-10">
                        <h2 className="text-5xl font-black text-white tracking-tight leading-tight uppercase italic">Stay Engineered.</h2>
                        <p className="text-blue-100 text-xl font-medium leading-relaxed">
                            A monthly breakdown of the technical protocols and AI strategies we're deploying for our clients. No fluff.
                        </p>

                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-8 bg-white/20 backdrop-blur-md rounded-3xl border border-white/20 text-white font-bold"
                            >
                                <CheckCircle2 className="w-10 h-10 mx-auto mb-4" />
                                Subscribed to the Archive.
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 p-2 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="flex-1 bg-transparent px-6 py-4 text-white placeholder:text-blue-200 focus:outline-none font-bold"
                                />
                                <button
                                    disabled={status === 'submitting'}
                                    className="px-10 py-4 bg-white text-blue-600 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-50"
                                >
                                    {status === 'submitting' ? 'Submitting...' : 'Subscribe'}
                                </button>
                            </form>
                        )}
                        {status === 'error' && (
                            <p className="text-white/80 text-[10px] font-black uppercase tracking-widest text-center mt-4">Error during subscription. Please retry.</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
