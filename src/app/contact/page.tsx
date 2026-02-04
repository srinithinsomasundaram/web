"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Calendar, ArrowRight, CheckCircle2, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

import { useState } from 'react';

export default function Contact() {
    const [status, setStatus] = useState<'idle' | 'transmitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('transmitting');

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    source: 'Contact Form',
                    timestamp: new Date().toISOString()
                }),
            });

            if (response.ok) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Transmission Error:', error);
            setStatus('error');
        }
    };

    return (
        <div className="pt-32 pb-40 space-y-40 overflow-hidden">
            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 relative">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/40 blur-[150px] -z-10 rounded-full"></div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest"
                        >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Connect with us</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[0.9]"
                        >
                            Let's Build <br />
                            <span className="text-blue-600">Together.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl font-medium text-slate-500 leading-relaxed max-w-xl"
                        >
                            Whether you need a full systems audit or a specific automation build, we're here to help you regain focus.
                        </motion.p>

                        <div className="space-y-6 pt-8">
                            <motion.div
                                whileHover={{ x: 5 }}
                                className="flex items-center space-x-6 p-6 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/20"
                            >
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                                    <Mail className="w-7 h-7 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Direct Email</p>
                                    <a href="mailto:hello@yespstudio.com" className="text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors">hello@yespstudio.com</a>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="relative group lg:ml-auto w-full max-w-lg"
                    >
                        <div className="absolute -inset-4 bg-blue-600/5 rounded-[4rem] blur-2xl group-hover:bg-blue-600/10 transition-colors"></div>
                        <div className="relative glass bg-white/40 rounded-[3.5rem] p-10 md:p-14 border-white/60 shadow-2xl backdrop-blur-3xl space-y-10 text-center">
                            <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-blue-600/20 rotate-3">
                                <Calendar className="w-10 h-10 text-white" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Book a Discovery Call</h2>
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    A 15-minute high-level chat to see if we're the right fit for your automation needs.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <Link
                                    href="https://calendly.com/hello-yespstudio/30min"
                                    target="_blank"
                                    className="btn-primary w-full py-5 text-xl flex items-center justify-center space-x-3 shadow-xl shadow-blue-600/20"
                                >
                                    <span>Schedule Now</span>
                                    <ArrowRight className="w-6 h-6" />
                                </Link>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest py-2">
                                    No pressure • Pure technical insight
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CONTACT FORM SECTION */}
            <section className="max-w-7xl mx-auto px-6 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">Send a Message</h2>
                            <p className="text-xl text-slate-500 font-medium leading-relaxed">
                                Prefer writing? Drop us your details and we'll get back to you with a technical breakdown within 24 hours.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                                <span className="w-8 h-[1px] bg-slate-200"></span>
                                <span>Typical Response Time</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock className="w-5 h-5 text-blue-500" />
                                <span className="text-lg font-black text-slate-900 leading-none">{'<'} 4 Hours</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-12 rounded-[3rem] bg-slate-50 border border-slate-200 shadow-inner relative overflow-hidden group">
                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20 relative z-10"
                            >
                                <div className="w-20 h-20 bg-green-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-500/20">
                                    <CheckCircle2 className="w-10 h-10 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none uppercase">Transmission Complete.</h3>
                                    <p className="text-slate-500 font-medium tracking-tight">An architect will review your inquiry within 4 hours.</p>
                                </div>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                                        <input
                                            required
                                            name="name"
                                            type="text"
                                            placeholder="Alex Rivera"
                                            className="w-full bg-white border border-slate-100 rounded-2xl p-4 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Work Email</label>
                                        <input
                                            required
                                            name="email"
                                            type="email"
                                            placeholder="alex@company.com"
                                            className="w-full bg-white border border-slate-100 rounded-2xl p-4 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Project Scope</label>
                                    <select name="scope" className="w-full bg-white border border-slate-100 rounded-2xl p-4 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm appearance-none cursor-pointer">
                                        <option>Healthcare Automation</option>
                                        <option>Real Estate AI Agents</option>
                                        <option>Standard Automation Audit</option>
                                        <option>Custom System Build</option>
                                        <option>Agency Partnership</option>
                                        <option>Other / Advisory</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Current Bottleneck</label>
                                    <textarea
                                        required
                                        name="message"
                                        rows={4}
                                        placeholder="Tell us what manual process is slowing you down..."
                                        className="w-full bg-white border border-slate-100 rounded-2xl p-4 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm resize-none"
                                    />
                                </div>

                                <button
                                    disabled={status === 'transmitting'}
                                    className={`btn-primary w-full py-5 text-xl flex items-center justify-center space-x-3 shadow-xl shadow-blue-500/20 active:scale-95 transition-transform group ${status === 'transmitting' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <span>{status === 'transmitting' ? 'Transmitting...' : status === 'error' ? 'Retry Transmission' : 'Transmit Inquiry'}</span>
                                    {status !== 'transmitting' && <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />}
                                </button>
                                {status === 'error' && (
                                    <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center">Transmission Failed. Please check your connection.</p>
                                )}
                            </form>
                        )}

                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -z-10 translate-x-10 -translate-y-10" />
                    </div>
                </div>
            </section>

            {/* WHAT TO EXPECT */}
            <section className="bg-slate-50/50 py-40 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-24 space-y-4">
                        <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">What to Expect</h2>
                        <p className="text-slate-500 text-xl font-medium">A transparent process from the first hello.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: "No Sales Fluff", desc: "You'll talk directly to an automation architect, not an account executive.", icon: ShieldCheck },
                            { title: "Technical Viability", desc: "We'll tell you instantly if your goal is possible or if there's a better way.", icon: Clock },
                            { title: "Custom Logic", desc: "Every system we build is unique to the specific nuances of your operation.", icon: CheckCircle2 }
                        ].map((val, i) => (
                            <div key={i} className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/20 space-y-8">
                                <div className="p-4 bg-slate-50 rounded-2xl w-fit">
                                    <val.icon className="w-7 h-7 text-blue-600" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{val.title}</h3>
                                    <p className="text-slate-500 text-lg font-medium leading-relaxed">{val.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
