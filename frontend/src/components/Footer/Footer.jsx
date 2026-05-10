import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ChevronUp } from 'lucide-react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = ({ profile }) => {
  const { name, socialLinks, email } = profile || {};
  const links = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks || {};

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="glass mt-20 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h3 className="text-2xl font-display font-bold text-gradient mb-2">{name ? name.toUpperCase() : 'PORTFOLIO'}</h3>
          <p className="text-slate-400">Building digital experiences that matter.</p>
          <a href="/admin/login" className="text-xs text-slate-600 hover:text-purple-500 mt-4 inline-block transition-colors italic">Admin Login</a>
        </div>

        <div className="flex gap-6">
          {links.github && <a href={links.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-purple-400 transition-colors"><FaGithub size={24} /></a>}
          {links.twitter && <a href={links.twitter} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-purple-400 transition-colors"><FaTwitter size={24} /></a>}
          {links.linkedin && <a href={links.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-purple-400 transition-colors"><FaLinkedin size={24} /></a>}
          {email && <a href={`mailto:${email}`} className="text-slate-400 hover:text-purple-400 transition-colors"><Mail size={24} /></a>}
        </div>

        <div className="text-center md:text-right text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {name || 'Modern Portfolio'}. All rights reserved.</p>

        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-4 glass rounded-full text-purple-500 shadow-2xl z-40 border-purple-500/30"
      >
        <ChevronUp size={24} />
      </motion.button>
    </footer>
  );
};

export default Footer;
