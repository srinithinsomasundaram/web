"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export const LeadPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    useEffect(() => {
        // Check if user has already submitted or seen the popup
        const hasSubmitted = localStorage.getItem('hasSubmittedLead');
        const hasSeenPopup = sessionStorage.getItem('hasSeenLeadPopup');

        if (!hasSubmitted && !hasSeenPopup) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 8000); // Wait 8 seconds before showing

            return () => clearTimeout(timer);
        }
    }, []);

    const closePopup = () => {
        setIsVisible(false);
        sessionStorage.setItem('hasSeenLeadPopup', 'true');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    source: 'Global Lead Popup',
                    timestamp: new Date().toISOString()
                }),
            });

            if (response.ok) {
                setStatus('success');
                localStorage.setItem('hasSubmittedLead', 'true');
                setTimeout(() => {
                    closePopup();
                }, 3000);
            } else {
                // If it fails, we still want to be graceful
                console.error('Submission failed');
                setStatus('idle');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('idle');
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closePopup}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm sm:backdrop-blur-md"
                    />

                    {/* Popup Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 100 }}
                        className="relative w-full max-w-lg bg-white rounded-[2.5rem] sm:rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden border border-slate-100 flex flex-col"
                    >
                        {/* Close Button */}
                        <button
                            onClick={closePopup}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors z-[30] bg-white/10 backdrop-blur-md rounded-full sm:bg-transparent"
                        >
                            <X className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        {status === 'success' ? (
                            <div className="p-8 sm:p-16 text-center space-y-8 py-20 sm:py-24">
                                <motion.div
                                    initial={{ scale: 0.5, rotate: -20 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/40 mx-auto"
                                >
                                    <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                                </motion.div>
                                <div className="space-y-4">
                                    <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Logic <br />Synced.</h3>
                                    <p className="text-slate-500 font-bold text-sm sm:text-lg tracking-tight px-4 opacity-60">Architectural analysis scheduled. Our team will contact you within 4 hours.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="relative flex flex-col">
                                {/* Header / Visual */}
                                <div className="bg-slate-950 p-8 sm:p-14 text-center space-y-6 overflow-hidden relative border-b border-white/5">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] -z-10 rounded-full animate-pulse"></div>
                                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-600/10 blur-[80px] -z-10 rounded-full"></div>

                                    <div className="relative inline-block">
                                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-2xl shadow-blue-600/30 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                                            <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                                        </div>
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full blur-sm"
                                        />
                                    </div>

                                    <div className="space-y-3 relative z-10">
                                        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter leading-none italic uppercase">
                                            Scale Your <br />
                                            <span className="text-blue-500">Operations.</span>
                                        </h2>
                                        <p className="text-slate-500 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] max-w-[280px] mx-auto opacity-70">
                                            RESERVE YOUR TECHNICAL BLUEPRINT AUDIT
                                        </p>
                                    </div>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="p-8 sm:p-14 space-y-6 bg-white">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between px-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Full Name</label>
                                            <span className="text-[9px] font-black text-blue-600/40 uppercase tracking-widest italic">Identity</span>
                                        </div>
                                        <input
                                            required
                                            name="name"
                                            type="text"
                                            placeholder="John Wick"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-sm sm:text-base"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between px-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Comm Protocol</label>
                                            <span className="text-[9px] font-black text-blue-600/40 uppercase tracking-widest italic">WhatsApp / Email</span>
                                        </div>
                                        <input
                                            required
                                            name="contact"
                                            type="text"
                                            placeholder="protocol@yespstudio.com"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-mono text-sm sm:text-base"
                                        />
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            disabled={status === 'submitting'}
                                            type="submit"
                                            className="w-full btn-primary py-5 text-sm sm:text-lg flex items-center justify-center space-x-3 shadow-2xl shadow-blue-500/20 group disabled:opacity-50 uppercase italic font-black tracking-widest"
                                        >
                                            <span>{status === 'submitting' ? 'Transmitting...' : 'Request Intelligence'}</span>
                                            {status !== 'submitting' && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-center space-x-4 pt-2">
                                        <div className="h-px bg-slate-100 flex-1"></div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] whitespace-nowrap">
                                            4h Response Guarantee
                                        </p>
                                        <div className="h-px bg-slate-100 flex-1"></div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
