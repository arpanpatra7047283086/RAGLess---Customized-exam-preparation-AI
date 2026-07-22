export function Hero() {
  return (
    <section className="bg-light py-32 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-block mb-8">
          <span className="badge">AI LEARNING</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-black mb-6 leading-tight">
          Customized Exam<br />Preparation AI
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
          From AI-powered study plans to personalized practice questions, start preparing smarter in seconds.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary text-lg">Get Started</button>
          <button className="btn-secondary text-lg">Learn More</button>
        </div>
      </div>
    </section>
  );
}
