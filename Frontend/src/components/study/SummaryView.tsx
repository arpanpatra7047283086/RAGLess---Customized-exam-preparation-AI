interface SummaryViewProps {
    data: { response: string };
}

export function SummaryView({ data }: SummaryViewProps) {
    const handleDownload = () => {
        const blob = new Blob([data.response], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "summary.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Summary</span>
                <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download
                </button>
            </div>
            <p className="whitespace-pre-wrap leading-relaxed">{data.response}</p>
        </div>
    );
}
