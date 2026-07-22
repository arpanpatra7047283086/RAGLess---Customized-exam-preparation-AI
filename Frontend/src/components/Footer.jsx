export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-bold text-lg mb-4">RAGLess</h3>
            <p className="text-gray-400 text-sm">Customized exam preparation with AI</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-green-400 transition">Features</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Pricing</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Security</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Updates</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-sm">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-green-400 transition">Documentation</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Blog</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Support</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Community</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-green-400 transition">About</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Careers</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Contact</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 RAGLess. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-green-400 transition text-sm">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition text-sm">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition text-sm">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
