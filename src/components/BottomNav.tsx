import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, MessageCircle, FileText, User, Pill } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const patientNavItems = [
    { icon: Home, label: 'Home', path: '/patient/dashboard' },
    { icon: Calendar, label: 'Appointments', path: '/patient/appointments' },
    { icon: Pill, label: 'Shop', path: '/patient/medicine-shop' },
    { icon: MessageCircle, label: 'Chat', path: '/patient/chat' },
    { icon: User, label: 'Profile', path: '/patient/profile' },
  ];

  const doctorNavItems = [
    { icon: Home, label: 'Home', path: '/doctor/dashboard' },
    { icon: Calendar, label: 'Appointments', path: '/doctor/appointments' },
    { icon: MessageCircle, label: 'Chat', path: '/doctor/chat' },
    { icon: FileText, label: 'Articles', path: '/doctor/articles' },
    { icon: User, label: 'Profile', path: '/doctor/profile' },
  ];

  const navItems = user?.role === 'doctor' ? doctorNavItems : patientNavItems;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center h-16" role="tablist">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center flex-1 h-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-inset transition-colors ${
                  isActive ? 'bg-pink-50 dark:bg-pink-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                role="tab"
                aria-selected={isActive}
              >
                <Icon
                  className={`w-5 h-5 mb-1 ${
                    isActive
                      ? 'text-pink-500'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`text-xs ${
                    isActive
                      ? 'text-pink-500'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};