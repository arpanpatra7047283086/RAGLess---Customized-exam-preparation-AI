import { Link } from "react-router-dom";
import { FeatureCard } from "../components/FeatureCard";
import { PageLayout } from "../components/PageLayout";

export function HomePage() {
    return (
        <PageLayout>
            {/* Hero Section */}
            <section className="relative overflow-hidden px-4 pt-16 pb-20 sm:pt-24 sm:pb-32 lg:px-8">
                {/* Background Decorative Elements */}
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,var(--color-primary)_0%,transparent_100%)] opacity-[0.03]" />
                <div className="absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:top-[-200px]" aria-hidden="true">
                    <circle cx="500" cy="500" r="500" fill="url(#hero-grad)" fillOpacity="0.05" />
                    <defs>
                        <radialGradient id="hero-grad">
                            <stop stopColor="var(--color-primary)" />
                            <stop offset="1" stopColor="var(--color-primary)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                </div>

                <div className="mx-auto max-w-4xl text-center">
                    <div className="animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                        </span>
                        Next-Gen Study Assistant
                    </div>

                    <h1 className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                        Prepare for exams with <span className="text-primary italic">Precision</span>
                    </h1>

                    <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
                        RAGLess uses customized AI to transform your study materials into interactive summaries, flashcards, and quizzes. Study smarter, not harder.
                    </p>

                    <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                        <Link to="/study" className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]">
                            Start Studying Now
                        </Link>
                        <Link to="/docs" className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-input bg-background px-8 py-4 text-base font-bold text-foreground transition-all hover:bg-accent hover:text-accent-foreground">
                            View Documentation
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="border-t border-border bg-accent/5 px-4 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center mb-16 sm:mb-20">
                        <h2 className="text-base font-bold uppercase tracking-widest text-primary">Capabilities</h2>
                        <p className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">Everything you need to excel</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <FeatureCard
                            icon={<SummaryIcon />}
                            title="Instant Summaries"
                            description="Condense massive PDFs into manageable bullet points and key takeaways in seconds."
                            delay="100ms"
                        />
                        <FeatureCard
                            icon={<FlashcardIcon />}
                            title="Smart Flashcards"
                            description="Automatically generate Q&A pairs to test your active recall on any complex topic."
                            delay="200ms"
                        />
                        <FeatureCard
                            icon={<QuizIcon />}
                            title="Adaptive Quizzes"
                            description="Challenge yourself with AI-generated multiple choice questions tailored to your material."
                            delay="300ms"
                        />
                        <FeatureCard
                            icon={<ChatIcon />}
                            title="Expert Tutor"
                            description="Chat with your documents to clarify doubts and explore concepts deeper through dialogue."
                            delay="400ms"
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 py-24 sm:py-32">
                <div className="mx-auto max-w-5xl rounded-3xl bg-primary px-6 py-16 text-center shadow-2xl sm:px-16 sm:py-24">
                    <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                        Ready to boost your grades?
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
                        Join thousands of students who are already using RAGLess to streamline their exam preparation.
                    </p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link to="/signup" className="w-full sm:w-auto rounded-full bg-background px-8 py-4 text-base font-bold text-foreground shadow-sm hover:bg-accent transition-colors">
                            Sign Up for Free
                        </Link>
                        <Link to="/login" className="text-base font-bold text-primary-foreground underline underline-offset-4 hover:opacity-80">
                            Already have an account? Log in
                        </Link>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}

function SummaryIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    );
}

function FlashcardIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="10" x="3" y="11" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>
    );
}

function QuizIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    );
}

function ChatIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
    );
}
