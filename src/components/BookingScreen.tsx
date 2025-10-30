import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Doctor, User } from '../App';
import { 
  ArrowLeft,
  Star,
  Clock,
  DollarSign,
  Calendar as CalendarIcon
} from 'lucide-react';

interface BookingScreenProps {
  doctor: Doctor;
  patient: User;
  onNavigate: (screen: string, data?: any) => void;
}

export function BookingScreen({ doctor, patient, onNavigate }: BookingScreenProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [symptoms, setSymptoms] = useState('');

  const availableSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !appointmentType) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Mock booking success
    alert('Appointment request sent! You will receive a confirmation soon.');
    onNavigate('patient-dashboard');
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => onNavigate('doctors')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1>Book Appointment</h1>
      </div>

      {/* Doctor Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar className="h-16 w-16">
              <img src={doctor.avatar} alt={doctor.name} className="w-full h-full object-cover" />
              <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium">{doctor.name}</h3>
              <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
              <p className="text-xs text-muted-foreground">{doctor.experience} experience</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{doctor.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  <span className="text-sm">${doctor.fee}</span>
                </div>
                <Badge variant="default" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {doctor.status}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointment Type */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Appointment Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Select value={appointmentType} onValueChange={setAppointmentType}>
            <SelectTrigger>
              <SelectValue placeholder="Select appointment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consultation">General Consultation</SelectItem>
              <SelectItem value="followup">Follow-up Visit</SelectItem>
              <SelectItem value="emergency">Emergency Consultation</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Date Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Select Date</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date() || date.getDay() === 0}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      {/* Time Selection */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Available Times</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {availableSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Symptoms */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Describe Your Symptoms</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Please describe your symptoms or reason for visit..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Booking Summary */}
      {selectedDate && selectedTime && appointmentType && (
        <Card className="bg-pink-50 border-pink-200">
          <CardHeader>
            <CardTitle className="text-lg">Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Doctor:</span>
              <span className="font-medium">{doctor.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span className="font-medium">{selectedDate.toDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Time:</span>
              <span className="font-medium">{selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span>Type:</span>
              <span className="font-medium capitalize">{appointmentType}</span>
            </div>
            <div className="flex justify-between">
              <span>Fee:</span>
              <span className="font-medium">${doctor.fee}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Book Button */}
      <Button 
        className="w-full" 
        size="lg"
        onClick={handleBooking}
        disabled={!selectedDate || !selectedTime || !appointmentType}
      >
        <CalendarIcon className="h-5 w-5 mr-2" />
        Book Appointment
      </Button>
    </div>
  );
}