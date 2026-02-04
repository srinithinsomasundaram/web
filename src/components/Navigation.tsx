'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, ArrowRight, Zap, Target, ShieldCheck, Globe, Calendar, MessageSquare, Cpu, Users, BookOpen, Info, Activity, Database, Terminal, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navLinks = [
    { name: 'Home', href: '/' },
    {
      name: 'Services',
      href: '/services',
      isMega: true,
      dropdown: [
        {
          category: 'Core Automation',
          links: [
            { title: 'Lead Operations', desc: 'Enterprise-grade lead capture and instant routing systems.', icon: MessageSquare, href: '/services/lead-operations' },
            { title: 'AI Sales Brain', desc: 'Sophisticated intent classification and automated response drafting.', icon: Cpu, href: '/services/ai-sales-brain' },
            { title: 'Smart Follow-Ups', desc: 'High-velocity nurture sequences that stop on human interaction.', icon: Zap, href: '/services/smart-follow-ups' }
          ]
        },
        {
          category: 'Operations',
          links: [
            { title: 'Booking Logic', desc: 'Autonomous scheduling engines with bi-directional CRM sync.', icon: Calendar, href: '/services/booking-logic' },
            { title: 'System Syncing', desc: 'Clean, real-time data flow between your entire tool stack.', icon: Database, href: '/services/system-syncing' },
            { title: 'Custom Logic', desc: 'Bespoke microservices for unique business requirements.', icon: Terminal, href: '/services/custom-microservices' }
          ]
        }
      ]
    },
    {
      name: 'Solutions',
      href: '#',
      dropdown: [
        { type: 'label', title: 'Healthcare', icon: Activity, color: 'blue' },
        { title: 'Clinic Automation', desc: 'Scale patient intake and reduce no-shows.', href: '/clinics' },
        { title: 'Patient Experience', desc: 'The new frontier of patient experience.', href: '/blog/healthcare-ai-agents-1' },
        { type: 'label', title: 'Real Estate', icon: Target, color: 'emerald', mt: true },
        { title: '24/7 Virtual Closers', desc: 'Autonomous sales brains for closers.', href: '/blog/real-estate-ai-agents-1' },
        { title: 'Lead Conversion', desc: 'Turn every inquiry into a viewing.', href: '/blog/real-estate-ai-agents-2' }
      ]
    },
    {
      name: 'Partnership',
      href: '/partnership',
      dropdown: [
        { title: 'Referral Program', desc: 'Become a part of the automation elite.', icon: Users, href: '/partnership' },
        { title: 'Agency Whitelabel', desc: 'Power your clients with our technical stack.', icon: ShieldCheck, href: '/partnership#whitelabel' },
        { title: 'Global Alliance', desc: 'Partner with us on large-scale builds.', icon: Globe, href: '/partnership' }
      ]
    },
    {
      name: 'About',
      href: '/about',
      dropdown: [
        { title: 'Our Mission', desc: 'Architecting bulletproof business logic.', icon: Info, href: '/about' },
        { title: 'Technical Protocols', desc: 'Deep dives into our automation stacks.', icon: BookOpen, href: '/blog' },
        { title: 'The Vision', desc: 'The future of autonomous commerce.', icon: Sparkles, href: '/about' }
      ]
    },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/10 mx-4 mt-4 rounded-2xl shadow-2xl transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity" onClick={() => setIsOpen(false)}>
          <Image src="/logo.png" alt="Yesp Studio Logo" width={32} height={32} className="w-8 h-8" />
          <span className="text-2xl font-bold tracking-tighter text-white">
            Yesp <span className="text-blue-500 font-bold">Studio</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative"
              onMouseEnter={() => setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className="text-sm font-bold text-slate-300 hover:text-white transition-colors flex items-center space-x-1 py-4"
              >
                <span>{link.name}</span>
                {link.dropdown && <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
              </Link>

              {activeDropdown === link.name && link.dropdown && (
                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-in fade-in slide-in-from-top-4 duration-500 ${link.isMega ? 'w-[800px]' : 'w-[400px]'}`}>
                  <div className="bg-slate-900/98 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] p-10 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -z-10 rounded-full animate-pulse"></div>

                    {link.isMega ? (
                      <div className="space-y-10">
                        <div className="grid grid-cols-2 gap-12">
                          {link.dropdown.map((cat: any, i: number) => (
                            <div key={i} className="space-y-6">
                              <div className={`flex items-center space-x-3 ${cat.color ? `text-${cat.color}-500` : 'text-blue-500'}`}>
                                {cat.icon && (
                                  <div className={`p-2 rounded-lg ${cat.color ? `bg-${cat.color}-500/10` : 'bg-blue-500/10'}`}>
                                    <cat.icon className="w-5 h-5" />
                                  </div>
                                )}
                                <span className="text-xs font-black uppercase tracking-widest">{cat.category}</span>
                              </div>
                              <div className="space-y-4">
                                {cat.links.map((sub: any, j: number) => (
                                  <Link
                                    key={j}
                                    href={sub.href}
                                    className="group block p-4 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10 shadow-sm"
                                  >
                                    <div className="flex items-center space-x-3 mb-1">
                                      {sub.icon && <sub.icon className={`w-4 h-4 ${cat.color ? `text-${cat.color}-500` : 'text-blue-500'}`} />}
                                      <p className="text-base font-black text-white group-hover:text-blue-400 transition-colors uppercase italic tracking-tight">{sub.title}</p>
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed font-medium">{sub.desc}</p>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Architectural Availability: High</p>
                          <Link href="/contact" className="group text-[10px] font-black text-blue-500 hover:text-white transition-all flex items-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-xl hover:bg-blue-600">
                            <span>Get Custom Blueprint</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {link.dropdown.map((item: any, i: number) => {
                          if (item.type === 'label') {
                            return (
                              <div key={i} className={`flex items-center space-x-3 mb-4 px-4 ${item.mt ? 'mt-6 pt-6 border-t border-white/5' : 'mt-2'}`}>
                                <div className={`p-1.5 rounded-lg bg-${item.color}-500/10 text-${item.color}-500`}>
                                  <item.icon className="w-4 h-4" />
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] text-${item.color}-500`}>{item.title}</span>
                              </div>
                            );
                          }
                          return (
                            <Link
                              key={i}
                              href={item.href}
                              className="group flex items-center space-x-4 p-4 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
                            >
                              <div className="p-2 bg-slate-800 rounded-xl group-hover:bg-blue-600 transition-all shadow-inner">
                                {item.icon ? (
                                  <item.icon className="w-5 h-5 text-slate-400 group-hover:text-white" />
                                ) : (
                                  <div className="w-5 h-5 flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-white transition-colors" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="text-base font-black text-white group-hover:text-blue-400 transition-colors uppercase italic tracking-tighter">{item.title}</p>
                                <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link href="https://calendly.com/hello-yespstudio/30min" target="_blank" className="btn-primary py-2 px-6 text-sm font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all uppercase tracking-tight italic">Book a call</Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white transition-colors p-2 bg-white/5 rounded-lg border border-white/10"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Sidebar */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-0 bg-slate-950/98 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col space-y-4 animate-in slide-in-from-top-4 fade-in duration-200 h-[calc(100vh-100px)] overflow-y-auto">
          {navLinks.map((link) => (
            <div key={link.name} className="flex flex-col border-b border-white/5 pb-4">
              {link.dropdown ? (
                <>
                  <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4">{link.name}</p>
                  <div className="grid grid-cols-1 gap-2 pl-4">
                    {link.isMega ? (
                      link.dropdown.map((cat: any, i: number) => (
                        <div key={i} className="space-y-2 mt-4 first:mt-0">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-px bg-blue-500"></div>
                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{cat.category}</p>
                          </div>
                          {cat.links.map((sub: any, j: number) => (
                            <Link key={j} href={sub.href} className="text-lg font-bold text-slate-200 block py-1" onClick={() => setIsOpen(false)}>{sub.title}</Link>
                          ))}
                        </div>
                      ))
                    ) : (
                      link.dropdown.map((item: any, i: number) => {
                        if (item.type === 'label') {
                          return (
                            <div key={i} className={`flex items-center space-x-2 mt-4 first:mt-0 mb-2 ${item.mt ? 'pt-4 border-t border-white/5' : ''}`}>
                              <div className="w-3 h-px bg-blue-500"></div>
                              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{item.title}</p>
                            </div>
                          );
                        }
                        return (
                          <Link key={i} href={item.href} className="text-lg font-bold text-slate-200 block py-1 pl-4" onClick={() => setIsOpen(false)}>{item.title}</Link>
                        );
                      })
                    )}
                  </div>
                </>
              ) : (
                <Link href={link.href} className="text-xl font-bold text-slate-200 hover:text-white transition-colors py-2 uppercase italic tracking-tighter" onClick={() => setIsOpen(false)}>{link.name}</Link>
              )}
            </div>
          ))}
          <Link href="https://calendly.com/hello-yespstudio/30min" target="_blank" className="btn-primary text-center py-4 px-6 text-lg font-black shadow-lg shadow-blue-500/20 mt-4 uppercase italic" onClick={() => setIsOpen(false)}>Book a call</Link>
        </div>
      )}
    </nav>
  );
};

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('idle');
      }
    } catch (err) {
      console.error('Subscribe error:', err);
      setStatus('idle');
    }
  };

  return (
    <footer className="relative bg-slate-950 pt-40 pb-20 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      {/* Premium Glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[150px] -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand & Communication */}
          <div className="space-y-12">
            <div className="space-y-6">
              <Link href="/" className="flex items-center space-x-3 group">
                <Image src="/logo.png" alt="Yesp Studio Logo" width={32} height={32} className="group-hover:rotate-12 transition-transform duration-500" />
                <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
                  Yesp <span className="text-blue-500 font-black">Studio</span>
                </span>
              </Link>
              <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-[280px]">
                Architecting bulletproof automation systems for high-leverage service businesses and agencies.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Direct Communication</p>
              <a href="mailto:hello@yespstudio.com" className="text-blue-500 hover:text-white transition-colors text-base font-bold italic tracking-tight font-mono">hello@yespstudio.com</a>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Follow Us</p>
              <div className="flex items-center space-x-8">
                <Link href="https://linkedin.com/company/yesptech" className="text-slate-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.2em] italic">LinkedIn</Link>
                <Link href="https://instagram.com/yespstudio" className="text-slate-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.2em] italic">Instagram</Link>
              </div>
            </div>
          </div>

          {/* Intelligence & Network */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-1">
            <div className="space-y-8">
              <h4 className="text-xs font-black text-white uppercase tracking-[0.3em] opacity-80">Intelligence</h4>
              <ul className="space-y-4">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Services', href: '/services' },
                  { name: 'Blog', href: '/blog' },
                  { name: 'Partnership', href: '/partnership' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm font-bold text-slate-400 hover:text-blue-500 transition-colors uppercase italic tracking-tighter">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="text-xs font-black text-white uppercase tracking-[0.3em] opacity-80">Network</h4>
              <ul className="space-y-4">
                {[
                  { name: 'About', href: '/about' },
                  { name: 'Contact', href: '/contact' },
                  { name: 'Book a call', href: 'https://calendly.com/hello-yespstudio/30min' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm font-bold text-slate-400 hover:text-blue-500 transition-colors uppercase italic tracking-tighter">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Regions Column */}
          <div className="space-y-8">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.3em] opacity-80">Regions</h4>
            <ul className="space-y-4">
              {[
                { name: 'United Kingdom', href: '/locations/uk' },
                { name: 'United States', href: '/locations/usa' },
                { name: 'India', href: '/locations/india' },
                { name: 'Germany', href: '/locations/germany' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase italic tracking-tighter flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Engineered (Newsletter) */}
          <div className="space-y-8 p-10 bg-white/[0.015] rounded-[3.5rem] border border-white/5 relative overflow-hidden group hover:bg-white/[0.03] transition-all duration-700 shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] -z-10 rounded-full group-hover:bg-blue-600/15 transition-all duration-700" />
            <div className="space-y-2">
              <h4 className="text-xs font-black text-white uppercase tracking-[0.3em] italic">Stay Engineered</h4>
              <p className="text-slate-500 text-[11px] font-bold leading-relaxed uppercase tracking-tight opacity-60">
                Technical protocols and automation logic delivered monthly.
              </p>
            </div>
            {status === 'success' ? (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 animate-in fade-in zoom-in duration-300">
                <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest text-center">Protocol Registered.</p>
              </div>
            ) : (
              <form className="space-y-3" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full bg-slate-900 border border-white/5 rounded-2xl p-4 text-xs text-white font-bold placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all outline-none font-mono"
                />
                <button
                  disabled={status === 'submitting'}
                  className="w-full btn-primary py-4 text-[10px] uppercase italic tracking-[0.2em] font-black shadow-lg shadow-blue-500/10 disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Transmitting...' : 'Join Archive'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Yesp Studio</p>
            <p className="text-[11px] font-black text-slate-600 uppercase tracking-[0.2em] italic">
              © 2026 Yesp Corporation. Engineered for focus.
            </p>
          </div>
          <div className="flex items-center space-x-12">
            <Link href="/privacy" className="text-slate-600 hover:text-white transition-colors uppercase text-[10px] font-black tracking-[0.2em] italic border-b border-white/5 pb-1">Privacy Protocol</Link>
            <Link href="/terms" className="text-slate-600 hover:text-white transition-colors uppercase text-[10px] font-black tracking-[0.2em] italic border-b border-white/5 pb-1">Systems Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
