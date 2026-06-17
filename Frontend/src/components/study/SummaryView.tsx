interface SummaryViewProps {
    data: { response: string };
}

export function SummaryView({ data }: SummaryViewProps) {
    const handleDownload = () => {
        const blob = new Blob([data.response], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "scholar-ai-summary.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(data.response);
        // Toast is handled in parent or could be added here if needed
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1B253C]/5 text-[#1B253C]">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">AI Summary Report</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={copyToClipboard}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-100 bg-white text-slate-500 transition-all hover:bg-slate-50 hover:text-[#1B253C] active:scale-95"
                        title="Copy to clipboard"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                    </button>
                    <button
                        onClick={handleDownload}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#1B253C] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-black active:scale-95"
                    >
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download PDF
                    </button>
                </div>
            </div>

            <div className="relative">
                <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-[#1B253C]/20 to-transparent rounded-full" />
                <p className="text-[15px] leading-[1.8] text-slate-700 font-medium whitespace-pre-wrap">
                    {data.response}
                </p>
            </div>

            <div className="mt-8 rounded-2xl bg-[#FBF8F1] p-6 border border-slate-100">
                <div className="flex items-start gap-4">
                    <div className="text-xl">💡</div>
                    <div>
                        <p className="text-xs font-bold text-[#1B253C] uppercase tracking-wider mb-1">Study Tip</p>
                        <p className="text-sm text-slate-500 leading-relaxed font-light">
                            Review this summary every 24 hours to maximize retention. Use the Conversation mode to ask for deeper explanations on points you find challenging.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
