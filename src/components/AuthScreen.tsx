import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { User } from '../App';
import { Heart, Stethoscope } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'patient' as 'patient' | 'doctor',
    specialty: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock user creation/login
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'John Doe',
      email: formData.email || 'john@example.com',
      type: formData.userType,
      specialty: formData.userType === 'doctor' ? formData.specialty : undefined,
      status: formData.userType === 'doctor' ? 'available' : undefined,
      points: formData.userType === 'patient' ? 100 : undefined
    };
    
    onLogin(user);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-50 to-white">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Heart className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">MediCare</CardTitle>
          <p className="text-muted-foreground">Your trusted healthcare companion</p>
        </CardHeader>
        <CardContent>
          <Tabs value={isLogin ? 'login' : 'register'} onValueChange={(value) => setIsLogin(value === 'login')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                />
                
                <div className="space-y-3">
                  <p className="text-sm">I am a:</p>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={formData.userType === 'patient' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => handleChange('userType', 'patient')}
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Patient
                    </Button>
                    <Button
                      type="button"
                      variant={formData.userType === 'doctor' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => handleChange('userType', 'doctor')}
                    >
                      <Stethoscope className="h-4 w-4 mr-2" />
                      Doctor
                    </Button>
                  </div>
                </div>

                {formData.userType === 'doctor' && (
                  <Input
                    type="text"
                    placeholder="Medical Specialty"
                    value={formData.specialty}
                    onChange={(e) => handleChange('specialty', e.target.value)}
                  />
                )}
                
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Demo app - Use any credentials to login
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}