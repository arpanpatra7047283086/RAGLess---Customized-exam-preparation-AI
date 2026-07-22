export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-light border-b-2 border-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="text-2xl font-black tracking-tighter">RAGLess</div>
        <nav className="hidden lg:flex gap-12">
          <a href="#" className="text-xs font-bold tracking-wider uppercase hover:text-green-400 transition">PRICING</a>
          <a href="#" className="text-xs font-bold tracking-wider uppercase hover:text-green-400 transition">DOCS</a>
          <a href="#" className="text-xs font-bold tracking-wider uppercase hover:text-green-400 transition">BLOG</a>
          <a href="#" className="text-xs font-bold tracking-wider uppercase hover:text-green-400 transition">TUTORIALS</a>
          <a href="#" className="text-xs font-bold tracking-wider uppercase hover:text-green-400 transition">CHANGELOG</a>
        </nav>
        <div className="flex gap-4">
          <button className="hidden md:block text-xs font-bold tracking-wider uppercase hover:text-green-400 transition">LOGIN</button>
          <button className="btn-primary">SIGN UP</button>
        </div>
      </div>
    </header>
  );
}
