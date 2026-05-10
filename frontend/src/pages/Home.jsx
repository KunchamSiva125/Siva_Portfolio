import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../sections/Hero';
import Info from '../sections/Info';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Certifications from '../sections/Certifications';
import Education from '../sections/Education';
import Contact from '../sections/Contact';
import Footer from '../components/Footer/Footer';
import { appwriteService } from '../services/appwrite';
import { Loader2 } from 'lucide-react';

const Home = () => {
  const [data, setData] = useState({
    profile: null,
    skills: [],
    experience: [],
    projects: [],
    certifications: [],
    education: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [profileRes, skillsRes, expRes, projRes, certsRes, eduRes] = await Promise.all([
        appwriteService.getDocuments('profile'),
        appwriteService.getDocuments('skills'),
        appwriteService.getDocuments('experience'),
        appwriteService.getDocuments('projects'),
        appwriteService.getDocuments('certifications'),
        appwriteService.getDocuments('education')
      ]);

      setData({
        profile: profileRes.documents[0] || null,
        skills: skillsRes.documents,
        experience: expRes.documents,
        projects: projRes.documents,
        certifications: certsRes.documents,
        education: eduRes.documents
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="animate-spin text-purple-500" size={48} />
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <Navbar />
      <main>
        <Hero profile={data.profile} />
        <Info profile={data.profile} experience={data.experience} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Certifications certifications={data.certifications} />
        <Education education={data.education} />
        <Contact profile={data.profile} />
      </main>
      <Footer profile={data.profile} />
    </div>
  );
};

export default Home;
