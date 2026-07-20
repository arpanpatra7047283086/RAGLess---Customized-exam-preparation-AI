import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../utils/API_Calls";
import { Toaster, toast } from "sonner";
import { useUserContext } from "../context/userContext";

export function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { setUserEmail, setUserName, setUserId } = useUserContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setIsLoading(true);
        try {
            const result = await register({ name, email, password });
            if (result.status === 201 && result.data) {
                setUserEmail(result.data.email ?? "");
                setUserName(result.data.name ?? "");
                setUserId(result.data.id ?? "");

                toast.success("Account Created Successfully");
                navigate('/');
            } else {
                toast.error(result.message || "User already exists or registration failed.");
            }
        } catch (error) {
            toast.error("Failed to connect to the server.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#FBF8F1] mesh-indigo">
            <Toaster position="top-center" />

            {/* Left Panel - Hero Section */}
            <div className="hidden lg:flex flex-col justify-between w-[45%] bg-[#1B253C] p-16 text-white relative overflow-hidden">
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
                    <h1 className="text-7xl font-serif mb-8 leading-[1.1] animate-fade-in-up">Start your <span className="text-emerald-400">journey</span> to mastery.</h1>
                    <p className="text-xl text-slate-300 font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Join thousands of students using AI to supercharge their exam preparation. Effortless summaries, quizzes, and more.
                    </p>
                </div>

                <div className="relative z-10 flex items-center gap-4 text-sm text-slate-400 font-medium">
                    <div className="flex -space-x-2">
                        {[4,5,6].map(i => (
                            <div key={i} className={`w-8 h-8 rounded-full border-2 border-[#1B253C] bg-slate-800 flex items-center justify-center text-[10px]`}>
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                    </div>
                    <span>Join the community today</span>
                </div>
            </div>

            {/* Right Panel - Signup Form */}
            <div className="flex flex-1 items-center justify-center p-8">
                <div className="w-full max-w-[500px] bg-white rounded-[40px] p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 animate-scale-in">
                    <div className="mb-10">
                        <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-4">
                            Getting Started
                        </div>
                        <h2 className="text-4xl font-serif text-[#1B253C] mb-3">Create Account</h2>
                        <p className="text-slate-500 font-light">Join Scholar AI and start learning smarter</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 gap-5">
                            <div>
                                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Ada Lovelace"
                                    className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-3.5 text-sm font-medium text-[#1B253C] placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="you@university.edu"
                                    className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-3.5 text-sm font-medium text-[#1B253C] placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="••••••••"
                                        className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-3.5 text-sm font-medium text-[#1B253C] placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Confirm</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        placeholder="••••••••"
                                        className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-3.5 text-sm font-medium text-[#1B253C] placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-2xl bg-[#1B253C] py-5 text-sm font-bold text-white shadow-xl shadow-indigo-100 transition-all hover:bg-emerald-600 disabled:opacity-50 mt-4"
                        >
                            {isLoading ? "Creating Account..." : "Create My Account"}
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-slate-400 text-sm font-medium">
                            Already a member?{" "}
                            <Link to="/login" className="text-indigo-600 font-bold hover:underline underline-offset-4">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
