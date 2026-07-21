import { Link } from "react-router-dom";
import { useState } from "react";

export function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
                <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">S</span>
                    StudyAI
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-6 md:flex">
                    <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground active:text-sm active:font-medium active:text-primary">
                        Home
                    </Link>
                    <Link to="/study" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground active:text-sm active:font-medium active:text-primary">
                        Study
                    </Link>
                    <Link to="/login" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground active:text-sm active:font-medium active:text-primary">
                        Login
                    </Link>
                    <Link to="/signup" className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                        Sign Up
                    </Link>
                </nav>

                {/* Mobile toggle */}
                <button onClick={() => setMobileOpen(!mobileOpen)} className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        {mobileOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <nav className="border-t border-border bg-card px-4 py-4 md:hidden">
                    <div className="flex flex-col gap-3">
                        <Link to="/" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Home</Link>
                        <Link to="/study" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Study</Link>
                        <Link to="/login" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>Login</Link>
                        <Link to="/signup" className="inline-flex h-9 w-fit items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground" onClick={() => setMobileOpen(false)}>Sign Up</Link>
                    </div>
                </nav>
            )}
        </header>
    );
}
