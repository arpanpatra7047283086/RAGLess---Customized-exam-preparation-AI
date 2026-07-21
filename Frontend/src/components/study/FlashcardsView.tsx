import { useState } from "react";

interface FlashcardsViewProps {
    data: { response: string };
}

export function FlashcardsView({ data }: FlashcardsViewProps) {
    const cards: string[] = JSON.parse(data.response);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleDownload = () => {
        const content = cards.map((c, i) => `Card ${i + 1}:\n${c}`).join("\n\n---\n\n");
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "flashcards.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Flashcard {currentIndex + 1} of {cards.length}
                </span>
                <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download All
                </button>
            </div>
            <div className="rounded-lg border border-border bg-background p-4 min-h-[100px] flex items-center">
                <p className="leading-relaxed">{cards[currentIndex]}</p>
            </div>
            <div className="mt-3 flex items-center justify-between">
                <button
                    onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                    disabled={currentIndex === 0}
                    className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground disabled:opacity-40"
                >
                    ← Previous
                </button>
                <button
                    onClick={() => setCurrentIndex((i) => Math.min(cards.length - 1, i + 1))}
                    disabled={currentIndex === cards.length - 1}
                    className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground disabled:opacity-40"
                >
                    Next →
                </button>
            </div>
        </div>
    );
}
