import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback } from './ui/avatar';
import { User } from '../App';
import { 
  ArrowLeft,
  Sun,
  Moon,
  Bell,
  Shield,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
  User as UserIcon,
  Globe,
  Volume2
} from 'lucide-react';

interface SettingsScreenProps {
  user: User;
  theme: 'light' | 'dark';
  onNavigate: (screen: string, data?: any) => void;
  onThemeChange: (theme: 'light' | 'dark') => void;
  onLogout: () => void;
}

export function SettingsScreen({ user, theme, onNavigate, onThemeChange, onLogout }: SettingsScreenProps) {
  const settingsGroups = [
    {
      title: 'Account',
      items: [
        {
          icon: UserIcon,
          label: 'Profile Settings',
          description: 'Manage your personal information',
          action: () => onNavigate('profile')
        },
        {
          icon: Bell,
          label: 'Notifications',
          description: 'Customize your notification preferences',
          hasSwitch: true,
          switchValue: true
        },
        {
          icon: Shield,
          label: 'Privacy & Security',
          description: 'Control your privacy settings',
          action: () => {}
        }
      ]
    },
    {
      title: 'App Preferences',
      items: [
        {
          icon: theme === 'dark' ? Moon : Sun,
          label: 'Theme',
          description: theme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled',
          hasSwitch: true,
          switchValue: theme === 'dark',
          switchAction: () => onThemeChange(theme === 'dark' ? 'light' : 'dark')
        },
        {
          icon: Globe,
          label: 'Language',
          description: 'English (US)',
          action: () => {}
        },
        {
          icon: Volume2,
          label: 'Sound Effects',
          description: 'App sounds and haptics',
          hasSwitch: true,
          switchValue: true
        }
      ]
    },
    {
      title: 'Billing',
      items: [
        {
          icon: CreditCard,
          label: 'Payment Methods',
          description: 'Manage your payment options',
          action: () => onNavigate('payment')
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & Support',
          description: 'Get help and contact support',
          action: () => {}
        }
      ]
    }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onNavigate(user.type === 'patient' ? 'patient-dashboard' : 'doctor-dashboard')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1>Settings</h1>
      </div>

      {/* User Profile Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-16 w-16">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              <AvatarFallback className="text-lg">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {user.type === 'doctor' ? `Doctor • ${user.specialty}` : 'Patient'}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('profile')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings Groups */}
      {settingsGroups.map((group) => (
        <div key={group.title}>
          <h2 className="mb-3 text-muted-foreground">{group.title}</h2>
          <Card>
            <CardContent className="p-0">
              {group.items.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.label}>
                    <div 
                      className={`flex items-center gap-4 p-4 ${
                        item.action ? 'cursor-pointer hover:bg-muted/50' : ''
                      }`}
                      onClick={item.action}
                    >
                      <div className="p-2 bg-muted rounded-lg">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      {item.hasSwitch ? (
                        <Switch 
                          checked={item.switchValue} 
                          onCheckedChange={item.switchAction}
                        />
                      ) : item.action ? (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      ) : null}
                    </div>
                    {index < group.items.length - 1 && (
                      <div className="h-px bg-border mx-4" />
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      ))}

      {/* App Info */}
      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground">MediCare v1.0.0</p>
          <p className="text-xs text-muted-foreground mt-1">
            Your trusted healthcare companion
          </p>
        </CardContent>
      </Card>

      {/* Logout Button */}
      <Button 
        variant="outline" 
        className="w-full text-destructive hover:text-destructive" 
        onClick={onLogout}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );
}