import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { PageLayout } from "../components/PageLayout";
import { FlashcardsView } from "../components/study/FlashcardsView";
import { QuizView } from "../components/study/QuizView";
import { SummaryView } from "../components/study/SummaryView";
import { queryAgent } from "../utils/API_Calls";

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

const MODES: { id: Mode; label: string; icon: string }[] = [
    { id: "summary", label: "Summary", icon: "📝" },
    { id: "flashcards", label: "Flashcards", icon: "🃏" },
    { id: "quiz", label: "Quiz", icon: "❓" },
    { id: "chat", label: "Conversation", icon: "💬" },
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
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleSend = async () => {
        if (!input.trim() || !selectedSubject) return;

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
            console.error("Error fetching AI response:", error);
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
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-white via-gray-50 to-gray-100">
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
                .animate-scale-in {
                    animation: scaleIn 0.6s ease-out forwards;
                }
                .animate-slide-left {
                    animation: slideInLeft 0.6s ease-out forwards;
                }
            `}</style>
            
            <Header />
            <div className="flex flex-1 flex-col lg:flex-row">
                {/* Chat Area */}
                <main className="flex flex-1 flex-col">
                    {!selectedSubject ? (
                        <div className="flex flex-1 items-center justify-center px-4 py-12">
                            <div className="w-full max-w-6xl">
                                {/* Header Section */}
                                <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0s' }}>
                                    <h1 className="text-5xl sm:text-6xl font-black text-black mb-4">Welcome to Your Study Space</h1>
                                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Select a subject and choose your learning mode to begin mastering your exam topics with RAGLess AI</p>
                                </div>

                                {/* Subject Grid */}
                                <div className="mb-12">
                                    <h2 className={`text-2xl font-bold text-black mb-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>Choose a Subject</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                        {SUBJECTS.map((subject, idx) => (
                                            <button
                                                key={subject.name}
                                                onClick={() => setSelectedSubject(subject.name)}
                                                className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                                                style={{ animationDelay: `${0.15 + idx * 0.05}s` }}
                                            >
                                                {/* Gradient Background */}
                                                <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                                                
                                                {/* Content */}
                                                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                                                    <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{subject.icon}</div>
                                                    <p className="text-white font-bold text-center text-sm group-hover:text-lg transition-all">{subject.name}</p>
                                                </div>

                                                {/* Shine Effect */}
                                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Learning Modes Section */}
                                <div>
                                    <h2 className={`text-2xl font-bold text-black mb-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>Pick Your Learning Mode</h2>
                                    <div className="grid md:grid-cols-4 gap-4">
                                        {MODES.map((mode, idx) => (
                                            <button
                                                key={mode.id}
                                                onClick={() => setSelectedMode(mode.id)}
                                                className={`group relative p-6 rounded-xl border-2 border-gray-300 hover:border-black bg-white hover:bg-black transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                                                style={{ animationDelay: `${0.85 + idx * 0.1}s` }}
                                            >
                                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{mode.icon}</div>
                                                <p className="font-bold text-black group-hover:text-white transition-colors">{mode.label}</p>
                                                <p className="text-xs text-gray-600 group-hover:text-gray-300 transition-colors mt-2">
                                                    {mode.id === 'summary' && 'Get comprehensive overviews'}
                                                    {mode.id === 'flashcards' && 'Quick memory cards'}
                                                    {mode.id === 'quiz' && 'Test your knowledge'}
                                                    {mode.id === 'chat' && 'Interactive conversations'}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Chat header */}
                            <div className="border-b border-border bg-card px-6 py-3">
                                <h2 className="text-sm font-semibold text-foreground">{selectedSubject}</h2>
                                <p className="text-xs text-muted-foreground">Mode: {MODES.find((m) => m.id === selectedMode)?.label}</p>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                                {messages.length === 0 && (
                                    <div className="flex items-center justify-center py-12">
                                        <p className="text-sm text-muted-foreground">Send a message to start your {selectedMode} session on {selectedSubject}.</p>
                                    </div>
                                )}
                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                        <div className={`max-w-2xl rounded-xl px-4 py-3 text-sm ${msg.role === "user"
                                            ? "bg-chat-user text-primary-foreground"
                                            : "bg-chat-ai text-foreground border border-border"
                                            }`}>
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
                                    <div className="flex justify-start">
                                        <div className="flex items-center gap-1 rounded-xl bg-chat-ai px-4 py-3 border border-border">
                                            <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse-soft" />
                                            <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse-soft" style={{ animationDelay: "0.2s" }} />
                                            <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse-soft" style={{ animationDelay: "0.4s" }} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input */}
                            <div className="border-t border-border bg-card p-4">
                                <div className="mx-auto flex max-w-3xl gap-3">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                        placeholder={`Ask about ${selectedSubject}...`}
                                        className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!input.trim() || isLoading}
                                        className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                                    >
                                        {isLoading ? "Wait..." : "Send"}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
        </PageLayout>
    );
}
