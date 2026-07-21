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

    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quiz</span>
                {submitted && (
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        Score: {score}/{questions.length}
                    </span>
                )}
            </div>
            <div className="space-y-5">
                {questions.map((q, qi) => (
                    <div key={qi}>
                        <p className="mb-2 font-medium">{qi + 1}. {q.question}</p>
                        <div className="space-y-1.5">
                            {q.options.map((opt) => {
                                let optionStyle = "border-border bg-background text-foreground hover:bg-muted";
                                if (submitted) {
                                    if (opt === q.correct_ans) {
                                        optionStyle = "border-success bg-success/10 text-success-foreground";
                                    } else if (answers[qi] === opt && opt !== q.correct_ans) {
                                        optionStyle = "border-destructive bg-destructive/10 text-destructive";
                                    }
                                } else if (answers[qi] === opt) {
                                    optionStyle = "border-primary bg-primary/10 text-foreground";
                                }
                                return (
                                    <button
                                        key={opt}
                                        onClick={() => handleSelect(qi, opt)}
                                        className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ${optionStyle}`}
                                    >
                                        {opt}
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
                    className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                    Submit Quiz
                </button>
            )}
        </div>
    );
}
