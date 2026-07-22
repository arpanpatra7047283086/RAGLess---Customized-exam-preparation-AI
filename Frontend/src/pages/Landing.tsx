import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function LandingPage() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleGetStarted = () => {
        navigate("/study");
    };

    return (
        <div className="w-full bg-white">
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
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
                .animate-slide-left {
                    animation: slideInLeft 0.8s ease-out forwards;
                }
                .animate-slide-right {
                    animation: slideInRight 0.8s ease-out forwards;
                }
                .animate-pulse-slow {
                    animation: pulse 3s ease-in-out infinite;
                }
            `}</style>

            <Header />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-[#f5f3f0] via-[#f5f3f0] to-[#ede9e4] px-4 py-20 sm:py-32 overflow-hidden">
                <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" style={{ background: 'transparent' }}>
                    {[...Array(12)].map((_, i) => (
                        <line key={`h${i}`} x1="0" y1={`${(i * 100 / 11)}%`} x2="100%" y2={`${(i * 100 / 11)}%`} stroke="#d0cccc" strokeWidth="1" />
                    ))}
                    {[...Array(12)].map((_, i) => (
                        <line key={`v${i}`} x1={`${(i * 100 / 11)}%`} y1="0" x2={`${(i * 100 / 11)}%`} y2="100%" stroke="#d0cccc" strokeWidth="1" />
                    ))}
                    {[
                        { x: '20%', y: '30%' }, { x: '80%', y: '30%' }, { x: '20%', y: '70%' }, { x: '80%', y: '70%' },
                        { x: '50%', y: '15%' }, { x: '50%', y: '85%' }
                    ].map((pos, i) => (
                        <circle key={`node${i}`} cx={pos.x} cy={pos.y} r="6" fill="none" stroke="#d0cccc" strokeWidth="2" opacity="0.6" />
                    ))}
                </svg>

                <div className="relative max-w-6xl mx-auto text-center">
                    <h1 className={`text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-black mb-8 leading-tight ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
                        INTELLIGENT EXAM<br />PREPARATION<br />POWERED BY AI
                    </h1>
                    
                    <p className={`text-lg sm:text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed font-medium ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                        Personalized study plans, adaptive learning paths, and intelligent practice questions tailored to your exam goals - all powered by cutting-edge AI technology
                    </p>
                    
                    <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
                        <button 
                            onClick={handleGetStarted}
                            className="inline-flex h-12 items-center justify-center rounded-lg bg-black text-white px-12 text-sm font-bold shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all uppercase tracking-wider hover:scale-105 active:scale-95"
                        >
                            GET STARTED
                        </button>
                        <button className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-black text-black px-12 text-sm font-bold hover:bg-black hover:text-white transition-all uppercase tracking-wider hover:scale-105 active:scale-95">
                            LEARN MORE
                        </button>
                    </div>

                    <div className="absolute top-1/4 left-12 w-24 h-24 bg-gray-600 rounded-lg opacity-20 animate-pulse-slow"></div>
                    <div className="absolute bottom-1/4 right-12 w-32 h-20 bg-gray-600 rounded-lg opacity-20 animate-pulse-slow"></div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white px-4 py-20 sm:py-32 border-t border-gray-300">
                <div className="max-w-6xl mx-auto">
                    <h2 className={`text-5xl sm:text-6xl font-black tracking-tight text-center mb-16 text-black uppercase ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                        Why Choose RAGLess?
                    </h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: "🤖", title: "AI-Powered Learning", desc: "Adaptive algorithms learn your style and optimize your study path" },
                            { icon: "📊", title: "Performance Analytics", desc: "Track progress with detailed insights and personalized recommendations" },
                            { icon: "🎯", title: "Smart Quizzes", desc: "Questions adjust difficulty based on your mastery level" },
                            { icon: "⚡", title: "Fast Results", desc: "Prepare efficiently with intelligent study prioritization" },
                        ].map((feature, idx) => (
                            <div 
                                key={idx} 
                                className={`p-8 border-2 border-gray-300 rounded-xl hover:shadow-lg hover:border-green-400 transition-all duration-300 hover:scale-105 cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                                style={{ animationDelay: `${0.5 + idx * 0.1}s` }}
                            >
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="font-bold text-lg mb-3 text-black">{feature.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technology Section */}
            <section className="px-4 py-24 sm:py-32 bg-gray-900 text-white border-t-4 border-gray-700">
                <div className="max-w-6xl mx-auto">
                    <h2 className={`text-6xl sm:text-7xl font-black mb-6 uppercase tracking-tight text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.9s' }}>
                        Advanced Technology Stack
                    </h2>
                    <p className={`text-center text-gray-300 mb-20 max-w-3xl mx-auto text-lg ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
                        Built with enterprise-grade AI infrastructure and cloud technologies for reliability and performance.
                    </p>
                    
                    <div className={`grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '1.1s' }}>
                        {["GPT-4", "Claude", "Llama", "Gemini", "RAG", "Vector DB"].map((tech) => (
                            <div key={tech} className="p-3 bg-gray-800 rounded-lg border-2 border-green-400 text-center font-bold text-sm hover:bg-green-400 hover:text-black transition hover:scale-110 cursor-pointer">
                                {tech}
                            </div>
                        ))}
                    </div>

                    <div className={`bg-gray-800 p-12 rounded-xl border-2 border-green-400 mb-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '1.2s' }}>
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-4xl">⚡</span>
                            <h3 className="text-3xl font-black uppercase">Peak Performance</h3>
                        </div>
                        <div className="grid md:grid-cols-4 gap-8 text-center">
                            {[
                                { metric: "99.9%", label: "UPTIME SLA" },
                                { metric: "<500MS", label: "RESPONSE TIME" },
                                { metric: "50K+", label: "QUESTIONS" },
                                { metric: "100K+", label: "STUDENTS" },
                            ].map((stat, idx) => (
                                <div key={idx}>
                                    <div className="text-4xl md:text-5xl font-black text-green-400 mb-2">{stat.metric}</div>
                                    <div className="text-xs md:text-sm text-gray-400 uppercase font-semibold">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 py-24 sm:py-32 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className={`text-5xl sm:text-6xl font-black tracking-tight mb-6 text-black uppercase ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '1.3s' }}>
                        Ready to Ace Your Exams?
                    </h2>
                    <p className={`text-lg text-gray-700 mb-12 max-w-2xl mx-auto ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '1.4s' }}>
                        Join thousands of students already mastering their subjects with RAGLess AI. Start your free trial today.
                    </p>
                    <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '1.5s' }}>
                        <button 
                            onClick={handleGetStarted}
                            className="inline-flex h-12 items-center justify-center rounded-lg bg-green-400 text-black px-8 text-sm font-bold shadow-lg hover:shadow-xl hover:bg-green-500 transition-all uppercase tracking-wider hover:scale-105 active:scale-95"
                        >
                            Start Free Trial
                        </button>
                        <button className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-green-400 px-8 text-sm font-bold text-green-400 hover:bg-green-400 hover:text-black transition-all uppercase tracking-wider hover:scale-105 active:scale-95">
                            View Pricing
                        </button>
                    </div>
                    <p className={`text-sm text-gray-600 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '1.6s' }}>No credit card required. Full access for 14 days.</p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
