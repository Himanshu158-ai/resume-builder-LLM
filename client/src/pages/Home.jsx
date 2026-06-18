import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Download, Globe, User, Cpu, Eye, Sparkles, BarChart2, FileDown, CheckCircle, Zap } from "lucide-react";

export default function HomePage() {
    const navigate = useNavigate();

    const words = ["Professional", "ATS Friendly", "Modernnn", "AI Generated"];
    const [index, setIndex] = useState(0);
    const [colorIndex, setColorIndex] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const color = setInterval(() => {
            setColorIndex((prev) => !prev);
        }, 2000);
        return () => clearInterval(color);
    }, [])

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#0A0A0A] relative">

            {/* Subtle accent glow — much more restrained than before */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-10 grid md:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">

                {/* LEFT */}
                <div className="text-center md:text-left">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-indigo-500/[0.08] border border-indigo-500/20 px-3 py-1.5 rounded-full mb-6">
                        <span className={`w-1.5 h-1.5 rounded-full ${colorIndex ? "bg-indigo-400" : "bg-emerald-400"}`} />
                        <span className="text-[11px] font-medium text-indigo-300 tracking-widest uppercase">
                            Multi-agent AI pipeline
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-[52px] font-bold text-white leading-[1.15] tracking-tight mt-0 mb-5">
                        Build a{" "}
                        <span className="text-indigo-400 inline-block min-w-[180px] md:min-w-[240px] transition-opacity duration-200">
                            {words[index]}
                        </span>
                        <br />
                        resume in seconds
                    </h1>

                    <p className="text-[#71717A] text-[15px] md:text-base leading-relaxed mb-8 max-w-[420px] mx-auto md:mx-0">
                        Describe your experience. Our AI agents generate a professional,
                        ATS-optimized resume no fluff, no false claims.
                    </p>

                    {/* CTA */}
                    <button
                        onClick={() => navigate("/builder")}
                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-[10px] text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Build your resume
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* RIGHT — Resume mock card */}
                <div className="relative flex justify-center items-center mt-4 md:mt-0">
                    <div className="relative p-5">

                        {/* Card */}
                        <div className="bg-[#111111] border border-white/[0.08] rounded-2xl p-6 w-full max-w-[320px] rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="border-b border-white/[0.06] pb-4 mb-5">
                                <p className="text-white font-semibold text-[17px] tracking-tight mb-0.5">Himanshu</p>
                                <p className="text-indigo-400 text-[11px] font-medium tracking-wide uppercase">MERN Stack Developer</p>
                            </div>

                            <div className="space-y-4">
                                {[{ w1: "w-20", lines: ["w-full", "w-5/6"] }, { w1: "w-16", lines: ["w-full", "w-4/6"] }].map((s, i) => (
                                    <div key={i}>
                                        <div className={`h-1.5 bg-white/10 rounded ${s.w1} mb-2`} />
                                        {s.lines.map((w, j) => (
                                            <div key={j} className={`h-1 bg-white/[0.05] rounded ${w} mb-1`} />
                                        ))}
                                    </div>
                                ))}

                                {/* Skill chips */}
                                <div>
                                    <div className="h-1.5 bg-white/10 rounded w-12 mb-2.5" />
                                    <div className="flex flex-wrap gap-1.5">
                                        {["React", "Node.js", "MongoDB", "LangGraph"].map(s => (
                                            <span key={s} className="text-[10px] text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Float badge — bottom left */}
                        <div className="absolute -bottom-3 -left-3 bg-[#18181B] border border-white/[0.10] rounded-xl px-3 py-2 flex items-center gap-2">
                            <span className="text-indigo-400 text-sm">⚡</span>
                            <span className="text-[11px] text-[#A1A1AA] font-medium whitespace-nowrap">4 AI agents running</span>
                        </div>

                        {/* Float badge — top right */}
                        <div className="absolute -top-3 -right-3 bg-[#18181B] border border-white/[0.10] rounded-xl px-3 py-2 flex items-center gap-2">
                            <div className="w-16 h-1 bg-white/[0.08] rounded overflow-hidden">
                                <div className="h-full w-[90%] bg-emerald-500 rounded" />
                            </div>
                            <span className="text-[11px] text-emerald-400 font-semibold">ATS 90</span>
                        </div>

                    </div>
                </div>

            </div>
            {/* ───── HOW IT WORKS + FEATURES SECTION ───── */}
            <div className="bg-[#0A0A0A]">
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-16">

                    {/* ── SECTION HEADER ── */}
                    <div className="inline-flex items-center gap-2 bg-indigo-500/[0.08] border border-indigo-500/20 px-3 py-1.5 rounded-full mb-4">
                        <span className="text-[11px] font-medium text-indigo-300 tracking-widest uppercase">How it works</span>
                    </div>
                    <h2 className="text-3xl md:text-[36px] font-bold text-white tracking-tight leading-[1.2] mb-3">
                        From idea to resume<br />in four steps
                    </h2>
                    <p className="text-[#71717A] text-sm leading-relaxed max-w-[480px] mb-12">
                        No templates to fill. No guesswork. Just describe what you've built — the agents handle the rest.
                    </p>

                    {/* ── STATS ── */}
                    <div className="flex gap-8 mb-14 flex-wrap">
                        {[
                            { num: "<30s", label: "Average generation time" },
                            { num: "4", label: "Parallel AI agents" },
                            { num: "25+", label: "Resumes generated" },
                            { num: "+80%", label: "Average ATS score" },
                        ].map(({ num, label }) => (
                            <div key={label}>
                                <p className="text-[28px] font-bold tracking-tight leading-none text-indigo-400">{num}</p>
                                <p className="text-[11px] text-[#71717A] mt-1">{label}</p>
                            </div>
                        ))}
                    </div>

                    {/* ── STEPS ── */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden mb-16">
                        {[
                            { num: "01", icon: <User size={15} />, title: "Enter your details", desc: "Fill in your name, role, experience, projects, and skills. Plain language works fine." },
                            { num: "02", icon: <Cpu size={15} />, title: "Agents go to work", desc: "Four specialized AI agents run in parallel Summary, Projects, Experience, and ATS Evaluator." },
                            { num: "03", icon: <Eye size={15} />, title: "Review & refine", desc: "Preview your resume live. See your ATS score and suggestions before downloading." },
                            { num: "04", icon: <Download size={15} />, title: "Download as PDF", desc: "One click. Clean, ATS-parseable PDF ready to send to recruiters or upload to portals." },
                        ].map(({ num, icon, title, desc }) => (
                            <div key={num} className="bg-[#0F0F0F] hover:bg-[#111111] transition-colors duration-200 p-6">
                                <p className="text-[11px] text-indigo-400 font-semibold tracking-widest mb-3">{num}</p>
                                <div className="w-8 h-8 bg-indigo-500/[0.08] border border-indigo-500/[0.15] rounded-[8px] flex items-center justify-center text-indigo-400 mb-3">
                                    {icon}
                                </div>
                                <p className="text-[13px] font-semibold text-white tracking-tight mb-1.5">{title}</p>
                                <p className="text-[11px] text-[#71717A] leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* ── FEATURES HEADER ── */}
                    <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-full mb-4">
                        <span className="text-[11px] font-medium text-[#A1A1AA] tracking-widest uppercase">Features</span>
                    </div>
                    <h2 className="text-2xl md:text-[28px] font-bold text-white tracking-tight leading-[1.2] mb-3">
                        Everything you need,<br />nothing you don't
                    </h2>
                    <p className="text-[#71717A] text-sm leading-relaxed max-w-[480px] mb-8">
                        Built specifically for developers and freshers entering the job market.
                    </p>

                    {/* ── FEATURES GRID ── */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 rounded-2xl overflow-hidden">
                        {[
                            { color: "indigo", icon: <Sparkles size={14} />, tag: "LangGraph", title: "Multi-agent generation", desc: "Summary, Projects, and Experience written by dedicated agents simultaneously faster and more coherent than single-pass AI." },
                            { color: "green", icon: <BarChart2 size={14} />, tag: "Live feedback", title: "ATS score analysis", desc: "A fourth agent evaluates keyword density, section structure, and readability giving you an actionable score." },
                            { color: "amber", icon: <FileDown size={14} />, tag: "PDF-ready", title: "One-click PDF export", desc: "Clean, professionally formatted PDF that parses correctly in Greenhouse, Lever, Workday, and more." },
                            { color: "indigo", icon: <Eye size={14} />, tag: "Editable", title: "Edit before you export", desc: "Generated content is fully editable. Tweak any section summary, experience, or projects before downloading your PDF." },
                            { color: "green", icon: <CheckCircle size={14} />, tag: "Grounded output", title: "No fluff, no hallucinations", desc: "Everything written is grounded in what you provide. The AI enhances language it never fabricates credentials." },
                            { color: "amber", icon: <Zap size={14} />, tag: "Dev-focused", title: "Built for freshers & devs", desc: "Understands tech stacks and projects. Frames limited experience powerfully for the job market." },
                        ].map(({ color, icon, tag, title, desc }) => {
                            const colors = {
                                indigo: { bg: "bg-indigo-500/[0.08]", border: "border-indigo-500/[0.15]", text: "text-indigo-400", tagBg: "bg-indigo-500/[0.08] border-indigo-500/[0.15] text-indigo-300" },
                                green: { bg: "bg-emerald-500/[0.06]", border: "border-emerald-500/[0.12]", text: "text-emerald-400", tagBg: "bg-emerald-500/[0.06] border-emerald-500/[0.12] text-emerald-300" },
                                amber: { bg: "bg-amber-400/[0.06]", border: "border-amber-400/[0.12]", text: "text-amber-400", tagBg: "bg-amber-400/[0.06] border-amber-400/[0.12] text-amber-300" },
                            }[color];
                            return (
                                <div key={title} className="bg-[#0F0F0F] hover:bg-[#111111] transition-colors duration-200 p-6">
                                    <div className={`w-8 h-8 ${colors.bg} border ${colors.border} rounded-[8px] flex items-center justify-center ${colors.text} mb-3`}>
                                        {icon}
                                    </div>
                                    <p className="text-[13px] font-semibold text-white tracking-tight mb-1.5">{title}</p>
                                    <p className="text-[11px] text-[#71717A] leading-relaxed mb-3">{desc}</p>
                                    <span className={`text-[10px] font-light text-${colors.tagBg}`}>{tag}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* ── BOTTOM CTA ── */}
                    <div className="mt-12 bg-[#111111] border border-white/[0.07] rounded-2xl px-8 py-7 flex items-center justify-between gap-6 flex-wrap">
                        <div>
                            <p className="text-[15px] font-semibold text-white tracking-tight mb-1">Ready to build yours?</p>
                            <p className="text-[12px] text-[#71717A]">Takes less than 2 minutes. No account needed to start.</p>
                        </div>
                        <button
                            onClick={() => navigate("/builder")}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white text-[13px] font-semibold px-5 py-2.5 rounded-[8px] transition-colors duration-200 whitespace-nowrap"
                        >
                            Start building →
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
}