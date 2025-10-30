import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { MobileLayout } from '../MobileLayout';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Heart, Camera } from 'lucide-react';
import { toast } from 'sonner';

export const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    age: user?.age?.toString() || '',
    gender: user?.gender || '',
    address: user?.address || '',
    specialization: user?.specialization || '',
    experience: user?.experience?.toString() || '',
    consultationFee: user?.consultationFee?.toString() || '',
    expertise: user?.expertise?.join(', ') || '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    updateUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      age: formData.age ? parseInt(formData.age) : undefined,
      gender: formData.gender,
      address: formData.address,
      specialization: formData.specialization,
      experience: formData.experience ? parseInt(formData.experience) : undefined,
      consultationFee: formData.consultationFee ? parseInt(formData.consultationFee) : undefined,
      expertise: formData.expertise ? formData.expertise.split(',').map((s) => s.trim()) : undefined,
    });

    toast.success('Profile updated successfully!');
    setLoading(false);
    navigate(-1);
  };

  return (
    <MobileLayout title="Edit Profile" showBack>
      <div className="pb-24 p-4">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <Heart className="w-12 h-12 text-pink-500" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Change Photo</p>
        </div>

        {/* Form */}
        <Card className="p-4 space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(v) => handleChange('gender', v)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="mt-2"
              rows={3}
            />
          </div>

          {/* Doctor Specific Fields */}
          {user?.role === 'doctor' && (
            <>
              <div>
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  value={formData.specialization}
                  onChange={(e) => handleChange('specialization', e.target.value)}
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={formData.experience}
                    onChange={(e) => handleChange('experience', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="fee">Consultation Fee ($)</Label>
                  <Input
                    id="fee"
                    type="number"
                    value={formData.consultationFee}
                    onChange={(e) => handleChange('consultationFee', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="expertise">Areas of Expertise (comma-separated)</Label>
                <Textarea
                  id="expertise"
                  value={formData.expertise}
                  onChange={(e) => handleChange('expertise', e.target.value)}
                  placeholder="e.g., Heart Disease, Hypertension, ECG"
                  className="mt-2"
                  rows={3}
                />
              </div>
            </>
          )}
        </Card>

        {/* Save Button */}
        <div className="mt-6 flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 bg-pink-500 hover:bg-pink-600"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};
