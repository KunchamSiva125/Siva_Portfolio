import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, BookOpen, Star } from 'lucide-react';
import SectionTitle from '../components/Shared/SectionTitle';

const TimelineItem = ({ institution, degree, stream, cgpa, duration, index }) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={`relative flex items-center justify-between w-full mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
      }`}
  >
    {/* Middle Line dot */}
    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-slate-900 z-10 shadow-[0_0_15px_rgba(168,85,247,0.5)] hidden md:block" />

    <div className="w-full md:w-[45%]">
      <div className="glass-card group hover:border-purple-500/30 transition-all">
        <div className="flex items-center gap-2 text-purple-400 mb-2">
          <Calendar size={16} />
          <span className="text-sm font-medium">{duration}</span>
        </div>
        <h3 className="text-xl font-display font-bold text-white mb-1">{degree} in {stream}</h3>
        <p className="text-slate-300 font-medium mb-3 flex items-center gap-2">
          <BookOpen size={16} className="text-blue-400" />
          {institution}
        </p>
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-900/50 rounded-lg w-fit border border-slate-800">
          <Star size={14} className="text-amber-400 fill-amber-400" />
          <span className="text-sm text-slate-300">CGPA: {cgpa}</span>
        </div>
      </div>
    </div>
    <div className="hidden md:block md:w-[45%]" />
  </motion.div>
);

const Education = ({ education }) => {
  const displayEdu = (education && education.length > 0) ? education : [
    {
      institution: 'Tech University',
      degree: 'Master of Science',
      stream: 'Computer Science',
      cgpa: '3.9/4.0',
      duration: '2020 - 2022'
    },
    {
      institution: 'State Engineering College',
      degree: 'Bachelor of Technology',
      stream: 'Information Technology',
      cgpa: '8.5/10',
      duration: '2016 - 2020'
    },
  ];

  return (
    <section id="education" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Education"
          subtitle="My academic background and the foundation of my technical knowledge."
        />

        <div className="relative pt-8">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-transparent hidden md:block" />

          <div className="flex flex-col items-center">
            {displayEdu.map((edu, i) => (
              <TimelineItem key={i} {...edu} index={i} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <div className="p-6 glass rounded-2xl flex items-center gap-4 border-blue-500/20">
            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
              <GraduationCap size={32} />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Graduated with Honors</p>
              <p className="text-white font-bold">Class of 2027</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
