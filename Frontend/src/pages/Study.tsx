import { useState } from "react";
import { Header } from "../components/Header";
import { FlashcardsView } from "../components/study/FlashcardsView";
import { QuizView } from "../components/study/QuizView";
import { SummaryView } from "../components/study/SummaryView";
import { queryAgent } from "../utils/API_Calls";

const SUBJECTS = [
    "Mathematics", "Physics", "Chemistry", "Biology",
    "Computer Science", "Deep Learning", "Data Structures",
    "Operating Systems", "Database Systems", "Networking",
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
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <div className="flex flex-1 flex-col lg:flex-row">
                {/* Sidebar */}
                <aside className="w-full border-b border-border bg-card p-4 lg:w-72 lg:border-b-0 lg:border-r">
                    {/* Subject Selection */}
                    <div className="mb-6">
                        <label htmlFor="subject-select" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Subject</label>
                        <select
                            id="subject-select"
                            value={selectedSubject ?? ""}
                            onChange={(e) => setSelectedSubject(e.target.value || null)}
                            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
                        >
                            <option value="">Select a subject...</option>
                            {SUBJECTS.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>

                    {/* Mode Selection */}
                    <div>
                        <label htmlFor="mode-select" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Mode</label>
                        <select
                            id="mode-select"
                            value={selectedMode}
                            onChange={(e) => setSelectedMode(e.target.value as Mode)}
                            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
                        >
                            {MODES.map((m) => (
                                <option key={m.id} value={m.id}>{m.icon} {m.label}</option>
                            ))}
                        </select>
                    </div>
                </aside>

                {/* Chat Area */}
                <main className="flex flex-1 flex-col">
                    {!selectedSubject ? (
                        <div className="flex flex-1 items-center justify-center p-8">
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-3xl">📚</div>
                                <h2 className="text-xl font-semibold text-foreground">Select a Subject</h2>
                                <p className="mt-2 text-sm text-muted-foreground">Choose a subject from the sidebar to begin your study session.</p>
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
    );
}
