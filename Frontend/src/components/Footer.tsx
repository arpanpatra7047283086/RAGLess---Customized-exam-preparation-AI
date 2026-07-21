export function Footer() {
    return (
        <footer className="border-t border-border bg-card py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-sm text-muted-foreground">© 2026 StudyAI. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Privacy</span>
                        <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Terms</span>
                        <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Contact</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
