import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { MobileLayout } from '../MobileLayout';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Calendar,
  Users,
  DollarSign,
  Clock,
  Heart,
  Bell,
  Menu,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { mockAppointments } from '../../lib/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';

export const DoctorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [status, setStatus] = useState(user?.status || 'available');

  const stats = [
    {
      icon: Users,
      label: 'Total Patients',
      value: '245',
      color: 'bg-blue-100 text-blue-500',
    },
    {
      icon: Calendar,
      label: "Today's Appointments",
      value: '12',
      color: 'bg-pink-100 text-pink-500',
    },
    {
      icon: DollarSign,
      label: 'Monthly Earnings',
      value: '$4,250',
      color: 'bg-green-100 text-green-500',
    },
    {
      icon: Clock,
      label: 'Hours Worked',
      value: '156h',
      color: 'bg-purple-100 text-purple-500',
    },
  ];

  const pendingAppointments = mockAppointments.filter(
    (apt) => apt.status === 'pending'
  );

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus as any);
    updateUser({ status: newStatus as any });
    toast.success(`Status updated to ${newStatus}`);
  };

  const handleAppointmentAction = (id: string, action: 'confirm' | 'reject') => {
    toast.success(
      action === 'confirm'
        ? 'Appointment confirmed'
        : 'Appointment rejected'
    );
  };

  return (
    <MobileLayout>
      <div className="pb-20">
        {/* Header */}
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 px-6 py-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => navigate('/doctor/menu')}>
              <Menu className="w-6 h-6" />
            </button>
            <button onClick={() => navigate('/doctor/notifications')}>
              <Bell className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-pink-100 mb-1">Welcome back,</p>
            <h1 className="text-white">{user?.name}</h1>
            <p className="text-pink-100">{user?.specialization}</p>
          </div>

          {/* Status Selector */}
          <Card className="p-4 bg-white/20 backdrop-blur-sm border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 mb-1">Your Status</p>
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="busy">Busy</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div
                className={`w-3 h-3 rounded-full ${
                  status === 'available'
                    ? 'bg-green-400'
                    : status === 'busy'
                    ? 'bg-yellow-400'
                    : 'bg-gray-400'
                }`}
              />
            </div>
          </Card>
        </div>

        {/* Stats */}
        <div className="px-6 py-6">
          <h2 className="text-gray-900 dark:text-white mb-4">Overview</h2>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="p-4">
                  <div
                    className={`w-10 h-10 rounded-full ${stat.color} flex items-center justify-center mb-3`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-gray-900 dark:text-white">{stat.value}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Pending Appointments */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900 dark:text-white">
              Pending Appointments
            </h2>
            <button
              onClick={() => navigate('/doctor/appointments')}
              className="text-pink-500"
            >
              See All
            </button>
          </div>

          {pendingAppointments.length === 0 ? (
            <Card className="p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">
                No pending appointments
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {pendingAppointments.map((appointment) => (
                <Card key={appointment.id} className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-pink-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 dark:text-white mb-1">
                        {appointment.patientName}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <Clock className="w-4 h-4" />
                        <span>{appointment.time}</span>
                      </div>
                      {appointment.reason && (
                        <p className="text-gray-500 dark:text-gray-400">
                          Reason: {appointment.reason}
                        </p>
                      )}
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                      Pending
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-red-500 border-red-200 hover:bg-red-50"
                      onClick={() =>
                        handleAppointmentAction(appointment.id, 'reject')
                      }
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-green-500 hover:bg-green-600"
                      onClick={() =>
                        handleAppointmentAction(appointment.id, 'confirm')
                      }
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Confirm
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="px-6 pb-6">
          <h2 className="text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Card
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate('/doctor/patients')}
            >
              <Users className="w-8 h-8 text-pink-500 mb-2" />
              <p className="text-gray-900 dark:text-white">View Patients</p>
            </Card>
            <Card
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate('/doctor/withdrawals')}
            >
              <DollarSign className="w-8 h-8 text-green-500 mb-2" />
              <p className="text-gray-900 dark:text-white">Withdraw Funds</p>
            </Card>
          </div>
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
};
