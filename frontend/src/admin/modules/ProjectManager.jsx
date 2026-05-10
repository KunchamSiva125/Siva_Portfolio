import React, { useState, useEffect } from 'react';
import { appwriteService } from '../../services/appwrite';
import { Plus, Trash2, Edit2, X, Loader2, Link, Upload, ExternalLink } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Button from '../../components/Shared/Button';
import Card from '../../components/Shared/Card';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    imageURL: '', 
    githubLink: '', 
    liveLink: '', 
    tags: '' 
  });

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    try {
      const res = await appwriteService.getDocuments('projects');
      setProjects(res.documents);
    } catch (error) { toast.error('Failed to load projects'); }
    finally { setLoading(false); }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({ 
      title: project.title, 
      description: project.description, 
      imageURL: project.imageURL, 
      githubLink: project.githubLink, 
      liveLink: project.liveLink, 
      tags: project.tags 
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await appwriteService.deleteDocument('projects', id);
      setProjects(projects.filter(p => p.$id !== id));
      toast.success('Project deleted');
    } catch (error) { toast.error('Delete failed'); }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const tId = toast.loading('Uploading project image...');
    try {
      const res = await appwriteService.uploadFile(file);
      const url = appwriteService.getFileView(res.$id);
      console.log("Generated Project Image URL:", url);
      setFormData({ ...formData, imageURL: url });
      toast.success('Image uploaded', { id: tId });
    } catch (error) { 
      console.error("Upload error:", error);
      toast.error('Upload failed', { id: tId }); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) { await appwriteService.updateDocument('projects', editingProject.$id, formData); }
      else { await appwriteService.createDocument('projects', formData); }
      fetchProjects();
      setIsModalOpen(false);
      toast.success(editingProject ? 'Project updated' : 'Project added');
    } catch (error) { toast.error('Operation failed'); }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-purple-500" size={40} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold">Projects Management</h1>
          <p className="text-slate-400">Showcase your best work</p>
        </div>
        <Button onClick={() => { setEditingProject(null); setFormData({ title: '', description: '', imageURL: '', githubLink: '', liveLink: '', tags: '' }); setIsModalOpen(true); }}>
          <Plus size={18} className="inline mr-2" /> Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.$id} className="group overflow-hidden p-0">
            <div className="h-48 overflow-hidden relative">
              <img src={project.imageURL || 'https://via.placeholder.com/400x200'} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button onClick={() => handleEdit(project)} className="p-3 bg-blue-500 rounded-full text-white hover:scale-110 transition-transform"><Edit2 size={20} /></button>
                <button onClick={() => handleDelete(project.$id)} className="p-3 bg-red-500 rounded-full text-white hover:scale-110 transition-transform"><Trash2 size={20} /></button>
              </div>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold mb-2">{project.title}</h4>
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.split(',').map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-purple-500/10 text-purple-400 text-[10px] rounded uppercase font-bold">{tag.trim()}</span>
                ))}
              </div>
              <div className="flex gap-4 text-slate-500">
                {project.githubLink && <a href={project.githubLink} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Github size={18} /></a>}
                {project.liveLink && <a href={project.liveLink} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><ExternalLink size={18} /></a>}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <Card className="max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={24} /></button>
            <h2 className="text-2xl font-display mb-6">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-slate-400">Project Title</label>
                  <input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-purple-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-slate-400">Tags (comma separated)</label>
                  <input value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="React, Tailwind, Node.js" className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-purple-500" />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-sm text-slate-400">Description</label>
                  <textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-purple-500 resize-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-slate-400">GitHub Link</label>
                  <input value={formData.githubLink} onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-purple-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-slate-400">Live Preview Link</label>
                  <input value={formData.liveLink} onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-purple-500" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm text-slate-400">Project Image</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden shrink-0">
                      {formData.imageURL ? <img src={formData.imageURL} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-700"><Upload size={24} /></div>}
                    </div>
                    <label className="flex-1 cursor-pointer">
                      <div className="p-4 border-2 border-dashed border-slate-800 rounded-lg text-center hover:border-purple-500 transition-colors">
                        <span className="text-sm text-slate-400">Click to upload image</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full py-3 mt-4">{editingProject ? 'Update Project' : 'Add Project'}</Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
