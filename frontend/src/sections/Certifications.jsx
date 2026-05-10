import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Award } from 'lucide-react';
import Card from '../components/Shared/Card';
import SectionTitle from '../components/Shared/SectionTitle';

const Certifications = ({ certifications }) => {
  const [selectedCert, setSelectedCert] = useState(null);

  const displayCerts = (certifications && certifications.length > 0) ? certifications : [
    { 
      title: 'AWS Certified Solutions Architect', 
      organization: 'Amazon Web Services', 
      issueDate: '2023', 
      imageURL: 'https://via.placeholder.com/600x400?text=AWS+Certificate',
      verifyLink: '#' 
    },
    { 
      title: 'Full Stack Web Development', 
      organization: 'Meta', 
      issueDate: '2022', 
      imageURL: 'https://via.placeholder.com/600x400?text=Meta+Certificate',
      verifyLink: '#' 
    },
    { 
      title: 'Appwrite Fundamentals', 
      organization: 'Appwrite', 
      issueDate: '2024', 
      imageURL: 'https://via.placeholder.com/600x400?text=Appwrite+Certificate',
      verifyLink: '#' 
    },
  ];

  return (
    <section id="certifications" className="section-padding bg-slate-950/50">
      <div className="max-w-7xl mx-auto">
        <SectionTitle 
          title="Certifications" 
          subtitle="Validation of my expertise through professional training and industry standards."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCerts.map((cert, i) => (
            <Card 
              key={cert.title} 
              className="p-0 overflow-hidden group cursor-pointer"
              onClick={() => setSelectedCert(cert)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={cert.imageURL} 
                  alt={cert.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 p-2 glass rounded-lg">
                  <Award size={20} className="text-purple-400" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-bold mb-1 text-white group-hover:text-purple-400 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{cert.organization} • {cert.issueDate}</p>
                <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold">
                  <span>Preview Certificate</span>
                  <ExternalLink size={14} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 glass rounded-full text-white hover:text-purple-400 transition-colors z-10"
              >
                <X size={24} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-full">
                  <img src={selectedCert.imageURL} alt={selectedCert.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h2 className="text-3xl font-display mb-4 text-gradient">{selectedCert.title}</h2>
                  <div className="space-y-4 text-slate-300">
                    <p><strong className="text-white">Organization:</strong> {selectedCert.organization}</p>
                    <p><strong className="text-white">Date Issued:</strong> {selectedCert.issueDate}</p>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                      Successfully completed the requirements for this certification, demonstrating proficiency in the specified domain.
                    </p>
                    <a 
                      href={selectedCert.verifyLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 btn-primary w-fit"
                    >
                      Verify Credential <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
