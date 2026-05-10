import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Mail, Download, ArrowDown } from 'lucide-react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Button from '../components/Shared/Button';

const Hero = ({ profile }) => {
  const { name, title, bio, profileImage, resumeURL, socialLinks } = profile || {};

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center section-padding relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full" />

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-slate-900 shadow-2xl">
            <img
              src={profileImage || 'https://via.placeholder.com/400x400?text=Profile'}
              alt={name || 'User'}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </motion.div>

        <div className="text-center md:text-left flex-1">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-purple-400 font-display font-semibold mb-2 tracking-widest uppercase"
          >
            Welcome to my world
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-extrabold mb-4"
          >
            Hi, I'm <span className="text-gradient">{name || 'John Doe'}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl text-slate-300 font-medium mb-6"
          >
            I am a{' '}
            <span className="text-purple-500">
              <Typewriter
                words={title ? [title, ...['Full Stack Developer', 'Cloud Engineer', 'Problem Solver'].filter(w => w !== title)] : ['Full Stack Developer', 'UI/UX Designer', 'Tech Enthusiast']}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-lg mb-8 max-w-xl"
          >
            {bio || 'Passionate about building scalable web applications and creating seamless user experiences. Specializing in modern technologies like React, Node.js, and Appwrite.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center md:justify-start"
          >
            {resumeURL && (
              <Button className="flex items-center gap-2" onClick={() => window.open(resumeURL, '_blank')}>
                Download CV <Download size={20} />
              </Button>
            )}
            <div className="flex gap-4 items-center px-4">
              {socialLinks && (
                <>
                  {(() => {
                    const links = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;
                    return (
                      <>
                        {links.github && <a href={links.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><FaGithub size={24} /></a>}
                        {links.linkedin && <a href={links.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><FaLinkedin size={24} /></a>}
                        {links.twitter && <a href={links.twitter} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><FaTwitter size={24} /></a>}
                      </>
                    );
                  })()}
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 cursor-pointer"
        onClick={() => document.getElementById('info').scrollIntoView({ behavior: 'smooth' })}
      >
        <ArrowDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;
