export function Footer() {
    return (
        <footer className="border-t border-slate-100 bg-white py-12">
            <div className="mx-auto max-w-7xl px-6 sm:px-10">
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-[#1B253C] rounded flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                            </svg>
                        </div>
                        <span className="text-sm font-bold tracking-tight text-[#1B253C]">Scholar AI</span>
                    </div>

                    <p className="text-sm text-slate-400 font-medium">© 2026 Scholar AI. Built for the future of learning.</p>

                    <div className="flex gap-8">
                        <span className="text-sm font-semibold text-slate-500 hover:text-[#1B253C] cursor-pointer transition-colors">Privacy</span>
                        <span className="text-sm font-semibold text-slate-500 hover:text-[#1B253C] cursor-pointer transition-colors">Terms</span>
                        <span className="text-sm font-semibold text-slate-500 hover:text-[#1B253C] cursor-pointer transition-colors">Contact</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
