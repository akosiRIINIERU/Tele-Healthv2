# ✅ Testing Checklist

Complete checklist to verify your Doctor Booking App is working correctly with Supabase backend.

---

## 🚀 Initial Setup

### Step 1: Installation
- [ ] Cloned/opened project in VS Code
- [ ] Ran `npm install` successfully
- [ ] No errors in terminal
- [ ] All dependencies installed

### Step 2: Start Application
- [ ] Ran `npm run dev`
- [ ] Server started on `http://localhost:5173`
- [ ] No build errors
- [ ] Browser opens automatically or manually navigate to URL

### Step 3: Initialize Database
- [ ] Opened browser console (F12)
- [ ] Ran `initDatabase()`
- [ ] Saw success message
- [ ] Test accounts created

---

## 🔐 Authentication Testing

### Patient Sign Up
- [ ] Click "Sign Up" link
- [ ] Select "Patient" tab
- [ ] Fill in all fields:
  - [ ] Name
  - [ ] Email
  - [ ] Password
  - [ ] Phone
  - [ ] Age
  - [ ] Gender
- [ ] Click "Sign Up"
- [ ] See success toast
- [ ] Redirected to Patient Dashboard

### Patient Sign In
- [ ] Use email: `patient@test.com`
- [ ] Use password: `password123`
- [ ] Select "Patient" tab
- [ ] Click "Sign In"
- [ ] Successfully logged in
- [ ] Dashboard loads

### Doctor Sign In
- [ ] Logout if logged in
- [ ] Use email: `dr.smith@healthcare.com`
- [ ] Use password: `doctor123`
- [ ] Select "Doctor" tab
- [ ] Click "Sign In"
- [ ] Successfully logged in
- [ ] Doctor Dashboard loads

### Session Persistence
- [ ] Login as patient
- [ ] Refresh page (F5)
- [ ] Still logged in
- [ ] User data persists

### Logout
- [ ] Click Profile
- [ ] Click Logout
- [ ] See logout toast
- [ ] Redirected to login
- [ ] Cannot access protected routes

---

## 👥 Patient Features Testing

### Browse Doctors
- [ ] Login as patient
- [ ] Click "Doctors" in bottom nav
- [ ] See list of doctors
- [ ] Doctors loaded from database
- [ ] Can search doctors
- [ ] Can filter by status
- [ ] See doctor specializations
- [ ] See consultation fees

### View Doctor Profile
- [ ] Click on a doctor
- [ ] See full doctor profile
- [ ] See rating and experience
- [ ] See areas of expertise
- [ ] See consultation fee
- [ ] Action buttons visible (Chat, Call, Book)

### Book Appointment
- [ ] From doctor profile, click "Book Appointment"
- [ ] Calendar appears
- [ ] Select a date
- [ ] Select a time slot
- [ ] Time slot highlights when selected
- [ ] Add reason (optional)
- [ ] See booking summary
- [ ] Click "Confirm Booking"
- [ ] See success toast
- [ ] Redirected to appointments

### View Appointments
- [ ] Click "Appointments" in bottom nav
- [ ] See "Upcoming" tab
- [ ] See booked appointment
- [ ] Appointment has correct details
- [ ] Can see doctor info
- [ ] Can cancel appointment
- [ ] Switch to "Past" tab
- [ ] Tab changes work

### Cancel Appointment
- [ ] View upcoming appointment
- [ ] Click "Cancel"
- [ ] See confirmation dialog
- [ ] Confirm cancellation
- [ ] Appointment removed
- [ ] See success toast

### Chat with Doctor
- [ ] Click "Chat" in bottom nav
- [ ] See list of doctors
- [ ] Click on a doctor
- [ ] Chat interface opens
- [ ] Type a message
- [ ] Click send
- [ ] Message appears
- [ ] Message saved to database
- [ ] Go back and come back
- [ ] Message history persists

### Read Articles
- [ ] Click "Articles" in bottom nav
- [ ] See featured article
- [ ] See article categories
- [ ] Search for article
- [ ] Filter by category
- [ ] Click on article
- [ ] Article detail loads
- [ ] Can read full content
- [ ] Back button works

### Health Tips
- [ ] Go to Patient Dashboard
- [ ] See "Today's Health Tip"
- [ ] Click "View All Tips"
- [ ] See all health tips
- [ ] Tips have categories
- [ ] Tips loaded from database

### Profile Management
- [ ] Click "Profile" in bottom nav
- [ ] See user information
- [ ] See health points
- [ ] Click "Edit Profile"
- [ ] Update name
- [ ] Update phone
- [ ] Click "Save"
- [ ] See success toast
- [ ] Changes persist after refresh

### Settings
- [ ] Go to Profile → Settings
- [ ] Toggle dark mode
- [ ] UI changes to dark theme
- [ ] Toggle back to light mode
- [ ] Theme preference persists
- [ ] Other settings visible

---

## 👨‍⚕️ Doctor Features Testing

### Doctor Dashboard
- [ ] Login as doctor (dr.smith@healthcare.com / doctor123)
- [ ] See doctor dashboard
- [ ] See statistics cards:
  - [ ] Total Patients
  - [ ] Today's Appointments
  - [ ] Monthly Earnings
  - [ ] Hours Worked
- [ ] See pending appointments (if any)
- [ ] Can see patient details

### Update Status
- [ ] On dashboard, see status dropdown
- [ ] Current status shown
- [ ] Click dropdown
- [ ] Select "Available"
- [ ] Status updates immediately
- [ ] Try "Busy"
- [ ] Try "Offline"
- [ ] Status persists after refresh

### Manage Appointments
- [ ] Click "Appointments" in bottom nav
- [ ] See three tabs: Pending, Confirmed, Completed
- [ ] Create a patient appointment first (book as patient)
- [ ] Login back as doctor
- [ ] See appointment in "Pending" tab
- [ ] Click "Confirm"
- [ ] Appointment moves to "Confirmed"
- [ ] Try "Reject" on another appointment
- [ ] Appointment removed from pending

### Mark Appointment Complete
- [ ] Go to "Confirmed" tab
- [ ] See confirmed appointment
- [ ] Click "Mark as Complete"
- [ ] Appointment moves to "Completed" tab
- [ ] Completed appointments have faded style

### Track Earnings
- [ ] Go to Profile → Earnings & Withdrawals
- [ ] See available balance
- [ ] See this month's earnings
- [ ] See total withdrawn
- [ ] Earnings display correctly

### Request Withdrawal
- [ ] On Withdrawals screen
- [ ] Enter amount (e.g., 100)
- [ ] Or click preset button
- [ ] Select withdrawal method (PayPal/PayMaya/GCash)
- [ ] Enter account details
- [ ] Click "Request Withdrawal"
- [ ] See success toast
- [ ] Withdrawal request saved

### Doctor Profile
- [ ] Click "Profile" in bottom nav
- [ ] See doctor information
- [ ] See specialization
- [ ] See rating and experience
- [ ] See expertise badges
- [ ] Click "Edit Profile"
- [ ] Update consultation fee
- [ ] Add expertise area
- [ ] Save changes
- [ ] Changes persist

### Chat with Patients
- [ ] Click "Chat" in bottom nav
- [ ] See list of patients (who messaged)
- [ ] Click on patient
- [ ] See chat history
- [ ] Send a reply
- [ ] Message sends successfully

---

## 🔄 Cross-User Testing

### Patient → Doctor Flow
- [ ] Login as patient
- [ ] Book appointment with Dr. Smith
- [ ] Send chat message to Dr. Smith
- [ ] Logout
- [ ] Login as Dr. Smith
- [ ] See appointment in pending
- [ ] See chat message from patient
- [ ] Respond to chat
- [ ] Confirm appointment
- [ ] Logout
- [ ] Login back as patient
- [ ] See appointment confirmed
- [ ] See doctor's reply in chat

---

## 📊 Data Persistence Testing

### After Page Refresh
- [ ] Login as user
- [ ] Book an appointment
- [ ] Refresh page (F5)
- [ ] Still logged in
- [ ] Appointment still there

### After Browser Close
- [ ] Login
- [ ] Close browser completely
- [ ] Open browser again
- [ ] Navigate to app
- [ ] Still logged in
- [ ] Data intact

### Multiple Tabs
- [ ] Open app in two tabs
- [ ] Login in first tab
- [ ] Refresh second tab
- [ ] Both tabs logged in
- [ ] Make change in first tab
- [ ] Refresh second tab
- [ ] See change reflected

---

## 🌐 API Testing

### Check Server Health
- [ ] Open browser console
- [ ] Run:
```javascript
fetch('https://{projectId}.supabase.co/functions/v1/make-server-abee656a/health')
  .then(r => r.json())
  .then(console.log)
```
- [ ] See `{ status: "ok", timestamp: "..." }`

### Check Authentication Token
- [ ] Open browser console
- [ ] Run: `localStorage.getItem('access_token')`
- [ ] See JWT token (long string)
- [ ] Token exists when logged in
- [ ] Token is null when logged out

### Test API Direct Call
- [ ] Open browser console
- [ ] Run:
```javascript
fetch('https://{projectId}.supabase.co/functions/v1/make-server-abee656a/doctors')
  .then(r => r.json())
  .then(console.log)
```
- [ ] See array of doctors
- [ ] 5 doctors returned

---

## 🎨 UI/UX Testing

### Theme Testing
- [ ] Light mode works
- [ ] Dark mode works
- [ ] Toggle persists
- [ ] All colors visible in both modes
- [ ] Text readable in both modes

### Responsive Design
- [ ] Desktop: App centered, max-width applied
- [ ] Tablet: App looks good
- [ ] Mobile: App fits screen
- [ ] Open DevTools → Responsive mode
- [ ] Test different screen sizes
- [ ] No horizontal scroll

### Navigation
- [ ] Bottom navigation visible
- [ ] All nav items work
- [ ] Active tab highlighted
- [ ] Back button works
- [ ] Can navigate to all screens

### Loading States
- [ ] Login shows loading during auth
- [ ] Buttons disabled when loading
- [ ] No double-submission possible

### Toast Notifications
- [ ] Success toasts appear (green)
- [ ] Error toasts appear (red)
- [ ] Toasts auto-dismiss
- [ ] Toasts positioned correctly

---

## 🐛 Error Testing

### Network Error Handling
- [ ] Open DevTools → Network tab
- [ ] Set throttling to "Offline"
- [ ] Try to login
- [ ] See error message
- [ ] Set back to "No throttling"
- [ ] App works again

### Invalid Login
- [ ] Try wrong email
- [ ] See error message
- [ ] Try wrong password
- [ ] See error message
- [ ] Try without selecting role
- [ ] See appropriate error

### Empty States
- [ ] New user with no appointments
- [ ] See "No appointments" message
- [ ] No appointments in doctor pending
- [ ] See empty state
- [ ] Filter articles with no results
- [ ] See "No articles found"

---

## ✅ Final Checks

### Security
- [ ] Passwords not visible in console
- [ ] Tokens stored securely
- [ ] Cannot access doctor routes as patient
- [ ] Cannot access patient routes as doctor
- [ ] Cannot edit other users' profiles
- [ ] Logout works properly

### Performance
- [ ] App loads quickly
- [ ] No console errors
- [ ] No console warnings (or minimal)
- [ ] Smooth transitions
- [ ] No lag when typing
- [ ] Images load properly

### Browser Compatibility
- [ ] Chrome: Works ✓
- [ ] Firefox: Works ✓
- [ ] Safari: Works ✓
- [ ] Edge: Works ✓

---

## 📝 Test Results

Record your test results:

**Date Tested**: __________

**Tested By**: __________

**Browser**: __________

**All Tests Passed**: ☐ Yes  ☐ No

**Issues Found**: 
```
(List any issues here)
```

**Notes**:
```
(Additional notes)
```

---

## 🆘 If Something Fails

### Common Fixes

**Login not working?**
- Check console for errors
- Run `initDatabase()` again
- Clear localStorage and try again

**Data not persisting?**
- Check if Supabase is connected
- Check browser console for API errors
- Check network tab for failed requests

**Appointments not showing?**
- Refresh the page
- Check if booking was successful
- Check appointments API response

**Server error?**
- Check health endpoint
- Check Supabase dashboard
- Check error message in console

---

## ✅ Success Criteria

You can consider the app fully working when:

- [ ] Can sign up new users
- [ ] Can login existing users
- [ ] Data persists across refreshes
- [ ] All patient features work
- [ ] All doctor features work
- [ ] Chat works
- [ ] Appointments work
- [ ] Profile updates work
- [ ] No critical errors in console
- [ ] Theme toggle works
- [ ] Responsive design works

---

**Testing Complete! 🎉**

If all checkboxes are checked, your app is fully functional and ready to use!
