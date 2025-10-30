import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { User } from '../App';
import { 
  ArrowLeft,
  Edit,
  Star,
  Award,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Save,
  X
} from 'lucide-react';

interface ProfileScreenProps {
  user: User;
  onNavigate: (screen: string, data?: any) => void;
  onUpdateUser: (user: User) => void;
}

export function ProfileScreen({ user, onNavigate, onUpdateUser }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSave = () => {
    onUpdateUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const mockStats = {
    appointments: user.type === 'patient' ? 12 : 156,
    rating: user.type === 'patient' ? undefined : 4.8,
    experience: user.type === 'patient' ? undefined : '8 years',
    patients: user.type === 'patient' ? undefined : 87
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onNavigate(user.type === 'patient' ? 'patient-dashboard' : 'doctor-dashboard')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1>Profile</h1>
        </div>
        <Button
          variant={isEditing ? "ghost" : "outline"}
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              <AvatarFallback className="text-2xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            {isEditing ? (
              <div className="w-full space-y-3">
                <Input
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                  placeholder="Full Name"
                />
                <Input
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                  placeholder="Email"
                  type="email"
                />
                {user.type === 'doctor' && (
                  <Input
                    value={editedUser.specialty || ''}
                    onChange={(e) => setEditedUser({...editedUser, specialty: e.target.value})}
                    placeholder="Specialty"
                  />
                )}
              </div>
            ) : (
              <>
                <h2>{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                {user.type === 'doctor' && (
                  <Badge variant="secondary" className="mt-2">
                    {user.specialty}
                  </Badge>
                )}
                {user.type === 'patient' && user.points && (
                  <Badge variant="default" className="mt-2">
                    <Star className="h-3 w-3 mr-1" />
                    {user.points} Points
                  </Badge>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      {!isEditing && (
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-semibold">{mockStats.appointments}</p>
              <p className="text-xs text-muted-foreground">
                {user.type === 'patient' ? 'Appointments' : 'Total Appointments'}
              </p>
            </CardContent>
          </Card>
          
          {user.type === 'doctor' ? (
            <>
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                  <p className="text-2xl font-semibold">{mockStats.rating}</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Award className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-semibold">{mockStats.experience}</p>
                  <p className="text-xs text-muted-foreground">Experience</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="h-6 w-6 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-semibold">{mockStats.patients}</p>
                  <p className="text-xs text-muted-foreground">Patients Treated</p>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-4 text-center">
                <Award className="h-6 w-6 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-semibold">{user.points || 0}</p>
                <p className="text-xs text-muted-foreground">Reward Points</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <Input
                  value={editedUser.phone || ''}
                  onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                  placeholder="Phone number"
                />
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <Input
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                  placeholder="Email"
                  type="email"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>{user.phone || 'No phone number added'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>Location not set</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Additional Info for Doctors */}
      {user.type === 'doctor' && (
        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <Textarea
                placeholder="Tell patients about your expertise, education, and approach to healthcare..."
                rows={4}
              />
            ) : (
              <p className="text-muted-foreground">
                Experienced {user.specialty?.toLowerCase()} specialist with a focus on patient-centered care. 
                Committed to providing comprehensive healthcare solutions.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Save Button */}
      {isEditing && (
        <Button className="w-full" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      )}
    </div>
  );
}