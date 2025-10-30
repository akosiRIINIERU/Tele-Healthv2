import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { MobileLayout } from '../MobileLayout';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import {
  Moon,
  Sun,
  Bell,
  Lock,
  Globe,
  Shield,
  Info,
  ChevronRight,
} from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(true);

  const basePath = user?.role === 'doctor' ? '/doctor' : '/patient';

  const settingsSections = [
    {
      title: 'Appearance',
      items: [
        {
          icon: theme === 'dark' ? Moon : Sun,
          label: 'Dark Mode',
          description: 'Toggle dark/light theme',
          type: 'toggle',
          value: theme === 'dark',
          onChange: toggleTheme,
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Push Notifications',
          description: 'Receive push notifications',
          type: 'toggle',
          value: notifications,
          onChange: () => setNotifications(!notifications),
        },
        {
          icon: Bell,
          label: 'Email Notifications',
          description: 'Receive email updates',
          type: 'toggle',
          value: emailNotifications,
          onChange: () => setEmailNotifications(!emailNotifications),
        },
      ],
    },
    {
      title: 'Security & Privacy',
      items: [
        {
          icon: Lock,
          label: 'Change Password',
          description: 'Update your password',
          type: 'link',
          path: `${basePath}/change-password`,
        },
        {
          icon: Shield,
          label: 'Privacy Settings',
          description: 'Manage your privacy',
          type: 'link',
          path: `${basePath}/privacy`,
        },
      ],
    },
    {
      title: 'General',
      items: [
        {
          icon: Globe,
          label: 'Language',
          description: 'English (US)',
          type: 'link',
          path: `${basePath}/language`,
        },
        {
          icon: Info,
          label: 'About',
          description: 'Version 1.0.0',
          type: 'link',
          path: `${basePath}/about`,
        },
      ],
    },
  ];

  return (
    <MobileLayout title="Settings" showBack>
      <div className="pb-20 p-4">
        {settingsSections.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="text-gray-900 dark:text-white mb-3">{section.title}</h3>
            <Card className="divide-y divide-gray-200 dark:divide-gray-700">
              {section.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="p-4">
                    {item.type === 'toggle' ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <Icon className="w-5 h-5 text-pink-500" />
                          </div>
                          <div>
                            <Label className="text-gray-900 dark:text-white">
                              {item.label}
                            </Label>
                            <p className="text-gray-500 dark:text-gray-400">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={item.value}
                          onCheckedChange={item.onChange}
                        />
                      </div>
                    ) : (
                      <button
                        onClick={() => item.path && navigate(item.path)}
                        className="flex items-center gap-3 w-full"
                      >
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <Icon className="w-5 h-5 text-pink-500" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-gray-900 dark:text-white">
                            {item.label}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400">
                            {item.description}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </button>
                    )}
                  </div>
                );
              })}
            </Card>
          </div>
        ))}
      </div>

      <BottomNav />
    </MobileLayout>
  );
};
