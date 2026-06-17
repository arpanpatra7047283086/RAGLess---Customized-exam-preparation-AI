interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay?: string;
}

export function FeatureCard({ icon, title, description, delay = "0s" }: FeatureCardProps) {
    return (
        <div
            className="animate-fade-in-up group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/30"
            style={{ animationDelay: delay }}
        >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                {icon}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-card-foreground">{title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
    );
}
