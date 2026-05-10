import React, { useState, useEffect } from 'react';
import { appwriteService } from '../../services/appwrite';
import { Plus, Trash2, Edit2, X, Loader2, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../components/Shared/Button';
import Card from '../../components/Shared/Card';

const ExperienceManager = () => {
  const [expList, setExpList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [formData, setFormData] = useState({ title: '', company: '', duration: '', description: '' });

  useEffect(() => { fetchExp(); }, []);

  const fetchExp = async () => {
    try {
      const res = await appwriteService.getDocuments('experience');
      setExpList(res.documents);
    } catch (error) { toast.error('Failed to load experience history'); }
    finally { setLoading(false); }
  };

  const handleEdit = (exp) => {
    setEditingExp(exp);
    setFormData({ title: exp.title, company: exp.company, duration: exp.duration, description: exp.description });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry?')) return;
    try {
      await appwriteService.deleteDocument('experience', id);
      setExpList(expList.filter(e => e.$id !== id));
      toast.success('Deleted');
    } catch (error) { toast.error('Delete failed'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingExp) { await appwriteService.updateDocument('experience', editingExp.$id, formData); }
      else { await appwriteService.createDocument('experience', formData); }
      fetchExp();
      setIsModalOpen(false);
    } catch (error) { toast.error('Operation failed'); }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-purple-500" size={40} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold">Experience</h1>
          <p className="text-slate-400">Manage your professional journey</p>
        </div>
        <Button onClick={() => { setEditingExp(null); setFormData({ title: '', company: '', duration: '', description: '' }); setIsModalOpen(true); }}>
          <Plus size={18} className="inline mr-2" /> Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {expList.map((exp) => (
          <Card key={exp.$id} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400"><Briefcase size={24} /></div>
              <div>
                <h4 className="text-xl font-bold">{exp.title}</h4>
                <p className="text-slate-400">{exp.company} • {exp.duration}</p>
                <p className="text-sm text-slate-500 mt-2 line-clamp-2 max-w-2xl">{exp.description}</p>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button onClick={() => handleEdit(exp)} className="flex-1 md:flex-none p-3 glass rounded-xl text-blue-400 hover:bg-blue-500/10"><Edit2 size={18} /></button>
              <button onClick={() => handleDelete(exp.$id)} className="flex-1 md:flex-none p-3 glass rounded-xl text-red-400 hover:bg-red-500/10"><Trash2 size={18} /></button>
            </div>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <Card className="max-w-xl w-full p-8 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={24} /></button>
            <h2 className="text-2xl font-display mb-6">{editingExp ? 'Edit Experience' : 'Add New Experience'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm text-slate-400">Job Title</label>
                  <input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-purple-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-slate-400">Company Name</label>
                  <input required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-purple-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-slate-400">Duration (e.g. 2022 - Present)</label>
                  <input required value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-purple-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-slate-400">Description</label>
                  <textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-purple-500 resize-none" />
                </div>
              </div>
              <Button type="submit" className="w-full py-3 mt-4">{editingExp ? 'Update' : 'Add'}</Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ExperienceManager;
