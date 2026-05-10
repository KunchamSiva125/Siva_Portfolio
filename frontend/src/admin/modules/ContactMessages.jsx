import React, { useState, useEffect } from 'react';
import { appwriteService, Query } from '../../services/appwrite';
import { Mail, User, Clock, Trash2, Loader2, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../../components/Shared/Card';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchMessages(); }, []);

  const fetchMessages = async () => {
    try {
      const res = await appwriteService.getDocuments('contacts', [Query.orderDesc('$createdAt')]);
      setMessages(res.documents);
    } catch (error) { toast.error('Failed to load messages'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await appwriteService.deleteDocument('contacts', id);
      setMessages(messages.filter(m => m.$id !== id));
      toast.success('Message deleted');
    } catch (error) { toast.error('Delete failed'); }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-purple-500" size={40} /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold">Contact Messages</h1>
        <p className="text-slate-400">View and manage inquiries from your portfolio</p>
      </div>

      {messages.length === 0 ? (
        <Card className="text-center py-20">
          <MessageSquare className="mx-auto text-slate-700 mb-4" size={48} />
          <p className="text-slate-500">No messages found yet.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {messages.map((msg) => (
            <Card key={msg.$id} className="hover:border-purple-500/20 transition-all">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 rounded-full text-purple-400 text-sm">
                      <User size={14} />
                      <span className="font-medium">{msg.name}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full text-blue-400 text-sm">
                      <Mail size={14} />
                      <span>{msg.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <Clock size={14} />
                      <span>{new Date(msg.$createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{msg.subject || 'No Subject'}</h4>
                    <p className="text-slate-300 bg-slate-900/50 p-4 rounded-xl border border-slate-800 leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                </div>
                
                <div className="flex md:flex-col justify-end">
                  <button 
                    onClick={() => handleDelete(msg.$id)}
                    className="p-3 glass rounded-xl text-red-400 hover:bg-red-500/20 transition-all self-end"
                    title="Delete Message"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactMessages;
