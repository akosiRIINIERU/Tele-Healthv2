import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveLayout } from '../ResponsiveLayout';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Heart, Calendar, Clock, XCircle, Star } from 'lucide-react';
import { mockAppointments } from '../../lib/mockData';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { RatingDialog } from './RatingDialog';

export const PatientAppointments: React.FC = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState(mockAppointments.map(apt => ({
    ...apt,
    cancelPending: false,
    rated: false,
  })));
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [selectedRatingAppointment, setSelectedRatingAppointment] = useState<any>(null);

  const handleCancelAppointment = (id: string) => {
    setAppointments(prev =>
      prev.map(apt => apt.id === id ? { ...apt, status: 'cancelled' as const, cancelPending: false } : apt)
    );
    setSelectedAppointment(null);
    toast.success('Appointment cancelled');
  };

  const handleRequestCancel = (id: string) => {
    setAppointments(prev =>
      prev.map(apt => apt.id === id ? { ...apt, cancelPending: true } : apt)
    );
    setSelectedAppointment(null);
    toast.success('Cancellation request sent to doctor');
  };

  const handleRateDoctor = (appointment: any) => {
    setSelectedRatingAppointment(appointment);
    setRatingDialogOpen(true);
  };

  const handleRatingSubmit = (rating: number, review: string) => {
    if (selectedRatingAppointment) {
      setAppointments(prev =>
        prev.map(apt => 
          apt.id === selectedRatingAppointment.id 
            ? { ...apt, rated: true, userRating: rating, userReview: review } 
            : apt
        )
      );
    }
  };

  // Helper function to check if appointment can be cancelled (3 days before)
  const canCancelAppointment = (appointmentDate: string) => {
    const today = new Date();
    const apptDate = new Date(appointmentDate);
    const diffTime = apptDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 3;
  };

  const upcomingAppointments = appointments.filter(
    apt => apt.status === 'confirmed' || apt.status === 'pending'
  );
  const pastAppointments = appointments.filter(
    apt => apt.status === 'completed' || apt.status === 'cancelled'
  );

  return (
    <ResponsiveLayout title="My Appointments">
      <div>
        <Tabs defaultValue="upcoming" className="w-full">
          <div className="sticky top-14 md:top-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10">
            <div className="px-4 md:px-6 lg:px-8">
              <TabsList className="w-full max-w-md grid grid-cols-2 h-12">
                <TabsTrigger value="upcoming" aria-label="View upcoming appointments">Upcoming</TabsTrigger>
                <TabsTrigger value="past" aria-label="View past appointments">Past</TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="upcoming" className="p-4 md:p-6 lg:p-8">
            {upcomingAppointments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No upcoming appointments</p>
                <Button
                  onClick={() => navigate('/patient/doctors')}
                  className="mt-4 bg-pink-500 hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  aria-label="Book a new appointment"
                >
                  Book Appointment
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id} className="p-4 md:p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="w-7 h-7 text-pink-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1 gap-2">
                          <h3 className="text-gray-900 dark:text-white">{appointment.doctorName}</h3>
                          <div className="flex flex-col gap-1 items-end">
                            <Badge
                              className={
                                appointment.status === 'confirmed'
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                              }
                            >
                              {appointment.status}
                            </Badge>
                            {appointment.cancelPending && (
                              <Badge variant="outline" className="text-xs border-orange-300 text-orange-700 dark:border-orange-700 dark:text-orange-300">
                                Cancel Pending
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          {appointment.doctorSpecialization}
                        </p>
                        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" aria-hidden="true" />
                            <span>{new Date(appointment.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" aria-hidden="true" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                        {appointment.reason && (
                          <p className="text-gray-500 dark:text-gray-400 mt-2">
                            Reason: {appointment.reason}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                        onClick={() => setSelectedAppointment(appointment.id)}
                        disabled={appointment.cancelPending || !canCancelAppointment(appointment.date)}
                        aria-label={`Cancel appointment with ${appointment.doctorName}`}
                      >
                        <XCircle className="w-4 h-4 mr-1" aria-hidden="true" />
                        {appointment.cancelPending ? 'Pending...' : 'Cancel'}
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-pink-500 hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                        onClick={() => navigate(`/patient/doctor/${appointment.doctorId}`)}
                        aria-label={`View details for ${appointment.doctorName}`}
                      >
                        View Details
                      </Button>
                    </div>
                    {!canCancelAppointment(appointment.date) && !appointment.cancelPending && (
                      <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                        Cancellation requires 3 days advance notice
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="p-4 md:p-6 lg:p-8">
            {pastAppointments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No past appointments</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {pastAppointments.map((appointment) => (
                  <Card key={appointment.id} className="p-4 md:p-5 opacity-75">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="w-7 h-7 text-pink-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="text-gray-900 dark:text-white">{appointment.doctorName}</h3>
                          <Badge variant="secondary">{appointment.status}</Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          {appointment.doctorSpecialization}
                        </p>
                        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" aria-hidden="true" />
                            <span>{new Date(appointment.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" aria-hidden="true" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                        {appointment.rated && (
                          <div className="flex items-center gap-1 mt-2 text-yellow-600 dark:text-yellow-500">
                            <Star className="w-4 h-4 fill-yellow-500" aria-hidden="true" />
                            <span>Rated: {(appointment as any).userRating}/5</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {appointment.status === 'completed' && !appointment.rated && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <Button
                          size="sm"
                          className="w-full bg-pink-500 hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                          onClick={() => handleRateDoctor(appointment)}
                          aria-label={`Rate ${appointment.doctorName}`}
                        >
                          <Star className="w-4 h-4 mr-2" aria-hidden="true" />
                          Rate Doctor
                        </Button>
                      </div>
                    )}
                    {appointment.status === 'completed' && appointment.rated && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                          onClick={() => navigate(`/patient/doctor/${appointment.doctorId}`)}
                          aria-label={`View doctor details to edit rating for ${appointment.doctorName}`}
                        >
                          <Star className="w-4 h-4 mr-2" aria-hidden="true" />
                          View Doctor to Edit Rating
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <AlertDialog open={selectedAppointment !== null} onOpenChange={() => setSelectedAppointment(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to request cancellation? The doctor will need to approve this request.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel aria-label="Keep appointment">Keep Appointment</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedAppointment && handleRequestCancel(selectedAppointment)}
              className="bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Request cancellation"
            >
              Request Cancellation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {selectedRatingAppointment && (
        <RatingDialog
          open={ratingDialogOpen}
          onOpenChange={setRatingDialogOpen}
          doctorName={selectedRatingAppointment.doctorName}
          doctorId={selectedRatingAppointment.doctorId}
          appointmentId={selectedRatingAppointment.id}
          onRatingSubmit={handleRatingSubmit}
          existingRating={(selectedRatingAppointment as any).userRating || 0}
          existingReview={(selectedRatingAppointment as any).userReview || ''}
        />
      )}
    </ResponsiveLayout>
  );
};
