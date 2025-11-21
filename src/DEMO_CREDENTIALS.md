# Demo Credentials & Google Login Guide

## Google Sign-In/Up Demo

The Google authentication buttons in the login and registration screens are **demo implementations**. Here's how they work:

### Login with Google (Demo)
When you click "Continue with Google" on the login screen:
- **For Doctors**: Logs in with `dr.smith@healthcare.com` (seeded account)
- **For Patients**: Attempts login with `patient@demo.com` (may not exist yet)

If the demo patient account doesn't exist, you'll see an error message. In that case, use the **Register with Google** option instead.

### Register with Google (Demo)
When you click "Continue with Google" on the registration screen:
- Creates a new account with a unique Google-style email
- Format: `googleuser[timestamp]@gmail.com`
- Works for both Patient and Doctor roles

---

## Seeded Demo Accounts

The following accounts are already created in the database (if seed script was run):

### Doctor Accounts
All doctors use password: `doctor123`

1. **Dr. Sarah Smith** (Cardiologist)
   - Email: `dr.smith@healthcare.com`
   - Specialization: Cardiologist
   - Experience: 15 years
   
2. **Dr. Michael Johnson** (Pediatrician)
   - Email: `dr.johnson@healthcare.com`
   - Specialization: Pediatrician
   - Experience: 10 years
   
3. **Dr. Maria Garcia** (Dermatologist)
   - Email: `dr.garcia@healthcare.com`
   - Specialization: Dermatologist
   - Experience: 12 years
   
4. **Dr. James Lee** (General Physician)
   - Email: `dr.lee@healthcare.com`
   - Specialization: General Physician
   - Experience: 8 years
   
5. **Dr. Priya Patel** (Psychiatrist)
   - Email: `dr.patel@healthcare.com`
   - Specialization: Psychiatrist
   - Experience: 14 years

---

## Testing the Features

### Testing Google Login (Doctor)
1. Go to Login page
2. Select "Doctor" tab
3. Click "Continue with Google"
4. Should log in as Dr. Sarah Smith
5. Redirected to Doctor Dashboard

### Testing Google Sign Up (Patient)
1. Go to Register page
2. Select "Patient" tab
3. Click "Continue with Google"
4. New account created automatically
5. Redirected to Patient Dashboard

### Testing Rating System
1. Login as Patient
2. Go to "My Appointments"
3. Switch to "Past" tab
4. Find a completed appointment
5. Click "Rate Doctor"
6. Select stars (1-5) and optionally add review
7. Submit rating

### Testing Pending Cancellations

**As Patient:**
1. Go to "My Appointments"
2. Find an upcoming appointment
3. Click "Cancel"
4. Confirm cancellation request
5. Badge shows "Cancel Pending"

**As Doctor:**
1. Login as doctor
2. Go to "Appointments"
3. Click "Cancel" tab
4. See pending cancellation requests
5. Click "Approve Cancel" or "Deny"
6. Confirm action

---

## Production Setup

For **production use** with real Google OAuth:

1. Follow the Supabase guide: https://supabase.com/docs/guides/auth/social-login/auth-google

2. Set up Google OAuth credentials in Google Cloud Console

3. Configure Supabase Auth with your Google Client ID and Secret

4. Update the code to use real Supabase OAuth:
   ```typescript
   const { data, error } = await supabase.auth.signInWithOAuth({
     provider: 'google',
   });
   ```

5. Remove the demo implementation and replace with actual OAuth flow

---

## Regular Sign In/Up

You can always use the regular email/password authentication:

### Create New Account
1. Click "Register"
2. Select role (Patient or Doctor)
3. Fill in all required fields
4. Click "Create Account"

### Sign In
1. Go to Login page
2. Select your role
3. Enter email and password
4. Click "Sign In"

---

## Accessibility Features

All authentication screens now include:
- ✅ Full keyboard navigation
- ✅ Screen reader support with ARIA labels
- ✅ Focus indicators on all interactive elements
- ✅ Form validation with accessible error messages
- ✅ Clear visual feedback for all states

### Keyboard Shortcuts
- **Tab**: Navigate between fields
- **Enter**: Submit forms or activate buttons
- **Space**: Activate buttons
- **Arrow Keys**: Navigate between tabs (Patient/Doctor)

---

## Troubleshooting

### "Invalid login credentials" error
- The demo patient account might not exist
- Try using Google Sign-Up instead of Sign-In
- Or create a regular account with email/password

### Google button not working
- Check browser console for errors
- Ensure you're connected to the server
- Try refreshing the page

### Can't switch between Patient/Doctor
- Click the appropriate tab at the top
- The Google button behavior changes based on selected role

---

## Notes

- Demo Google authentication is for testing purposes only
- In production, real Google OAuth should be implemented
- All demo accounts use simple passwords for testing
- The toast notifications inform users about the demo nature
