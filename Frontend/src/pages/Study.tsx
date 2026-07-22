import { useState, useEffect, useRef } from "react";
import { Header } from "../components/Header";
import { PageLayout } from "../components/PageLayout";
import { FlashcardsView } from "../components/study/FlashcardsView";
import { QuizView } from "../components/study/QuizView";
import { SummaryView } from "../components/study/SummaryView";
import { queryAgent } from "../utils/API_Calls";
import { Toaster, toast } from "sonner";

const SUBJECTS = [
    { name: "Mathematics", icon: "🧮", color: "from-blue-500 to-blue-600" },
    { name: "Physics", icon: "⚛️", color: "from-purple-500 to-purple-600" },
    { name: "Chemistry", icon: "🧪", color: "from-pink-500 to-pink-600" },
    { name: "Biology", icon: "🔬", color: "from-green-500 to-green-600" },
    { name: "Computer Science", icon: "💻", color: "from-indigo-500 to-indigo-600" },
    { name: "Deep Learning", icon: "🤖", color: "from-orange-500 to-orange-600" },
    { name: "Data Structures", icon: "📊", color: "from-cyan-500 to-cyan-600" },
    { name: "Operating Systems", icon: "⚙️", color: "from-red-500 to-red-600" },
    { name: "Database Systems", icon: "🗄️", color: "from-amber-500 to-amber-600" },
    { name: "Networking", icon: "🌐", color: "from-teal-500 to-teal-600" },
];

type Mode = "summary" | "flashcards" | "quiz" | "chat";

const MODES: { id: Mode; label: string; icon: string; desc: string }[] = [
    { id: "chat", label: "Conversation", icon: "💬", desc: "Interactive AI Tutoring" },
    { id: "summary", label: "Summary", icon: "📝", desc: "Concise Study Notes" },
    { id: "flashcards", label: "Flashcards", icon: "🃏", desc: "Memory Reinforcement" },
    { id: "quiz", label: "Quiz", icon: "❓", desc: "Knowledge Assessment" },
];

interface Message {
    role: "user" | "ai";
    content: string;
    type: Mode;
    data?: any;
}

export function StudyPage() {
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [selectedMode, setSelectedMode] = useState<Mode>("chat");
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim()) return;
        if (!selectedSubject) {
            toast.error("Please select a subject first.");
            return;
        }

        const currentInput = input;
        const userMsg: Message = { role: "user", content: currentInput, type: selectedMode };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const result = await queryAgent({
                doc_id: selectedSubject,
                query: currentInput,
                operation: selectedMode === "chat" ? "conversation" : selectedMode,
            });

            const aiMsg: Message = {
                role: "ai",
                content: result.response || "No response generated.",
                type: selectedMode,
                data: result
            };
            setMessages((prev) => [...prev, aiMsg]);
        } catch (error) {
            toast.error("AI connection failed. Please try again.");
            const aiMsg: Message = {
                role: "ai",
                content: "Sorry, I encountered an error while connecting to the AI assistant.",
                type: selectedMode,
            };
            setMessages((prev) => [...prev, aiMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageLayout>
            <Toaster position="top-center" richColors />
            
            <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden bg-background">
                {/* Mobile Header Toggle (Only visible when subject is selected) */}
                {selectedSubject && (
                    <div className="flex lg:hidden items-center justify-between border-b border-border bg-card px-4 py-3">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">{SUBJECTS.find(s => s.name === selectedSubject)?.icon}</span>
                            <div>
                                <h2 className="text-sm font-bold text-foreground leading-tight">{selectedSubject}</h2>
                                <p className="text-[10px] text-primary font-bold uppercase tracking-wider">{selectedMode} Mode</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground"
                        >
                            Change Mode
                        </button>
                    </div>
                )}

                {/* Sidebar Drawer */}
                <aside className={`
                    fixed inset-y-0 left-0 z-[60] w-72 bg-card border-r border-border transform transition-transform duration-300 lg:relative lg:translate-x-0
                    ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
                    ${!selectedSubject ? 'hidden lg:flex' : 'flex'}
                `}>
                    <div className="flex flex-col h-full w-full">
                        <div className="p-6 border-b border-border flex items-center justify-between lg:justify-start lg:gap-3">
                            <h2 className="text-lg font-black tracking-tight">STUDY DASHBOARD</h2>
                            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-muted-foreground">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-8">
                            {/* Subject Picker */}
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4 block">Select Subject</label>
                                <div className="space-y-1">
                                    {SUBJECTS.map((s) => (
                                        <button
                                            key={s.name}
                                            onClick={() => { setSelectedSubject(s.name); setIsSidebarOpen(false); }}
                                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                                                selectedSubject === s.name
                                                ? "bg-primary/10 text-primary font-bold ring-1 ring-primary/20"
                                                : "hover:bg-accent text-muted-foreground font-medium"
                                            }`}
                                        >
                                            <span className="text-lg">{s.icon}</span>
                                            {s.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Mode Picker */}
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4 block">Learning Mode</label>
                                <div className="grid grid-cols-1 gap-2">
                                    {MODES.map((m) => (
                                        <button
                                            key={m.id}
                                            onClick={() => { setSelectedMode(m.id); setIsSidebarOpen(false); }}
                                            className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                                                selectedMode === m.id
                                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                                : "bg-background border border-border hover:border-primary/50 text-muted-foreground"
                                            }`}
                                        >
                                            <span className="text-xl">{m.icon}</span>
                                            <div>
                                                <p className="text-sm font-bold leading-tight">{m.label}</p>
                                                <p className={`text-[10px] ${selectedMode === m.id ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{m.desc}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Overlay for mobile sidebar */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col relative">
                    {!selectedSubject ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                            <div className="max-w-2xl animate-in fade-in zoom-in duration-500">
                                <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 text-5xl animate-bounce-slow">
                                    🚀
                                </div>
                                <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-4 leading-tight">
                                    Ready to Level Up Your Grades?
                                </h1>
                                <p className="text-lg text-muted-foreground mb-12 max-w-lg mx-auto leading-relaxed">
                                    Select a subject from the sidebar to begin your personalized AI study session.
                                </p>

                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="lg:hidden w-full max-w-xs rounded-2xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    Browse Subjects
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Chat Header (Desktop) */}
                            <div className="hidden lg:flex items-center justify-between border-b border-border bg-card px-8 py-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-xl">{SUBJECTS.find(s => s.name === selectedSubject)?.icon}</span>
                                        <h2 className="text-lg font-black text-foreground">{selectedSubject}</h2>
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                                        {MODES.find(m => m.id === selectedMode)?.label} Session
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="flex h-2 w-2 rounded-full bg-success animate-pulse"></span>
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">AI Online</span>
                                </div>
                            </div>

                            {/* Chat Messages */}
                            <div
                                ref={scrollRef}
                                className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 space-y-6 scroll-smooth"
                            >
                                {messages.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
                                        <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center text-2xl mb-4">✨</div>
                                        <p className="text-sm font-medium text-muted-foreground max-w-xs italic leading-relaxed">
                                            Ask me anything about {selectedSubject}, or use the modes to generate customized study materials.
                                        </p>
                                    </div>
                                )}

                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                                    >
                                        <div className={`
                                            relative max-w-[90%] sm:max-w-2xl rounded-2xl px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base leading-relaxed
                                            ${msg.role === "user"
                                                ? "bg-primary text-primary-foreground rounded-tr-none shadow-md shadow-primary/10"
                                                : "bg-card text-foreground border border-border rounded-tl-none shadow-sm"
                                            }
                                        `}>
                                            {msg.role === "ai" && msg.type === "summary" ? (
                                                <SummaryView data={msg.data} />
                                            ) : msg.role === "ai" && msg.type === "flashcards" ? (
                                                <FlashcardsView data={msg.data} />
                                            ) : msg.role === "ai" && msg.type === "quiz" ? (
                                                <QuizView data={msg.data} />
                                            ) : (
                                                <p className="whitespace-pre-wrap">{msg.content}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex justify-start animate-in fade-in duration-300">
                                        <div className="flex items-center gap-3 rounded-2xl bg-card px-5 py-4 border border-border shadow-sm">
                                            <div className="flex space-x-1">
                                                <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                                <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                                <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">AI Thinking</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Chat Input */}
                            <div className="p-4 sm:p-6 lg:p-8 border-t border-border bg-background/80 backdrop-blur-lg">
                                <div className="mx-auto max-w-4xl relative">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                        placeholder={`Ask anything about ${selectedSubject}...`}
                                        className="w-full rounded-2xl border border-input bg-card pl-5 pr-14 py-4 text-sm sm:text-base shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/60"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!input.trim() || isLoading}
                                        className="absolute right-2 top-2 h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.05] active:scale-[0.95] disabled:opacity-50 disabled:hover:scale-100"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                                            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </PageLayout>
    );
}
