import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, User, Briefcase, GraduationCap, Award, 
  MessageSquare, LogOut, Menu, X, ChevronRight, Code2, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const sidebarItems = [
  { name: 'Overview', icon: LayoutDashboard, path: '/admin/dashboard' },
  { name: 'Profile', icon: User, path: '/admin/dashboard/profile' },
  { name: 'Skills', icon: Briefcase, path: '/admin/dashboard/skills' },
  { name: 'Experience', icon: Briefcase, path: '/admin/dashboard/experience' },
  { name: 'Projects', icon: LayoutDashboard, path: '/admin/dashboard/projects' },
  { name: 'Certifications', icon: Award, path: '/admin/dashboard/certifications' },
  { name: 'Education', icon: GraduationCap, path: '/admin/dashboard/education' },
  { name: 'Messages', icon: MessageSquare, path: '/admin/dashboard/messages' },
];

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(true)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        ${isSidebarOpen ? 'w-64' : 'w-20'} 
        fixed lg:relative z-50 h-screen transition-all duration-300 glass border-r border-slate-800 flex flex-col
      `}>
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2 font-display font-bold text-xl text-gradient">
              <Code2 className="text-purple-500" />
              <span>ADMIN</span>
            </div>
          ) : (
            <Code2 className="text-purple-500 mx-auto" />
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden text-slate-400">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  flex items-center gap-4 p-3 rounded-xl transition-all group
                  ${isActive 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'}
                `}
              >
                <Icon size={22} className={isActive ? 'text-white' : 'group-hover:text-purple-400'} />
                {isSidebarOpen && <span className="font-medium">{item.name}</span>}
                {isActive && isSidebarOpen && <ChevronRight size={16} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={22} />
            {isSidebarOpen && <span className="font-medium">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto bg-slate-950/50">
        <header className="h-16 glass border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-400 hover:text-white">
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-medium text-slate-200">
              {sidebarItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-slate-300 hover:text-purple-400 hover:border-purple-500/50 transition-all text-sm font-medium group"
            >
              <Eye size={18} className="group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">View Site</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">{user?.name || 'Admin'}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-[2px]">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-bold text-white">
                  {user?.name?.[0] || 'A'}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
