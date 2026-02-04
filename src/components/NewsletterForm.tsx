"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const NewsletterForm = () => {
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
                    source: 'Footer Newsletter',
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

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-3 text-blue-500 font-bold text-sm"
            >
                <CheckCircle2 className="w-5 h-5" />
                <span>Subscription successful.</span>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubscribe} className="space-y-4">
            <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Stay Engineered</span>
                <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl focus-within:border-blue-500/50 transition-colors">
                    <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="flex-1 bg-transparent px-4 py-2 text-white placeholder:text-slate-600 focus:outline-none text-sm font-medium"
                    />
                    <button
                        disabled={status === 'submitting'}
                        className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50"
                    >
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
            {status === 'error' && (
                <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">Error. Please try again.</p>
            )}
        </form>
    );
};
