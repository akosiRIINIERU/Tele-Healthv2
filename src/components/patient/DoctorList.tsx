import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '../MobileLayout';
import { BottomNav } from '../BottomNav';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Heart, Search, Filter, Star } from 'lucide-react';
import { mockDoctors } from '../../lib/mockData';
import { Button } from '../ui/button';

export const DoctorList: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'available' | 'busy'>('all');

  const filteredDoctors = mockDoctors.filter((doctor) => {
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' || 
      doctor.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <MobileLayout title="Find Doctors" showBack>
      <div className="pb-20">
        {/* Search and Filter */}
        <div className="p-4 space-y-3 bg-white dark:bg-gray-800 sticky top-14 z-10 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search doctors or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-pink-500 hover:bg-pink-600' : ''}
            >
              All
            </Button>
            <Button
              variant={filter === 'available' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('available')}
              className={filter === 'available' ? 'bg-pink-500 hover:bg-pink-600' : ''}
            >
              Available
            </Button>
            <Button
              variant={filter === 'busy' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('busy')}
              className={filter === 'busy' ? 'bg-pink-500 hover:bg-pink-600' : ''}
            >
              Busy
            </Button>
          </div>
        </div>

        {/* Doctor List */}
        <div className="p-4 space-y-3">
          {filteredDoctors.map((doctor) => (
            <Card
              key={doctor.id}
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/patient/doctor/${doctor.id}`)}
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-10 h-10 text-pink-500" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-gray-900 dark:text-white mb-1">{doctor.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{doctor.specialization}</p>
                    </div>
                    <Badge
                      variant={doctor.status === 'available' ? 'default' : 'secondary'}
                      className={
                        doctor.status === 'available'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : doctor.status === 'busy'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                      }
                    >
                      {doctor.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span>{doctor.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{doctor.experience} years exp.</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-gray-900 dark:text-white">${doctor.consultationFee}</p>
                    {doctor.nextAvailable && (
                      <p className="text-pink-500">{doctor.nextAvailable}</p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {doctor.expertise.slice(0, 2).map((exp) => (
                      <Badge
                        key={exp}
                        variant="outline"
                        className="text-xs"
                      >
                        {exp}
                      </Badge>
                    ))}
                    {doctor.expertise.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{doctor.expertise.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No doctors found</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
};
