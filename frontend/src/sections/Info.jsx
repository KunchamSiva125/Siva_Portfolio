import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Shared/Card';
import SectionTitle from '../components/Shared/SectionTitle';
import { User, Briefcase, Award, Calendar, Mail, MapPin } from 'lucide-react';

const Info = ({ profile, experience }) => {
  const { 
    bio, 
    achievements, 
    email, 
    birthday, 
    location 
  } = profile || {};

  const achievementList = achievements ? achievements.split('\n').filter(a => a.trim()) : [
    'Winner of Global Hackathon 2023',
    'Top contributor to Open Source React Library',
    'Certified AWS Solution Architect'
  ];

  const defaultExp = [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      duration: '2022 - Present',
      description: 'Led the development of a large-scale enterprise application using React and Appwrite. Improved performance by 40% and reduced deployment time.'
    },
    {
      title: 'Software Developer',
      company: 'Innovate Solutions',
      duration: '2020 - 2022',
      description: 'Built and maintained multiple client-facing web applications. Specialized in front-end performance and responsive design.'
    }
  ];

  const displayExp = (experience && experience.length > 0) ? experience : defaultExp;

  return (
    <section id="info" className="section-padding bg-slate-950/50">
      <div className="max-w-7xl mx-auto">
        <SectionTitle 
          title="About Me" 
          subtitle="My journey, experiences, and what drives me to build great software."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="hover:border-blue-500/30">
              <div className="flex items-center gap-3 mb-4">
                <User className="text-blue-400" />
                <h3 className="text-2xl font-display">Biography</h3>
              </div>
              <p className="text-slate-400 leading-relaxed whitespace-pre-wrap">
                {bio || `I am a passionate software developer with a strong foundation in building modern web applications. 
                My focus is on creating clean, efficient, and user-friendly interfaces that solve real-world problems.
                I enjoy learning new technologies and pushing the boundaries of what's possible on the web.`}
              </p>
            </Card>

            <Card className="hover:border-purple-500/30">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="text-purple-400" />
                <h3 className="text-2xl font-display">Experience</h3>
              </div>
              <div className="space-y-6">
                {displayExp.map((exp, idx) => (
                  <div key={idx} className="border-l-2 border-slate-800 pl-6 relative">
                    <div className="absolute w-4 h-4 bg-purple-500 rounded-full -left-[9px] top-1 shadow-lg shadow-purple-500/50" />
                    <h4 className="text-lg font-bold text-white">{exp.title}</h4>
                    <p className="text-purple-400 text-sm mb-2">{exp.company} • {exp.duration}</p>
                    <p className="text-slate-400 text-sm whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Personal Details & Achievements */}
          <div className="space-y-8">
            <Card className="hover:border-cyan-500/30">
              <div className="flex items-center gap-3 mb-6">
                <Award className="text-cyan-400" />
                <h3 className="text-2xl font-display">Achievements</h3>
              </div>
              <ul className="space-y-4">
                {achievementList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 shrink-0" />
                    <p className="text-slate-400 text-sm">{item}</p>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800/50">
              <h3 className="text-xl font-display mb-6">Personal Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-slate-400">
                  <Mail size={18} className="text-purple-400" />
                  <span>{email || 'hello@example.com'}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                  <Calendar size={18} className="text-purple-400" />
                  <span>{birthday || 'May 10, 1998'}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                  <MapPin size={18} className="text-purple-400" />
                  <span>{location || 'New York, USA'}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
