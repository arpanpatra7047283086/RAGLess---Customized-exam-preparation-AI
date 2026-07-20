import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { downloadPdf } from "../utils/API_Calls";
import { toast, Toaster } from "sonner";

const ADMIN_PASSWORD = "admin123";

export function AdminPage() {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [name, setName] = useState("");
    const [driveLink, setDriveLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [formErrors, setFormErrors] = useState<{ name?: string; driveLink?: string }>({});
    const [submissions, setSubmissions] = useState<{ name: string; driveLink: string }[]>([]);

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setAuthenticated(true);
            setPasswordError("");
        } else {
            setPasswordError("Incorrect password. Please try again.");
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors: { name?: string; driveLink?: string } = {};

        if (!name.trim()) errors.name = "Name is required.";
        if (!driveLink.trim()) errors.driveLink = "Link is required.";

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setIsLoading(true);
        try {
            // CALL BACKEND API
            const result = await downloadPdf({
                url: driveLink.trim(),
                filename: name.trim() + ".pdf"
            });

            if (result.status === 201 || result.status === 200) {
                toast.success(result.message);
                setSubmissions((prev) => [...prev, { name: name.trim(), driveLink: driveLink.trim() }]);
                setName("");
                setDriveLink("");
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Failed to communicate with Backend server.");
        } finally {
            setIsLoading(false);
            setFormErrors({});
        }
    };

    if (!authenticated) {
        return (
            <div className="min-h-screen flex flex-col bg-[#FBF8F1] mesh-indigo">
                <Header />
                <Toaster position="top-center" />
                <div className="flex-1 flex items-center justify-center px-6 py-16">
                    <div className="w-full max-w-[440px]">
                        <div className="rounded-[40px] border border-slate-100 bg-white p-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative overflow-hidden">
                            <div className="relative z-10 mb-10 text-center">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#1B253C] text-3xl text-white shadow-2xl shadow-indigo-200">🔒</div>
                                <h1 className="text-4xl font-serif text-[#1B253C] mb-2">Admin Panel</h1>
                                <p className="text-slate-500 font-light">Secure access for educators</p>
                            </div>
                            <form onSubmit={handlePasswordSubmit} className="relative z-10 space-y-6">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password (admin123)"
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-6 py-4 text-sm font-medium text-[#1B253C] focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500"
                                />
                                {passwordError && <p className="text-rose-500 text-[10px] font-bold text-center">{passwordError}</p>}
                                <button type="submit" className="w-full rounded-2xl bg-[#1B253C] py-5 text-sm font-bold text-white">Verify Identity</button>
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
            <Toaster position="top-center" />
            <div className="flex-1 mx-auto w-full max-w-5xl px-6 py-16">
                <div className="mb-12">
                    <h1 className="text-5xl font-serif text-[#1B253C] mb-3">Material Repository</h1>
                    <p className="text-slate-500 font-light text-lg">Add new academic sources to the Scholar AI engine.</p>
                </div>

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
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-sm font-medium text-[#1B253C]"
                                    />
                                    {formErrors.name && <p className="mt-2 text-[10px] text-rose-500 font-bold">{formErrors.name}</p>}
                                </div>
                                <div>
                                    <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-slate-400">Google Drive URL</label>
                                    <input
                                        type="url"
                                        value={driveLink}
                                        onChange={(e) => setDriveLink(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-sm font-medium text-[#1B253C]"
                                    />
                                    {formErrors.driveLink && <p className="mt-2 text-[10px] text-rose-500 font-bold">{formErrors.driveLink}</p>}
                                </div>
                                <button
                                    disabled={isLoading}
                                    type="submit"
                                    className="w-full rounded-2xl bg-[#1B253C] py-5 text-sm font-bold text-white hover:bg-emerald-600 disabled:opacity-50 transition-all"
                                >
                                    {isLoading ? "Processing PDF..." : "Publish Material"}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-[#1B253C]">Active Database ({submissions.length})</h3>
                            {submissions.map((s, i) => (
                                <div key={i} className="flex items-center justify-between rounded-3xl border border-slate-100 bg-white px-8 py-6">
                                    <div className="flex items-center gap-6">
                                        <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl">📄</div>
                                        <div>
                                            <p className="text-lg font-bold text-[#1B253C]">{s.name}</p>
                                            <p className="text-xs text-slate-400 truncate max-w-xs">{s.driveLink}</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-600 uppercase">Live</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
