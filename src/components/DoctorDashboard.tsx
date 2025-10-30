import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { User } from '../App';
import { 
  Calendar, 
  MessageCircle, 
  BookOpen, 
  Settings, 
  CreditCard,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign
} from 'lucide-react';

interface DoctorDashboardProps {
  user: User;
  onNavigate: (screen: string, data?: any) => void;
}

export function DoctorDashboard({ user, onNavigate }: DoctorDashboardProps) {
  const [status, setStatus] = useState(user.status || 'available');
  
  const mockAppointments = [
    {
      id: '1',
      patientName: 'Alice Johnson',
      time: '10:00 AM',
      type: 'consultation',
      status: 'pending'
    },
    {
      id: '2',
      patientName: 'Bob Smith',
      time: '2:30 PM',
      type: 'followup',
      status: 'pending'
    }
  ];

  const stats = {
    todayAppointments: 5,
    pendingApprovals: 2,
    earnings: 450,
    patients: 28
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Dr. {user.name.split(' ').slice(-1)[0]}</h1>
          <p className="text-muted-foreground">{user.specialty}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => onNavigate('settings')}>
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* Status Control */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Current Status</p>
              <Badge 
                variant={status === 'available' ? 'default' : status === 'busy' ? 'secondary' : 'outline'}
                className="mt-1"
              >
                {status}
              </Badge>
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-semibold">{stats.todayAppointments}</p>
            <p className="text-xs text-muted-foreground">Today's Appointments</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-semibold">{stats.pendingApprovals}</p>
            <p className="text-xs text-muted-foreground">Pending Approvals</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-semibold">${stats.earnings}</p>
            <p className="text-xs text-muted-foreground">Today's Earnings</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-semibold">{stats.patients}</p>
            <p className="text-xs text-muted-foreground">Total Patients</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Appointments */}
      <div>
        <h2 className="mb-3">Pending Appointments</h2>
        <div className="space-y-3">
          {mockAppointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {appointment.patientName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{appointment.patientName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {appointment.time} • {appointment.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <XCircle className="h-4 w-4" />
                    </Button>
                    <Button size="sm">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('chat')}>
            <CardContent className="p-4 text-center">
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm">Chat with Patients</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('articles')}>
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm">Medical Articles</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('profile')}>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm">Patient Profiles</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('payment')}>
            <CardContent className="p-4 text-center">
              <CreditCard className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm">Earnings</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}