import React, { useState, useEffect } from 'react';
import { appwriteService } from '../../services/appwrite';
import { Plus, Trash2, Edit2, Save, X, Loader2, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../components/Shared/Button';
import Card from '../../components/Shared/Card';

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({ skillName: '', category: 'Frontend', percentage: 80 });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await appwriteService.getDocuments('skills');
      setSkills(res.documents);
    } catch (error) {
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({ skillName: skill.skillName, category: skill.category, percentage: skill.percentage });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    try {
      await appwriteService.deleteDocument('skills', id);
      setSkills(skills.filter(s => s.$id !== id));
      toast.success('Skill deleted');
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await appwriteService.updateDocument('skills', editingSkill.$id, formData);
        toast.success('Skill updated');
      } else {
        await appwriteService.createDocument('skills', formData);
        toast.success('Skill added');
      }
      fetchSkills();
      setIsModalOpen(false);
      setEditingSkill(null);
      setFormData({ skillName: '', category: 'Frontend', percentage: 80 });
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-purple-500" size={40} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold">Skills Management</h1>
          <p className="text-slate-400">Add, edit, or remove your technical skills</p>
        </div>
        <Button onClick={() => { setEditingSkill(null); setIsModalOpen(true); }} className="flex items-center gap-2">
          <Plus size={18} /> Add New Skill
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <Card key={skill.$id} className="flex justify-between items-center group">
            <div>
              <p className="text-xs text-purple-400 font-bold uppercase tracking-wider mb-1">{skill.category}</p>
              <h4 className="text-lg font-bold text-white">{skill.skillName}</h4>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: `${skill.percentage}%` }} />
                </div>
                <span className="text-xs text-slate-500">{skill.percentage}%</span>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleEdit(skill)} className="p-2 glass rounded-lg text-blue-400 hover:bg-blue-500/20"><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(skill.$id)} className="p-2 glass rounded-lg text-red-400 hover:bg-red-500/20"><Trash2 size={16} /></button>
            </div>
          </Card>
        ))}
      </div>

      {/* Simple Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <Card className="max-w-md w-full p-8 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={24} /></button>
            <h2 className="text-2xl font-display mb-6">{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Skill Name</label>
                <input
                  required
                  value={formData.skillName}
                  onChange={(e) => setFormData({ ...formData, skillName: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg outline-none focus:border-purple-500 text-white"
                  placeholder="e.g. React.js"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg outline-none focus:border-purple-500 text-white"
                >
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>Database</option>
                  <option>AI/ML</option>
                  <option>Tools</option>
                  <option>Technical Skills</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Proficiency (%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.percentage}
                  onChange={(e) => setFormData({ ...formData, percentage: parseInt(e.target.value) })}
                  className="w-full accent-purple-500"
                />
                <p className="text-right text-xs text-purple-400 font-bold">{formData.percentage}%</p>
              </div>
              <Button type="submit" className="w-full py-3">{editingSkill ? 'Update Skill' : 'Add Skill'}</Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SkillsManager;
