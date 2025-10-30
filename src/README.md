# 🏥 Doctor Booking Appointment App

A comprehensive healthcare application built with React, TypeScript, and Tailwind CSS. Connect patients with healthcare professionals through an intuitive, mobile-first interface.

![Doctor Booking App](https://images.unsplash.com/photo-1640669860995-91178ad3bef1?w=1200&h=400&fit=crop)

## ✨ Features

### 👥 For Patients
- 🔍 **Browse Doctors** - Search and filter doctors by specialization and availability
- 📅 **Book Appointments** - Easy appointment scheduling with calendar integration
- 💬 **Chat & Call** - Real-time messaging and video/voice calls with doctors
- 📚 **Health Library** - Access articles on illnesses and herbal remedies
- 💡 **Daily Health Tips** - Personalized wellness recommendations
- 🎁 **Rewards System** - Earn points for engagement and bookings
- 💳 **Multiple Payment Options** - PayPal, PayMaya, and GCash support
- 📱 **Profile Management** - Complete control over your health profile

### 👨‍⚕️ For Doctors
- 📊 **Dashboard** - Overview of appointments, earnings, and statistics
- ⚡ **Status Management** - Toggle between Available, Busy, and Offline
- ✅ **Appointment Verification** - Confirm or reject patient appointments
- 💰 **Earnings & Withdrawals** - Track income and withdraw funds
- 👤 **Profile & Expertise** - Showcase specializations and experience
- 📋 **Patient Records** - Access patient information and history
- 📖 **Medical Articles** - Read and stay updated with medical content

### 🌐 Common Features
- 🌓 **Dark/Light Mode** - Theme switching for comfortable viewing
- 📱 **Mobile-First Design** - Optimized for mobile devices
- 🎨 **Beautiful UI** - Soft pink and white color scheme
- 🔒 **Secure Authentication** - Role-based access control
- 🔔 **Notifications** - Toast notifications for user feedback
- ⚡ **Fast & Responsive** - Built with Vite for optimal performance

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- VS Code (recommended)

### Installation

1. **Clone or create the project**
   ```bash
   # If starting fresh
   npm create vite@latest doctor-booking-app -- --template react-ts
   cd doctor-booking-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
doctor-booking-app/
├── components/
│   ├── auth/              # Login, Register
│   ├── patient/           # Patient screens
│   ├── doctor/            # Doctor screens
│   ├── shared/            # Shared components
│   └── ui/                # ShadCN UI components
├── contexts/              # React contexts (Auth, Theme)
├── lib/                   # Utilities and mock data
├── styles/                # Global styles
├── App.tsx                # Main app with routing
├── main.tsx              # Entry point
└── index.html            # HTML template
```

## 🎯 Usage Guide

### For Patients

1. **Sign Up/Login**
   - Create account or login as a Patient
   - Complete your profile with basic information

2. **Find a Doctor**
   - Browse available doctors
   - Filter by specialization or availability
   - View doctor profiles with ratings and expertise

3. **Book Appointment**
   - Select preferred date and time
   - Add reason for visit
   - Make payment (PayPal/PayMaya/GCash)

4. **Manage Appointments**
   - View upcoming appointments
   - Chat or call your doctor
   - Cancel if needed

5. **Explore Health Content**
   - Read daily health tips
   - Browse articles on illnesses and remedies
   - Bookmark favorites

### For Doctors

1. **Sign Up/Login**
   - Create account as a Doctor
   - Add specialization and experience

2. **Set Availability**
   - Toggle status (Available/Busy/Offline)
   - Manage schedule

3. **Handle Appointments**
   - Review pending appointments
   - Confirm or reject requests
   - Mark appointments as complete

4. **Earnings Management**
   - View monthly earnings
   - Request withdrawals
   - Track payment history

5. **Profile Management**
   - Update expertise areas
   - Set consultation fees
   - Manage professional information

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4
- **UI Components**: ShadCN UI + Radix UI
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Build Tool**: Vite
- **Date Handling**: date-fns
- **State Management**: React Context API

## 🎨 Design System

### Colors
- **Primary**: Pink (#EC4899)
- **Secondary**: Soft Pink (#FCE7EF)
- **Background**: White / Dark Gray
- **Text**: Gray-900 / White

### Typography
- **Headings**: Medium weight (500)
- **Body**: Normal weight (400)
- **Base Size**: 16px

### Components
- Mobile-first responsive design
- Max-width: 448px (centered on larger screens)
- Smooth transitions and animations
- Consistent spacing and shadows

## 📱 Responsive Design

The app is optimized for:
- 📱 Mobile devices (primary)
- 📱 Tablets
- 💻 Desktop (centered mobile view)

## 🔐 Authentication

- Role-based authentication (Patient/Doctor)
- Protected routes
- Persistent sessions
- Secure logout

## 💾 Mock Data

The app uses mock data for demonstration:
- 5 sample doctors with different specializations
- 2 sample appointments
- 4 health articles
- 4 daily health tips

Replace with real API calls in production.

## 🚧 Future Enhancements

- [ ] Real-time video calling integration
- [ ] Push notifications
- [ ] Multi-language support
- [ ] Advanced search filters
- [ ] Insurance integration
- [ ] Prescription management
- [ ] Lab reports integration
- [ ] Telemedicine features
- [ ] Analytics dashboard
- [ ] Reviews and ratings system

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email support@healthcare-app.com or join our Slack channel.

## 🙏 Acknowledgments

- ShadCN UI for beautiful components
- Radix UI for accessible primitives
- Lucide for icons
- Unsplash for images

---

Built with ❤️ using React and TypeScript
