import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function HomePage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#FBF8F1] mesh-indigo">
            <Header />

            {/* Hero Section */}
            <section className="relative overflow-hidden px-6 py-24 sm:py-32">
                <div className="relative mx-auto max-w-5xl text-center">
                    <div className="animate-fade-in-up mb-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-indigo-600 shadow-sm border border-indigo-50">
                        <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                        Next-Gen AI Tutoring
                    </div>
                    <h1 className="animate-fade-in-up text-5xl font-serif tracking-tight text-slate-900 sm:text-7xl leading-[1.1]" style={{ animationDelay: "0.1s" }}>
                        The future of learning is <br />
                        <span className="text-gradient-indigo italic">personalized.</span>
                    </h1>
                    <p className="animate-fade-in-up mx-auto mt-8 max-w-2xl text-xl text-slate-600 font-light leading-relaxed" style={{ animationDelay: "0.2s" }}>
                        Scholar AI transforms your study materials into interactive summaries, flashcards, and quizzes. Experience a tutor that truly understands your needs.
                    </p>
                    <div className="animate-fade-in-up mt-12 flex flex-wrap items-center justify-center gap-6" style={{ animationDelay: "0.3s" }}>
                        <Link to="/study" className="inline-flex h-14 items-center rounded-2xl bg-[#1B253C] px-8 text-base font-bold text-white shadow-xl shadow-indigo-200/50 transition-all hover:bg-indigo-600 hover:-translate-y-1 active:scale-95">
                            Enter Study Center
                        </Link>
                        <Link to="/signup" className="inline-flex h-14 items-center rounded-2xl border border-slate-200 bg-white px-8 text-base font-bold text-[#1B253C] transition-all hover:bg-slate-50 hover:-translate-y-1 active:scale-95">
                            Join Community
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-6 py-24 bg-white rounded-[40px] mx-4 sm:mx-8 mb-8 border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -ml-32 -mb-32 opacity-50" />

                <div className="mx-auto max-w-7xl relative z-10">
                    <div className="mb-20 text-center">
                        <h2 className="text-4xl font-serif text-[#1B253C] mb-4">Master any subject with ease</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto font-light text-lg">Our AI engine processes complex information into simple, digestible learning blocks.</p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <FeatureCard
                            icon={<SummaryIcon />}
                            title="Smart Summaries"
                            description="AI-powered distillation of long-form content into core concepts and actionable insights."
                            color="indigo"
                        />
                        <FeatureCard
                            icon={<FlashcardIcon />}
                            title="Interactive Flashcards"
                            description="Automatically generated memory aids designed for maximum knowledge retention."
                            color="emerald"
                        />
                        <FeatureCard
                            icon={<QuizIcon />}
                            title="Adaptive Quizzes"
                            description="Challenge yourself with quizzes that focus on your weak points for efficient growth."
                            color="amber"
                        />
                        <FeatureCard
                            icon={<ChatIcon />}
                            title="AI Tutor"
                            description="A 24/7 conversational companion that can explain anything from basics to advanced theory."
                            color="rose"
                        />
                    </div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="px-6 py-24 sm:py-32 mesh-emerald">
                <div className="mx-auto max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif text-[#1B253C] mb-4">How it works</h2>
                        <p className="text-slate-500 font-light text-lg">Three simple steps to academic excellence.</p>
                    </div>
                    <div className="grid gap-12 sm:grid-cols-3">
                        {[
                            { step: "01", title: "Select Subject", desc: "Choose your focus area from our wide range of academic disciplines.", color: "text-indigo-600" },
                            { step: "02", title: "Choose Mode", desc: "Select between Summary, Flashcards, Quiz, or a live Conversation.", color: "text-emerald-600" },
                            { step: "03", title: "Start Learning", desc: "Interact with AI, track your progress, and download study guides.", color: "text-amber-600" },
                        ].map((s) => (
                            <div key={s.step} className="group relative">
                                <div className={`text-8xl font-serif ${s.color} opacity-5 absolute -top-8 -left-4 group-hover:opacity-10 transition-opacity`}>
                                    {s.step}
                                </div>
                                <div className="relative z-10 pt-4">
                                    <h3 className={`mb-3 text-xl font-bold ${s.color.replace('text-', 'text-slate-900')}`}>{s.title}</h3>
                                    <p className="text-slate-500 font-light leading-relaxed">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

function FeatureCard({ icon, title, description, color }: { icon: React.ReactNode, title: string, description: string, color: 'indigo' | 'emerald' | 'amber' | 'rose' }) {
    const colorMap = {
        indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white',
        amber: 'bg-amber-50 text-amber-600 border-amber-100 group-hover:bg-amber-600 group-hover:text-white',
        rose: 'bg-rose-50 text-rose-600 border-rose-100 group-hover:bg-rose-600 group-hover:text-white',
    };

    return (
        <div className="group rounded-3xl border border-slate-100 bg-white p-8 transition-all hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2">
            <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition-all duration-500 ${colorMap[color]}`}>
                {icon}
            </div>
            <h3 className="mb-3 text-xl font-bold text-[#1B253C]">{title}</h3>
            <p className="text-sm leading-relaxed text-slate-500 font-light">{description}</p>
        </div>
    );
}

function SummaryIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
    );
}

function FlashcardIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
        </svg>
    );
}

function QuizIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
    );
}

function ChatIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.399-.752c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>
    );
}
