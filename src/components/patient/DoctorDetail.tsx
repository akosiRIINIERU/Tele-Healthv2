import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MobileLayout } from '../MobileLayout';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Heart, Star, Calendar, MessageCircle, Phone, Award } from 'lucide-react';
import { mockDoctors } from '../../lib/mockData';

export const DoctorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const doctor = mockDoctors.find((d) => d.id === id);

  if (!doctor) {
    return (
      <MobileLayout title="Doctor Not Found" showBack>
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500 dark:text-gray-400">Doctor not found</p>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout title="Doctor Details" showBack>
      <div className="pb-32">
        {/* Doctor Header */}
        <div className="p-6 bg-gradient-to-br from-pink-500 to-pink-600">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4">
              <Heart className="w-12 h-12 text-pink-500" />
            </div>
            <h2 className="text-white mb-2">{doctor.name}</h2>
            <p className="text-pink-100 mb-3">{doctor.specialization}</p>
            <Badge
              className={
                doctor.status === 'available'
                  ? 'bg-green-100 text-green-700'
                  : doctor.status === 'busy'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-gray-100 text-gray-700'
              }
            >
              {doctor.status}
            </Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 px-6 py-4 -mt-8">
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            </div>
            <p className="text-gray-900 dark:text-white">{doctor.rating}</p>
            <p className="text-gray-500 dark:text-gray-400">Rating</p>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-5 h-5 text-pink-500" />
            </div>
            <p className="text-gray-900 dark:text-white">{doctor.experience}+</p>
            <p className="text-gray-500 dark:text-gray-400">Years</p>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Heart className="w-5 h-5 text-pink-500" />
            </div>
            <p className="text-gray-900 dark:text-white">500+</p>
            <p className="text-gray-500 dark:text-gray-400">Patients</p>
          </Card>
        </div>

        {/* About */}
        <div className="px-6 py-4">
          <h3 className="text-gray-900 dark:text-white mb-3">About Doctor</h3>
          <Card className="p-4">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Dr. {doctor.name.split(' ')[1]} is a highly experienced {doctor.specialization} specialist 
              with over {doctor.experience} years of practice. Dedicated to providing excellent patient 
              care and staying updated with the latest medical advancements.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Consultation Fee</span>
                <span className="text-gray-900 dark:text-white">${doctor.consultationFee}</span>
              </div>
              {doctor.nextAvailable && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Next Available</span>
                  <span className="text-pink-500">{doctor.nextAvailable}</span>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Expertise */}
        <div className="px-6 py-4">
          <h3 className="text-gray-900 dark:text-white mb-3">Areas of Expertise</h3>
          <Card className="p-4">
            <div className="flex flex-wrap gap-2">
              {doctor.expertise.map((exp) => (
                <Badge key={exp} variant="secondary">
                  {exp}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Reviews Section */}
        <div className="px-6 py-4">
          <h3 className="text-gray-900 dark:text-white mb-3">Patient Reviews</h3>
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  <div>
                    <p className="text-gray-900 dark:text-white">Sarah Johnson</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Excellent doctor! Very thorough and caring. Highly recommend.
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  <div>
                    <p className="text-gray-900 dark:text-white">Mike Roberts</p>
                    <div className="flex items-center gap-1">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Very professional and knowledgeable. Great experience.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-16 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate(`/patient/chat/${doctor.id}`)}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate(`/patient/call/${doctor.id}`)}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button
              className="flex-1 bg-pink-500 hover:bg-pink-600"
              onClick={() => navigate(`/patient/book/${doctor.id}`)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book
            </Button>
          </div>
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
};
