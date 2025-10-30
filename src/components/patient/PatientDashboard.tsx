import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { MobileLayout } from '../MobileLayout';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import {
  Calendar,
  MessageCircle,
  Phone,
  FileText,
  Heart,
  Award,
  Bell,
  Settings,
  Menu,
} from 'lucide-react';
import { mockDoctors, mockHealthTips } from '../../lib/mockData';
import { Button } from '../ui/button';

export const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const quickActions = [
    {
      icon: Calendar,
      label: 'Book Appointment',
      color: 'bg-pink-100 text-pink-500',
      path: '/patient/doctors',
    },
    {
      icon: MessageCircle,
      label: 'Chat',
      color: 'bg-blue-100 text-blue-500',
      path: '/patient/chat',
    },
    {
      icon: Phone,
      label: 'Call Doctor',
      color: 'bg-green-100 text-green-500',
      path: '/patient/call',
    },
    {
      icon: FileText,
      label: 'Health Articles',
      color: 'bg-purple-100 text-purple-500',
      path: '/patient/articles',
    },
  ];

  return (
    <MobileLayout>
      <div className="pb-20">
        {/* Header */}
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 px-6 py-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => navigate('/patient/menu')}>
              <Menu className="w-6 h-6" />
            </button>
            <button onClick={() => navigate('/patient/notifications')}>
              <Bell className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-4">
            <p className="text-pink-100 mb-1">Welcome back,</p>
            <h1 className="text-white">{user?.name}</h1>
          </div>

          <div className="flex items-center gap-4 bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div className="flex-1">
              <p className="text-pink-100 mb-1">Your Health Points</p>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span className="text-white">{user?.points || 0} Points</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-pink-500 border-0 hover:bg-pink-50"
              onClick={() => navigate('/patient/rewards')}
            >
              Redeem
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-6">
          <h2 className="text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Card
                  key={action.label}
                  className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(action.path)}
                >
                  <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{action.label}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Today's Health Tip */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900 dark:text-white">Today's Health Tip</h2>
            <button
              onClick={() => navigate('/patient/health-tips')}
              className="text-pink-500"
            >
              See All
            </button>
          </div>
          
          {mockHealthTips[0] && (
            <Card className="p-4 bg-gradient-to-br from-pink-50 to-white dark:from-gray-800 dark:to-gray-700">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-pink-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 dark:text-white mb-1">
                    {mockHealthTips[0].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {mockHealthTips[0].description}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Available Doctors */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900 dark:text-white">Available Doctors</h2>
            <button
              onClick={() => navigate('/patient/doctors')}
              className="text-pink-500"
            >
              See All
            </button>
          </div>

          <div className="space-y-3">
            {mockDoctors.slice(0, 3).map((doctor) => (
              <Card
                key={doctor.id}
                className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/patient/doctor/${doctor.id}`)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <Heart className="w-7 h-7 text-pink-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 dark:text-white mb-1">{doctor.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">
                      {doctor.specialization}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        doctor.status === 'available' ? 'bg-green-500' :
                        doctor.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`} />
                      <span className="text-gray-500 dark:text-gray-400 capitalize">
                        {doctor.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 dark:text-white">${doctor.consultationFee}</p>
                    <p className="text-gray-500 dark:text-gray-400">⭐ {doctor.rating}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Ad Banner */}
        <div className="px-6 pb-6">
          <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <h3 className="text-white mb-2">Special Offer!</h3>
            <p className="text-white/90 mb-4">
              Get 20% off on your first consultation
            </p>
            <Button variant="outline" className="bg-white text-purple-500 border-0 hover:bg-purple-50">
              Learn More
            </Button>
          </Card>
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
};
