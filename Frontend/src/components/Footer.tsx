export function Footer() {
    return (
        <footer className="border-t border-gray-300 bg-white py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="font-black text-lg mb-4 text-black">RAGLess AI</h3>
                        <p className="text-sm text-gray-600">Intelligent exam preparation powered by advanced AI technology.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm mb-4 text-black uppercase">Product</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-gray-600 hover:text-black transition">Features</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-black transition">Pricing</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-black transition">Security</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm mb-4 text-black uppercase">Company</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-gray-600 hover:text-black transition">About</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-black transition">Blog</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-black transition">Careers</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm mb-4 text-black uppercase">Legal</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-gray-600 hover:text-black transition">Privacy</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-black transition">Terms</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-black transition">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-gray-300 flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-sm text-gray-600">© 2026 RAGLess AI. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-600 hover:text-black transition text-sm">Privacy Policy</a>
                        <a href="#" className="text-gray-600 hover:text-black transition text-sm">Terms of Service</a>
                        <a href="#" className="text-gray-600 hover:text-black transition text-sm">Contact Us</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
