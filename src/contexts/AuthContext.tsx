import React, { createContext, useContext, useState, ReactNode } from 'react';

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: 'patient' | 'doctor') => {
    // Mock login
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      name: role === 'patient' ? 'John Doe' : 'Dr. Sarah Smith',
      email,
      role,
      avatar: '',
      phone: '+1234567890',
      age: role === 'patient' ? 35 : 42,
      gender: role === 'patient' ? 'Male' : 'Female',
      address: '123 Main St, City, Country',
      points: role === 'patient' ? 150 : undefined,
      specialization: role === 'doctor' ? 'Cardiology' : undefined,
      experience: role === 'doctor' ? 15 : undefined,
      rating: role === 'doctor' ? 4.8 : undefined,
      status: role === 'doctor' ? 'available' : undefined,
      consultationFee: role === 'doctor' ? 100 : undefined,
      expertise: role === 'doctor' ? ['Heart Disease', 'Hypertension', 'ECG'] : undefined,
    };
    
    setUser(mockUser);
  };

  const register = async (data: Partial<User> & { password: string }) => {
    // Mock register
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Math.random().toString(),
      name: data.name || '',
      email: data.email || '',
      role: data.role || 'patient',
      avatar: data.avatar,
      phone: data.phone,
      age: data.age,
      gender: data.gender,
      address: data.address,
      points: data.role === 'patient' ? 0 : undefined,
      specialization: data.specialization,
      experience: data.experience,
      rating: data.role === 'doctor' ? 5.0 : undefined,
      status: data.role === 'doctor' ? 'offline' : undefined,
      consultationFee: data.consultationFee,
      expertise: data.expertise,
    };
    
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
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
