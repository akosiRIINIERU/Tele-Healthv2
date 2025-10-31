import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from './components/ui/sonner';
import { initDatabase } from './lib/initDatabase';

// Auth Components
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';

// Patient Components
import { PatientDashboard } from './components/patient/PatientDashboard';
import { DoctorList } from './components/patient/DoctorList';
import { DoctorDetail } from './components/patient/DoctorDetail';
import { BookAppointment } from './components/patient/BookAppointment';
import { PatientAppointments } from './components/patient/PatientAppointments';
import { ChatScreen } from './components/patient/ChatScreen';
import { ArticlesScreen } from './components/patient/ArticlesScreen';
import { ArticleDetail } from './components/patient/ArticleDetail';
import { HealthTipsScreen } from './components/patient/HealthTipsScreen';
import { ProfileScreen } from './components/patient/ProfileScreen';
import { PaymentScreen } from './components/patient/PaymentScreen';

// Doctor Components
import { DoctorDashboard } from './components/doctor/DoctorDashboard';
import { DoctorAppointments } from './components/doctor/DoctorAppointments';
import { WithdrawalScreen } from './components/doctor/WithdrawalScreen';
import { DoctorProfile } from './components/doctor/DoctorProfile';

// Shared Components
import { SettingsScreen } from './components/shared/SettingsScreen';
import { EditProfile } from './components/shared/EditProfile';
import { CallScreen } from './components/patient/CallScreen';
import { MenuScreen } from './components/patient/MenuScreen';

const ProtectedRoute: React.FC<{ 
  children: React.ReactNode; 
  allowedRole?: 'patient' | 'doctor' 
}> = ({ children, allowedRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'patient' ? '/patient/dashboard' : '/doctor/dashboard'} replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={user ? <Navigate to={user.role === 'patient' ? '/patient/dashboard' : '/doctor/dashboard'} /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to={user.role === 'patient' ? '/patient/dashboard' : '/doctor/dashboard'} /> : <Register />} />

      {/* Patient Routes */}
      <Route path="/patient/dashboard" element={<ProtectedRoute allowedRole="patient"><PatientDashboard /></ProtectedRoute>} />
      <Route path="/patient/doctors" element={<ProtectedRoute allowedRole="patient"><DoctorList /></ProtectedRoute>} />
      <Route path="/patient/doctor/:id" element={<ProtectedRoute allowedRole="patient"><DoctorDetail /></ProtectedRoute>} />
      <Route path="/patient/book/:id" element={<ProtectedRoute allowedRole="patient"><BookAppointment /></ProtectedRoute>} />
      <Route path="/patient/appointments" element={<ProtectedRoute allowedRole="patient"><PatientAppointments /></ProtectedRoute>} />
      <Route path="/patient/chat" element={<ProtectedRoute allowedRole="patient"><ChatScreen /></ProtectedRoute>} />
      <Route path="/patient/chat/:id" element={<ProtectedRoute allowedRole="patient"><ChatScreen /></ProtectedRoute>} />
      <Route path="/patient/articles" element={<ProtectedRoute allowedRole="patient"><ArticlesScreen /></ProtectedRoute>} />
      <Route path="/patient/article/:id" element={<ProtectedRoute allowedRole="patient"><ArticleDetail /></ProtectedRoute>} />
      <Route path="/patient/health-tips" element={<ProtectedRoute allowedRole="patient"><HealthTipsScreen /></ProtectedRoute>} />
      <Route path="/patient/profile" element={<ProtectedRoute allowedRole="patient"><ProfileScreen /></ProtectedRoute>} />
      <Route path="/patient/settings" element={<ProtectedRoute allowedRole="patient"><SettingsScreen /></ProtectedRoute>} />
      <Route path="/patient/payments" element={<ProtectedRoute allowedRole="patient"><PaymentScreen /></ProtectedRoute>} />
      <Route path="/patient/edit-profile" element={<ProtectedRoute allowedRole="patient"><EditProfile /></ProtectedRoute>} />
      <Route path="/patient/call/:id" element={<ProtectedRoute allowedRole="patient"><CallScreen /></ProtectedRoute>} />
      <Route path="/patient/menu" element={<ProtectedRoute allowedRole="patient"><MenuScreen /></ProtectedRoute>} />

      {/* Doctor Routes */}
      <Route path="/doctor/dashboard" element={<ProtectedRoute allowedRole="doctor"><DoctorDashboard /></ProtectedRoute>} />
      <Route path="/doctor/appointments" element={<ProtectedRoute allowedRole="doctor"><DoctorAppointments /></ProtectedRoute>} />
      <Route path="/doctor/chat" element={<ProtectedRoute allowedRole="doctor"><ChatScreen /></ProtectedRoute>} />
      <Route path="/doctor/chat/:id" element={<ProtectedRoute allowedRole="doctor"><ChatScreen /></ProtectedRoute>} />
      <Route path="/doctor/articles" element={<ProtectedRoute allowedRole="doctor"><ArticlesScreen /></ProtectedRoute>} />
      <Route path="/doctor/article/:id" element={<ProtectedRoute allowedRole="doctor"><ArticleDetail /></ProtectedRoute>} />
      <Route path="/doctor/profile" element={<ProtectedRoute allowedRole="doctor"><DoctorProfile /></ProtectedRoute>} />
      <Route path="/doctor/settings" element={<ProtectedRoute allowedRole="doctor"><SettingsScreen /></ProtectedRoute>} />
      <Route path="/doctor/withdrawals" element={<ProtectedRoute allowedRole="doctor"><WithdrawalScreen /></ProtectedRoute>} />
      <Route path="/doctor/edit-profile" element={<ProtectedRoute allowedRole="doctor"><EditProfile /></ProtectedRoute>} />
      <Route path="/doctor/call/:id" element={<ProtectedRoute allowedRole="doctor"><CallScreen /></ProtectedRoute>} />

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    // Make initDatabase available globally for easy access
    (window as any).initDatabase = initDatabase;
    console.log('💡 Tip: Run initDatabase() in console to seed the database');
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <AppRoutes />
            <Toaster position="top-center" />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
