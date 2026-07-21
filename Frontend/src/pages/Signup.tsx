import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "../components/Header";
import { register } from "../utils/API_Calls";
import { Toaster, toast } from "sonner";
import { useUserContext } from "../context/userContext";

export function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const { setUserEmail, setUserName, setUserId } = useUserContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        console.log(name, email, password);

        const result = await register({ name, email, password });
        if (result?.status === 201) {
            setUserEmail(result.data.email)
            setUserName(result.data.name)
            setUserId(result.data.id)

            toast.success("New User Created");
        } else {
            toast.success("User already Exists!");
        }
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-background">
            <Toaster />

            <Header />
            <div className="flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-md">
                    <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
                        <div className="mb-6 text-center">
                            <h1 className="text-2xl font-bold text-card-foreground">Create Account</h1>
                            <p className="mt-1 text-sm text-muted-foreground">Join StudyAI and start learning smarter</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-foreground">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="John Doe"
                                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>
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
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-foreground">Confirm Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                            >
                                Create Account
                            </button>
                        </form>
                        <p className="mt-6 text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link to="/login" className="font-medium text-primary hover:underline">Log in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
