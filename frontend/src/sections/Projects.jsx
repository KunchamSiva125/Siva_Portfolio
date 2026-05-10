import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Folder } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';
import Card from '../components/Shared/Card';
import SectionTitle from '../components/Shared/SectionTitle';

const Projects = ({ projects }) => {
  const displayProjects = (projects && projects.length > 0) ? projects : [
    {
      title: 'AI Portfolio Platform',
      description: 'A full-stack portfolio builder with AI-powered content generation and Appwrite backend.',
      imageURL: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      githubLink: '#',
      liveLink: '#',
      tags: 'React, Appwrite, OpenAI'
    },
    {
      title: 'E-Commerce Dashboard',
      description: 'Real-time analytics and inventory management system with beautiful data visualizations.',
      imageURL: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      githubLink: '#',
      liveLink: '#',
      tags: 'Next.js, Chart.js, Tailwind'
    },
    {
      title: 'TaskFlow Mobile App',
      description: 'Productivity app focused on team collaboration and agile project management.',
      imageURL: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
      githubLink: '#',
      liveLink: '#',
      tags: 'React Native, Firebase, Redux'
    }
  ];

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionTitle 
          title="Featured Projects" 
          subtitle="A selection of my recent work and personal experiments."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="group p-0 overflow-hidden hover:border-purple-500/50 transition-all duration-500 flex flex-col h-full">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={project.imageURL || 'https://via.placeholder.com/800x600?text=Project+Preview'} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                  
                  <div className="absolute top-4 right-4 flex gap-2 translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noreferrer" className="p-2 glass rounded-full text-white hover:bg-purple-500 transition-colors">
                        <Github size={18} />
                      </a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noreferrer" className="p-2 glass rounded-full text-white hover:bg-purple-500 transition-colors">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    {project.tags && project.tags.split(',').map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-purple-500/20 backdrop-blur-md border border-purple-500/30 text-purple-400 text-[10px] uppercase font-bold rounded">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3 text-slate-500">
                    <Folder size={16} />
                    <span className="text-xs uppercase tracking-widest font-bold">Project</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                    <a 
                      href={project.liveLink || '#'} 
                      className="text-white text-sm font-bold flex items-center gap-2 group/link"
                    >
                      View Details
                      <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
