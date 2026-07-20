import { useState } from "react";
import { Header } from "../components/Header";
import { FlashcardsView } from "../components/study/FlashcardsView";
import { QuizView } from "../components/study/QuizView";
import { SummaryView } from "../components/study/SummaryView";
import { queryAgent, QueryAgentResponse } from "../utils/API_Calls";

const SUBJECTS = [
    "Mathematics", "Physics", "Chemistry", "Biology",
    "Computer Science", "Deep Learning", "Data Structures",
    "Operating Systems", "Database Systems", "Networking",
];

type Mode = "summary" | "flashcards" | "quiz" | "chat";

const MODES: { id: Mode; label: string; icon: string; color: string }[] = [
    { id: "summary", label: "Summary", icon: "📝", color: "indigo" },
    { id: "flashcards", label: "Flashcards", icon: "🃏", color: "emerald" },
    { id: "quiz", label: "Quiz", icon: "❓", color: "amber" },
    { id: "chat", label: "Conversation", icon: "💬", color: "rose" },
];

interface Message {
    role: "user" | "ai";
    content: string;
    type: Mode;
    data?: QueryAgentResponse;
}

export function StudyPage() {
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [selectedMode, setSelectedMode] = useState<Mode>("chat");
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim() || !selectedSubject) return;

        // 1. Add User Message
        const userMsg: Message = { role: "user", content: input, type: selectedMode };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);
        
        try {
            // 2. Call Centralized API
            const result = await queryAgent({
                doc_id: selectedSubject,
                query: input,
                operation: selectedMode === "chat" ? "conversation" : selectedMode,
            });

            // 3. Handle AI Response
            if ("response" in result) {
                const aiMsg: Message = {
                    role: "ai",
                    content: result.response,
                    type: selectedMode,
                    data: result as QueryAgentResponse
                };
                setMessages((prev) => [...prev, aiMsg]);
            } else {
                console.error("API Error:", result);
            }
        } catch (error) {
            console.error("Network Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const activeModeColor = MODES.find(m => m.id === selectedMode)?.color || "indigo";

    const colorClasses: Record<string, string> = {
        indigo: "bg-indigo-600 shadow-indigo-100",
        emerald: "bg-emerald-600 shadow-emerald-100",
        amber: "bg-amber-600 shadow-amber-100",
        rose: "bg-rose-600 shadow-rose-100",
    };

    const textColors: Record<string, string> = {
        indigo: "text-indigo-600",
        emerald: "text-emerald-600",
        amber: "text-amber-600",
        rose: "text-rose-600",
    };

    return (
        <div className="flex h-screen flex-col bg-[#FBF8F1] mesh-indigo">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="hidden lg:flex w-80 flex-col border-r border-indigo-50 bg-white/50 backdrop-blur-xl">
                    <div className="p-8 space-y-8">
                        {/* Subject Selection */}
                        <div>
                            <label className="mb-3 block text-xs font-bold uppercase tracking-[0.1em] text-slate-400">Subject Area</label>
                            <div className="relative">
                                <select
                                    value={selectedSubject ?? ""}
                                    onChange={(e) => setSelectedSubject(e.target.value || null)}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-[#1B253C] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none cursor-pointer shadow-sm"
                                >
                                    <option value="">Choose a subject</option>
                                    {SUBJECTS.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        {/* Mode Selection */}
                        <div>
                            <label className="mb-4 block text-xs font-bold uppercase tracking-[0.1em] text-slate-400">Study Mode</label>
                            <div className="space-y-3">
                                {MODES.map((m) => (
                                    <button
                                        key={m.id}
                                        onClick={() => setSelectedMode(m.id)}
                                        className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
                                            selectedMode === m.id
                                            ? `${colorClasses[m.color]} text-white shadow-xl scale-105`
                                            : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{m.icon}</span>
                                            {m.label}
                                        </div>
                                        {selectedMode === m.id && (
                                            <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto p-8 border-t border-slate-100">
                        <div className="bg-indigo-50/50 rounded-[24px] p-6 text-center border border-indigo-100">
                            <p className="text-[10px] font-black text-indigo-400 mb-2 uppercase tracking-[0.2em]">Learning Level</p>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-2xl font-serif text-indigo-900">12</span>
                                <div className="h-4 w-px bg-indigo-200" />
                                <span className="text-xs font-bold text-indigo-600">Pro</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex flex-1 flex-col overflow-hidden relative">
                    {!selectedSubject ? (
                        <div className="flex flex-1 items-center justify-center p-12">
                            <div className="max-w-sm text-center">
                                <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-[40px] bg-white shadow-2xl shadow-indigo-100 text-5xl animate-float-slow">📚</div>
                                <h2 className="text-4xl font-serif text-[#1B253C] mb-4">Ready to learn?</h2>
                                <p className="text-slate-500 font-light leading-relaxed text-lg">Select a subject from the sidebar to activate your AI study companion.</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Chat Header */}
                            <div className="bg-white/60 backdrop-blur-md border-b border-indigo-50 px-8 py-5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-10 rounded-full ${colorClasses[activeModeColor].split(' ')[0]}`} />
                                    <div>
                                        <h2 className="text-xl font-serif text-[#1B253C] leading-none mb-1">{selectedSubject}</h2>
                                        <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${textColors[activeModeColor]}`}>
                                            {MODES.find((m) => m.id === selectedMode)?.label} Interactive
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setMessages([])}
                                    className="text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors uppercase tracking-widest"
                                >
                                    Clear Session
                                </button>
                            </div>

                            {/* Messages Container */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
                                {messages.length === 0 && (
                                    <div className="flex flex-col items-center justify-center h-full text-slate-300 gap-4">
                                        <div className="w-16 h-16 rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center text-2xl">✨</div>
                                        <p className="text-sm font-bold tracking-widest uppercase">Start the conversation</p>
                                    </div>
                                )}
                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}>
                                        <div className={`max-w-[85%] lg:max-w-[75%] rounded-[32px] p-8 text-sm leading-relaxed ${
                                            msg.role === "user"
                                            ? "bg-[#1B253C] text-white shadow-2xl shadow-indigo-900/10"
                                            : "bg-white text-[#1B253C] border border-slate-100 shadow-sm"
                                        }`}>
                                            {msg.role === "ai" && msg.type === "summary" ? (
                                                <SummaryView data={msg.data as QueryAgentResponse} />
                                            ) : msg.role === "ai" && msg.type === "flashcards" ? (
                                                <FlashcardsView data={msg.data as QueryAgentResponse} />
                                            ) : msg.role === "ai" && msg.type === "quiz" ? (
                                                <QuizView data={msg.data as QueryAgentResponse} />
                                            ) : (
                                                <p className="whitespace-pre-wrap font-medium text-lg leading-relaxed">{msg.content}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start animate-fade-in-up">
                                        <div className="bg-white rounded-[24px] px-8 py-5 border border-slate-50 shadow-sm">
                                            <div className="flex gap-2">
                                                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"></div>
                                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.15s]"></div>
                                                <div className="w-2 h-2 rounded-full bg-rose-400 animate-bounce [animation-delay:-0.3s]"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input Bar */}
                            <div className="p-10 bg-gradient-to-t from-[#FBF8F1] via-[#FBF8F1] to-transparent">
                                <div className="mx-auto max-w-4xl relative group">
                                    <div className="absolute inset-0 bg-indigo-500/10 rounded-[30px] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                        placeholder={`Ask anything about ${selectedSubject}...`}
                                        className="relative w-full rounded-[30px] border border-slate-200 bg-white px-10 py-6 text-base font-medium text-[#1B253C] shadow-2xl shadow-indigo-100/50 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all placeholder:text-slate-300"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!input.trim() || isLoading}
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-[22px] text-white transition-all hover:scale-105 active:scale-90 disabled:opacity-20 shadow-lg ${colorClasses[activeModeColor].split(' ')[0]}`}
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 12h14M12 5l7 7-7 7"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
