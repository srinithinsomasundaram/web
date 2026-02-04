"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageSquare, Mail, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ClinicThankYouPage() {
    useEffect(() => {
        // Auto-open WhatsApp after 2 seconds
        const timer = setTimeout(() => {
            window.open('https://wa.me/919751755757?text=Hi!%20I%20just%20submitted%20an%20enquiry%20form%20for%20clinic%20automation.', '_blank');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen pt-32 pb-40 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-12"
                >
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="flex justify-center"
                    >
                        <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-16 h-16 text-green-600" />
                        </div>
                    </motion.div>

                    {/* Main Message */}
                    <div className="space-y-6">
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight">
                            Thank You!
                        </h1>
                        <p className="text-2xl font-medium text-slate-600 leading-relaxed max-w-2xl mx-auto">
                            We've received your enquiry and our team will contact you within 24 hours.
                        </p>
                    </div>

                    {/* What Happens Next */}
                    <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-2xl border border-slate-100 space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900">
                                What Happens Next?
                            </h2>
                            <p className="text-lg text-slate-500 font-medium">
                                Here's what you can expect from us
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Mail,
                                    title: "Confirmation Email",
                                    desc: "Check your inbox for a confirmation email with next steps",
                                    time: "Within 5 minutes"
                                },
                                {
                                    icon: MessageSquare,
                                    title: "WhatsApp Message",
                                    desc: "We'll send you a quick message to confirm we got your enquiry",
                                    time: "Within 1 hour"
                                },
                                {
                                    icon: Calendar,
                                    title: "Personalized Demo",
                                    desc: "We'll schedule a call to show you exactly how this works for your clinic",
                                    time: "Within 24 hours"
                                }
                            ].map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                    className="space-y-4 text-center"
                                >
                                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                                        <step.icon className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black text-slate-900">{step.title}</h3>
                                        <p className="text-slate-600 font-medium">{step.desc}</p>
                                        <p className="text-sm font-black text-blue-600 uppercase tracking-wider">{step.time}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* WhatsApp CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-[3rem] p-12 border border-green-100 space-y-6"
                    >
                        <div className="space-y-4">
                            <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                                Want to Chat Right Now?
                            </h3>
                            <p className="text-lg text-slate-600 font-medium">
                                We're opening WhatsApp for you automatically, or click below to chat instantly.
                            </p>
                        </div>
                        <Link
                            href="https://wa.me/919751755757?text=Hi!%20I%20just%20submitted%20an%20enquiry%20form%20for%20clinic%20automation."
                            target="_blank"
                            className="inline-flex items-center space-x-3 px-10 py-5 bg-green-600 text-white rounded-2xl text-xl font-black shadow-2xl shadow-green-600/30 hover:bg-green-700 transition-all hover:scale-105"
                        >
                            <MessageSquare className="w-6 h-6" />
                            <span>Open WhatsApp Chat</span>
                        </Link>
                    </motion.div>

                    {/* Additional Actions */}
                    <div className="pt-12 space-y-6">
                        <p className="text-slate-500 font-medium">
                            While you wait, you can:
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/clinics"
                                className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-100 text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-all"
                            >
                                <span>Learn More About Our System</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/"
                                className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-100 text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-all"
                            >
                                <span>Back to Homepage</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Trust Badge */}
                    <div className="pt-12 border-t border-slate-200">
                        <p className="text-sm text-slate-500 font-medium">
                            🔒 Your information is secure. We'll never spam you or share your details.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
