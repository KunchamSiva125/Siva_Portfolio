import React, { useState, useEffect } from 'react';
import { appwriteService } from '../../services/appwrite';
import { Plus, Trash2, Edit2, X, Loader2, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../components/Shared/Button';
import Card from '../../components/Shared/Card';

const EducationManager = () => {
  const [eduList, setEduList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);
  const [formData, setFormData] = useState({ institution: '', degree: '', stream: '', cgpa: '', duration: '' });

  useEffect(() => { fetchEdu(); }, []);

  const fetchEdu = async () => {
    try {
      const res = await appwriteService.getDocuments('education');
      setEduList(res.documents);
    } catch (error) { toast.error('Failed to load education history'); }
    finally { setLoading(false); }
  };

  const handleEdit = (edu) => {
    setEditingEdu(edu);
    setFormData({ institution: edu.institution, degree: edu.degree, stream: edu.stream, cgpa: edu.cgpa, duration: edu.duration });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry?')) return;
    try {
      await appwriteService.deleteDocument('education', id);
      setEduList(eduList.filter(e => e.$id !== id));
      toast.success('Deleted');
    } catch (error) { toast.error('Delete failed'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEdu) { await appwriteService.updateDocument('education', editingEdu.$id, formData); }
      else { await appwriteService.createDocument('education', formData); }
      fetchEdu();
      setIsModalOpen(false);
    } catch (error) { toast.error('Operation failed'); }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-purple-500" size={40} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold">Education History</h1>
          <p className="text-slate-400">Update your academic background</p>
        </div>
        <Button onClick={() => { setEditingEdu(null); setFormData({ institution: '', degree: '', stream: '', cgpa: '', duration: '' }); setIsModalOpen(true); }}>
          <Plus size={18} className="inline mr-2" /> Add Education
        </Button>
      </div>

      <div className="space-y-4">
        {eduList.map((edu) => (
          <Card key={edu.$id} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400"><GraduationCap size={24} /></div>
              <div>
                <h4 className="text-xl font-bold">{edu.degree} in {edu.stream}</h4>
                <p className="text-slate-400">{edu.institution} • {edu.duration}</p>
                <p className="text-xs text-blue-400 font-bold mt-1">CGPA: {edu.cgpa}</p>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button onClick={() => handleEdit(edu)} className="flex-1 md:flex-none p-3 glass rounded-xl text-blue-400 hover:bg-blue-500/10"><Edit2 size={18} /></button>
              <button onClick={() => handleDelete(edu.$id)} className="flex-1 md:flex-none p-3 glass rounded-xl text-red-400 hover:bg-red-500/10"><Trash2 size={18} /></button>
            </div>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <Card className="max-w-xl w-full p-8 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={24} /></button>
            <h2 className="text-2xl font-display mb-6">{editingEdu ? 'Edit Education' : 'Add New Education'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-slate-400">Institution Name</label>
                  <input required value={formData.institution} onChange={(e) => setFormData({ ...formData, institution: e.target.value })} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-purple-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-slate-400">Degree</label>
                  <input required value={formData.degree} onChange={(e) => setFormData({ ...formData, degree: e.target.value })} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-purple-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-slate-400">Stream / Major</label>
                  <input required value={formData.stream} onChange={(e) => setFormData({ ...formData, stream: e.target.value })} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-purple-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-slate-400">CGPA / Percentage</label>
                  <input required value={formData.cgpa} onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-purple-500" />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-sm text-slate-400">Duration (e.g. 2018 - 2022)</label>
                  <input required value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white outline-none focus:border-purple-500" />
                </div>
              </div>
              <Button type="submit" className="w-full py-3 mt-4">{editingEdu ? 'Update' : 'Add'}</Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EducationManager;
