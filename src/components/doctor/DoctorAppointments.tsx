import React from 'react';
import { MobileLayout } from '../MobileLayout';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Heart, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { mockAppointments } from '../../lib/mockData';
import { toast } from 'sonner';

export const DoctorAppointments: React.FC = () => {
  const pendingAppointments = mockAppointments.filter(
    (apt) => apt.status === 'pending'
  );
  const confirmedAppointments = mockAppointments.filter(
    (apt) => apt.status === 'confirmed'
  );
  const completedAppointments = mockAppointments.filter(
    (apt) => apt.status === 'completed'
  );

  const handleAction = (id: string, action: 'confirm' | 'reject' | 'complete') => {
    toast.success(
      action === 'confirm'
        ? 'Appointment confirmed'
        : action === 'reject'
        ? 'Appointment rejected'
        : 'Appointment completed'
    );
  };

  return (
    <MobileLayout title="Appointments">
      <div className="pb-20">
        <Tabs defaultValue="pending" className="w-full">
          <div className="sticky top-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10">
            <TabsList className="w-full grid grid-cols-3 h-12">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
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
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
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
                      className="flex-1 text-red-500 border-red-200 hover:bg-red-50"
                      onClick={() => handleAction(appointment.id, 'reject')}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-green-500 hover:bg-green-600"
                      onClick={() => handleAction(appointment.id, 'confirm')}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
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
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
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
                      className="flex-1 bg-pink-500 hover:bg-pink-600"
                      onClick={() => handleAction(appointment.id, 'complete')}
                    >
                      Mark as Complete
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
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
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

      <BottomNav />
    </MobileLayout>
  );
};
