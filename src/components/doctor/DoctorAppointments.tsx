import React, { useState } from 'react';
import { MobileLayout } from '../MobileLayout';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Heart, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
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

export const DoctorAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState(mockAppointments.map(apt => ({
    ...apt,
    cancelPending: false,
  })));
  const [selectedCancelRequest, setSelectedCancelRequest] = useState<string | null>(null);

  const pendingAppointments = appointments.filter(
    (apt) => apt.status === 'pending'
  );
  const confirmedAppointments = appointments.filter(
    (apt) => apt.status === 'confirmed'
  );
  const completedAppointments = appointments.filter(
    (apt) => apt.status === 'completed'
  );
  const cancelRequests = appointments.filter(
    (apt) => apt.cancelPending
  );

  const handleAction = (id: string, action: 'confirm' | 'reject' | 'complete') => {
    setAppointments(prev =>
      prev.map(apt => {
        if (apt.id === id) {
          if (action === 'confirm') return { ...apt, status: 'confirmed' as const };
          if (action === 'reject') return { ...apt, status: 'cancelled' as const };
          if (action === 'complete') return { ...apt, status: 'completed' as const };
        }
        return apt;
      })
    );
    
    toast.success(
      action === 'confirm'
        ? 'Appointment confirmed'
        : action === 'reject'
        ? 'Appointment rejected'
        : 'Appointment completed'
    );
  };

  const handleCancelRequest = (id: string, approve: boolean) => {
    setAppointments(prev =>
      prev.map(apt => 
        apt.id === id 
          ? { ...apt, cancelPending: false, status: approve ? 'cancelled' as const : apt.status }
          : apt
      )
    );
    setSelectedCancelRequest(null);
    toast.success(approve ? 'Cancellation approved' : 'Cancellation request denied');
  };

  return (
    <MobileLayout title="Appointments">
      <div className="pb-20">
        <Tabs defaultValue="pending" className="w-full">
          <div className="sticky top-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10">
            <TabsList className="w-full grid grid-cols-4 h-12">
              <TabsTrigger value="pending" aria-label="View pending appointments">
                Pending
                {pendingAppointments.length > 0 && (
                  <Badge className="ml-1 bg-yellow-500" aria-label={`${pendingAppointments.length} pending`}>
                    {pendingAppointments.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="confirmed" aria-label="View confirmed appointments">Confirmed</TabsTrigger>
              <TabsTrigger value="cancellations" aria-label="View cancellation requests">
                Cancel
                {cancelRequests.length > 0 && (
                  <Badge className="ml-1 bg-orange-500" aria-label={`${cancelRequests.length} cancellation requests`}>
                    {cancelRequests.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="completed" aria-label="View completed appointments">Done</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="pending" className="p-4 space-y-3">
            {pendingAppointments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No pending appointments</p>
              </div>
            ) : (
              pendingAppointments.map((appointment) => (
                <Card key={appointment.id} className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-7 h-7 text-pink-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-gray-900 dark:text-white">{appointment.patientName}</h3>
                        <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                          Pending
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-2">
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
                        <p className="text-gray-500 dark:text-gray-400">
                          Reason: {appointment.reason}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-red-500 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      onClick={() => handleAction(appointment.id, 'reject')}
                      aria-label={`Reject appointment with ${appointment.patientName}`}
                    >
                      <XCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      onClick={() => handleAction(appointment.id, 'confirm')}
                      aria-label={`Confirm appointment with ${appointment.patientName}`}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                      Confirm
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="confirmed" className="p-4 space-y-3">
            {confirmedAppointments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No confirmed appointments</p>
              </div>
            ) : (
              confirmedAppointments.map((appointment) => (
                <Card key={appointment.id} className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-7 h-7 text-pink-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-gray-900 dark:text-white">{appointment.patientName}</h3>
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          Confirmed
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-2">
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
                        <p className="text-gray-500 dark:text-gray-400">
                          Reason: {appointment.reason}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      size="sm"
                      className="flex-1 bg-pink-500 hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                      onClick={() => handleAction(appointment.id, 'complete')}
                      aria-label={`Mark appointment with ${appointment.patientName} as complete`}
                    >
                      Mark as Complete
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="cancellations" className="p-4 space-y-3">
            {cancelRequests.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No pending cancellation requests</p>
              </div>
            ) : (
              cancelRequests.map((appointment) => (
                <Card key={appointment.id} className="p-4 border-orange-200 dark:border-orange-900">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-7 h-7 text-pink-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-gray-900 dark:text-white">{appointment.patientName}</h3>
                        <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300">
                          Cancel Request
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-2">
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
                        <p className="text-gray-500 dark:text-gray-400">
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
                      onClick={() => handleCancelRequest(appointment.id, false)}
                      aria-label={`Deny cancellation request from ${appointment.patientName}`}
                    >
                      Deny
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      onClick={() => setSelectedCancelRequest(appointment.id)}
                      aria-label={`Approve cancellation request from ${appointment.patientName}`}
                    >
                      Approve Cancel
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="p-4 space-y-3">
            {completedAppointments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No completed appointments</p>
              </div>
            ) : (
              completedAppointments.map((appointment) => (
                <Card key={appointment.id} className="p-4 opacity-75">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-7 h-7 text-pink-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-gray-900 dark:text-white">{appointment.patientName}</h3>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
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
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      <AlertDialog open={selectedCancelRequest !== null} onOpenChange={() => setSelectedCancelRequest(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Cancellation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve this cancellation request? This will cancel the appointment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel aria-label="Go back">Go Back</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedCancelRequest && handleCancelRequest(selectedCancelRequest, true)}
              className="bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Approve cancellation"
            >
              Approve Cancellation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <BottomNav />
    </MobileLayout>
  );
};