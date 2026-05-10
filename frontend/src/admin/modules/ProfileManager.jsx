import React, { useState, useEffect } from 'react';
import { appwriteService } from '../../services/appwrite';
import { Save, Upload, Loader2, Globe, MapPin, Mail as MailIcon, Calendar, Trophy, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Button from '../../components/Shared/Button';
import Card from '../../components/Shared/Card';

const ProfileManager = () => {
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    bio: '',
    profileImage: '',
    resumeURL: '',
    location: '',
    email: '',
    phone: '',
    birthday: '',
    achievements: '',
    socialLinks: { github: '', linkedin: '', twitter: '' }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [docId, setDocId] = useState(null);

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    try {
      const res = await appwriteService.getDocuments('profile');
      if (res.documents.length > 0) {
        const doc = res.documents[0];
        setProfile({
          name: doc.name || '',
          title: doc.title || '',
          bio: doc.bio || '',
          profileImage: doc.profileImage || '',
          resumeURL: doc.resumeURL || '',
          location: doc.location || '',
          email: doc.email || '',
          phone: doc.phone || '',
          birthday: doc.birthday || '',
          achievements: doc.achievements || '',
          socialLinks: JSON.parse(doc.socialLinks || '{"github":"","linkedin":"","twitter":""}')
        });
        setDocId(doc.$id);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const social = name.split('_')[1];
      setProfile({
        ...profile,
        socialLinks: { ...profile.socialLinks, [social]: value }
      });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const toastId = toast.loading(`Uploading ${type}...`);
    try {
      const res = await appwriteService.uploadFile(file);
      const url = appwriteService.getFileView(res.$id);
      console.log(`Generated ${type} URL:`, url);
      
      setProfile({ ...profile, [type === 'image' ? 'profileImage' : 'resumeURL']: url });
      toast.success(`${type} uploaded!`, { id: toastId });
    } catch (error) {
      console.error("Upload error:", error);
      toast.error('Upload failed', { id: toastId });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = {
        ...profile,
        socialLinks: JSON.stringify(profile.socialLinks)
      };
      if (docId) {
        await appwriteService.updateDocument('profile', docId, data);
      } else {
        await appwriteService.createDocument('profile', data);
      }
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-purple-500" size={40} /></div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold">Manage Profile</h1>
          <p className="text-slate-400">Update your biography, personal details, and social presence</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-xl font-display mb-6">General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Full Name</label>
                <input name="name" value={profile.name} onChange={handleChange} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg outline-none focus:border-purple-500 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Role / Title</label>
                <input name="title" value={profile.title} onChange={handleChange} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg outline-none focus:border-purple-500 text-white" />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <label className="text-sm text-slate-400">Biography</label>
              <textarea name="bio" value={profile.bio} onChange={handleChange} rows={5} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg outline-none focus:border-purple-500 text-white resize-none" />
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-display mb-6">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-slate-400 flex items-center gap-2"><MailIcon size={14} /> Contact Email</label>
                <input name="email" value={profile.email} onChange={handleChange} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg outline-none focus:border-purple-500 text-white" placeholder="hello@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400 flex items-center gap-2"><Phone size={14} /> Phone Number</label>
                <input name="phone" value={profile.phone} onChange={handleChange} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg outline-none focus:border-purple-500 text-white" placeholder="+1 (555) 000-0000" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400 flex items-center gap-2"><MapPin size={14} /> Location</label>
                <input name="location" value={profile.location} onChange={handleChange} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg outline-none focus:border-purple-500 text-white" placeholder="New York, USA" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400 flex items-center gap-2"><Calendar size={14} /> Birthday</label>
                <input name="birthday" value={profile.birthday} onChange={handleChange} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg outline-none focus:border-purple-500 text-white" placeholder="May 10, 1998" />
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-display mb-6 flex items-center gap-2"><Trophy size={20} className="text-amber-400" /> Achievements</h3>
            <p className="text-xs text-slate-500 mb-4">Enter each achievement on a new line</p>
            <textarea
              name="achievements"
              value={profile.achievements}
              onChange={handleChange}
              rows={4}
              placeholder="Winner of Global Hackathon 2023&#10;Top contributor to React Library"
              className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg outline-none focus:border-purple-500 text-white resize-none"
            />
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="text-center">
            <h3 className="text-lg font-display mb-6">Profile Picture</h3>
            <div className="relative w-40 h-40 mx-auto mb-6 group">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl">
                <img src={profile.profileImage || 'https://via.placeholder.com/150'} className="w-full h-full object-cover" />
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
                <Upload className="text-white" />
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} />
              </label>
            </div>
            <p className="text-xs text-slate-500">Recommended: Square image, max 2MB</p>
          </Card>

          <Card>
            <h3 className="text-lg font-display mb-4">Social Presence</h3>
            <div className="space-y-4">
              {[
                { name: 'github', icon: FaGithub, color: 'text-white' },
                { name: 'linkedin', icon: FaLinkedin, color: 'text-blue-400' },
                { name: 'twitter', icon: FaTwitter, color: 'text-cyan-400' }
              ].map((social) => (
                <div key={social.name} className="flex items-center gap-3">
                  <social.icon size={18} className={social.color} />
                  <input
                    name={`social_${social.name}`}
                    value={profile.socialLinks[social.name]}
                    onChange={handleChange}
                    placeholder={`${social.name} URL`}
                    className="flex-1 px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg outline-none focus:border-purple-500 text-white"
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-display mb-4">Resume / CV</h3>
            <div className="p-4 bg-slate-900/50 rounded-xl border border-dashed border-slate-700 flex flex-col items-center">
              <Globe className="text-slate-500 mb-2" size={32} />
              <label className="btn-outline px-4 py-2 text-xs cursor-pointer inline-flex items-center gap-2">
                <Upload size={14} /> Upload PDF
                <input type="file" className="hidden" accept=".pdf" onChange={(e) => handleFileUpload(e, 'resume')} />
              </label>
              {profile.resumeURL && <p className="text-[10px] text-green-400 mt-2 truncate max-w-full">CV File Linked</p>}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileManager;
