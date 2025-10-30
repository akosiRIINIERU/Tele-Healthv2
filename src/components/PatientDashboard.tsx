import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { User, Doctor } from '../App';
import { 
  Calendar, 
  MessageCircle, 
  BookOpen, 
  Heart, 
  Settings, 
  CreditCard,
  Star,
  Clock,
  Search
} from 'lucide-react';

interface PatientDashboardProps {
  user: User;
  onNavigate: (screen: string, data?: any) => void;
  doctors: Doctor[];
}

export function PatientDashboard({ user, onNavigate, doctors }: PatientDashboardProps) {
  const availableDoctors = doctors.filter(d => d.status === 'available').length;
  
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Welcome back, {user.name.split(' ')[0]}!</h1>
          <p className="text-muted-foreground">How can we help you today?</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            {user.points} pts
          </Badge>
          <Button variant="ghost" size="icon" onClick={() => onNavigate('settings')}>
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('doctors')}>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-sm">Book Appointment</p>
            <p className="text-xs text-muted-foreground">{availableDoctors} doctors available</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('chat')}>
          <CardContent className="p-4 text-center">
            <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-sm">Chat & Call</p>
            <p className="text-xs text-muted-foreground">Get instant help</p>
          </CardContent>
        </Card>
      </div>

      {/* Health Tips Card */}
      <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-pink-800">Daily Health Tips</h3>
              <p className="text-sm text-pink-600">Drink 8 glasses of water daily</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-pink-700"
              onClick={() => onNavigate('health-tips')}
            >
              View All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Featured Doctors */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2>Featured Doctors</h2>
          <Button variant="ghost" size="sm" onClick={() => onNavigate('doctors')}>
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {doctors.slice(0, 2).map((doctor) => (
            <Card key={doctor.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <img src={doctor.avatar} alt={doctor.name} className="w-full h-full object-cover" />
                    <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{doctor.rating}</span>
                      </div>
                      <Badge 
                        variant={doctor.status === 'available' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {doctor.status}
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => onNavigate('booking', { doctor })}
                    disabled={doctor.status !== 'available'}
                  >
                    Book
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div>
        <h2 className="mb-3">Explore</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('articles')}>
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm">Articles & Herbs</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('payment')}>
            <CardContent className="p-4 text-center">
              <CreditCard className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm">Payments</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ad Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <CardContent className="p-4 text-center">
          <Heart className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <p className="text-sm text-blue-800">Health Insurance Plans</p>
          <p className="text-xs text-blue-600">Get 20% off on premium plans</p>
          <Button size="sm" variant="outline" className="mt-2 text-blue-700 border-blue-300">
            Learn More
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}