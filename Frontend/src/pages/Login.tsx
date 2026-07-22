import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PageLayout } from "../components/PageLayout";
import { login } from "../utils/API_Calls";
import { useUserContext } from "../context/userContext";
import { Toaster, toast } from "sonner";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { setUserEmail, setUserName, setUserId } = useUserContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await login({ email, password });
            if (result?.status === 200) {
                setUserEmail(result?.data?.email);
                setUserName(result?.data?.name);
                setUserId(result?.data?.id);
                toast.success("Welcome back!");
                navigate('/');
            } else {
                toast.error(result?.message || "Invalid credentials. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageLayout>
            <Toaster position="top-center" richColors />

            <div className="flex min-h-[calc(100vh-160px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                            Welcome back
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Access your personalized AI study dashboard
                        </p>
                    </div>

                    <div className="mt-8 rounded-2xl border border-border bg-card p-8 shadow-xl shadow-foreground/5">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Email address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="you@example.com"
                                    className="block w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-semibold text-foreground">Password</label>
                                    <a href="#" className="text-xs font-medium text-primary hover:underline">Forgot password?</a>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="block w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
                            >
                                {isLoading ? "Logging in..." : "Log In"}
                            </button>
                        </form>

                        <div className="mt-8 relative">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-border"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground font-medium tracking-wider">New to RAGLess?</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                to="/signup"
                                className="w-full flex justify-center items-center rounded-xl border border-input bg-background py-3.5 text-sm font-bold text-foreground transition-all hover:bg-accent active:scale-[0.99]"
                            >
                                Create an account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
