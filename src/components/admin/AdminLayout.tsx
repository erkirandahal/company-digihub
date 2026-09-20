import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  KanbanSquare,
  Inbox,
  Code2,
  FolderGit2,
  FileText,
  Briefcase,
  Megaphone,
  Users,
  UserCircle,
  Building2,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { authApi } from '../../services/api';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = authApi.getCurrentUser();

  const handleLogout = async () => {
    await authApi.logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'CRM Leads & Quotes', path: '/admin/leads', icon: <KanbanSquare className="w-4 h-4" /> },
    { name: 'Inquiries Inbox', path: '/admin/inquiries', icon: <Inbox className="w-4 h-4" /> },
    { name: 'Services CMS', path: '/admin/services', icon: <Code2 className="w-4 h-4" /> },
    { name: 'Projects Portfolio', path: '/admin/projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { name: 'Engineering Blog', path: '/admin/blogs', icon: <FileText className="w-4 h-4" /> },
    { name: 'Careers & Applicants', path: '/admin/careers', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Team Members', path: '/admin/team', icon: <UserCircle className="w-4 h-4" /> },
    { name: 'Clients & Partners', path: '/admin/clients', icon: <Building2 className="w-4 h-4" /> },
    { name: 'Popups & CTAs', path: '/admin/popups', icon: <Megaphone className="w-4 h-4" /> },
    { name: 'Subscribers', path: '/admin/subscribers', icon: <Users className="w-4 h-4" /> },
    { name: 'Settings & Audit', path: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-900">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white text-slate-500 flex flex-col justify-between shrink-0 border-r border-slate-200">
        <div>
          {/* Logo & Platform Info */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center font-black">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-black text-indigo-700 text-sm tracking-tight leading-tight">
                  DIGIHUB ADMIN
                </h1>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase block">
                  CMS & CRM Platform
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 text-xs font-medium">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  isActive(item.path)
                    ? 'bg-indigo-700 text-white font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-slate-200 space-y-3">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center text-xs border border-indigo-100">
              {user?.name ? user.name[0] : 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Administrator'}</p>
              <p className="text-[10px] text-indigo-700 flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3 h-3" />
                <span>{user?.role || 'Super Admin'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Link
              to="/"
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-200 transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Digihub Innovation Center</span>
            <span>/</span>
            <span className="font-semibold text-slate-800 capitalize">
              {location.pathname.replace('/admin', '') || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              Laravel 12 API Ready
            </span>
          </div>
        </header>

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
