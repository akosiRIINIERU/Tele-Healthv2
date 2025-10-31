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
- Supabase account (already connected!)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Initialize Database** (First time only)
   - Open the app in browser: http://localhost:5173
   - Open browser console (F12)
   - Run: `initDatabase()`
   - This creates test accounts and seed data

4. **Login with Test Accounts**
   - **Patient**: `patient@test.com` / `password123`
   - **Doctors**: 
     - `dr.smith@healthcare.com` / `doctor123`
     - `dr.johnson@healthcare.com` / `doctor123`
     - And 3 more doctors...

### Build for Production

```bash
npm run build
npm run preview
```

### Supabase Backend

✅ **Already Connected!** Your app uses Supabase for:
- 🔐 **Authentication** - Real user login/signup with Supabase Auth
- 💾 **Database** - Persistent storage using Supabase KV Store
- ⚡ **Edge Functions** - Serverless API with Hono framework
- 🔒 **Secure** - Row-level security and protected routes

**API Endpoints Available:**
- `/auth/*` - Authentication (signup, signin, logout)
- `/doctors/*` - Doctor profiles and management
- `/appointments/*` - Appointment CRUD operations
- `/messages/*` - Chat messaging
- `/articles/*` - Health articles
- `/health-tips/*` - Daily tips
- `/payments/*` - Payment processing
- `/withdrawals/*` - Doctor withdrawals

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
├── lib/                   # Utilities, API client, mock data
│   ├── supabaseClient.ts  # API wrapper for backend
│   ├── mockData.ts        # Fallback data
│   └── utils.ts           # Helper functions
├── supabase/              # Backend server
│   └── functions/server/
│       ├── index.tsx      # Main API server (Hono)
│       ├── seed.ts        # Database seed script
│       └── kv_store.tsx   # Database utilities
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

### Frontend
- **Framework**: React 18 + TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4
- **UI Components**: ShadCN UI + Radix UI
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast)
- **Build Tool**: Vite
- **Date Handling**: date-fns
- **State Management**: React Context API

### Backend (Supabase)
- **Platform**: Supabase Cloud
- **Runtime**: Deno (Edge Functions)
- **Framework**: Hono (Web Framework)
- **Database**: KV Store (Key-Value)
- **Authentication**: Supabase Auth (JWT)
- **API**: RESTful (22 endpoints)

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

## 💾 Database & Storage

The app uses Supabase for persistent data storage:
- **Real Authentication**: Supabase Auth with JWT tokens
- **Database**: KV Store for all application data
- **Seed Data**: 5 doctors, 4 articles, 6 health tips
- **API**: 22 RESTful endpoints for all operations

All data persists across sessions and page refreshes!

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

## 📚 Documentation

Complete documentation for your reference:

| Document | Description |
|----------|-------------|
| **[README.md](./README.md)** | This file - Overview and quick start |
| **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** | Detailed Supabase backend guide |
| **[SUPABASE_INTEGRATION.md](./SUPABASE_INTEGRATION.md)** | Integration overview & testing |
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | System architecture diagrams |
| **[QUICKSTART.md](./QUICKSTART.md)** | 3-minute setup for beginners |
| **[SETUP.md](./SETUP.md)** | Detailed installation guide |
| **[FEATURES.md](./FEATURES.md)** | Complete feature list (150+) |
| **[COMPONENT_TREE.md](./COMPONENT_TREE.md)** | Component structure |
| **[GET_STARTED.md](./GET_STARTED.md)** | Getting started guide |
| **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** | Project overview |

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
