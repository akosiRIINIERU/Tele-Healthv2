import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { MobileLayout } from '../MobileLayout';
import { Heart, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    gender: '',
    specialization: '',
    experience: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await register({
        ...formData,
        role,
        age: formData.age ? parseInt(formData.age) : undefined,
        experience: formData.experience ? parseInt(formData.experience) : undefined,
      });
      navigate(role === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');
    } catch (error) {
      console.error('Registration failed', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    // Demo Google signup
    toast.info('Google Sign-Up is a demo feature. For production, complete setup at: https://supabase.com/docs/guides/auth/social-login/auth-google');
    setLoading(true);
    
    try {
      // For demo purposes, create a new account with Google-like email
      const timestamp = Date.now();
      await register({
        name: `Google User ${timestamp}`,
        email: `googleuser${timestamp}@gmail.com`,
        password: `google${timestamp}`,
        role,
      });
      navigate(role === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');
    } catch (error) {
      console.error('Google signup failed', error);
      toast.error('Google sign-up failed. Please try regular registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <MobileLayout title="Create Account" showBack>
      <div className="p-6 pb-24">
        <div className="max-w-sm mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-full">
                <Heart className="w-12 h-12 text-pink-500" />
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              Join our healthcare community
            </p>
          </div>

          <Tabs value={role} onValueChange={(v) => setRole(v as 'patient' | 'doctor')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="patient" aria-label="Register as Patient">Patient</TabsTrigger>
              <TabsTrigger value="doctor" aria-label="Register as Doctor">Doctor</TabsTrigger>
            </TabsList>
            
            <TabsContent value={role} className="mt-6">
              {/* Google Sign Up Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full mb-4 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={handleGoogleSignup}
                disabled={loading}
                aria-label={`Sign up with Google as ${role}`}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="relative my-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                  or
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    aria-required="true"
                    aria-label="Full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    aria-required="true"
                    aria-label="Email address"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    required
                    aria-required="true"
                    aria-label="Password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    aria-label="Phone number"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Age"
                      value={formData.age}
                      onChange={(e) => handleChange('age', e.target.value)}
                      aria-label="Age"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(v) => handleChange('gender', v)}>
                      <SelectTrigger aria-label="Select gender">
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

                {role === 'doctor' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Input
                        id="specialization"
                        placeholder="e.g., Cardiology"
                        value={formData.specialization}
                        onChange={(e) => handleChange('specialization', e.target.value)}
                        required
                        aria-required="true"
                        aria-label="Specialization"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        type="number"
                        placeholder="Years"
                        value={formData.experience}
                        onChange={(e) => handleChange('experience', e.target.value)}
                        required
                        aria-required="true"
                        aria-label="Years of experience"
                      />
                    </div>
                  </>
                )}

                <Button
                  type="submit"
                  className="w-full bg-pink-500 hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  disabled={loading}
                  aria-label={`Create account as ${role}`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-pink-500 hover:text-pink-600 hover:underline focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded"
                aria-label="Go to sign in page"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};