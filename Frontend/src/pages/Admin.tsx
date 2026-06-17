import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const ADMIN_PASSWORD = "admin123"; // Frontend-only demo password

export function AdminPage() {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [name, setName] = useState("");
    const [driveLink, setDriveLink] = useState("");
    const [formErrors, setFormErrors] = useState<{ name?: string; driveLink?: string }>({});
    const [submissions, setSubmissions] = useState<{ name: string; driveLink: string }[]>([]);
    const [successMsg, setSuccessMsg] = useState("");

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setAuthenticated(true);
            setPasswordError("");
        } else {
            setPasswordError("Incorrect password. Please try again.");
        }
    };

    const validateDriveLink = (link: string): boolean => {
        return link.includes("drive.google.com");
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errors: { name?: string; driveLink?: string } = {};

        if (!name.trim()) {
            errors.name = "Name is required.";
        }
        if (!driveLink.trim()) {
            errors.driveLink = "Google Drive link is required.";
        } else if (!validateDriveLink(driveLink)) {
            errors.driveLink = "Link must contain drive.google.com";
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setFormErrors({});
        setSubmissions((prev) => [...prev, { name: name.trim(), driveLink: driveLink.trim() }]);
        setName("");
        setDriveLink("");
        setSuccessMsg("Material submitted successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
    };

    if (!authenticated) {
        return (
            <div className="min-h-screen flex flex-col bg-[#FBF8F1] mesh-indigo">
                <Header />
                <div className="flex-1 flex items-center justify-center px-6 py-16">
                    <div className="w-full max-w-[440px]">
                        <div className="rounded-[40px] border border-slate-100 bg-white p-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-16 -mt-16" />

                            <div className="relative z-10 mb-10 text-center">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#1B253C] text-3xl text-white shadow-2xl shadow-indigo-200">
                                    🔒
                                </div>
                                <h1 className="text-4xl font-serif text-[#1B253C] mb-2">Admin Panel</h1>
                                <p className="text-slate-500 font-light">Secure access for educators</p>
                            </div>
                            <form onSubmit={handlePasswordSubmit} className="relative z-10 space-y-6">
                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Security Key</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                                        placeholder="••••••••"
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-6 py-4 text-sm font-medium text-[#1B253C] placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all"
                                    />
                                    {passwordError && (
                                        <div className="mt-4 p-3 rounded-xl bg-rose-50 text-rose-600 text-[10px] font-bold uppercase tracking-wider text-center border border-rose-100">
                                            {passwordError}
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full rounded-2xl bg-[#1B253C] py-5 text-sm font-bold text-white transition-all hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-100 active:scale-95"
                                >
                                    Verify Identity
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#FBF8F1] mesh-emerald">
            <Header />
            <div className="flex-1 mx-auto w-full max-w-5xl px-6 py-16">
                <div className="mb-12 flex items-end justify-between">
                    <div>
                        <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-4">
                            Authorized Access
                        </div>
                        <h1 className="text-5xl font-serif text-[#1B253C] mb-3">Material Repository</h1>
                        <p className="text-slate-500 font-light text-lg">Add new academic sources to the Scholar AI engine.</p>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex -space-x-3">
                            {[1,2,3,4].map(i => (
                                <div key={i} className="h-12 w-12 rounded-2xl border-4 border-[#FBF8F1] bg-white flex items-center justify-center shadow-sm">
                                    <div className={`h-full w-full rounded-xl bg-gradient-to-br ${i % 2 === 0 ? 'from-indigo-500 to-purple-500' : 'from-emerald-400 to-teal-500'} opacity-20`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {successMsg && (
                    <div className="mb-10 rounded-[24px] border border-emerald-100 bg-white px-8 py-5 text-sm font-bold text-emerald-600 flex items-center justify-between shadow-xl shadow-emerald-100 animate-fade-in-up">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xl">✓</div>
                            <div>
                                <p className="text-[#1B253C]">Success!</p>
                                <p className="text-slate-400 font-normal">{successMsg}</p>
                            </div>
                        </div>
                        <button onClick={() => setSuccessMsg("")} className="text-slate-300 hover:text-slate-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </button>
                    </div>
                )}

                <div className="grid lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-5">
                        <div className="rounded-[40px] border border-slate-100 bg-white p-10 shadow-sm sticky top-32">
                            <h3 className="text-xl font-bold text-[#1B253C] mb-8">Add New Content</h3>
                            <form onSubmit={handleFormSubmit} className="space-y-8">
                                <div>
                                    <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-slate-400">Subject Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g., Advanced Robotics"
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-sm font-medium text-[#1B253C] focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all"
                                    />
                                    {formErrors.name && <p className="mt-2 text-[10px] font-bold text-rose-500 uppercase tracking-widest">{formErrors.name}</p>}
                                </div>
                                <div>
                                    <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-slate-400">Google Drive URL</label>
                                    <input
                                        type="url"
                                        value={driveLink}
                                        onChange={(e) => setDriveLink(e.target.value)}
                                        placeholder="https://drive.google.com/..."
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-sm font-medium text-[#1B253C] focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all"
                                    />
                                    {formErrors.driveLink && <p className="mt-2 text-[10px] font-bold text-rose-500 uppercase tracking-widest">{formErrors.driveLink}</p>}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full rounded-2xl bg-[#1B253C] py-5 text-sm font-bold text-white transition-all hover:bg-emerald-600 hover:shadow-2xl hover:shadow-emerald-100 active:scale-95"
                                >
                                    Publish Material
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-[#1B253C] flex items-center gap-4">
                                Active Database
                                <span className="h-8 w-8 rounded-full bg-slate-100 text-slate-400 text-xs flex items-center justify-center">{submissions.length}</span>
                            </h3>

                            {submissions.length === 0 ? (
                                <div className="rounded-[40px] border-2 border-dashed border-slate-200 p-20 text-center">
                                    <div className="text-4xl mb-4 grayscale opacity-30">📂</div>
                                    <p className="text-slate-400 font-medium">No materials added yet.</p>
                                </div>
                            ) : (
                                <div className="grid gap-4 animate-scale-in">
                                    {submissions.map((s, i) => (
                                        <div key={i} className="flex items-center justify-between rounded-3xl border border-slate-100 bg-white px-8 py-6 group hover:border-emerald-200 transition-all hover:shadow-xl hover:shadow-slate-200/50">
                                            <div className="flex items-center gap-6">
                                                <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl text-emerald-600 transition-transform group-hover:scale-110">
                                                    📄
                                                </div>
                                                <div>
                                                    <p className="text-lg font-bold text-[#1B253C]">{s.name}</p>
                                                    <p className="text-xs font-medium text-slate-400 truncate max-w-[200px] sm:max-w-xs">{s.driveLink}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="px-3 py-1 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-600 uppercase tracking-widest border border-emerald-100">
                                                    Live
                                                </div>
                                                <button className="h-10 w-10 rounded-xl flex items-center justify-center text-slate-200 hover:text-rose-500 hover:bg-rose-50 transition-all">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
