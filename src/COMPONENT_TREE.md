# 🌳 Component Tree Structure

Visual representation of all components and their relationships.

## 📁 Root Structure

```
App.tsx (Main Application)
├── ThemeProvider
│   └── AuthProvider
│       ├── Router
│       │   └── Routes
│       │       ├── Public Routes
│       │       ├── Patient Routes
│       │       └── Doctor Routes
│       └── Toaster (Notifications)
```

---

## 🔓 Public Routes (Unauthenticated)

```
/login
└── Login Component
    ├── MobileLayout
    ├── Tabs (Patient/Doctor)
    ├── Input (Email, Password)
    └── Button (Sign In)

/register
└── Register Component
    ├── MobileLayout
    ├── Tabs (Patient/Doctor)
    ├── Input Fields
    │   ├── Name
    │   ├── Email
    │   ├── Password
    │   ├── Phone
    │   ├── Age
    │   └── Gender
    └── Conditional Fields (Doctor)
        ├── Specialization
        └── Experience
```

---

## 👥 Patient Routes

### Dashboard (`/patient/dashboard`)
```
PatientDashboard
├── MobileLayout
├── Header Section
│   ├── Menu Button
│   ├── Notifications Button
│   ├── Welcome Message
│   └── Health Points Card
├── Quick Actions Grid (4 cards)
│   ├── Book Appointment
│   ├── Chat
│   ├── Call Doctor
│   └── Health Articles
├── Today's Health Tip Card
├── Available Doctors List
│   └── Doctor Cards (x3)
├── Ad Banner
└── BottomNav
```

### Doctor List (`/patient/doctors`)
```
DoctorList
├── MobileLayout
├── Search & Filter Bar
│   ├── Search Input
│   └── Filter Buttons (All/Available/Busy)
├── Doctor Cards List
│   └── DoctorCard
│       ├── Avatar
│       ├── Name & Specialization
│       ├── Status Badge
│       ├── Rating & Experience
│       ├── Consultation Fee
│       └── Expertise Badges
└── BottomNav
```

### Doctor Detail (`/patient/doctor/:id`)
```
DoctorDetail
├── MobileLayout
├── Doctor Header
│   ├── Large Avatar
│   ├── Name & Specialization
│   └── Status Badge
├── Stats Grid
│   ├── Rating Card
│   ├── Experience Card
│   └── Patients Card
├── About Section
├── Expertise Section
├── Reviews Section
├── Action Buttons (Fixed Bottom)
│   ├── Chat Button
│   ├── Call Button
│   └── Book Button
└── BottomNav
```

### Book Appointment (`/patient/book/:id`)
```
BookAppointment
├── MobileLayout
├── Doctor Info Card
├── Calendar (Date Picker)
├── Time Slots Grid (8 slots)
├── Reason Textarea
├── Booking Summary Card
└── Confirm Button
```

### Appointments (`/patient/appointments`)
```
PatientAppointments
├── MobileLayout
├── Tabs (Upcoming/Past)
├── TabContent: Upcoming
│   └── AppointmentCards
│       ├── Doctor Info
│       ├── Date & Time
│       ├── Status Badge
│       ├── Reason
│       └── Action Buttons
│           ├── Cancel
│           └── View Details
├── TabContent: Past
│   └── Completed Appointments
└── BottomNav
```

### Chat (`/patient/chat` or `/patient/chat/:id`)
```
ChatScreen
├── MobileLayout (with back button)
├── Conditional Rendering
│   ├── Doctor List (if no ID)
│   │   └── DoctorCard
│   └── Chat Interface (if ID)
│       ├── Messages Container
│       │   └── Message Bubbles
│       │       ├── Text
│       │       └── Timestamp
│       └── Input Section
│           ├── Attach Button
│           ├── Text Input
│           ├── Emoji Button
│           └── Send Button
```

### Call (`/patient/call/:id`)
```
CallScreen
├── MobileLayout
├── Call Interface
│   ├── Doctor Avatar (Large)
│   ├── Doctor Name
│   ├── Call Duration Timer
│   ├── Status Indicator
│   └── Control Buttons
│       ├── Mute/Unmute
│       ├── Video On/Off
│       ├── Speaker
│       └── End Call (Red)
```

### Articles (`/patient/articles`)
```
ArticlesScreen
├── MobileLayout
├── Search & Filter
│   ├── Search Input
│   └── Category Badges
├── Featured Article
│   └── Large Article Card
├── Articles List
│   └── ArticleCard
│       ├── Thumbnail
│       ├── Category Badge
│       ├── Title & Excerpt
│       └── Read Time
└── BottomNav
```

### Article Detail (`/patient/article/:id`)
```
ArticleDetail
├── MobileLayout
├── Featured Image
├── Article Meta
│   ├── Category Badge
│   └── Read Time
├── Title
├── Date
├── Content
│   ├── Paragraphs
│   ├── Info Boxes (Symptoms/Usage)
│   └── Disclaimer
├── Related Articles
└── Action Buttons (Bookmark/Share)
```

### Health Tips (`/patient/health-tips`)
```
HealthTipsScreen
├── MobileLayout
├── Featured Tip Card
├── All Tips List
│   └── TipCard
│       ├── Icon
│       ├── Category Badge
│       ├── Title
│       ├── Description
│       └── Date
├── Category Grid (4 cards)
│   ├── Hydration
│   ├── Sleep
│   ├── Exercise
│   └── Nutrition
└── BottomNav
```

### Profile (`/patient/profile`)
```
ProfileScreen
├── MobileLayout
├── Profile Header
│   ├── Avatar
│   ├── Name & Email
│   ├── Edit Button
│   └── Stats Grid
├── Menu Items
│   ├── Edit Profile
│   ├── My Appointments
│   ├── Health Points & Rewards
│   ├── Payment Methods
│   ├── Medical Records
│   ├── Settings
│   └── Help & Support
├── Logout Button
├── App Info
└── BottomNav
```

### Menu (`/patient/menu`)
```
MenuScreen
├── MobileLayout
├── Special Offers Section
│   └── Ad Cards (x2)
├── Main Features Section
│   └── Menu Items (x4)
├── Account Section
│   └── Menu Items (x4)
├── Banner Ad
└── Community Grid
    ├── Forum
    └── Reviews
```

### Payment (`/patient/payments`)
```
PaymentScreen
├── MobileLayout
├── Amount Summary Card
├── Payment Methods
│   └── RadioGroup
│       ├── PayPal
│       ├── PayMaya
│       └── GCash
├── Payment Details Form
│   └── Conditional Fields
├── Terms Section
└── Pay Button
```

---

## 👨‍⚕️ Doctor Routes

### Dashboard (`/doctor/dashboard`)
```
DoctorDashboard
├── MobileLayout
├── Header Section
│   ├── Menu Button
│   ├── Notifications Button
│   ├── Welcome Message
│   ├── Specialization
│   └── Status Selector
│       └── Dropdown (Available/Busy/Offline)
├── Stats Grid (4 cards)
│   ├── Total Patients
│   ├── Today's Appointments
│   ├── Monthly Earnings
│   └── Hours Worked
├── Pending Appointments
│   └── AppointmentCard
│       ├── Patient Info
│       ├── Date & Time
│       ├── Reason
│       └── Actions
│           ├── Reject Button
│           └── Confirm Button
├── Quick Actions Grid
│   ├── View Patients
│   └── Withdraw Funds
└── BottomNav
```

### Appointments (`/doctor/appointments`)
```
DoctorAppointments
├── MobileLayout
├── Tabs (Pending/Confirmed/Completed)
├── TabContent: Pending
│   └── AppointmentCards
│       └── Action Buttons
│           ├── Reject
│           └── Confirm
├── TabContent: Confirmed
│   └── AppointmentCards
│       └── Mark Complete Button
├── TabContent: Completed
│   └── Completed Appointments
└── BottomNav
```

### Withdrawals (`/doctor/withdrawals`)
```
WithdrawalScreen
├── MobileLayout
├── Balance Card
│   ├── Available Balance
│   ├── This Month
│   └── Total Withdrawn
├── Amount Input
│   ├── Dollar Input
│   └── Preset Buttons
├── Withdrawal Methods
│   └── RadioGroup
│       ├── PayPal
│       ├── PayMaya
│       └── GCash
├── Account Details Form
├── Processing Info
└── Request Button
└── BottomNav
```

### Profile (`/doctor/profile`)
```
DoctorProfile
├── MobileLayout
├── Profile Header
│   ├── Avatar
│   ├── Name
│   ├── Specialization
│   ├── Rating & Experience
│   ├── Edit Button
│   └── Stats Grid
├── Expertise Section
│   └── Expertise Badges
├── Menu Items
│   ├── Edit Profile
│   ├── My Schedule
│   ├── Patient Records
│   ├── Earnings & Withdrawals
│   ├── Certifications
│   ├── Settings
│   └── Help & Support
├── Logout Button
├── App Info
└── BottomNav
```

---

## 🔄 Shared Components

### Settings (`/patient/settings` or `/doctor/settings`)
```
SettingsScreen
├── MobileLayout
├── Appearance Section
│   └── Dark Mode Toggle
├── Notifications Section
│   ├── Push Notifications Toggle
│   └── Email Notifications Toggle
├── Security Section
│   ├── Change Password Link
│   └── Privacy Settings Link
├── General Section
│   ├── Language Link
│   └── About Link
└── BottomNav
```

### Edit Profile (`/patient/edit-profile` or `/doctor/edit-profile`)
```
EditProfile
├── MobileLayout
├── Avatar Upload Section
├── Form Fields
│   ├── Name
│   ├── Email
│   ├── Phone
│   ├── Age & Gender
│   └── Address
├── Doctor-Specific Fields (conditional)
│   ├── Specialization
│   ├── Experience
│   ├── Consultation Fee
│   └── Expertise (Textarea)
└── Action Buttons
    ├── Cancel
    └── Save
```

---

## 🧩 Reusable UI Components

### Layout Components
```
MobileLayout
├── Header (optional)
│   ├── Back Button
│   ├── Title
│   └── Right Action
└── Content Area

BottomNav
└── Nav Items (5)
    ├── Home
    ├── Appointments
    ├── Chat
    ├── Articles
    └── Profile
```

### ShadCN UI Components
```
components/ui/
├── accordion.tsx
├── alert-dialog.tsx
├── alert.tsx
├── aspect-ratio.tsx
├── avatar.tsx
├── badge.tsx
├── breadcrumb.tsx
├── button.tsx
├── calendar.tsx
├── card.tsx
├── carousel.tsx
├── chart.tsx
├── checkbox.tsx
├── collapsible.tsx
├── command.tsx
├── context-menu.tsx
├── dialog.tsx
├── drawer.tsx
├── dropdown-menu.tsx
├── form.tsx
├── hover-card.tsx
├── input-otp.tsx
├── input.tsx
├── label.tsx
├── menubar.tsx
├── navigation-menu.tsx
├── pagination.tsx
├── popover.tsx
├── progress.tsx
├── radio-group.tsx
├── resizable.tsx
├── scroll-area.tsx
├── select.tsx
├── separator.tsx
├── sheet.tsx
├── sidebar.tsx
├── skeleton.tsx
├── slider.tsx
├── sonner.tsx (Toaster)
├── switch.tsx
├── table.tsx
├── tabs.tsx
├── textarea.tsx
├── toggle-group.tsx
├── toggle.tsx
└── tooltip.tsx
```

---

## 🎯 Context Providers

```
ThemeContext
├── theme: 'light' | 'dark'
└── toggleTheme()

AuthContext
├── user: User | null
├── login(email, password, role)
├── register(data)
├── logout()
└── updateUser(data)
```

---

## 📊 Data Flow

```
Mock Data (lib/mockData.ts)
├── mockDoctors (5 doctors)
├── mockAppointments (2 appointments)
├── mockArticles (4 articles)
└── mockHealthTips (4 tips)
```

---

## 🎨 Component Categories

### Pages (25+)
Full-screen views with routing

### Containers (10+)
Components with business logic

### Presentational (35+)
Pure UI components from ShadCN

### Layout (5+)
Structural components

---

## 📈 Component Complexity

| Level | Components | Example |
|-------|-----------|---------|
| Simple | 15+ | Button, Badge, Card |
| Medium | 20+ | Calendar, Select, Tabs |
| Complex | 10+ | Dashboard, Chat, Booking |

---

**Total Components: 40+ files, 50+ components**

