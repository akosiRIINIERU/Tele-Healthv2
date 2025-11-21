import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveLayout } from '../ResponsiveLayout';
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
    <ResponsiveLayout title="Find Doctors" showBack>
      <div>
        {/* Search and Filter */}
        <div className="p-4 md:p-6 lg:p-8 space-y-3 bg-white dark:bg-gray-800 sticky top-14 md:top-16 z-10 border-b border-gray-200 dark:border-gray-700">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
            <Input
              placeholder="Search doctors or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search doctors or specialization"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter doctors by status">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-pink-500 hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2' : 'focus:ring-2 focus:ring-pink-500 focus:ring-offset-2'}
              aria-label="Show all doctors"
              aria-pressed={filter === 'all'}
            >
              All
            </Button>
            <Button
              variant={filter === 'available' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('available')}
              className={filter === 'available' ? 'bg-pink-500 hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2' : 'focus:ring-2 focus:ring-pink-500 focus:ring-offset-2'}
              aria-label="Show only available doctors"
              aria-pressed={filter === 'available'}
            >
              Available
            </Button>
            <Button
              variant={filter === 'busy' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('busy')}
              className={filter === 'busy' ? 'bg-pink-500 hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2' : 'focus:ring-2 focus:ring-pink-500 focus:ring-offset-2'}
              aria-label="Show only busy doctors"
              aria-pressed={filter === 'busy'}
            >
              Busy
            </Button>
          </div>
        </div>

        {/* Doctor List - Grid on larger screens */}
        <div className="p-4 md:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {filteredDoctors.map((doctor) => (
              <Card
                key={doctor.id}
                className="p-4 md:p-5 cursor-pointer hover:shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-pink-500 focus-within:ring-offset-2"
                onClick={() => navigate(`/patient/doctor/${doctor.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/patient/doctor/${doctor.id}`);
                  }
                }}
                aria-label={`View ${doctor.name}, ${doctor.specialization} specialist, ${doctor.status}, rated ${doctor.rating} stars`}
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <Heart className="w-10 h-10 md:w-12 md:h-12 text-pink-500" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900 dark:text-white mb-1 truncate">{doctor.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 truncate">{doctor.specialization}</p>
                      </div>
                      <Badge
                        variant={doctor.status === 'available' ? 'default' : 'secondary'}
                        className={
                          doctor.status === 'available'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 flex-shrink-0'
                            : doctor.status === 'busy'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 flex-shrink-0'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 flex-shrink-0'
                        }
                        aria-label={`Status: ${doctor.status}`}
                      >
                        {doctor.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-2">
                      <div className="flex items-center gap-1" aria-label={`Rating: ${doctor.rating} out of 5 stars`}>
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" aria-hidden="true" />
                        <span>{doctor.rating}</span>
                      </div>
                      <span aria-hidden="true">•</span>
                      <span aria-label={`${doctor.experience} years of experience`}>{doctor.experience} years exp.</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-gray-900 dark:text-white" aria-label={`Consultation fee: $${doctor.consultationFee}`}>${doctor.consultationFee}</p>
                      {doctor.nextAvailable && (
                        <p className="text-pink-500" aria-label={`Next available: ${doctor.nextAvailable}`}>{doctor.nextAvailable}</p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2" role="list" aria-label="Areas of expertise">
                      {doctor.expertise.slice(0, 2).map((exp) => (
                        <Badge
                          key={exp}
                          variant="outline"
                          className="text-xs"
                          role="listitem"
                        >
                          {exp}
                        </Badge>
                      ))}
                      {doctor.expertise.length > 2 && (
                        <Badge variant="outline" className="text-xs" role="listitem">
                          +{doctor.expertise.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-12" role="status" aria-live="polite">
              <p className="text-gray-500 dark:text-gray-400">No doctors found</p>
            </div>
          )}
        </div>
      </div>
    </ResponsiveLayout>
  );
};