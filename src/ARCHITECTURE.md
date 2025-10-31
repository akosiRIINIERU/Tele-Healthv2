# 🏗️ System Architecture

Complete architecture diagram of the Doctor Booking App with Supabase backend.

---

## 📊 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER LAYER                              │
│                                                                 │
│  👤 Patients              👨‍⚕️ Doctors                            │
│  - Browse doctors         - Manage appointments                 │
│  - Book appointments      - Update availability                 │
│  - Chat & call            - Track earnings                      │
│  - Read articles          - View patients                       │
│  - Make payments          - Withdraw funds                      │
└────────────────┬────────────────────────┬───────────────────────┘
                 │                        │
                 ↓                        ↓
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND LAYER                              │
│                   React 18 + TypeScript                         │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Patient    │  │    Doctor    │  │    Shared    │         │
│  │  Components  │  │  Components  │  │  Components  │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐                           │
│  │   Context    │  │   Routing    │                           │
│  │   (State)    │  │  (React      │                           │
│  │              │  │   Router)    │                           │
│  └──────────────┘  └──────────────┘                           │
│                                                                 │
│  ┌────────────────────────────────────────┐                   │
│  │      Supabase Client (API Wrapper)     │                   │
│  │   - authApi, doctorApi, appointmentApi │                   │
│  │   - chatApi, articleApi, paymentApi    │                   │
│  └────────────────────────────────────────┘                   │
└────────────────┬────────────────────────────────────────────────┘
                 │ HTTPS (Authorization: Bearer token)
                 │
                 ↓
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY                                │
│             https://{project}.supabase.co                       │
│                                                                 │
│  ┌──────────────────────────────────────────────┐             │
│  │  Supabase Edge Functions (Deno Runtime)      │             │
│  │  /functions/v1/make-server-abee656a/*       │             │
│  └──────────────────────────────────────────────┘             │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────────────────────────┐
│                     BACKEND LAYER                               │
│                   Hono Web Framework                            │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │     Auth     │  │   Business   │  │  Validation  │         │
│  │  Middleware  │  │    Logic     │  │   & Error    │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐   │
│  │             API Route Handlers                         │   │
│  │  /auth/* | /doctors/* | /appointments/* | /messages/* │   │
│  │  /articles/* | /payments/* | /withdrawals/* | /users/*│   │
│  └────────────────────────────────────────────────────────┘   │
└─────────┬──────────────────────┬────────────────────────────────┘
          │                      │
          ↓                      ↓
┌──────────────────┐    ┌───────────────────┐
│  Supabase Auth   │    │   Supabase DB     │
│                  │    │   (KV Store)      │
│  - JWT tokens    │    │                   │
│  - User accounts │    │  - user:{id}      │
│  - Sessions      │    │  - doctor:{id}    │
│  - Password hash │    │  - appointment:{} │
│                  │    │  - message:{}     │
└──────────────────┘    │  - article:{}     │
                        │  - tip:{}         │
                        │  - payment:{}     │
                        └───────────────────┘
```

---

## 🔄 Data Flow

### 1. User Authentication Flow

```
┌──────────┐
│  User    │
│  Login   │
└────┬─────┘
     │
     ↓ POST /auth/signin { email, password }
┌────────────────┐
│   Frontend     │
│  (AuthContext) │
└────┬───────────┘
     │
     ↓ HTTPS Request with credentials
┌─────────────────────┐
│  Supabase Function  │
│   /auth/signin      │
└────┬────────────────┘
     │
     ↓ Validate credentials
┌─────────────────┐
│ Supabase Auth   │
│  Service        │
└────┬────────────┘
     │
     ↓ Return JWT token
┌─────────────────────┐
│  Backend Response   │
│  { access_token,    │
│    user }           │
└────┬────────────────┘
     │
     ↓ Store token in localStorage
┌────────────────┐
│   Frontend     │
│  (Authenticated)│
└────┬───────────┘
     │
     ↓ Fetch user profile
┌─────────────────┐
│  KV Store       │
│  user:{userId}  │
└─────────────────┘
```

### 2. Appointment Booking Flow

```
┌──────────┐
│ Patient  │
│ Selects  │
│ Doctor   │
└────┬─────┘
     │
     ↓ Browse doctors
┌────────────────┐
│  GET /doctors  │
└────┬───────────┘
     │
     ↓ Returns doctor list from KV
┌────────────────┐
│  Display       │
│  Doctors       │
└────┬───────────┘
     │
     ↓ Click "Book Appointment"
┌────────────────┐
│  Select Date   │
│  Select Time   │
│  Add Reason    │
└────┬───────────┘
     │
     ↓ POST /appointments
┌────────────────────┐
│  Backend validates │
│  - User auth       │
│  - Doctor exists   │
│  - Data valid      │
└────┬───────────────┘
     │
     ↓ Create appointment
┌─────────────────────┐
│  KV Store           │
│  appointment:{id}   │
│  {                  │
│    patientId,       │
│    doctorId,        │
│    date, time,      │
│    status: pending  │
│  }                  │
└────┬────────────────┘
     │
     ↓ Return confirmation
┌────────────────┐
│  Show Success  │
│  Toast         │
└────────────────┘
```

### 3. Chat Message Flow

```
┌──────────┐
│  User    │
│  Types   │
│  Message │
└────┬─────┘
     │
     ↓ Click Send
┌────────────────┐
│  POST /messages│
│  {             │
│   receiverId,  │
│   text         │
│  }             │
└────┬───────────┘
     │
     ↓ With Authorization header
┌─────────────────────┐
│  Backend validates  │
│  - Token valid      │
│  - Users exist      │
│  - Content safe     │
└────┬────────────────┘
     │
     ↓ Store message
┌─────────────────────┐
│  KV Store           │
│  message:{id}       │
│  {                  │
│    senderId,        │
│    receiverId,      │
│    text,            │
│    createdAt        │
│  }                  │
└────┬────────────────┘
     │
     ↓ Return saved message
┌────────────────┐
│  Update Chat   │
│  UI with new   │
│  message       │
└────────────────┘
```

### 4. Doctor Status Update Flow

```
┌──────────┐
│  Doctor  │
│  Changes │
│  Status  │
└────┬─────┘
     │
     ↓ Select: Available/Busy/Offline
┌────────────────────────┐
│  PUT /doctors/:id/status│
│  { status: "available" }│
└────┬───────────────────┘
     │
     ↓ Verify doctor identity
┌─────────────────────┐
│  Backend checks:    │
│  - Is this doctor?  │
│  - Token valid?     │
└────┬────────────────┘
     │
     ↓ Update status
┌─────────────────────┐
│  KV Store           │
│  doctor:{id}        │
│  {                  │
│    ...profile,      │
│    status: "available"│
│  }                  │
└────┬────────────────┘
     │
     ↓ Status updated
┌────────────────┐
│  All patients  │
│  see new       │
│  status        │
└────────────────┘
```

---

## 🗂️ Database Schema (KV Store)

### Key Patterns

```
user:{userId}           → User Profile
doctor:{userId}         → Doctor Profile
appointment:{id}        → Appointment Record
message:{id}            → Chat Message
article:{id}            → Health Article
tip:{id}                → Health Tip
payment:{id}            → Payment Transaction
withdrawal:{id}         → Withdrawal Request
```

### Data Relationships

```
┌─────────────┐
│    User     │
│  {userId}   │
└──────┬──────┘
       │
       ├──→ role: "patient" ──→ Can have many Appointments (as patient)
       │                    └──→ Can send/receive Messages
       │                    └──→ Can make Payments
       │
       └──→ role: "doctor"  ──→ Has Doctor Profile
                            └──→ Can have many Appointments (as doctor)
                            └──→ Can send/receive Messages
                            └──→ Can request Withdrawals

┌──────────────┐
│ Appointment  │
│    {id}      │
└──────────────┘
  ├─ patientId  ──→  User (role: patient)
  ├─ doctorId   ──→  User (role: doctor)
  ├─ status     ──→  pending | confirmed | completed | cancelled
  └─ date/time

┌──────────────┐
│   Message    │
│    {id}      │
└──────────────┘
  ├─ senderId   ──→  User
  ├─ receiverId ──→  User
  ├─ text
  └─ createdAt

┌──────────────┐
│  Payment     │
│    {id}      │
└──────────────┘
  ├─ userId        ──→  User (patient)
  ├─ appointmentId ──→  Appointment
  ├─ amount
  ├─ method
  └─ status

┌──────────────┐
│ Withdrawal   │
│    {id}      │
└──────────────┘
  ├─ doctorId   ──→  User (doctor)
  ├─ amount
  ├─ method
  └─ status
```

---

## 🔐 Security Architecture

### Authentication Flow

```
┌──────────────────┐
│   User Login     │
└────────┬─────────┘
         │
         ↓ Credentials
┌──────────────────┐
│ Supabase Auth    │
│  - Validates     │
│  - Creates JWT   │
│  - Returns token │
└────────┬─────────┘
         │
         ↓ JWT Token
┌──────────────────┐
│  Frontend        │
│  - Stores in     │
│    localStorage  │
│  - Sends with    │
│    every request │
└────────┬─────────┘
         │
         ↓ Authorization: Bearer {token}
┌──────────────────┐
│  Backend         │
│  - Verifies JWT  │
│  - Extracts user │
│  - Checks role   │
└────────┬─────────┘
         │
         ↓ Process request if valid
┌──────────────────┐
│  KV Store        │
│  - User data     │
│  - Permissions   │
└──────────────────┘
```

### Authorization Levels

```
Public Routes (No auth required)
├── GET  /doctors           - Browse doctors
├── GET  /articles          - Read articles
└── GET  /health-tips       - View tips

Authenticated Routes (Token required)
├── POST /appointments      - Book appointment
├── GET  /appointments      - View my appointments
├── POST /messages          - Send message
└── PUT  /users/:id         - Update profile (own only)

Patient-Only Routes
└── DELETE /appointments/:id - Cancel appointment

Doctor-Only Routes
├── PUT  /doctors/:id/status - Update availability
├── POST /withdrawals        - Request withdrawal
└── PUT  /appointments/:id   - Confirm/reject appointment
```

---

## 🚀 Deployment Architecture

### Current Setup (Development)

```
┌─────────────────┐
│  Local Machine  │
│  localhost:5173 │
└────────┬────────┘
         │
         ↓ API Calls
┌─────────────────────────────────┐
│   Supabase Cloud (Global)       │
│   - Edge Functions (Serverless) │
│   - Auth Service                │
│   - Database (KV Store)         │
│   - Distributed globally        │
└─────────────────────────────────┘
```

### Production Setup (Recommended)

```
┌─────────────────┐
│   Users         │
│   (Worldwide)   │
└────────┬────────┘
         │
         ↓
┌─────────────────────────────────┐
│   CDN (Vercel/Netlify)          │
│   - Static React app            │
│   - Cached globally             │
│   - HTTPS enabled               │
└────────┬────────────────────────┘
         │
         ↓ API calls
┌─────────────────────────────────┐
│   Supabase Cloud (Global)       │
│   - Edge Functions near users   │
│   - Auth Service                │
│   - Database                    │
│   - Automatic scaling           │
│   - Built-in backup             │
└─────────────────────────────────┘
```

---

## ⚡ Performance Optimizations

### Frontend

```
React Optimizations
├── Code splitting (React Router)
├── Lazy loading (ready to add)
├── Context API (minimal re-renders)
├── Memo for expensive components
└── Debounced search inputs

Build Optimizations
├── Vite (fast bundling)
├── Tree shaking
├── CSS purging (Tailwind)
├── Asset optimization
└── Compression
```

### Backend

```
Edge Functions
├── Near user locations
├── Cold start < 100ms
├── Auto-scaling
└── Global distribution

Database
├── KV Store (fast lookups)
├── Indexed by key
├── Prefix queries optimized
└── In-memory caching
```

---

## 📊 Monitoring & Logging

### What's Logged

```
Server Logs (Supabase Dashboard)
├── API requests (method, path, time)
├── Authentication events
├── Errors and stack traces
├── Database operations
└── Performance metrics

Client Logs (Browser Console)
├── API calls
├── Auth state changes
├── Route navigation
├── User actions
└── Errors
```

---

## 🔄 Future Enhancements

### Phase 1: Real-Time
```
Add WebSocket support
├── Real-time chat updates
├── Live appointment notifications
├── Status change broadcasts
└── Online/offline presence
```

### Phase 2: Storage
```
Add Supabase Storage
├── Profile photos
├── Medical documents
├── Prescription images
└── Report uploads
```

### Phase 3: Advanced
```
Add advanced features
├── Video calling (WebRTC)
├── Push notifications
├── Email service
├── SMS reminders
├── Analytics dashboard
└── Admin panel
```

---

**System Architecture Complete! 🎉**

This architecture provides:
- ✅ Scalability
- ✅ Security
- ✅ Performance
- ✅ Reliability
- ✅ Easy maintenance
- ✅ Future-proof design
