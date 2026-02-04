"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, CheckCircle2 } from 'lucide-react';

export const ClinicEnquiryForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        clinicName: '',
        phone: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // Submit to your backend API
            const response = await fetch('/api/clinic-enquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    submittedAt: new Date().toISOString(),
                    source: 'Clinics Page'
                }),
            });

            if (!response.ok) {
                throw new Error('Submission failed');
            }

            // Redirect to thank you page
            router.push('/clinics/thank-you');

        } catch (err) {
            console.error('Form submission error:', err);
            setError('Something went wrong. Please try WhatsApp instead.');
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 font-bold text-center">{error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Your Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-6 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all font-medium text-slate-900 bg-white"
                        placeholder="Dr. John Smith"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="clinicName" className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Clinic Name *
                    </label>
                    <input
                        type="text"
                        id="clinicName"
                        name="clinicName"
                        required
                        value={formData.clinicName}
                        onChange={handleChange}
                        className="w-full px-6 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all font-medium text-slate-900 bg-white"
                        placeholder="Smith Medical Center"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Phone Number *
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-6 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all font-medium text-slate-900 bg-white"
                        placeholder="+91 98765 43210"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-6 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all font-medium text-slate-900 bg-white"
                        placeholder="doctor@clinic.com"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Tell us about your clinic (Optional)
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all font-medium text-slate-900 bg-white resize-none"
                    placeholder="How many patient enquiries do you get per day? What's your biggest challenge?"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-10 py-5 bg-blue-600 text-white rounded-2xl text-xl font-black shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all hover:scale-105 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
                {isSubmitting ? (
                    <>
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                    </>
                ) : (
                    <>
                        <Send className="w-6 h-6" />
                        <span>Send Enquiry</span>
                    </>
                )}
            </button>

            <p className="text-center text-sm text-slate-500 font-medium">
                We'll respond within 24 hours. No spam, guaranteed.
            </p>
        </form>
    );
};
