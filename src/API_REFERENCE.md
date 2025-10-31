# 📡 API Reference

Quick reference for all Supabase backend endpoints.

---

## 🔗 Base URL

```
https://{projectId}.supabase.co/functions/v1/make-server-abee656a
```

---

## 🔐 Authentication

All authenticated requests must include:
```
Authorization: Bearer {access_token}
```

---

## 📋 API Endpoints

### 🔒 Authentication (4 endpoints)

#### Sign Up
```http
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "patient",
  "phone": "+1234567890",
  "age": 30,
  "gender": "Male"
}

Response: {
  "user": { id, email, name, role, ... },
  "message": "User created successfully"
}
```

#### Sign In
```http
POST /auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: {
  "access_token": "eyJhbGc...",
  "user": { id, email, name, role, ... }
}
```

#### Get Current User
```http
GET /auth/user
Authorization: Bearer {token}

Response: {
  "user": { id, email, name, role, ... }
}
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer {token}

Response: {
  "message": "Logged out successfully"
}
```

---

### 👨‍⚕️ Doctors (4 endpoints)

#### Get All Doctors
```http
GET /doctors

Response: {
  "doctors": [
    {
      "id": "uuid",
      "name": "Dr. Sarah Smith",
      "email": "dr.smith@healthcare.com",
      "specialization": "Cardiology",
      "experience": 15,
      "consultationFee": 100,
      "rating": 4.8,
      "status": "available",
      "expertise": ["Heart Disease", "Hypertension"]
    },
    ...
  ]
}
```

#### Get Doctor by ID
```http
GET /doctors/{doctorId}

Response: {
  "doctor": {
    "id": "uuid",
    "name": "Dr. Sarah Smith",
    ...
  }
}
```

#### Update Doctor Profile
```http
PUT /doctors/{doctorId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "specialization": "Cardiology",
  "experience": 16,
  "consultationFee": 120,
  "expertise": ["Heart Disease", "Hypertension", "ECG"]
}

Response: {
  "doctor": { updated doctor profile }
}
```

#### Update Doctor Status
```http
PUT /doctors/{doctorId}/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "available"  // or "busy" or "offline"
}

Response: {
  "doctor": { updated doctor with new status }
}
```

---

### 📅 Appointments (4 endpoints)

#### Create Appointment
```http
POST /appointments
Authorization: Bearer {token}
Content-Type: application/json

{
  "doctorId": "doctor-uuid",
  "date": "2024-11-01",
  "time": "10:00 AM",
  "reason": "Regular checkup"
}

Response: {
  "appointment": {
    "id": "appt_xxx",
    "patientId": "patient-uuid",
    "doctorId": "doctor-uuid",
    "date": "2024-11-01",
    "time": "10:00 AM",
    "reason": "Regular checkup",
    "status": "pending",
    "createdAt": "2024-10-30T..."
  }
}
```

#### Get User Appointments
```http
GET /appointments
Authorization: Bearer {token}

Response: {
  "appointments": [
    {
      "id": "appt_xxx",
      "patient": { id, name, ... },
      "doctor": { id, name, ... },
      "date": "2024-11-01",
      "time": "10:00 AM",
      "status": "pending",
      ...
    },
    ...
  ]
}
```

#### Update Appointment Status
```http
PUT /appointments/{appointmentId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "confirmed"  // or "completed", "cancelled"
}

Response: {
  "appointment": { updated appointment }
}
```

#### Delete/Cancel Appointment
```http
DELETE /appointments/{appointmentId}
Authorization: Bearer {token}

Response: {
  "message": "Appointment deleted"
}
```

---

### 💬 Chat / Messages (3 endpoints)

#### Send Message
```http
POST /messages
Authorization: Bearer {token}
Content-Type: application/json

{
  "receiverId": "user-uuid",
  "text": "Hello doctor!"
}

Response: {
  "message": {
    "id": "msg_xxx",
    "senderId": "sender-uuid",
    "receiverId": "receiver-uuid",
    "text": "Hello doctor!",
    "createdAt": "2024-10-30T..."
  }
}
```

#### Get Messages with User
```http
GET /messages/{userId}
Authorization: Bearer {token}

Response: {
  "messages": [
    {
      "id": "msg_xxx",
      "senderId": "sender-uuid",
      "receiverId": "receiver-uuid",
      "text": "Hello!",
      "createdAt": "2024-10-30T..."
    },
    ...
  ]
}
```

#### Get All Conversations
```http
GET /conversations
Authorization: Bearer {token}

Response: {
  "conversations": [
    {
      "partner": {
        "id": "user-uuid",
        "name": "Dr. Sarah Smith",
        ...
      },
      "lastMessage": {
        "text": "See you tomorrow!",
        "createdAt": "2024-10-30T..."
      }
    },
    ...
  ]
}
```

---

### 📚 Content (3 endpoints)

#### Get All Articles
```http
GET /articles

Response: {
  "articles": [
    {
      "id": "article_1",
      "title": "Understanding Heart Health",
      "category": "wellness",
      "excerpt": "Learn about...",
      "content": "Full article content...",
      "readTime": "5 min read",
      "image": "https://...",
      "publishedDate": "2024-10-15T..."
    },
    ...
  ]
}
```

#### Get Article by ID
```http
GET /articles/{articleId}

Response: {
  "article": {
    "id": "article_1",
    "title": "Understanding Heart Health",
    ...
  }
}
```

#### Get Health Tips
```http
GET /health-tips

Response: {
  "tips": [
    {
      "id": "tip_1",
      "title": "Stay Hydrated",
      "category": "hydration",
      "description": "Drink at least 8 glasses...",
      "icon": "Droplets",
      "date": "2024-10-30T..."
    },
    ...
  ]
}
```

---

### 💳 Payments (1 endpoint)

#### Create Payment
```http
POST /payments
Authorization: Bearer {token}
Content-Type: application/json

{
  "appointmentId": "appt_xxx",
  "amount": 100,
  "method": "PayPal",
  "accountEmail": "user@paypal.com"
}

Response: {
  "payment": {
    "id": "pay_xxx",
    "userId": "user-uuid",
    "appointmentId": "appt_xxx",
    "amount": 100,
    "method": "PayPal",
    "status": "completed",
    "createdAt": "2024-10-30T..."
  }
}
```

---

### 💰 Withdrawals (2 endpoints)

#### Request Withdrawal (Doctor only)
```http
POST /withdrawals
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 500,
  "method": "PayPal",
  "accountDetails": {
    "email": "doctor@paypal.com"
  }
}

Response: {
  "withdrawal": {
    "id": "wd_xxx",
    "doctorId": "doctor-uuid",
    "amount": 500,
    "method": "PayPal",
    "status": "pending",
    "createdAt": "2024-10-30T..."
  }
}
```

#### Get Withdrawals (Doctor only)
```http
GET /withdrawals
Authorization: Bearer {token}

Response: {
  "withdrawals": [
    {
      "id": "wd_xxx",
      "amount": 500,
      "method": "PayPal",
      "status": "pending",
      "createdAt": "2024-10-30T..."
    },
    ...
  ]
}
```

---

### 👤 User Profile (1 endpoint)

#### Update User Profile
```http
PUT /users/{userId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "+1234567890",
  "age": 31,
  "gender": "Male",
  "address": "456 New St"
}

Response: {
  "user": { updated user profile }
}
```

---

### ❤️ Health Check (1 endpoint)

#### Check Server Health
```http
GET /health

Response: {
  "status": "ok",
  "timestamp": "2024-10-30T..."
}
```

---

## 🔒 Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request (invalid data) |
| 401 | Unauthorized (invalid/missing token) |
| 403 | Forbidden (wrong role) |
| 404 | Not Found |
| 500 | Server Error |

---

## ❌ Error Response Format

```json
{
  "error": "Error message here"
}
```

---

## 💡 Frontend Usage Examples

### Using the API Client

```typescript
import {
  authApi,
  doctorApi,
  appointmentApi,
  chatApi,
  articleApi,
  paymentApi,
  withdrawalApi,
  userApi
} from './lib/supabaseClient'

// Authentication
const { access_token, user } = await authApi.signin(email, password)
await authApi.logout()

// Doctors
const doctors = await doctorApi.getAll()
const doctor = await doctorApi.getById(doctorId)
await doctorApi.updateStatus(doctorId, 'available')

// Appointments
const appointment = await appointmentApi.create({
  doctorId,
  date: '2024-11-01',
  time: '10:00 AM',
  reason: 'Checkup'
})
const appointments = await appointmentApi.getAll()
await appointmentApi.updateStatus(appointmentId, 'confirmed')
await appointmentApi.delete(appointmentId)

// Chat
await chatApi.sendMessage({
  receiverId: userId,
  text: 'Hello!'
})
const messages = await chatApi.getMessages(userId)
const conversations = await chatApi.getConversations()

// Content
const articles = await articleApi.getAll()
const article = await articleApi.getById(articleId)
const tips = await healthTipsApi.getAll()

// Payments
await paymentApi.create({
  appointmentId,
  amount: 100,
  method: 'PayPal'
})

// Withdrawals (doctors only)
await withdrawalApi.create({
  amount: 500,
  method: 'PayPal',
  accountDetails: { email: 'doctor@paypal.com' }
})
const withdrawals = await withdrawalApi.getAll()

// User Profile
await userApi.update(userId, {
  name: 'Updated Name',
  phone: '+1234567890'
})
```

---

## 🧪 Testing with cURL

### Test Sign Up
```bash
curl -X POST https://{projectId}.supabase.co/functions/v1/make-server-abee656a/auth/signup \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {publicAnonKey}" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User",
    "role": "patient"
  }'
```

### Test Get Doctors
```bash
curl https://{projectId}.supabase.co/functions/v1/make-server-abee656a/doctors \
  -H "Authorization: Bearer {publicAnonKey}"
```

### Test with Authentication
```bash
curl https://{projectId}.supabase.co/functions/v1/make-server-abee656a/appointments \
  -H "Authorization: Bearer {accessToken}"
```

---

## 📊 Rate Limiting

Currently: **No rate limiting** (demo/development)

For production, consider adding:
- Per-user limits (e.g., 100 requests/minute)
- IP-based limits
- Endpoint-specific limits

---

## 🔐 Security Notes

1. **Never expose service role key** in frontend code
2. **Always use access tokens** for authenticated requests
3. **Validate all inputs** on the server side
4. **Check user permissions** before allowing actions
5. **Use HTTPS** in production (already enabled)

---

## 📚 Additional Resources

- [Supabase API Docs](https://supabase.com/docs/reference/javascript/introduction)
- [Hono Framework Docs](https://hono.dev/)
- [Full Setup Guide](./SUPABASE_SETUP.md)
- [Architecture Diagram](./ARCHITECTURE.md)

---

**API Reference v1.0.0** - Last updated: October 30, 2025
