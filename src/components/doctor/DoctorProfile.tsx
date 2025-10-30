import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { MobileLayout } from '../MobileLayout';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Heart,
  User,
  Calendar,
  DollarSign,
  Settings,
  Award,
  FileText,
  Users,
  HelpCircle,
  LogOut,
  ChevronRight,
  Edit,
  Star,
} from 'lucide-react';

export const DoctorProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      icon: User,
      label: 'Edit Profile',
      path: '/doctor/edit-profile',
      color: 'text-pink-500',
    },
    {
      icon: Calendar,
      label: 'My Schedule',
      path: '/doctor/schedule',
      color: 'text-blue-500',
    },
    {
      icon: Users,
      label: 'Patient Records',
      path: '/doctor/patients',
      color: 'text-purple-500',
    },
    {
      icon: DollarSign,
      label: 'Earnings & Withdrawals',
      path: '/doctor/withdrawals',
      color: 'text-green-500',
    },
    {
      icon: FileText,
      label: 'Certifications',
      path: '/doctor/certifications',
      color: 'text-orange-500',
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/doctor/settings',
      color: 'text-gray-500',
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      path: '/doctor/support',
      color: 'text-indigo-500',
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <MobileLayout title="Profile">
      <div className="pb-20">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-pink-500" />
            </div>
            <div className="flex-1 text-white">
              <h2 className="text-white mb-1">{user?.name}</h2>
              <p className="text-pink-100 mb-2">{user?.specialization}</p>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white">{user?.rating || 5.0}</span>
                <span className="text-pink-100">• {user?.experience} years exp.</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/doctor/edit-profile')}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
            >
              <Edit className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 text-center bg-white/10 backdrop-blur-sm border-0">
              <p className="text-white">245</p>
              <p className="text-pink-100">Patients</p>
            </Card>
            <Card className="p-3 text-center bg-white/10 backdrop-blur-sm border-0">
              <p className="text-white">$4.2K</p>
              <p className="text-pink-100">Earned</p>
            </Card>
            <Card className="p-3 text-center bg-white/10 backdrop-blur-sm border-0">
              <p className="text-white">156h</p>
              <p className="text-pink-100">Hours</p>
            </Card>
          </div>
        </div>

        {/* Expertise */}
        <div className="p-4">
          <h3 className="text-gray-900 dark:text-white mb-3">Areas of Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {user?.expertise?.map((exp) => (
              <Badge key={exp} variant="secondary">
                {exp}
              </Badge>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.path}
                className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(item.path)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="flex-1 text-gray-900 dark:text-white">
                    {item.label}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Logout Button */}
        <div className="p-4">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-red-200 text-red-500 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-900/20"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* App Info */}
        <div className="text-center p-4 text-gray-500 dark:text-gray-400">
          <p>Version 1.0.0</p>
          <p className="mt-1">© 2025 HealthCare App</p>
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
};
