import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, MessageCircle, FileText, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const patientNavItems = [
    { icon: Home, label: 'Home', path: '/patient/dashboard' },
    { icon: Calendar, label: 'Appointments', path: '/patient/appointments' },
    { icon: MessageCircle, label: 'Chat', path: '/patient/chat' },
    { icon: FileText, label: 'Articles', path: '/patient/articles' },
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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center flex-1 h-full"
              >
                <Icon
                  className={`w-5 h-5 mb-1 ${
                    isActive
                      ? 'text-pink-500'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
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
    </div>
  );
};
