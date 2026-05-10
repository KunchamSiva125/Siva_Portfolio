import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { appwriteService } from '../services/appwrite';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import Button from '../components/Shared/Button';
import Card from '../components/Shared/Card';
import SectionTitle from '../components/Shared/SectionTitle';

const Contact = ({ profile }) => {
  const { email, phone, location, socialLinks } = profile || {};
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const links = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks || {};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Save to Appwrite (Database backup)
      await appwriteService.createDocument('contacts', formData);

      // 2. Send via EmailJS (Direct Notification)
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: email || 'your-email@example.com', // Recipient email
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.success('Message sent successfully! I will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error(error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-slate-950/50">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Get In Touch"
          subtitle="Have a project in mind or just want to say hi? Feel free to reach out!"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-display mb-6">Contact Information</h3>
              <p className="text-slate-400 mb-8 max-w-md">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: <Mail className="text-purple-400" />, label: 'Email', value: email || 'hello@example.com' },
                { icon: <Phone className="text-blue-400" />, label: 'Phone', value: phone || '+91 7680873499' },
                { icon: <MapPin className="text-cyan-400" />, label: 'Location', value: location || 'New York, USA' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="p-4 glass rounded-2xl group-hover:bg-purple-500/20 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">{item.label}</p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-xl font-display mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {links.github && (
                  <a href={links.github} target="_blank" rel="noreferrer" className="p-3 glass rounded-xl text-slate-400 hover:text-purple-400 hover:scale-110 transition-all">
                    <FaGithub size={24} />
                  </a>
                )}
                {links.twitter && (
                  <a href={links.twitter} target="_blank" rel="noreferrer" className="p-3 glass rounded-xl text-slate-400 hover:text-purple-400 hover:scale-110 transition-all">
                    <FaTwitter size={24} />
                  </a>
                )}
                {links.linkedin && (
                  <a href={links.linkedin} target="_blank" rel="noreferrer" className="p-3 glass rounded-xl text-slate-400 hover:text-purple-400 hover:scale-110 transition-all">
                    <FaLinkedin size={24} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-white transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-white transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Your Message"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-white transition-all resize-none"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send size={18} />
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
