
import { Linkedin, Github, Twitter, Facebook, Instagram, Mail } from 'lucide-react';
import {motion} from "framer-motion"
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
          className="sm:mx-auto sm:w-full sm:max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4 text-emerald-400">Shopsy.in</h3>
            <p className="text-sm text-gray-300">Welcome to your premier destination for luxury fashion. We curate the finest collection of clothing brands, perfumes, watches, and glasses to bring you an unparalleled shopping experience.</p>
          </motion.div>
          <motion.div
          className="sm:mx-auto sm:w-full sm:max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-emerald-400">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-emerald-400 transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-emerald-400 transition-colors">Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
            </ul>
          </motion.div>
          <motion.div
          className="sm:mx-auto sm:w-full sm:max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-emerald-400">Categories</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/category/t-shirts" className="hover:text-emerald-400 transition-colors">T-Shirts</Link></li>
              <li><Link to="/category/jeans" className="hover:text-emerald-400 transition-colors">Jeans</Link></li>
              <li><Link to="/category/suits" className="hover:text-emerald-400 transition-colors">Suits</Link></li>
              <li><Link to="/category/shirts" className="hover:text-emerald-400 transition-colors">Shirts</Link></li>
              <li><Link to="/category/perfumes" className="hover:text-emerald-400 transition-colors">Perfumes</Link></li>
            </ul>
          </motion.div>
          <motion.div
          className="sm:mx-auto sm:w-full sm:max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-emerald-400">Connect With Us</h4>
            <div className="flex space-x-4 mb-4 text-gray-300">
              <Link to="https://www.linkedin.com/in/iamrealsubh/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                <Linkedin size={24} />
              </Link>
              <Link to="https://github.com/Sumit-Saurabh98" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                <Github size={24} />
              </Link>
              <Link to="https://x.com/sumit_cpp" target='_blank' className="hover:text-emerald-400 transition-colors">
                <Twitter size={24} />
              </Link>
              <Link to="#" target='_blank' className="hover:text-emerald-400 transition-colors">
                <Facebook size={24} />
              </Link>
              <a href="https://instagram.com/iamrealsubh" target='_blank' className="hover:text-emerald-400 transition-colors">
                <Instagram size={24} />
              </a>
              <Link to="mailto:contact@sumitsaurabh.dev" target='_blank' className="hover:text-emerald-400 transition-colors">
                <Mail size={24} />
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="mt-8 pt-8 border-t border-emerald-700 text-center">
          <p className='text-gray-300'>&copy; 2024 Shopsy.in. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;