"use client";

import { motion } from "framer-motion";
import { Webhook, RotateCw, Mail, Cpu, MessageSquare, Database } from "lucide-react";

// Modern Card Node mirroring the reference image
const Node = ({ logo, icon: Icon, label, position, delay = 0 }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.6 }}
        className={`absolute ${position} z-10 select-none group`}
    >
        <div className="relative flex flex-col items-center">
            {/* Node Card */}
            <div className="w-28 h-32 bg-white/80 backdrop-blur-md border border-slate-100/50 rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center space-y-4 hover:border-blue-400/50 hover:shadow-blue-500/10 transition-all duration-500">
                {/* Circular Icon Container */}
                <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center p-3 shadow-sm group-hover:scale-110 transition-transform duration-500">
                    {logo ? logo : <Icon className="w-8 h-8 text-slate-800" />}
                </div>

                <div className="text-center px-2">
                    <p className="text-[10px] font-black tracking-tight text-slate-900 leading-none">{label}</p>
                </div>
            </div>

            {/* Shadow Glow */}
            <div className="absolute -inset-2 bg-blue-500/5 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    </motion.div>
);

const Wire = ({ d, startDelay = 0 }: { d: string; startDelay?: number }) => (
    <g>
        <path d={d} stroke="#E2E8F0" strokeWidth="1.5" fill="none" opacity="0.4" />
        <motion.circle r="3" fill="#3b82f6">
            <animateMotion path={d} dur="3s" begin={`${startDelay}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" dur="3s" begin={`${startDelay}s`} repeatCount="indefinite" />
        </motion.circle>
    </g>
);

export const WorkflowAnimation = () => {
    const LOGOS = {
        WhatsApp: (
            <img src="https://cdn-icons-png.flaticon.com/512/15713/15713434.png" alt="WhatsApp" className="w-[85%] h-[85%] object-contain" />
        ),
        OpenAI: (
            <img src="https://cdn-icons-png.flaticon.com/512/12222/12222560.png" alt="OpenAI" className="w-[85%] h-[85%] object-contain" />
        ),
        Notion: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-full h-full fill-black">
                <path d="M94.9 100.2c14.9 12.1 20.5 11.2 48.6 9.3L407.8 93.6c5.6 0 .9-5.6-.9-6.5L362.9 55.4c-8.4-6.5-19.6-14-41.1-12.1L65.9 61.9c-9.3 .9-11.2 5.6-7.5 9.3l36.4 28.9zm15.9 61.6l0 278.1c0 14.9 7.5 20.5 24.3 19.6l290.5-16.8c16.8-.9 18.7-11.2 18.7-23.3l0-276.2c0-12.1-4.7-18.7-15-17.7L125.7 143.1c-11.2 .9-14.9 6.5-14.9 18.7zm286.7 14.9c1.9 8.4 0 16.8-8.4 17.8l-14 2.8 0 205.3c-12.2 6.5-23.4 10.3-32.7 10.3-15 0-18.7-4.7-29.9-18.7l-91.5-143.7 0 139 29 6.5s0 16.8-23.4 16.8l-64.4 3.7c-1.9-3.7 0-13.1 6.5-14.9l16.8-4.7 0-183.8-23.3-1.9c-1.9-8.4 2.8-20.5 15.9-21.5l69.1-4.7 95.3 145.6 0-128.8-24.3-2.8c-1.9-10.3 5.6-17.7 14.9-18.7l64.5-3.8zM44.4 36.7L310.6 17.1c32.7-2.8 41.1-.9 61.6 14l85 59.7c14 10.3 18.7 13.1 18.7 24.3l0 327.6c0 20.5-7.5 32.7-33.6 34.5L133.2 495.8c-19.6 .9-29-1.9-39.2-14.9L31.4 399.7c-11.2-14.9-15.9-26.1-15.9-39.2l0-291.2c0-16.8 7.5-30.8 28.9-32.7z" />
            </svg>
        )
    };

    return (
        <div className="relative w-full aspect-[21/10] overflow-hidden bg-white/40 rounded-[2rem] md:rounded-[5rem] shadow-inner backdrop-blur-xl border border-white/50 overflow-x-auto">
            <div className="min-w-[1100px] h-full relative p-6 md:p-16">
                {/* Background Pro Grid Dots */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}
                />

                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1100 400">
                    {/* Curvey Wire Connections */}
                    <Wire d="M 120 200 C 180 200 180 200 240 200" startDelay={0} />
                    <Wire d="M 320 200 C 380 200 380 200 440 200" startDelay={0.4} />
                    <Wire d="M 520 200 C 580 200 580 200 640 200" startDelay={0.8} />
                    <Wire d="M 720 200 C 780 200 780 200 840 200" startDelay={1.2} />
                    <Wire d="M 920 200 C 980 200 980 200 1040 200" startDelay={1.6} />
                </svg>

                <div className="relative w-full h-full flex items-center justify-between max-w-7xl mx-auto px-10">
                    <Node position="relative" label="WhatsApp" icon={MessageSquare} logo={LOGOS.WhatsApp} delay={0} />
                    <Node position="relative" label="Webhook" icon={Webhook} delay={0} />
                    <Node position="relative" label="OpenAI" logo={LOGOS.OpenAI} delay={0} />
                    <Node position="relative" label="Gmail" icon={Mail} delay={0} />
                    <Node position="relative" label="Loop" icon={RotateCw} delay={0} />
                    <Node position="relative" label="Notion" logo={LOGOS.Notion} delay={0} />
                </div>
            </div>
        </div>
    );
};
