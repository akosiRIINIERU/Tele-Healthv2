import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '../MobileLayout';
import { Card } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import {
  Calendar,
  MessageCircle,
  FileText,
  Heart,
  Award,
  CreditCard,
  Settings,
  HelpCircle,
  Tag,
  Gift,
  Users,
  Star,
} from 'lucide-react';

export const MenuScreen: React.FC = () => {
  const navigate = useNavigate();

  const menuSections = [
    {
      title: 'Main Features',
      items: [
        { icon: Calendar, label: 'Book Appointment', path: '/patient/doctors', color: 'text-pink-500' },
        { icon: MessageCircle, label: 'Messages', path: '/patient/chat', color: 'text-blue-500' },
        { icon: FileText, label: 'Health Articles', path: '/patient/articles', color: 'text-purple-500' },
        { icon: Heart, label: 'Health Tips', path: '/patient/health-tips', color: 'text-red-500' },
      ],
    },
    {
      title: 'Account',
      items: [
        { icon: Award, label: 'Rewards & Points', path: '/patient/rewards', color: 'text-yellow-500' },
        { icon: CreditCard, label: 'Payment Methods', path: '/patient/payments', color: 'text-green-500' },
        { icon: Settings, label: 'Settings', path: '/patient/settings', color: 'text-gray-500' },
        { icon: HelpCircle, label: 'Help & Support', path: '/patient/support', color: 'text-indigo-500' },
      ],
    },
  ];

  const ads = [
    {
      id: '1',
      title: 'Health Insurance Special',
      description: 'Get 30% off on annual plans',
      image: 'https://images.unsplash.com/photo-1535914254981-b5012eebbd15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NjE3NDM0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: '2',
      title: 'Wellness Package',
      description: 'Complete health checkup for $99',
      image: 'https://images.unsplash.com/photo-1640669860995-91178ad3bef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBtZWRpY2FsfGVufDF8fHx8MTc2MTc5MDAzMnww&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'from-green-500 to-green-600',
    },
  ];

  return (
    <MobileLayout title="Menu" showBack>
      <div className="pb-6">
        {/* Featured Ads */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-5 h-5 text-pink-500" />
            <h3 className="text-gray-900 dark:text-white">Special Offers</h3>
          </div>
          <div className="space-y-3">
            {ads.map((ad) => (
              <Card
                key={ad.id}
                className={`overflow-hidden cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-r ${ad.color} text-white`}
              >
                <div className="p-4 flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-white mb-1">{ad.title}</h3>
                    <p className="text-white/90">{ad.description}</p>
                  </div>
                  <Gift className="w-8 h-8 text-white/80" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Menu Sections */}
        {menuSections.map((section) => (
          <div key={section.title} className="p-4">
            <h3 className="text-gray-900 dark:text-white mb-3">{section.title}</h3>
            <Card className="divide-y divide-gray-200 dark:divide-gray-700">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className={`w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="flex-1 text-left text-gray-900 dark:text-white">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </Card>
          </div>
        ))}

        {/* Banner Ad */}
        <div className="p-4">
          <Card className="overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <div className="p-6 text-center">
              <Star className="w-12 h-12 text-white/80 mx-auto mb-3" />
              <h3 className="text-white mb-2">Refer a Friend</h3>
              <p className="text-white/90 mb-4">
                Get 500 bonus points for each referral
              </p>
              <button className="px-6 py-2 bg-white text-purple-500 rounded-full hover:bg-purple-50">
                Share Now
              </button>
            </div>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="p-4">
          <h3 className="text-gray-900 dark:text-white mb-3">Community</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 text-center cursor-pointer hover:shadow-lg transition-shadow">
              <Users className="w-8 h-8 text-pink-500 mx-auto mb-2" />
              <p className="text-gray-900 dark:text-white">Forum</p>
            </Card>
            <Card className="p-4 text-center cursor-pointer hover:shadow-lg transition-shadow">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-gray-900 dark:text-white">Reviews</p>
            </Card>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};
