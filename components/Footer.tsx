import React from 'react';
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-ink text-paper pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-paper/10 pb-12">
          
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-display text-4xl mb-6">MSRU</h2>
            <p className="max-w-md text-paper/60 font-light leading-relaxed">
              MSRU defines "Digital Craftsmanship" as the relentless pursuit of pixel-perfect execution combined with robust backend architecture. Where oriental precision meets limitless innovation.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-gold">Navigation</h3>
            <ul className="space-y-2 text-paper/70">
              <li><a href="/work" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/journal" className="hover:text-white transition-colors">Journal</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-gold">Connect</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="hover:text-cinnabar transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-cinnabar transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-cinnabar transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-cinnabar transition-colors"><Github size={20} /></a>
            </div>
            <p className="text-sm text-paper/40">hello@msru.design</p>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-paper/30">
          <p>© 2024 MSRU Inc. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
             <span>ICP: 12345678</span>
             <a href="#" className="hover:text-paper">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;