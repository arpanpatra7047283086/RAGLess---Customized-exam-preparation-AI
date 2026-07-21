import { useState } from "react";
import { Header } from "../components/Header";

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
            <div className="min-h-screen bg-background">
                <Header />
                <div className="flex items-center justify-center px-4 py-16">
                    <div className="w-full max-w-sm">
                        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
                            <div className="mb-6 text-center">
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-xl">🔒</div>
                                <h1 className="text-xl font-bold text-card-foreground">Admin Access</h1>
                                <p className="mt-1 text-sm text-muted-foreground">Enter password to continue</p>
                            </div>
                            <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                <div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                                        placeholder="Enter admin password"
                                        className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                    />
                                    {passwordError && <p className="mt-1.5 text-xs text-destructive">{passwordError}</p>}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                                >
                                    Unlock
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="mx-auto max-w-3xl px-4 py-10">
                <h1 className="mb-1 text-2xl font-bold text-foreground">Admin Panel</h1>
                <p className="mb-8 text-sm text-muted-foreground">Add study materials by providing a name and Google Drive link.</p>

                {successMsg && (
                    <div className="mb-6 rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm font-medium text-success">
                        {successMsg}
                    </div>
                )}

                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Material Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g., Deep Learning Notes"
                                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            {formErrors.name && <p className="mt-1.5 text-xs text-destructive">{formErrors.name}</p>}
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-foreground">Google Drive Link</label>
                            <input
                                type="url"
                                value={driveLink}
                                onChange={(e) => setDriveLink(e.target.value)}
                                placeholder="https://drive.google.com/..."
                                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            {formErrors.driveLink && <p className="mt-1.5 text-xs text-destructive">{formErrors.driveLink}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            Submit Material
                        </button>
                    </form>
                </div>

                {/* Submissions list */}
                {submissions.length > 0 && (
                    <div className="mt-8">
                        <h2 className="mb-4 text-lg font-semibold text-foreground">Submitted Materials</h2>
                        <div className="space-y-3">
                            {submissions.map((s, i) => (
                                <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
                                    <div>
                                        <p className="text-sm font-medium text-card-foreground">{s.name}</p>
                                        <p className="text-xs text-muted-foreground truncate max-w-md">{s.driveLink}</p>
                                    </div>
                                    <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">Added</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
