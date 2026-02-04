"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';

export const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if consent cookie exists
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Show after a small delay
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
                >
                    <div className="max-w-4xl mx-auto glass bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-2xl">

                        {/* Icon & Text */}
                        <div className="flex items-start gap-4 flex-1">
                            <div className="p-3 bg-blue-600/20 rounded-full flex-shrink-0">
                                <Cookie className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-white font-bold text-lg">We value your privacy</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
                                    <Link href="/privacy" className="text-blue-400 hover:text-blue-300 ml-1 underline transition-colors">
                                        Read our Privacy Policy
                                    </Link>.
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <button
                                onClick={() => setIsVisible(false)}
                                className="px-6 py-3 rounded-xl border border-white/10 text-slate-300 font-bold text-sm hover:bg-white/5 transition-colors"
                            >
                                Decline
                            </button>
                            <button
                                onClick={acceptCookies}
                                className="px-8 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition-all active:scale-95 whitespace-nowrap"
                            >
                                Accept Cookies
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
