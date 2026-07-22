import { Link } from "react-router-dom";
import { useState } from "react";

export function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b-2 border-gray-300 bg-white/95 backdrop-blur-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
                <Link to="/" className="flex items-center gap-2 text-2xl font-black text-black">
                    RAGLess
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-8 md:flex">
                    <a href="#" className="text-xs font-bold text-black tracking-wider uppercase hover:text-gray-600 transition-colors">
                        PRICING
                    </a>
                    <a href="#" className="text-xs font-bold text-black tracking-wider uppercase hover:text-gray-600 transition-colors">
                        DOCS
                    </a>
                    <a href="#" className="text-xs font-bold text-black tracking-wider uppercase hover:text-gray-600 transition-colors">
                        BLOG
                    </a>
                    <a href="#" className="text-xs font-bold text-black tracking-wider uppercase hover:text-gray-600 transition-colors">
                        TUTORIALS
                    </a>
                    <a href="#" className="text-xs font-bold text-black tracking-wider uppercase hover:text-gray-600 transition-colors">
                        CHANGELOG
                    </a>
                </nav>
                
                <div className="hidden md:flex items-center gap-4">
                    <a href="#" className="text-xs font-bold text-black tracking-wider uppercase hover:text-gray-600 transition-colors">
                        LOGIN
                    </a>
                    <Link to="/signup" className="inline-flex h-10 items-center rounded-lg bg-black text-white px-6 text-xs font-bold tracking-wider uppercase transition-all hover:bg-gray-900">
                        SIGN UP
                    </Link>
                </div>

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
