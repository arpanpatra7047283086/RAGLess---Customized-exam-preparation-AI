import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../context/userContext";

export function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { userId, userName, logout } = useUserContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="sticky top-0 z-50 border-b border-indigo-50/50 bg-white/70 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-[#1B253C] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 transition-transform group-hover:scale-110 group-hover:rotate-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-[#1B253C]">Scholar<span className="text-indigo-600">AI</span></span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-8 md:flex">
                    <Link to="/" className="text-sm font-bold text-slate-500 transition-all hover:text-indigo-600 hover:tracking-wide">
                        Dashboard
                    </Link>
                    <Link to="/study" className="text-sm font-bold text-slate-500 transition-all hover:text-indigo-600 hover:tracking-wide">
                        Study Center
                    </Link>

                    {userId ? (
                        <div className="flex items-center gap-6 border-l border-slate-100 pl-8">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student</span>
                                <span className="text-sm font-bold text-[#1B253C]">{userName}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="inline-flex h-10 items-center rounded-xl border border-rose-100 bg-rose-50 px-5 text-xs font-bold text-rose-600 transition-all hover:bg-rose-600 hover:text-white active:scale-95"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-sm font-bold text-[#1B253C] hover:text-indigo-600">
                                Login
                            </Link>
                            <Link to="/signup" className="inline-flex h-11 items-center rounded-xl bg-indigo-600 px-6 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700 hover:shadow-indigo-200 active:scale-95">
                                Get Started
                            </Link>
                        </div>
                    )}
                </nav>

                {/* Mobile toggle */}
                <button onClick={() => setMobileOpen(!mobileOpen)} className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 md:hidden border border-slate-100 bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
                <nav className="border-t border-slate-50 bg-white px-6 py-8 md:hidden animate-fade-in-up">
                    <div className="flex flex-col gap-6">
                        <Link to="/" className="text-lg font-bold text-slate-700" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                        <Link to="/study" className="text-lg font-bold text-slate-700" onClick={() => setMobileOpen(false)}>Study Center</Link>
                        <div className="h-px bg-slate-100 my-2" />
                        {userId ? (
                            <button onClick={handleLogout} className="text-lg font-bold text-rose-500 text-left flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                Logout
                            </button>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <Link to="/login" className="text-lg font-bold text-slate-700" onClick={() => setMobileOpen(false)}>Login</Link>
                                <Link to="/signup" className="inline-flex h-14 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-bold text-white shadow-xl shadow-indigo-100" onClick={() => setMobileOpen(false)}>Join Scholar AI</Link>
                            </div>
                        )}
                    </div>
                </nav>
            )}
        </header>
    );
}
