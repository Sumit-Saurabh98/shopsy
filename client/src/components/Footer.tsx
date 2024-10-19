
import { Linkedin, Github, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TechNestle</h3>
            <p className="text-sm">Empowering innovation through technology and expertise.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Portfolio</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Mobile Apps</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Cloud Solutions</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">AI & Machine Learning</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Cybersecurity</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="https://www.linkedin.com/in/sahanashre-v" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com/Sahanashre-V" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                <Github size={24} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-pink-400 transition-colors">
                <Instagram size={24} />
              </a>
            </div>
            <p className="text-sm">Subscribe to our newsletter:</p>
            <form className="mt-2 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-700 text-white px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2024 TechNestle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;