import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveLayout } from '../ResponsiveLayout';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  ArrowLeft,
  Bell,
  Calendar,
  MessageCircle,
  Pill,
  CreditCard,
  Heart,
  AlertCircle,
  CheckCircle,
  Info,
  Crown,
  X,
} from 'lucide-react';

type NotificationType = 'appointment' | 'message' | 'order' | 'payment' | 'health' | 'system' | 'subscription';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  actionLabel?: string;
  actionPath?: string;
  priority?: 'low' | 'medium' | 'high';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'appointment',
    title: 'Upcoming Appointment',
    message: 'You have an appointment with Dr. Sarah Johnson tomorrow at 10:00 AM',
    time: '2 hours ago',
    isRead: false,
    priority: 'high',
    actionLabel: 'View Details',
    actionPath: '/patient/appointments',
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message',
    message: 'Dr. Michael Chen sent you a message about your recent consultation',
    time: '5 hours ago',
    isRead: false,
    priority: 'medium',
    actionLabel: 'Read Message',
    actionPath: '/patient/chat',
  },
  {
    id: '3',
    type: 'order',
    title: 'Order Shipped',
    message: 'Your medicine order #12345 has been shipped and will arrive in 2-3 days',
    time: '1 day ago',
    isRead: true,
    priority: 'medium',
    actionLabel: 'Track Order',
    actionPath: '/patient/orders',
  },
  {
    id: '4',
    type: 'payment',
    title: 'Payment Successful',
    message: 'Your payment of ₱500 for consultation has been processed successfully',
    time: '2 days ago',
    isRead: true,
    priority: 'low',
    actionLabel: 'View Receipt',
    actionPath: '/patient/payments',
  },
  {
    id: '5',
    type: 'health',
    title: 'Daily Health Tip',
    message: 'Remember to drink at least 8 glasses of water today to stay hydrated!',
    time: '3 days ago',
    isRead: true,
    priority: 'low',
    actionLabel: 'View Tips',
    actionPath: '/patient/health-tips',
  },
  {
    id: '6',
    type: 'subscription',
    title: 'Subscription Active',
    message: 'Your Family Plan subscription is now active. Enjoy premium benefits!',
    time: '1 week ago',
    isRead: true,
    priority: 'medium',
    actionLabel: 'Manage',
    actionPath: '/patient/subscription',
  },
  {
    id: '7',
    type: 'system',
    title: 'New Feature Available',
    message: 'Check out our new medicine shop with delivery options!',
    time: '1 week ago',
    isRead: true,
    priority: 'low',
    actionLabel: 'Explore',
    actionPath: '/patient/medicine-shop',
  },
];

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'appointment':
      return Calendar;
    case 'message':
      return MessageCircle;
    case 'order':
      return Pill;
    case 'payment':
      return CreditCard;
    case 'health':
      return Heart;
    case 'subscription':
      return Crown;
    case 'system':
      return Info;
    default:
      return Bell;
  }
};

const getNotificationColor = (type: NotificationType) => {
  switch (type) {
    case 'appointment':
      return 'bg-pink-100 text-pink-500 dark:bg-pink-900/20 dark:text-pink-400';
    case 'message':
      return 'bg-blue-100 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400';
    case 'order':
      return 'bg-teal-100 text-teal-500 dark:bg-teal-900/20 dark:text-teal-400';
    case 'payment':
      return 'bg-green-100 text-green-500 dark:bg-green-900/20 dark:text-green-400';
    case 'health':
      return 'bg-red-100 text-red-500 dark:bg-red-900/20 dark:text-red-400';
    case 'subscription':
      return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400';
    case 'system':
      return 'bg-purple-100 text-purple-500 dark:bg-purple-900/20 dark:text-purple-400';
    default:
      return 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400';
  }
};

const getPriorityIcon = (priority?: string) => {
  switch (priority) {
    case 'high':
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    case 'medium':
      return <Info className="w-4 h-4 text-yellow-600" />;
    default:
      return null;
  }
};

export const NotificationsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filterNotifications = (type: string) => {
    if (type === 'all') return notifications;
    if (type === 'unread') return notifications.filter(n => !n.isRead);
    return notifications.filter(n => n.type === type);
  };

  const filteredNotifications = filterNotifications(activeTab);

  return (
    <ResponsiveLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-gray-900 dark:text-white">Notifications</h1>
                {unreadCount > 0 && (
                  <p className="text-gray-500 dark:text-gray-400">
                    {unreadCount} unread
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-pink-500"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Mark all read
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto bg-transparent border-0 h-auto p-0">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pink-500 rounded-none px-4 py-3"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pink-500 rounded-none px-4 py-3"
              >
                Unread
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-pink-100 text-pink-600 dark:bg-pink-900/20">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="appointment"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pink-500 rounded-none px-4 py-3"
              >
                Appointments
              </TabsTrigger>
              <TabsTrigger
                value="order"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pink-500 rounded-none px-4 py-3"
              >
                Orders
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Notifications List */}
        <div className="px-4 py-4 space-y-3">
          {filteredNotifications.length === 0 ? (
            <Card className="p-8 text-center">
              <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <h3 className="text-gray-900 dark:text-white mb-2">No notifications</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {activeTab === 'unread'
                  ? "You're all caught up!"
                  : 'No notifications to show'}
              </p>
            </Card>
          ) : (
            <>
              {filteredNotifications.map(notification => {
                const Icon = getNotificationIcon(notification.type);
                return (
                  <Card
                    key={notification.id}
                    className={`p-4 transition-all hover:shadow-md cursor-pointer ${
                      !notification.isRead
                        ? 'bg-pink-50/50 dark:bg-pink-900/10 border-l-4 border-l-pink-500'
                        : ''
                    }`}
                    onClick={() => {
                      markAsRead(notification.id);
                      if (notification.actionPath) {
                        navigate(notification.actionPath);
                      }
                    }}
                  >
                    <div className="flex gap-3">
                      <div className={`p-3 rounded-xl ${getNotificationColor(notification.type)} shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <h3 className="text-gray-900 dark:text-white truncate">
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-pink-500 rounded-full shrink-0" />
                            )}
                            {getPriorityIcon(notification.priority)}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors shrink-0"
                            aria-label="Delete notification"
                          >
                            <X className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 dark:text-gray-500">
                            {notification.time}
                          </span>
                          {notification.actionLabel && (
                            <span className="text-pink-500">
                              {notification.actionLabel} →
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
              
              {filteredNotifications.length > 0 && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearAll}
                >
                  Clear All Notifications
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </ResponsiveLayout>
  );
};
