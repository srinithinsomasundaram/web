"use client";

import { motion } from 'framer-motion';
import {
    MessageSquare, Clock, CheckCircle2, AlertCircle,
    Calendar, Users, TrendingUp, Shield, Zap, Send, Bell, UserCheck
} from 'lucide-react';
import Link from 'next/link';
import { ClinicEnquiryForm } from '@/components/ClinicEnquiryForm';

export default function ClinicsPage() {
    return (
        <div className="pt-32 pb-40 space-y-32 overflow-hidden">
            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 relative">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/40 blur-[150px] -z-10 rounded-full"></div>

                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest"
                    >
                        <Users className="w-3.5 h-3.5" />
                        <span>Healthcare & Clinic Lead Automation</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[0.95]"
                    >
                        Never Miss a Patient <br />
                        <span className="text-blue-600">Enquiry</span> — Even When <br />
                        Your Clinic Is Busy
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6 max-w-3xl mx-auto"
                    >
                        <p className="text-2xl font-medium text-slate-600 leading-relaxed">
                            Patients today enquire on WhatsApp, websites, and email. When replies are slow or follow-ups don't happen, they simply choose another clinic.
                        </p>
                        <p className="text-2xl font-medium text-slate-900 leading-relaxed">
                            We help clinics capture every enquiry, follow up automatically, confirm appointments, and reduce no-shows — without changing your existing workflow.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
                    >
                        <Link
                            href="https://calendly.com/hello-yespstudio/30min"
                            target="_blank"
                            className="px-10 py-5 bg-blue-600 text-white rounded-2xl text-xl font-black shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all hover:scale-105 flex items-center space-x-3"
                        >
                            <Calendar className="w-6 h-6" />
                            <span>Book a Free Demo</span>
                        </Link>
                        <Link
                            href="https://wa.me/919751755757"
                            target="_blank"
                            className="px-10 py-5 bg-slate-900 text-white rounded-2xl text-xl font-black shadow-2xl hover:bg-slate-800 transition-all hover:scale-105 flex items-center space-x-3"
                        >
                            <MessageSquare className="w-6 h-6" />
                            <span>Chat on WhatsApp</span>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* THE PROBLEM */}
            <section className="bg-slate-50/50 py-32 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mx-auto space-y-16">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                                The Common Problems <br />Clinics Face
                            </h2>
                            <p className="text-xl text-slate-500 font-medium">
                                If you run a clinic, this probably sounds familiar:
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {[
                                "WhatsApp messages get missed during busy hours",
                                "Staff replies late or inconsistently",
                                "Enquiries are never followed up",
                                "Patients book but don't show up",
                                "No reminders or confirmations before visits",
                                "Leads are scattered across WhatsApp, calls, and forms"
                            ].map((problem, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-start space-x-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm"
                                >
                                    <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                                    <p className="text-lg font-bold text-slate-900">{problem}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="text-center pt-8">
                            <p className="text-2xl font-black text-slate-900">
                                These aren't staff problems.<br />
                                <span className="text-blue-600">They're system problems.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE COST */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="p-12 md:p-16 rounded-[4rem] bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full"></div>
                        <div className="relative z-10 space-y-8">
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                                The Real Cost of Doing Nothing
                            </h2>
                            <div className="space-y-4 text-xl font-medium text-slate-300 leading-relaxed">
                                <p>One missed enquiry = one lost patient.</p>
                                <p>One forgotten reminder = one empty appointment slot.</p>
                                <p className="text-2xl font-black text-white pt-4">
                                    When this happens daily, clinics lose predictable revenue without realizing it.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE SOLUTION */}
            <section className="bg-blue-50/30 py-32 border-y border-blue-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-4xl mx-auto space-y-20">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                                Our Solution: A Simple <br />Lead → Booking System for Clinics
                            </h2>
                            <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
                                We set up a system that works quietly in the background while your team focuses on patients.
                            </p>
                        </div>

                        <div className="space-y-4 text-center">
                            <p className="text-sm font-black text-slate-500 uppercase tracking-widest">How It Works</p>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {[
                                {
                                    step: "01",
                                    title: "Patient sends an enquiry",
                                    desc: "WhatsApp / website / email",
                                    icon: MessageSquare
                                },
                                {
                                    step: "02",
                                    title: "Instant auto-reply is sent",
                                    desc: "Patient knows you received their message",
                                    icon: Zap
                                },
                                {
                                    step: "03",
                                    title: "Enquiry is saved automatically",
                                    desc: "No manual entry required",
                                    icon: CheckCircle2
                                },
                                {
                                    step: "04",
                                    title: "Smart follow-ups happen if patient doesn't respond",
                                    desc: "Gentle reminders at the right time",
                                    icon: Clock
                                },
                                {
                                    step: "05",
                                    title: "Appointment booking link is shared",
                                    desc: "Easy for patients to book",
                                    icon: Calendar
                                },
                                {
                                    step: "06",
                                    title: "Appointment is confirmed automatically",
                                    desc: "Patient receives confirmation",
                                    icon: UserCheck
                                },
                                {
                                    step: "07",
                                    title: "Reminder is sent before the visit",
                                    desc: "Reduces no-shows significantly",
                                    icon: Bell
                                },
                                {
                                    step: "08",
                                    title: "Staff is notified only when needed",
                                    desc: "Your team focuses on patient care",
                                    icon: Users
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    viewport={{ once: true }}
                                    className="relative flex items-start space-x-6 p-6 md:p-8 bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/50 group hover:shadow-xl hover:shadow-blue-500/10 transition-all"
                                >
                                    <div className="absolute top-6 right-6 text-5xl font-black text-slate-50 opacity-50">
                                        {item.step}
                                    </div>
                                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <item.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="space-y-1 relative z-10">
                                        <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
                                        <p className="text-slate-500 font-medium">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="text-center pt-8">
                            <p className="text-2xl font-black text-slate-900">
                                No chasing. No confusion. <span className="text-blue-600">No missed patients.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT WE SET UP */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="max-w-5xl mx-auto space-y-20">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                            What We Set Up for Your Clinic
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {[
                            {
                                number: "1",
                                title: "Lead Capture & Auto-Response",
                                features: [
                                    "All enquiries captured automatically",
                                    "Instant replies on WhatsApp and web",
                                    "No manual entry by staff"
                                ],
                                result: "No enquiry is ever missed.",
                                icon: MessageSquare
                            },
                            {
                                number: "2",
                                title: "Smart Appointment Booking & No-Show Reduction",
                                features: [
                                    "Easy booking links for patients",
                                    "Automatic confirmation messages",
                                    "Reminder messages before visits",
                                    "Flags unconfirmed appointments"
                                ],
                                result: "More confirmed visits, fewer no-shows.",
                                icon: Calendar,
                                note: "(We can integrate tools like Calendly or custom booking logic.)"
                            },
                            {
                                number: "3",
                                title: "Automated Follow-Ups & Patient Reactivation",
                                features: [
                                    "Follow-ups if patients don't respond",
                                    "Stops automatically when staff replies",
                                    "Reaches out to past patients when needed"
                                ],
                                result: "More visits without spending on ads.",
                                icon: TrendingUp
                            }
                        ].map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="p-8 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6 hover:shadow-2xl hover:shadow-blue-500/10 transition-all"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center">
                                        <service.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="text-6xl font-black text-blue-50">
                                        {service.number}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black text-slate-900 leading-tight">
                                    {service.title}
                                </h3>

                                <ul className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start space-x-3">
                                            <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-slate-600 font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {service.note && (
                                    <p className="text-sm text-slate-500 italic">{service.note}</p>
                                )}

                                <div className="pt-4 border-t border-slate-100">
                                    <p className="text-lg font-black text-blue-600">
                                        Result: {service.result}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TRUST SECTION */}
            <section className="bg-slate-50/50 py-32 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-4xl mx-auto space-y-16">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                                Why Clinics Choose This System
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {[
                                {
                                    icon: Users,
                                    title: "Built for Healthcare",
                                    desc: "Designed specifically for clinic workflows"
                                },
                                {
                                    icon: TrendingUp,
                                    title: "No Workflow Changes",
                                    desc: "Works with your existing systems"
                                },
                                {
                                    icon: Clock,
                                    title: "Quick Setup",
                                    desc: "Completed in 5–7 days"
                                },
                                {
                                    icon: Shield,
                                    title: "No Long Contracts",
                                    desc: "One-time setup, you own it"
                                },
                                {
                                    icon: MessageSquare,
                                    title: "Human Support",
                                    desc: "Real people help when needed"
                                },
                                {
                                    icon: CheckCircle2,
                                    title: "Supports Your Staff",
                                    desc: "Doesn't replace them"
                                }
                            ].map((item, i) => (
                                <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 space-y-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
                                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                                        <item.icon className="w-7 h-7 text-blue-600" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
                                        <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center pt-8">
                            <p className="text-xl font-black text-slate-600 italic">
                                This system supports your staff — it doesn't replace them.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="p-12 md:p-16 rounded-[4rem] bg-blue-600 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full"></div>
                        <div className="relative z-10 space-y-8 text-center">
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                                Pricing (Transparent & Simple)
                            </h2>
                            <p className="text-xl font-medium leading-relaxed opacity-90">
                                Missing just a few patients per month already costs more than this system.
                            </p>
                            <div className="pt-6 space-y-2">
                                <p className="text-2xl font-black">Clinic automation setup starts from ₹20,000</p>
                                <p className="text-sm font-bold opacity-75">(One-time setup fee)</p>
                                <p className="text-base font-medium opacity-90 pt-4">
                                    Exact pricing depends on clinic size and workflow.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHO THIS IS FOR */}
            <section className="bg-slate-50/50 py-32 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mx-auto space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                                Who This Is Best For
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {[
                                "Dental clinics",
                                "Skin & hair clinics",
                                "Eye hospitals",
                                "Physiotherapy clinics",
                                "Multi-doctor practices",
                                "Specialty clinics"
                            ].map((type, i) => (
                                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100 text-center shadow-sm">
                                    <p className="text-lg font-black text-slate-900">{type}</p>
                                </div>
                            ))}
                        </div>

                        <div className="text-center pt-8">
                            <p className="text-xl font-bold text-slate-600">
                                If you handle patient enquiries daily, this system fits you.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ENQUIRY FORM */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                            See How It Works for Your Clinic
                        </h2>
                        <p className="text-xl text-slate-600 font-medium">
                            Every clinic runs differently. We'll show you exactly how this system would work for your setup.
                        </p>
                    </div>

                    <ClinicEnquiryForm />
                </div>
            </section>

            {/* SKEPTICAL HONESTY */}
            <section className="bg-slate-900 py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mx-auto space-y-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                            What We Don't Promise
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                '"Zero no-shows"',
                                '"Guaranteed patients"',
                                '"Magic AI"'
                            ].map((promise, i) => (
                                <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                    <p className="text-xl font-black text-red-400 line-through">{promise}</p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8 space-y-6">
                            <p className="text-2xl font-black text-white">
                                We build reliable systems that:
                            </p>
                            <div className="space-y-4 text-lg font-medium text-slate-300">
                                <p>✓ Reduce missed enquiries</p>
                                <p>✓ Improve confirmations</p>
                                <p>✓ Help clinics run smoother</p>
                            </div>
                        </div>

                        <p className="text-lg font-medium text-slate-400 italic pt-8">
                            No hype. Just honest automation.
                        </p>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center space-y-12 p-16 md:p-24 rounded-[4rem] bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                        Ready to Stop Missing <br />Patient Enquiries?
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                        <Link
                            href="https://calendly.com/hello-yespstudio/30min"
                            target="_blank"
                            className="px-10 py-5 bg-blue-600 text-white rounded-2xl text-xl font-black shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all hover:scale-105 flex items-center space-x-3"
                        >
                            <Calendar className="w-6 h-6" />
                            <span>Book a Free Demo</span>
                        </Link>
                        <Link
                            href="https://wa.me/919751755757"
                            target="_blank"
                            className="px-10 py-5 bg-slate-900 text-white rounded-2xl text-xl font-black shadow-2xl hover:bg-slate-800 transition-all hover:scale-105 flex items-center space-x-3"
                        >
                            <MessageSquare className="w-6 h-6" />
                            <span>Chat on WhatsApp</span>
                        </Link>
                    </div>

                    <p className="text-slate-600 text-lg font-medium pt-8">
                        No commitment required. See exactly how it works for your clinic first.
                    </p>
                </div>
            </section>
        </div>
    );
}
