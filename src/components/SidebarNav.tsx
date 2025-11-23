import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Home,
  Calendar,
  MessageCircle,
  FileText,
  Heart,
  User,
  Settings,
  LogOut,
  Stethoscope,
  CreditCard,
  Menu as MenuIcon,
  Pill,
  ShoppingBag,
} from 'lucide-react';
import { Button } from './ui/button';

export const SidebarNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const patientNavItems = [
    { icon: Home, label: 'Dashboard', path: '/patient/dashboard' },
    { icon: Stethoscope, label: 'Find Doctors', path: '/patient/doctors' },
    { icon: Calendar, label: 'Appointments', path: '/patient/appointments' },
    { icon: Pill, label: 'Medicine Shop', path: '/patient/medicine-shop' },
    { icon: ShoppingBag, label: 'My Orders', path: '/patient/orders' },
    { icon: MessageCircle, label: 'Chat', path: '/patient/chat' },
    { icon: FileText, label: 'Articles', path: '/patient/articles' },
    { icon: Heart, label: 'Health Tips', path: '/patient/health-tips' },
    { icon: MenuIcon, label: 'Menu', path: '/patient/menu' },
    { icon: User, label: 'Profile', path: '/patient/profile' },
    { icon: Settings, label: 'Settings', path: '/patient/settings' },
  ];

  const doctorNavItems = [
    { icon: Home, label: 'Dashboard', path: '/doctor/dashboard' },
    { icon: Calendar, label: 'Appointments', path: '/doctor/appointments' },
    { icon: MessageCircle, label: 'Chat', path: '/doctor/chat' },
    { icon: FileText, label: 'Articles', path: '/doctor/articles' },
    { icon: CreditCard, label: 'Withdrawals', path: '/doctor/withdrawals' },
    { icon: User, label: 'Profile', path: '/doctor/profile' },
    { icon: Settings, label: 'Settings', path: '/doctor/settings' },
  ];

  const navItems = user?.role === 'patient' ? patientNavItems : doctorNavItems;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className="hidden md:flex md:flex-col w-64 lg:w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0"
      aria-label="Sidebar navigation"
    >
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center" aria-hidden="true">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-gray-900 dark:text-white">HealthCare</h2>
            <p className="text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto p-4" aria-label="Main navigation">
        <div className="space-y-1" role="list">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${
                  active
                    ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
                role="listitem"
              >
                <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg" role="status" aria-label="Current user information">
          <p className="text-gray-900 dark:text-white truncate">{user?.name}</p>
          <p className="text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label="Logout from your account"
        >
          <LogOut className="w-5 h-5" aria-hidden="true" />
          Logout
        </Button>
      </div>
    </aside>
  );
};