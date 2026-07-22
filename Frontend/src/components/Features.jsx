export function Features() {
  const features = [
    {
      title: "Adaptive Learning",
      description: "AI learns your style and adapts study plans to maximize retention and understanding.",
      icon: "🎯"
    },
    {
      title: "Smart Quizzes",
      description: "Practice with questions that adjust difficulty based on your performance.",
      icon: "📝"
    },
    {
      title: "Performance Tracking",
      description: "Get detailed analytics showing your progress across all subjects and topics.",
      icon: "📊"
    },
    {
      title: "Multi-Format Support",
      description: "Learn through summaries, flashcards, quizzes, and conversational AI.",
      icon: "🔄"
    }
  ];

  return (
    <section className="bg-white py-20 px-6 border-t border-gray-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black tracking-tight text-center mb-16 uppercase">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="p-8 border-2 border-gray-300 rounded-xl hover:shadow-lg hover:border-green-400 transition-all duration-300">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="font-bold text-lg mb-3 text-black">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
