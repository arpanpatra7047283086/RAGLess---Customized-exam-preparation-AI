export function Technology() {
  const techs = [
    "GPT-4", "Claude", "Llama", "Gemini", "Hugging Face", "vLLM",
    "RAG", "Vector DB", "FastAPI", "React", "Node.js", "PostgreSQL"
  ];

  return (
    <section className="bg-gray-900 text-white py-24 px-6 border-t-4 border-gray-700">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-6xl md:text-7xl font-black mb-6 uppercase tracking-tight">
          Next-Generation Platform
        </h2>
        <p className="text-center text-gray-300 mb-20 max-w-3xl mx-auto text-lg">
          Built on cutting-edge AI infrastructure with lightning-fast performance and enterprise-grade reliability.
        </p>
        
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-16">
          {techs.map((tech, idx) => (
            <div key={idx} className="p-3 bg-gray-800 rounded-lg border-2 border-green-400 text-center font-bold text-sm hover:bg-green-400 hover:text-black transition">
              {tech}
            </div>
          ))}
        </div>

        <div className="bg-gray-800 p-12 rounded-xl border-2 border-green-400 mb-8">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl">⚡</span>
            <h3 className="text-3xl font-black uppercase">Extreme Performance</h3>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-black text-green-400 mb-2">100%</div>
              <div className="text-xs md:text-sm text-gray-400 uppercase font-semibold">MORE PERFORMANCE</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-green-400 mb-2">&lt;250MS</div>
              <div className="text-xs md:text-sm text-gray-400 uppercase font-semibold">COLD START TIME</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-green-400 mb-2">10+</div>
              <div className="text-xs md:text-sm text-gray-400 uppercase font-semibold">DATACENTERS</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-green-400 mb-2">100K</div>
              <div className="text-xs md:text-sm text-gray-400 uppercase font-semibold">DEVELOPERS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
