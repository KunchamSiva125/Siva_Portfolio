import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Shared/Card';
import SectionTitle from '../components/Shared/SectionTitle';
import { Database, Layout, Server, Cpu, Wrench } from 'lucide-react';

const SkillBar = ({ name, percentage, delay }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-2">
      <span className="text-slate-300 font-medium">{name}</span>
      <span className="text-purple-400">{percentage}%</span>
    </div>
    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay }}
        className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
      />
    </div>
  </div>
);

const Skills = ({ skills }) => {
  const categories = [
    { name: 'Frontend', icon: <Layout className="text-blue-400" />, key: 'Frontend' },
    { name: 'Backend', icon: <Server className="text-purple-400" />, key: 'Backend' },
    { name: 'Database', icon: <Database className="text-cyan-400" />, key: 'Database' },
    { name: 'AI/ML', icon: <Cpu className="text-emerald-400" />, key: 'AI/ML' },
    { name: 'Tools', icon: <Wrench className="text-amber-400" />, key: 'Tools' },
    { name: 'Technical Skills', icon: <Wrench className="text-amber-400" />, key: 'Technical Skills' },
  ];

  // Default skills if none provided or empty
  const displaySkills = (skills && skills.length > 0) ? skills : [
    { skillName: 'React.js', category: 'Frontend', percentage: 95 },
    { skillName: 'Tailwind CSS', category: 'Frontend', percentage: 90 },
    { skillName: 'Node.js', category: 'Backend', percentage: 85 },
    { skillName: 'Python', category: 'Backend', percentage: 80 },
    { skillName: 'Appwrite', category: 'Database', percentage: 88 },
    { skillName: 'PostgreSQL', category: 'Database', percentage: 75 },
    { skillName: 'TensorFlow', category: 'AI/ML', percentage: 65 },
    { skillName: 'Git / GitHub', category: 'Tools', percentage: 92 },
    { skillName: 'Docker', category: 'Tools', percentage: 70 },
  ];

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="My Expertise"
          subtitle="A comprehensive list of my technical skills across various domains."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => {
            const catSkills = displaySkills.filter(s => s.category === cat.key);
            if (catSkills.length === 0) return null;

            return (
              <Card key={cat.name} className="group hover:border-purple-500/20">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 glass rounded-xl group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <h3 className="text-2xl font-display">{cat.name}</h3>
                </div>

                <div className="space-y-2">
                  {catSkills.map((skill, i) => (
                    <SkillBar
                      key={skill.skillName}
                      name={skill.skillName}
                      percentage={skill.percentage}
                      delay={i * 0.1 + idx * 0.2}
                    />
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
