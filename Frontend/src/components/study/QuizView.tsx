import { useState } from "react";

interface QuizQuestion {
    question: string;
    options: string[];
    correct_ans: string;
}

interface QuizViewProps {
    data: { response: string };
}

export function QuizView({ data }: QuizViewProps) {
    const questions: QuizQuestion[] = JSON.parse(data.response);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState(false);

    const handleSelect = (qIndex: number, option: string) => {
        if (submitted) return;
        setAnswers((prev) => ({ ...prev, [qIndex]: option }));
    };

    const score = submitted
        ? questions.filter((q, i) => answers[i] === q.correct_ans).length
        : 0;

    const percentage = Math.round((score / questions.length) * 100);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1B253C]/5 text-[#1B253C]">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                    </div>
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">Assessment</span>
                        <span className="text-[10px] font-bold text-[#1B253C]">{questions.length} QUESTIONS</span>
                    </div>
                </div>
                {submitted && (
                    <div className="flex items-center gap-4 animate-fade-in-up">
                        <div className="text-right">
                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Final Score</span>
                            <span className="text-sm font-bold text-[#1B253C]">{score} / {questions.length}</span>
                        </div>
                        <div className="h-10 w-10 rounded-full border-4 border-slate-100 flex items-center justify-center text-[10px] font-bold text-[#1B253C]" style={{ background: `conic-gradient(#1B253C ${percentage}%, transparent 0)` }}>
                            <div className="h-7 w-7 rounded-full bg-white flex items-center justify-center">
                                {percentage}%
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-10">
                {questions.map((q, qi) => (
                    <div key={qi} className="group animate-fade-in-up" style={{ animationDelay: `${qi * 0.1}s` }}>
                        <div className="mb-4 flex items-start gap-4">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-50 text-[10px] font-bold text-slate-400">
                                {qi + 1}
                            </span>
                            <p className="text-base font-serif font-medium text-[#1B253C] leading-relaxed">
                                {q.question}
                            </p>
                        </div>
                        <div className="ml-10 grid gap-3">
                            {q.options.map((opt) => {
                                let style = "border-slate-100 bg-white text-slate-600 hover:border-[#1B253C]/20 hover:bg-slate-50";
                                let icon = null;

                                if (submitted) {
                                    if (opt === q.correct_ans) {
                                        style = "border-emerald-100 bg-emerald-50 text-emerald-700 font-bold";
                                        icon = <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>;
                                    } else if (answers[qi] === opt) {
                                        style = "border-rose-100 bg-rose-50 text-rose-700 font-bold";
                                        icon = <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>;
                                    } else {
                                        style = "border-slate-50 bg-white text-slate-300 opacity-50";
                                    }
                                } else if (answers[qi] === opt) {
                                    style = "border-[#1B253C] bg-[#1B253C] text-white shadow-lg shadow-slate-200";
                                }

                                return (
                                    <button
                                        key={opt}
                                        onClick={() => handleSelect(qi, opt)}
                                        disabled={submitted}
                                        className={`flex w-full items-center justify-between rounded-2xl border px-6 py-4 text-sm transition-all active:scale-[0.98] ${style}`}
                                    >
                                        <span className="flex-1 text-left">{opt}</span>
                                        {icon}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {!submitted && (
                <button
                    onClick={() => setSubmitted(true)}
                    disabled={Object.keys(answers).length < questions.length}
                    className="mt-6 w-full rounded-2xl bg-[#1B253C] py-5 text-sm font-bold text-white shadow-xl shadow-slate-200 transition-all hover:bg-black active:scale-95 disabled:opacity-20 disabled:hover:bg-[#1B253C]"
                >
                    Finish Assessment
                </button>
            )}

            {submitted && (
                <div className="mt-12 rounded-[32px] bg-slate-50 p-8 text-center border border-slate-100">
                    <h3 className="text-xl font-serif text-[#1B253C] mb-2">Quiz Completed!</h3>
                    <p className="text-sm text-slate-500 font-light mb-6">
                        {percentage === 100 ? "Perfect score! You've mastered this topic." : "Good effort! Review the incorrect answers to strengthen your knowledge."}
                    </p>
                    <button
                        onClick={() => { setAnswers({}); setSubmitted(false); }}
                        className="text-xs font-bold text-[#1B253C] uppercase tracking-widest hover:underline underline-offset-4"
                    >
                        Retake Quiz
                    </button>
                </div>
            )}
        </div>
    );
}
