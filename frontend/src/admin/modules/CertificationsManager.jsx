import React, { useState, useEffect } from 'react';
import { appwriteService } from '../../services/appwrite';
import { Plus, Trash2, Edit2, Upload, X, Loader2, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../components/Shared/Button';
import Card from '../../components/Shared/Card';

const CertificationsManager = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [formData, setFormData] = useState({ title: '', organization: '', issueDate: '', imageURL: '', verifyLink: '' });

  useEffect(() => { fetchCerts(); }, []);

  const fetchCerts = async () => {
    try {
      const res = await appwriteService.getDocuments('certifications');
      setCerts(res.documents);
    } catch (error) { toast.error('Failed to load certifications'); }
    finally { setLoading(false); }
  };

  const handleEdit = (cert) => {
    setEditingCert(cert);
    setFormData({ title: cert.title, organization: cert.organization, issueDate: cert.issueDate, imageURL: cert.imageURL, verifyLink: cert.verifyLink });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this certification?')) return;
    try {
      await appwriteService.deleteDocument('certifications', id);
      setCerts(certs.filter(c => c.$id !== id));
      toast.success('Deleted');
    } catch (error) { toast.error('Delete failed'); }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const tId = toast.loading('Uploading certificate...');
    try {
      const res = await appwriteService.uploadFile(file);
      const url = appwriteService.getFileView(res.$id);
      console.log("Generated Certificate URL:", url);
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
      if (editingCert) { await appwriteService.updateDocument('certifications', editingCert.$id, formData); }
      else { await appwriteService.createDocument('certifications', formData); }
      fetchCerts();
      setIsModalOpen(false);
    } catch (error) { toast.error('Operation failed'); }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-purple-500" size={40} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold">Certifications</h1>
          <p className="text-slate-400">Manage your earned credentials</p>
        </div>
        <Button onClick={() => { setEditingCert(null); setFormData({ title: '', organization: '', issueDate: '', imageURL: '', verifyLink: '' }); setIsModalOpen(true); }}>
          <Plus size={18} className="inline mr-2" /> Add Certificate
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map((cert) => (
          <Card key={cert.$id} className="p-0 overflow-hidden group">
            <img src={cert.imageURL || 'https://via.placeholder.com/200'} className="h-40 w-full object-cover" />
            <div className="p-4">
              <h4 className="text-lg font-bold truncate">{cert.title}</h4>
              <p className="text-sm text-slate-400">{cert.organization}</p>
              <div className="flex gap-2 mt-4">
                <button onClick={() => handleEdit(cert)} className="flex-1 p-2 glass rounded-lg text-blue-400 hover:bg-blue-500/10 flex justify-center"><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(cert.$id)} className="flex-1 p-2 glass rounded-lg text-red-400 hover:bg-red-500/10 flex justify-center"><Trash2 size={16} /></button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <Card className="max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={24} /></button>
            <h2 className="text-2xl font-display mb-6">{editingCert ? 'Edit Certification' : 'Add New Certification'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm text-slate-400">Title</label>
                  <input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-slate-400">Organization</label>
                  <input required value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-slate-400">Issue Date (e.g. 2023)</label>
                  <input required value={formData.issueDate} onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm text-slate-400">Verification Link</label>
                  <input value={formData.verifyLink} onChange={(e) => setFormData({ ...formData, verifyLink: e.target.value })} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-slate-400">Certificate Image</label>
                  <div className="h-32 border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
                    {formData.imageURL ? (
                      <img src={formData.imageURL} className="w-full h-full object-cover" />
                    ) : (
                      <Upload className="text-slate-500 mb-2" />
                    )}
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} accept="image/*" />
                  </div>
                </div>
              </div>
              <Button type="submit" className="md:col-span-2 py-3 mt-4">{editingCert ? 'Update Certification' : 'Add Certification'}</Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CertificationsManager;
