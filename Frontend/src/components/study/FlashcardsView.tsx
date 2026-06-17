import { useState } from "react";

interface FlashcardsViewProps {
    data: { response: string };
}

export function FlashcardsView({ data }: FlashcardsViewProps) {
    const cards: string[] = JSON.parse(data.response);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleDownload = () => {
        const content = cards.map((c, i) => `Card ${i + 1}:\n${c}`).join("\n\n---\n\n");
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "scholar-ai-flashcards.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    const nextCard = () => {
        if (currentIndex < cards.length - 1) {
            setIsFlipped(false);
            setTimeout(() => setCurrentIndex(currentIndex + 1), 150);
        }
    };

    const prevCard = () => {
        if (currentIndex > 0) {
            setIsFlipped(false);
            setTimeout(() => setCurrentIndex(currentIndex - 1), 150);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1B253C]/5 text-[#1B253C]">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">Reviewing Deck</span>
                        <span className="text-[10px] font-bold text-[#1B253C]">CARD {currentIndex + 1} OF {cards.length}</span>
                    </div>
                </div>
                <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600 transition-all hover:bg-slate-50 hover:text-[#1B253C] active:scale-95"
                >
                    Export Deck
                </button>
            </div>

            {/* Flashcard Component */}
            <div
                className="perspective-1000 group cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div className={`relative h-64 w-full transition-all duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden rounded-[32px] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center justify-center p-10 text-center">
                        <span className="absolute top-6 left-6 text-[10px] font-bold text-slate-300 uppercase tracking-widest">Question</span>
                        <p className="text-lg font-serif text-[#1B253C] leading-relaxed">
                            {cards[currentIndex].split('?')[0]}?
                        </p>
                        <div className="mt-8 flex items-center gap-2 text-[10px] font-bold text-[#1B253C]/40 uppercase tracking-widest">
                            <span>Tap to reveal answer</span>
                            <svg className="w-3 h-3 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[32px] bg-[#1B253C] p-10 flex flex-col items-center justify-center text-center text-white shadow-2xl">
                        <span className="absolute top-6 left-6 text-[10px] font-bold text-white/30 uppercase tracking-widest">Core Concept</span>
                        <p className="text-base font-medium leading-relaxed">
                            {cards[currentIndex].includes('?') ? cards[currentIndex].split('?')[1] : cards[currentIndex]}
                        </p>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6">
                <button
                    onClick={(e) => { e.stopPropagation(); prevCard(); }}
                    disabled={currentIndex === 0}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-400 transition-all hover:border-[#1B253C] hover:text-[#1B253C] active:scale-90 disabled:opacity-20 disabled:hover:border-slate-200"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
                </button>

                <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#1B253C] transition-all duration-500"
                        style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
                    />
                </div>

                <button
                    onClick={(e) => { e.stopPropagation(); nextCard(); }}
                    disabled={currentIndex === cards.length - 1}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-400 transition-all hover:border-[#1B253C] hover:text-[#1B253C] active:scale-90 disabled:opacity-20 disabled:hover:border-slate-200"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>
        </div>
    );
}
