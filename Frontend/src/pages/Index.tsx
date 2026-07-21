import { Link } from "react-router-dom";
import { FeatureCard } from "../components/FeatureCard";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function HomePage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            {/* Hero */}
            <section className="relative overflow-hidden px-4 py-20 sm:py-28">
                <div className="absolute inset-0 bg-linear-to-br from-hero-gradient-start/5 to-hero-gradient-end/5" />
                <div className="relative mx-auto max-w-4xl text-center">
                    <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
                        <span className="flex h-2 w-2 rounded-full bg-success animate-pulse-soft" />
                        AI-Powered Learning
                    </div>
                    <h1 className="animate-fade-in-up text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl" style={{ animationDelay: "0.1s" }}>
                        Master Any Subject with{" "}
                        <span className="text-primary">StudyAI</span>
                    </h1>
                    <p className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-lg text-muted-foreground" style={{ animationDelay: "0.2s" }}>
                        Select your subject, choose how you want to learn, and let AI generate summaries, flashcards, quizzes, or have a natural conversation to deepen your understanding.
                    </p>
                    <div className="animate-fade-in-up mt-8 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: "0.3s" }}>
                        <Link to="/study" className="inline-flex h-11 items-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg">
                            Start Studying →
                        </Link>
                        <Link to="/signup" className="inline-flex h-11 items-center rounded-lg border border-border bg-card px-6 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
                            Create Account
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="px-4 py-16 sm:py-20">
                <div className="mx-auto max-w-6xl">
                    <h2 className="mb-4 text-center text-3xl font-bold text-foreground">How It Works</h2>
                    <p className="mx-auto mb-12 max-w-xl text-center text-muted-foreground">Choose your subject, pick a learning mode, and let our AI assistant help you prepare effectively.</p>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <FeatureCard
                            icon={<SummaryIcon />}
                            title="Summaries"
                            description="Get concise, well-structured summaries of complex topics to review key concepts quickly."
                            delay="0.1s"
                        />
                        <FeatureCard
                            icon={<FlashcardIcon />}
                            title="Flashcards"
                            description="Auto-generated flashcards to reinforce your memory through spaced repetition."
                            delay="0.2s"
                        />
                        <FeatureCard
                            icon={<QuizIcon />}
                            title="Quizzes"
                            description="Test your knowledge with multiple-choice quizzes and get instant feedback."
                            delay="0.3s"
                        />
                        <FeatureCard
                            icon={<ChatIcon />}
                            title="Conversation"
                            description="Have a natural conversation with AI to explore topics in depth and ask follow-up questions."
                            delay="0.4s"
                        />
                    </div>
                </div>
            </section>

            {/* Steps */}
            <section className="bg-surface px-4 py-16 sm:py-20">
                <div className="mx-auto max-w-4xl">
                    <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Get Started in 3 Steps</h2>
                    <div className="grid gap-8 sm:grid-cols-3">
                        {[
                            { step: "1", title: "Pick a Subject", desc: "Choose from our available subjects to focus your study session." },
                            { step: "2", title: "Select a Mode", desc: "Summary, Flashcards, Quiz, or free Conversation — you decide." },
                            { step: "3", title: "Learn & Download", desc: "Interact with AI, download summaries and flashcards for offline review." },
                        ].map((s) => (
                            <div key={s.step} className="text-center">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                                    {s.step}
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-foreground">{s.title}</h3>
                                <p className="text-sm text-muted-foreground">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

function SummaryIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
    );
}

function FlashcardIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
        </svg>
    );
}

function QuizIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
    );
}

function ChatIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.399-.752c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>
    );
}
