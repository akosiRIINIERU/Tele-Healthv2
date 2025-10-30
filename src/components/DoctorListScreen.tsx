import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Doctor } from '../App';
import { 
  ArrowLeft,
  Search,
  Star,
  Clock,
  Phone,
  MessageCircle,
  DollarSign
} from 'lucide-react';

interface DoctorListScreenProps {
  doctors: Doctor[];
  onNavigate: (screen: string, data?: any) => void;
}

export function DoctorListScreen({ doctors, onNavigate }: DoctorListScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const specialties = ['all', ...new Set(doctors.map(d => d.specialty))];
  
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => onNavigate('patient-dashboard')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1>Find Doctors</h1>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search doctors or specialties..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Specialty Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {specialties.map((specialty) => (
          <Button
            key={specialty}
            variant={selectedSpecialty === specialty ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedSpecialty(specialty)}
            className="whitespace-nowrap"
          >
            {specialty === 'all' ? 'All' : specialty}
          </Button>
        ))}
      </div>

      {/* Doctors List */}
      <div className="space-y-3">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Avatar className="h-16 w-16">
                  <img src={doctor.avatar} alt={doctor.name} className="w-full h-full object-cover" />
                  <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      <p className="text-xs text-muted-foreground">{doctor.experience} experience</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{doctor.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <DollarSign className="h-3 w-3" />
                        {doctor.fee}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={doctor.status === 'available' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {doctor.status}
                    </Badge>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onNavigate('chat', { doctor })}
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onNavigate('chat', { doctor })}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => onNavigate('booking', { doctor })}
                        disabled={doctor.status !== 'available'}
                      >
                        Book
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No doctors found matching your search.</p>
        </div>
      )}
    </div>
  );
}