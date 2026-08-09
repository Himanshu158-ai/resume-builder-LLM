import React from 'react'
import { motion } from 'framer-motion'
import GradientWaves from '../components/GradientWaves';
import { useNavigate } from 'react-router-dom';
import ParticleText from '../components/ParticleText';
import useResponsiveValue from '../hooks/responsiveHook';


import {
    Sparkles,
    ScanEye,
    PenTool,
    Target,
    LayoutTemplate,
    ArrowRight,
    Terminal,
    Layers,
    ChevronRight,
    ShieldCheck,
    Zap
} from 'lucide-react';

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 22, filter: 'blur(8px)', scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        scale: 1,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
}

const badgeVariants = {
    hidden: { opacity: 0, scale: 0.85, y: -10 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 200, damping: 18 }
    }
}

const Home = () => {
    const navigate = useNavigate();
    const density = useResponsiveValue(2, 4) // mobile: 2, desktop: 4
    const particleSize = useResponsiveValue(1.5, 2.2)
    const scatter = useResponsiveValue(100, 190)

    return (
        <div className="relative w-full min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-[#FF9FFC]/30 selection:text-white">

            {/* Background Layer: FIXED so it stays in place when scrolling */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <GradientWaves
                    horizonColor="#5227FF"
                    waveColor="#FF9FFC"
                    crestColor="#FFFFFF"
                    speed={0.4}
                    amplitude={2.5}
                    waveScale={0.7}
                    waveRatio={0.9}
                    swell={35}
                    turbulence={20}
                    tilt={1.11}
                    zoom={1}
                    height={5.5}
                    fogDepth={15}
                    detail="medium"
                    brightness={1}
                    opacity={1}
                    mouseInteraction
                    parallaxStrength={0.5}
                    grain
                    grainIntensity={0.05}
                />
                {/* Vignette overlays to make text highly legible */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.9)_90%)] pointer-events-none" />
            </div>

            {/* Scrollable Content wrapper */}
            <div className="relative z-10 w-full flex flex-col min-h-screen">

                {/* 1. Floating Header/Navigation */}
                <header className="sticky top-0 w-full z-50 border-b border-white/[0.05] bg-black/40 backdrop-blur-xl transition-all duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/")}>

                            <span
                                className="text-white/40"
                                style={{
                                    textShadow: '0 1px 1px rgba(255,255,255,0.6), 0 -1px 1px rgba(0,0,0,0.3), 0 0 12px rgba(255,255,255,0.25)',
                                    WebkitTextStroke: '0.5px rgba(255,255,255,0.5)'
                                }}
                            >
                                ResumeBuilder
                            </span>

                        </div>

                        {/* Desktop Navigation Links */}
                        <nav className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-xs font-semibold tracking-wider uppercase text-white/50 hover:text-white transition-colors duration-200">
                                AI Agents
                            </a>
                            <a href="#preview" className="text-xs font-semibold tracking-wider uppercase text-white/50 hover:text-white transition-colors duration-200">
                                Live Simulation
                            </a>
                            <div className="flex items-center gap-1.5">
                                <span className="text-xs font-semibold tracking-wider uppercase text-white/50">Pricing</span>
                                <span className="px-1.5 py-0.5 text-[9px] font-bold text-[#FF9FFC] bg-[#FF9FFC]/10 border border-[#FF9FFC]/20 rounded-md tracking-wide uppercase">
                                    Free
                                </span>
                            </div>
                        </nav>

                        {/* CTA Buttons */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate("/builder")}
                                className="relative px-5 py-2 rounded-full overflow-hidden text-xs sm:text-sm font-semibold text-black bg-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] cursor-pointer"
                            >
                                Build Now
                            </button>
                        </div>
                    </div>
                </header>

                {/* 2. Hero Section */}
                <main className="flex-grow">
                    <section className="relative pt-5 sm:pt-28 pb-16 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto flex flex-col items-center text-center">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-col items-center"
                        >
                            {/* Premium Badge */}
                            <motion.div
                                variants={badgeVariants}
                                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 sm:mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(255,159,252,0.05)] hover:border-white/20 transition-all duration-300"
                            >
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9FFC] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF9FFC]"></span>
                                </span>
                                <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-white/80 uppercase">
                                    Multi-Agent Orchestration Engine v2.0
                                </span>
                            </motion.div>

                            {/* Heading with Premium Typography */}

                            {/* <motion.h1
                                variants={itemVariants}
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] sm:leading-[1.02] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 px-1 font-display"
                            >
                                Resumes that get you <br />
                                hired, not just noticed.
                            </motion.h1> */}

                            <div style={{ width: '100%', height: 150, background: 'transparent' }}>
                                <ParticleText
                                    text="Four Minds, One Resume"
                                    particleSize={particleSize}
                                    density={density}
                                    color="#f8fafc"
                                    highlightColor="#7459adff"
                                    scatter={scatter}
                                    gatherDuration={1600}
                                    stagger={420}
                                    pointerRepel={42}
                                    repelRadius={120}
                                    idleDrift={0.8}
                                    trigger="mount"
                                    fontSize="clamp(3.5rem, 13vw, 9rem)"
                                    fontWeight={600}
                                    fontFamily="inherit"
                                    glow
                                />
                            </div>

                            {/* Subtext */}
                            <motion.p
                                variants={itemVariants}
                                className="text-white/60 mt-6 sm:mt-8 text-sm sm:text-base md:text-lg font-light max-w-2xl leading-relaxed"
                            >
                                Four AI agents collaborate to analyze your experience, sharpen your bullet points, and optimize for ATS in seconds.
                            </motion.p>

                            {/* CTA Actions */}
                            <motion.div
                                variants={itemVariants}
                                className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4 sm:px-0"
                            >
                                <motion.button
                                    onClick={() => navigate("/builder")}
                                    whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(239, 203, 238, 0.35)' }}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold text-sm tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-shadow duration-300 flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    Build My Resume <ArrowRight className="w-4 h-4 text-black animate-pulse" />
                                </motion.button>
                            </motion.div>

                            {/* Trust badges */}
                            <motion.div
                                variants={itemVariants}
                                className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 border-t border-white/[0.05] pt-8 w-full max-w-4xl"
                            >
                                <div className="flex flex-col items-center md:items-start">
                                    <span className="text-xl sm:text-2xl font-bold text-white font-display">98%</span>
                                    <span className="text-[10px] sm:text-xs text-white/45 uppercase tracking-wider mt-1 font-semibold">ATS Pass Rate</span>
                                </div>
                                <div className="flex flex-col items-center md:items-start">
                                    <span className="text-xl sm:text-2xl font-bold text-white font-display">&lt; 30s</span>
                                    <span className="text-[10px] sm:text-xs text-white/45 uppercase tracking-wider mt-1 font-semibold">Generation Speed</span>
                                </div>
                                <div className="flex flex-col items-center md:items-start">
                                    <span className="text-xl sm:text-2xl font-bold text-white font-display">Free</span>
                                    <span className="text-[10px] sm:text-xs text-white/45 uppercase tracking-wider mt-1 font-semibold">No Credit Card</span>
                                </div>
                                <div className="flex flex-col items-center md:items-start">
                                    <span className="text-xl sm:text-2xl font-bold text-white font-display">4 AI</span>
                                    <span className="text-[10px] sm:text-xs text-white/45 uppercase tracking-wider mt-1 font-semibold">Collaborative Agents</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </section>

                    {/* 3. The 4 AI Agents Pipeline Section */}
                    <section id="features" className="py-24 sm:py-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
                            <h2 className="text-xs font-semibold tracking-widest text-[#FF9FFC] uppercase mb-3 font-mono">
                                Collaborative Co-Intelligence
                            </h2>
                            <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
                                The 4-Agent Autonomous Engine
                            </h3>
                            <p className="text-white/60 mt-4 sm:mt-6 text-sm sm:text-base font-light leading-relaxed">
                                Three agents work in parallel to draft your resume, while a fourth evaluates it against real ATS scoring rewriting automatically if it falls short.
                            </p>
                        </div>

                        {/* The grid of cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    step: "01",
                                    agent: "The Summarizer",
                                    role: "Professional Summary",
                                    desc: "Crafts a sharp, role-specific professional summary from your raw details the first thing a recruiter reads, made to count.",
                                    icon: ScanEye,
                                    color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30",
                                    iconColor: "text-blue-400"
                                },
                                {
                                    step: "02",
                                    agent: "Experience Enhancer",
                                    role: "Work Experience Rewrite",
                                    desc: "Rewrites your work experience with strong action verbs and measurable impact. Automatically skipped for freshers with no prior experience.",
                                    icon: PenTool,
                                    color: "from-pink-500/20 to-purple-500/20 border-pink-500/30",
                                    iconColor: "text-pink-400"
                                },
                                {
                                    step: "03",
                                    agent: "Project Enhancer",
                                    role: "Project Description Rewrite",
                                    desc: "Reframes your projects with clear tech stack, outcomes, and impact turning side projects into recruiter-worthy proof of skill.",
                                    icon: Target,
                                    color: "from-purple-500/20 to-violet-500/20 border-purple-500/30",
                                    iconColor: "text-purple-400"
                                },
                                {
                                    step: "04",
                                    agent: "ATS Evaluator",
                                    role: "Score & Auto Re-write",
                                    desc: "Runs after the first three agents finish, scoring your resume out of 10. If the score falls below 7, it triggers an automatic rewrite for a better pass rate.",
                                    icon: LayoutTemplate,
                                    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
                                    iconColor: "text-emerald-400"
                                }
                            ].map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                        whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                        className="relative group rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between h-[360px] overflow-hidden transition-all duration-300"
                                    >
                                        {/* Glowing card background hover effect */}
                                        <div className={`absolute -right-16 -top-16 w-32 h-32 rounded-full bg-gradient-to-br ${item.color} blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                                        <div>
                                            <div className="flex items-center justify-between">
                                                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:scale-110 group-hover:bg-white/[0.06] transition-all duration-300">
                                                    <Icon className={`w-5 h-5 ${item.iconColor}`} />
                                                </div>
                                                <span className="text-xs font-mono font-bold tracking-widest text-white/30 group-hover:text-white/60 transition-colors duration-300">
                                                    STEP {item.step}
                                                </span>
                                            </div>
                                            <h4 className="text-lg sm:text-xl font-bold text-white mt-6 group-hover:text-[#FF9FFC] transition-colors duration-300 font-display">
                                                {item.agent}
                                            </h4>
                                            <span className="text-[10px] font-mono tracking-wider text-white/40 uppercase mt-1 block font-semibold">
                                                {item.role}
                                            </span>
                                            <p className="text-white/60 mt-4 text-xs sm:text-sm leading-relaxed font-light">
                                                {item.desc}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs font-semibold text-white/45 group-hover:text-white/80 transition-colors duration-300 mt-6">
                                            Active Agent <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </section>

                    {/* 4. Interactive Live Resume Builder Preview Mockup */}
                    <section id="preview" className="py-20 sm:py-24 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-xs font-semibold tracking-widest text-[#FF9FFC] uppercase mb-3 font-mono">
                                Live Simulation Workspace
                            </h2>
                            <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
                                Watch the Agents in Action
                            </h3>
                            <p className="text-white/60 mt-4 text-sm sm:text-base font-light">
                                Below is a simulated view of the agent orchestrator's log and live visual PDF feedback loop.
                            </p>
                        </div>

                        {/* The Interactive Mockup Box */}
                        <div className="w-full rounded-2xl border border-white/[0.08] bg-black/60 backdrop-blur-2xl overflow-hidden shadow-[0_0_50px_rgba(82,39,255,0.15)] flex flex-col lg:flex-row h-auto lg:h-[480px]">

                            {/* Left Side: AI Agent Control Log Console */}
                            <div className="w-full lg:w-[45%] border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-white/[0.01] p-6 sm:p-8 flex flex-col justify-between font-mono text-[11px] sm:text-xs min-h-[300px] lg:min-h-0">
                                <div>
                                    {/* Header */}
                                    <div className="flex items-center gap-2 pb-4 border-b border-white/[0.08]">
                                        <div className="flex gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                                        </div>
                                        <span className="text-white/40 ml-2 uppercase text-[10px] tracking-widest flex items-center gap-1.5 font-bold">
                                            <Terminal className="w-3.5 h-3.5 text-[#FF9FFC]" /> agent_orchestrator.log
                                        </span>
                                    </div>

                                    {/* Console Log Items */}
                                    <div className="mt-4 space-y-3.5 max-h-[220px] lg:max-h-[300px] overflow-y-auto pr-2 text-white/70">
                                        <div className="flex items-start gap-2">
                                            <span className="text-green-400 font-bold">&gt;&gt;</span>
                                            <div>
                                                <span className="text-white/40">[10:48:02]</span> <span className="text-blue-400 font-semibold">[Analyst]</span> Parsing raw Markdown experiences...
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-green-400 font-bold">&gt;&gt;</span>
                                            <div>
                                                <span className="text-white/40">[10:48:04]</span> <span className="text-blue-400 font-semibold">[Analyst]</span> Extracted 4 achievements, calculated +22% conversion metric.
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-green-400 font-bold">&gt;&gt;</span>
                                            <div>
                                                <span className="text-white/40">[10:48:09]</span> <span className="text-pink-400 font-semibold">[Writer]</span> Replaced "responsible for styling" with "Spearheaded design system architecture".
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-green-400 font-bold">&gt;&gt;</span>
                                            <div>
                                                <span className="text-white/40">[10:48:15]</span> <span className="text-purple-400 font-semibold">[SEO Optimizer]</span> Keywords matched: <span className="text-[#FF9FFC]">React, Vite, micro-frontends</span>.
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-green-400 font-bold">&gt;&gt;</span>
                                            <div>
                                                <span className="text-white/40">[10:48:22]</span> <span className="text-emerald-400 font-semibold">[Typographer]</span> Enforcing margin rules & line-height for single-page budget.
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2 animate-pulse">
                                            <span className="text-green-400 font-bold">&gt;&gt;</span>
                                            <div className="text-[#FF9FFC]">
                                                <span className="text-white/40">[10:48:28]</span> [System] Compilation completed successfully.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom active pipeline state indicator */}
                                <div className="border-t border-white/[0.08] pt-4 mt-6 lg:mt-0 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-white/40 text-[10px] tracking-wide font-semibold">ENGINE STATUS:</span>
                                        <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/20">
                                            ONLINE / READY
                                        </span>
                                    </div>
                                    <span className="text-[#FF9FFC] font-bold text-[10px] tracking-wide">ATS: 98% MATCH</span>
                                </div>
                            </div>

                            {/* Right Side: Visualizing the rendered Resume compilation */}
                            <div className="w-full lg:w-[55%] bg-black/40 p-8 flex items-center justify-center relative overflow-hidden min-h-[350px] lg:min-h-0">
                                {/* Soft decorative light background glow */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(82,39,255,0.08)_0%,transparent_70%)] pointer-events-none" />

                                {/* The Document Mockup Frame */}
                                <div className="w-full max-w-[300px] sm:max-w-[320px] aspect-[1/1.41] bg-white text-black p-5 sm:p-6 rounded shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative group transition-transform duration-300 hover:scale-[1.02] border border-black/5">

                                    {/* Header Mockup */}
                                    <div className="text-center border-b border-black/10 pb-3">
                                        <div className="h-3.5 bg-black/90 w-32 mx-auto rounded animate-pulse" />
                                        <div className="flex justify-center gap-2 mt-2">
                                            <div className="h-1.5 bg-black/40 w-12 rounded" />
                                            <div className="h-1.5 bg-black/40 w-16 rounded" />
                                            <div className="h-1.5 bg-black/40 w-12 rounded" />
                                        </div>
                                    </div>

                                    {/* Experience Block Mockup */}
                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <div className="h-2 bg-black/25 w-12 rounded" />
                                            <div className="flex justify-between items-center mt-2">
                                                <div className="h-2.5 bg-black/85 w-24 rounded" />
                                                <div className="h-1.5 bg-black/35 w-16 rounded" />
                                            </div>
                                            <div className="space-y-1.5 mt-2">
                                                {/* Animated list points */}
                                                <div className="flex gap-2">
                                                    <span className="text-[8px] font-bold mt-0.5">•</span>
                                                    <div className="h-2 bg-black/60 w-full rounded animate-pulse" />
                                                </div>
                                                <div className="flex gap-2">
                                                    <span className="text-[8px] font-bold mt-0.5">•</span>
                                                    <div className="h-2 bg-black/60 w-[90%] rounded" />
                                                </div>
                                                <div className="flex gap-2">
                                                    <span className="text-[8px] font-bold mt-0.5">•</span>
                                                    <div className="h-2 bg-black/60 w-[95%] rounded" />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between items-center mt-3">
                                                <div className="h-2.5 bg-black/85 w-28 rounded" />
                                                <div className="h-1.5 bg-black/35 w-14 rounded" />
                                            </div>
                                            <div className="space-y-1.5 mt-2">
                                                <div className="flex gap-2">
                                                    <span className="text-[8px] font-bold mt-0.5">•</span>
                                                    <div className="h-2 bg-black/60 w-full rounded" />
                                                </div>
                                                <div className="flex gap-2">
                                                    <span className="text-[8px] font-bold mt-0.5">•</span>
                                                    <div className="h-2 bg-black/60 w-[85%] rounded animate-pulse" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Overlay Badge for preview */}
                                    <div className="absolute right-4 bottom-4 px-2 py-1 rounded bg-[#5227FF] text-white font-mono text-[9px] font-bold shadow-[0_0_15px_rgba(82,39,255,0.4)]">
                                        OUTPUT: PDF_READY
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                {/* 5. Minimalist Footer */}
                <footer className="border-t border-white/[0.05] bg-black/80 backdrop-blur-md py-12 px-4 sm:px-6 md:px-8">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Links */}
                        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                            <a href="#features" className="text-xs font-semibold tracking-wider uppercase text-white/45 hover:text-white transition-colors duration-200">
                                AI Agents
                            </a>
                            <a href="#preview" className="text-xs font-semibold tracking-wider uppercase text-white/45 hover:text-white transition-colors duration-200">
                                Live Simulation
                            </a>
                            <span
                                onClick={() => navigate("/builder")}
                                className="text-xs font-semibold tracking-wider uppercase text-white/45 hover:text-white transition-colors duration-200 cursor-pointer"
                            >
                                Build Resume
                            </span>
                        </div>

                        {/* Copyright */}
                        <p className="text-[11px] text-white/30 font-light font-mono">
                            © {new Date().getFullYear()} ResumeLLM. Created for builders.
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Home