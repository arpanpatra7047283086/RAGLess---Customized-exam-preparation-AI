import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../utils/API_Calls";
import { useUserContext } from "../context/userContext";
import { Toaster, toast } from "sonner";

export function LoginPage() {
    const [email, setEmail] = useState("user@example.com");
    const [password, setPassword] = useState("password123");

    const navigate = useNavigate();
    const { setUserEmail, setUserName, setUserId } = useUserContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (email === "user@example.com" && password === "password123") {
            setUserEmail("user@example.com");
            setUserName("Scholar Guest");
            setUserId("demo-123");
            toast.success("Logged in with Demo Account");
            navigate('/');
            return;
        }

        const result = await login({ email, password });
        if (result?.status === 200) {
            setUserEmail(result?.data?.email ?? "");
            setUserName(result?.data?.name ?? "");
            setUserId(result?.data?.id ?? "");

            toast.success("User Logged In");
            navigate('/');
        } else {
            toast.error("User does not exist! Kindly Sign Up");
        }
    };

    return (
        <div className="flex min-h-screen bg-[#FBF8F1] mesh-indigo">
            <Toaster position="top-center" />

            {/* Left Panel - Hero Section */}
            <div className="hidden lg:flex flex-col justify-between w-[45%] bg-[#1B253C] p-16 text-white relative overflow-hidden">
                {/* Abstract Color Blobs for "Better Look" */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -ml-48 -mb-48" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 shadow-inner">
                            <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                            </svg>
                        </div>
                        <span className="text-2xl font-bold tracking-tight">Scholar<span className="text-indigo-400">AI</span></span>
                    </div>
                </div>

                <div className="relative z-10 max-w-lg">
                    <h1 className="text-7xl font-serif mb-8 leading-[1.1] animate-fade-in-up">Study <span className="text-indigo-400">smarter</span>, not harder.</h1>
                    <p className="text-xl text-slate-300 font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Turn any PDF into summaries, quizzes, flashcards, and a conversational tutor — tailored to your exam.
                    </p>
                </div>

                <div className="relative z-10 flex items-center gap-4 text-sm text-slate-400 font-medium">
                    <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                            <div key={i} className={`w-8 h-8 rounded-full border-2 border-[#1B253C] bg-slate-800 flex items-center justify-center text-[10px]`}>
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                    </div>
                    <span>Trusted by 5,000+ students</span>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="flex flex-1 items-center justify-center p-8">
                <div className="w-full max-w-[460px] bg-white rounded-[40px] p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 animate-scale-in">
                    <div className="mb-12">
                        <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-4">
                            Welcome Back
                        </div>
                        <h2 className="text-4xl font-serif text-[#1B253C] mb-3">Login Account</h2>
                        <p className="text-slate-500 font-light">Enter your details to access your dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="user@example.com"
                                    className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-sm font-medium text-[#1B253C] placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all"
                                />
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206"></path></svg>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Security Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••••••"
                                    className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 text-sm font-medium text-[#1B253C] placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all"
                                />
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 cursor-pointer hover:text-indigo-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-2xl bg-[#1B253C] py-5 text-sm font-bold text-white shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-600 hover:-translate-y-1 active:scale-95 mt-4"
                        >
                            Sign In to System
                        </button>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-slate-400 text-sm font-medium">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-indigo-600 font-bold hover:underline underline-offset-4">
                                Create free account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
