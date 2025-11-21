import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MobileLayout } from '../MobileLayout';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Calendar } from '../ui/calendar';
import { Heart, Check } from 'lucide-react';
import { mockDoctors } from '../../lib/mockData';
import { toast } from 'sonner';

export const BookAppointment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const doctor = mockDoctors.find((d) => d.id === id);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  ];

  const handleBooking = async () => {
    if (!date || !selectedTime) {
      toast.error('Please select date and time');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Appointment booked successfully!');
    navigate('/patient/appointments');
  };

  if (!doctor) {
    return (
      <MobileLayout title="Book Appointment" showBack>
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500 dark:text-gray-400">Doctor not found</p>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout title="Book Appointment" showBack>
      <div className="pb-24 p-4">
        {/* Doctor Info */}
        <Card className="p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <Heart className="w-7 h-7 text-pink-500" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white">{doctor.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{doctor.specialization}</p>
              <p className="text-pink-500">${doctor.consultationFee}</p>
            </div>
          </div>
        </Card>

        {/* Select Date */}
        <div className="mb-6">
          <h3 className="text-gray-900 dark:text-white mb-3">Select Date</h3>
          <Card className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < new Date()}
              className="rounded-md border-0"
            />
          </Card>
        </div>

        {/* Select Time */}
        <div className="mb-6">
          <h3 className="text-gray-900 dark:text-white mb-3">Select Time</h3>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedTime === time
                    ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20 text-pink-500'
                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-pink-300'
                }`}
              >
                <div className="flex flex-col items-center">
                  {selectedTime === time && <Check className="w-4 h-4 mb-1" />}
                  <span className="text-xs">{time}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Reason */}
        <div className="mb-6">
          <Label htmlFor="reason">Reason for Visit (Optional)</Label>
          <Textarea
            id="reason"
            placeholder="Describe your symptoms or reason for consultation..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-2"
            rows={4}
          />
        </div>

        {/* Summary */}
        <Card className="p-4 mb-6 bg-pink-50 dark:bg-pink-900/20">
          <h3 className="text-gray-900 dark:text-white mb-3">Booking Summary</h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-400">
            <div className="flex justify-between">
              <span>Date</span>
              <span className="text-gray-900 dark:text-white">
                {date?.toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Time</span>
              <span className="text-gray-900 dark:text-white">
                {selectedTime || 'Not selected'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Consultation Fee</span>
              <span className="text-gray-900 dark:text-white">
                ${doctor.consultationFee}
              </span>
            </div>
            <div className="border-t border-pink-200 dark:border-pink-800 pt-2 mt-2" />
            <div className="flex justify-between">
              <span>Total</span>
              <span className="text-pink-500">${doctor.consultationFee}</span>
            </div>
          </div>
        </Card>

        {/* Book Button */}
        <Button
          onClick={handleBooking}
          disabled={loading || !date || !selectedTime}
          className="w-full bg-pink-500 hover:bg-pink-600"
        >
          {loading ? 'Booking...' : 'Confirm Booking'}
        </Button>
      </div>
    </MobileLayout>
  );
};
