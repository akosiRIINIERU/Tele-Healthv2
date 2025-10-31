import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, doctorApi, userApi } from '../lib/supabaseClient';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor';
  avatar?: string;
  phone?: string;
  age?: number;
  gender?: string;
  address?: string;
  points?: number;
  // Doctor specific
  specialization?: string;
  experience?: number;
  rating?: number;
  status?: 'available' | 'busy' | 'offline';
  consultationFee?: number;
  expertise?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'patient' | 'doctor') => Promise<void>;
  register: (data: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await authApi.getCurrentUser();
        if (currentUser) {
          // If doctor, merge doctor profile data
          if (currentUser.role === 'doctor') {
            try {
              const doctorData = await doctorApi.getById(currentUser.id);
              setUser({ ...currentUser, ...doctorData });
            } catch {
              setUser(currentUser);
            }
          } else {
            setUser(currentUser);
          }
        }
      } catch (error) {
        console.log('No active session');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string, role: 'patient' | 'doctor') => {
    try {
      const result = await authApi.signin(email, password);
      
      // Check if role matches
      if (result.user.role !== role) {
        toast.error(`Please login as ${result.user.role === 'doctor' ? 'Doctor' : 'Patient'}`);
        await authApi.logout();
        return;
      }

      // If doctor, get additional doctor data
      if (result.user.role === 'doctor') {
        try {
          const doctorData = await doctorApi.getById(result.user.id);
          setUser({ ...result.user, ...doctorData });
        } catch {
          setUser(result.user);
        }
      } else {
        setUser(result.user);
      }

      toast.success('Welcome back!');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to login');
      throw error;
    }
  };

  const register = async (data: Partial<User> & { password: string }) => {
    try {
      const result = await authApi.signup(data as any);
      
      // If doctor, get additional doctor data
      if (result.user.role === 'doctor') {
        try {
          const doctorData = await doctorApi.getById(result.user.id);
          setUser({ ...result.user, ...doctorData });
        } catch {
          setUser(result.user);
        }
      } else {
        setUser(result.user);
      }

      toast.success('Account created successfully!');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Failed to create account');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  const updateUser = async (data: Partial<User>) => {
    if (!user) return;

    try {
      // Update user profile
      const updatedUser = await userApi.update(user.id, data);
      
      // If doctor and updating doctor-specific fields
      if (user.role === 'doctor' && (data.specialization || data.experience || data.consultationFee || data.expertise)) {
        const updatedDoctor = await doctorApi.update(user.id, data);
        setUser({ ...updatedUser, ...updatedDoctor });
      } else {
        setUser(updatedUser);
      }

      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Update user error:', error);
      toast.error(error.message || 'Failed to update profile');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
