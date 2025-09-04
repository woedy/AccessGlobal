import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/assets/access_logo.jpg" 
                alt="Access Global Foundation Logo" 
                className="h-8 w-auto mr-3"
              />
              <span className="font-bold text-xl">Access Global Foundation</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Creating pathways to opportunity by breaking down barriers and promoting equitable access to tools that change lives.
            </p>
            <p className="text-warning-500 font-bold italic text-lg">Live, Love, Life.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-warning-500 transition-colors">About</Link></li>
              <li><Link href="/programs" className="text-gray-300 hover:text-warning-500 transition-colors">Programs</Link></li>
              <li><Link href="/get-involved" className="text-gray-300 hover:text-warning-500 transition-colors">Get Involved</Link></li>
              <li><Link href="/donate" className="text-gray-300 hover:text-warning-500 transition-colors">Donate</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-warning-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/donate" className="text-gray-300 hover:text-warning-500 transition-colors">Donate</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-warning-500 transition-colors">Contact</Link></li>
              <li><Link href="/get-involved" className="text-gray-300 hover:text-warning-500 transition-colors">Get Involved</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-warning-500 transition-colors" aria-label="Facebook">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="https://x.com/AccessGlobalFou" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-warning-500 transition-colors" aria-label="X (Twitter)">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="https://www.instagram.com/accessglobalfoundation/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-warning-500 transition-colors" aria-label="Instagram">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-warning-500 transition-colors" aria-label="LinkedIn">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="https://www.youtube.com/@AccessGlobalFoundation" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-warning-500 transition-colors" aria-label="YouTube">
                <i className="fab fa-youtube text-xl"></i>
              </a>
              <a href="https://www.tiktok.com/@accessglobalfoundation" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-warning-500 transition-colors" aria-label="TikTok">
                <i className="fab fa-tiktok text-xl"></i>
              </a>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 Access Global Foundation. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
