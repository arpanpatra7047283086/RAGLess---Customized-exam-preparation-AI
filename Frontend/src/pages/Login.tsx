import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "../components/Header";
import { PageLayout } from "../components/PageLayout";
import { login } from "../utils/API_Calls";
import { useUserContext } from "../context/userContext";
import { Toaster, toast } from "sonner";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { setUserEmail, setUserName, setUserId } = useUserContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await login({ email, password });
        if (result?.status === 200) {
            setUserEmail(result?.data?.email)
            setUserName(result?.data?.name)
            setUserId(result?.data?.id)

            toast.success("User Logged In");
            navigate('/');
        } else {
            toast.success("User does not exist! Kindly Sign Up");
        }
    };

    return (
        <PageLayout>
        <div className="min-h-screen bg-background">
            <Toaster />

            <Header />
            <div className="flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-md">
                    <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
                        <div className="mb-6 text-center">
                            <h1 className="text-2xl font-bold text-card-foreground">Welcome Back</h1>
                            <p className="mt-1 text-sm text-muted-foreground">Log in to continue studying</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="you@example.com"
                                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                            >
                                Log In
                            </button>
                        </form>
                        <p className="mt-6 text-center text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link to="/signup" className="font-medium text-primary hover:underline">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </PageLayout>
    );
}
