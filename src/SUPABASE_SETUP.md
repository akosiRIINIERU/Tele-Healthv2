# 🗄️ Supabase Backend Setup Guide

Your Doctor Booking App is now connected to **Supabase** for real backend functionality!

## ✅ What's Already Connected

Your app now has:
- ✅ Supabase project connected
- ✅ Authentication system (Supabase Auth)
- ✅ Database (KV Store for data persistence)
- ✅ Edge Functions (Serverless API)
- ✅ Secure API routes
- ✅ Frontend API client

---

## 🏗️ Architecture Overview

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   React     │  HTTP   │   Supabase   │  Auth   │  Supabase   │
│   Frontend  │ ──────→ │ Edge Function│ ──────→ │    Auth     │
│             │         │   (Hono)     │         │             │
└─────────────┘         └──────────────┘         └─────────────┘
                               │
                               │ KV Store
                               ↓
                        ┌──────────────┐
                        │   Database   │
                        │  (KV Store)  │
                        └──────────────┘
```

---

## 📊 Database Structure

The app uses Supabase's **KV (Key-Value) Store** with the following data organization:

### Data Keys

```
user:{userId}          → User profile data
doctor:{userId}        → Doctor-specific data
appointment:{id}       → Appointment records
message:{id}           → Chat messages
article:{id}           → Health articles
tip:{id}               → Health tips
payment:{id}           → Payment records
withdrawal:{id}        → Withdrawal requests
```

### Sample Data Structure

**User Profile:**
```json
{
  "id": "uuid-here",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "patient",
  "phone": "+1234567890",
  "age": 30,
  "gender": "Male",
  "createdAt": "2024-10-30T..."
}
```

**Doctor Profile:**
```json
{
  "userId": "uuid-here",
  "specialization": "Cardiology",
  "experience": 15,
  "consultationFee": 100,
  "rating": 4.8,
  "totalPatients": 250,
  "status": "available",
  "expertise": ["Heart Disease", "Hypertension"],
  "about": "Board-certified cardiologist..."
}
```

**Appointment:**
```json
{
  "id": "appt_xxx",
  "patientId": "uuid-patient",
  "doctorId": "uuid-doctor",
  "date": "2024-11-01",
  "time": "10:00 AM",
  "reason": "Regular checkup",
  "status": "pending",
  "createdAt": "2024-10-30T..."
}
```

---

## 🔐 Authentication Flow

### 1. Sign Up
```
Frontend → POST /auth/signup
         ↓
Edge Function creates user in Supabase Auth
         ↓
Store user profile in KV Store
         ↓
Return user data + access token
```

### 2. Sign In
```
Frontend → POST /auth/signin
         ↓
Supabase Auth validates credentials
         ↓
Return access token
         ↓
Fetch user profile from KV Store
         ↓
Store token in localStorage
```

### 3. Protected Routes
```
Frontend sends request with Authorization header
         ↓
Edge Function verifies token with Supabase Auth
         ↓
If valid, process request
If invalid, return 401 Unauthorized
```

---

## 🚀 Getting Started

### Step 1: Install & Run

```bash
npm install
npm run dev
```

### Step 2: Initialize Database

Open your browser console (F12) and run:

```javascript
initDatabase()
```

This will:
- Check server health
- Create test patient account
- Show available doctor accounts

### Step 3: Test Login

Try logging in with these accounts:

**Patient Account:**
- Email: `patient@test.com`
- Password: `password123`

**Doctor Accounts:**
- Email: `dr.smith@healthcare.com`
- Password: `doctor123`
- (And 4 more doctors available!)

---

## 🛠️ API Endpoints

All endpoints are prefixed with:
```
https://{projectId}.supabase.co/functions/v1/make-server-abee656a
```

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | Create new user | No |
| POST | `/auth/signin` | Login user | No |
| GET | `/auth/user` | Get current user | Yes |
| POST | `/auth/logout` | Logout user | Yes |

### Doctors

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/doctors` | Get all doctors | No |
| GET | `/doctors/:id` | Get doctor by ID | No |
| PUT | `/doctors/:id` | Update doctor profile | Yes (Doctor only) |
| PUT | `/doctors/:id/status` | Update availability status | Yes (Doctor only) |

### Appointments

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/appointments` | Create appointment | Yes |
| GET | `/appointments` | Get user's appointments | Yes |
| PUT | `/appointments/:id` | Update appointment status | Yes |
| DELETE | `/appointments/:id` | Cancel appointment | Yes (Patient only) |

### Chat

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/messages` | Send message | Yes |
| GET | `/messages/:userId` | Get chat with user | Yes |
| GET | `/conversations` | Get all conversations | Yes |

### Content

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/articles` | Get all articles | No |
| GET | `/articles/:id` | Get article by ID | No |
| GET | `/health-tips` | Get health tips | No |

### Payments

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/payments` | Create payment | Yes |
| POST | `/withdrawals` | Request withdrawal | Yes (Doctor only) |
| GET | `/withdrawals` | Get withdrawals | Yes (Doctor only) |

### User Profile

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| PUT | `/users/:id` | Update user profile | Yes (Own profile only) |

---

## 🔧 Frontend API Usage

The app uses a typed API client located at `/lib/supabaseClient.ts`

### Example Usage

**Authentication:**
```typescript
import { authApi } from './lib/supabaseClient'

// Sign up
await authApi.signup({
  email: 'user@example.com',
  password: 'password123',
  name: 'John Doe',
  role: 'patient',
  age: 30,
  gender: 'Male'
})

// Sign in
const { access_token, user } = await authApi.signin(
  'user@example.com',
  'password123'
)

// Get current user
const user = await authApi.getCurrentUser()

// Logout
await authApi.logout()
```

**Doctors:**
```typescript
import { doctorApi } from './lib/supabaseClient'

// Get all doctors
const doctors = await doctorApi.getAll()

// Get specific doctor
const doctor = await doctorApi.getById(doctorId)

// Update status (doctor only)
await doctorApi.updateStatus(doctorId, 'available')
```

**Appointments:**
```typescript
import { appointmentApi } from './lib/supabaseClient'

// Book appointment
const appointment = await appointmentApi.create({
  doctorId: 'doctor-uuid',
  date: '2024-11-01',
  time: '10:00 AM',
  reason: 'Regular checkup'
})

// Get appointments
const appointments = await appointmentApi.getAll()

// Update status
await appointmentApi.updateStatus(appointmentId, 'confirmed')

// Cancel appointment
await appointmentApi.delete(appointmentId)
```

**Chat:**
```typescript
import { chatApi } from './lib/supabaseClient'

// Send message
await chatApi.sendMessage({
  receiverId: 'user-uuid',
  text: 'Hello doctor!'
})

// Get messages
const messages = await chatApi.getMessages(userId)

// Get conversations
const conversations = await chatApi.getConversations()
```

---

## 🌱 Seeding Data

### Initial Data

The server includes a seed script (`/supabase/functions/server/seed.ts`) that creates:

- **5 Sample Doctors** with different specializations
- **4 Health Articles** (Wellness, Illness, Herbal)
- **6 Health Tips** (Hydration, Sleep, Exercise, etc.)

### Running the Seed

The seed data is automatically created when doctors sign up. Alternatively, you can run the seed script on the server.

---

## 🔒 Security

### Authentication
- ✅ Supabase Auth for user management
- ✅ JWT tokens for session management
- ✅ Email confirmation (auto-enabled for demo)
- ✅ Secure password storage

### Authorization
- ✅ Role-based access control (Patient/Doctor)
- ✅ User can only modify own profile
- ✅ Doctors can only access their appointments
- ✅ Patients can only cancel own appointments

### API Security
- ✅ All sensitive routes require authentication
- ✅ Token verification on every request
- ✅ CORS configured correctly
- ✅ Error handling and logging

---

## 🐛 Debugging

### Check Server Health

```javascript
// In browser console
fetch('https://{projectId}.supabase.co/functions/v1/make-server-abee656a/health', {
  headers: {
    'Authorization': 'Bearer {publicAnonKey}'
  }
})
.then(r => r.json())
.then(console.log)
```

### Check Auth Token

```javascript
// In browser console
localStorage.getItem('access_token')
```

### View All Console Logs

Open DevTools → Console to see:
- API requests
- Errors
- Server responses
- Authentication flow

---

## 📝 Common Issues

### "Unauthorized" Error
**Problem:** Token expired or invalid
**Solution:** Logout and login again

### "User not found"
**Problem:** User data not in KV store
**Solution:** Sign up again or check seed data

### "CORS Error"
**Problem:** Server CORS not configured
**Solution:** Server already has CORS enabled, check network tab

### Appointment not showing
**Problem:** Data not synced
**Solution:** Refresh page or check appointments API

---

## 🚀 Next Steps

### 1. Customize Data
- Modify seed script to add your own doctors
- Add more health articles
- Create custom health tips

### 2. Add Features
- Real-time chat with WebSockets
- File upload for prescriptions
- Email notifications
- SMS reminders

### 3. Improve Security
- Add email verification flow
- Implement password reset
- Add rate limiting
- Enable 2FA

### 4. Deploy
- Deploy frontend to Vercel/Netlify
- Supabase backend is already live!
- Configure custom domain
- Set up monitoring

---

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Edge Functions](https://supabase.com/docs/guides/functions)
- [Hono Framework](https://hono.dev/)

---

## 💡 Pro Tips

1. **Use Browser DevTools** - Check Network tab for API calls
2. **Check Console** - All errors are logged
3. **Use Supabase Dashboard** - View logs and data
4. **Test with Postman** - Test API endpoints directly
5. **Read Error Messages** - They provide helpful debugging info

---

**Your app is now fully connected to Supabase! 🎉**

All data is persistent, authentication is real, and your app is production-ready (with additional security measures for healthcare data in production).
