import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'

const app = new Hono()

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))
app.use('*', logger(console.log))

// Create Supabase clients
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!
)

// Helper function to verify user
async function verifyUser(authHeader: string | undefined) {
  if (!authHeader) return null
  const token = authHeader.split(' ')[1]
  if (!token) return null
  
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
  if (error || !user) return null
  return user
}

// ==================== AUTH ROUTES ====================

// Sign up
app.post('/make-server-abee656a/auth/signup', async (c) => {
  try {
    const body = await c.req.json()
    const { email, password, name, role, ...additionalData } = body

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm since email server not configured
      user_metadata: { name, role }
    })

    if (authError) {
      console.log('Auth signup error:', authError)
      return c.json({ error: authError.message }, 400)
    }

    // Store user profile in KV store
    const userId = authData.user.id
    const userProfile = {
      id: userId,
      email,
      name,
      role,
      createdAt: new Date().toISOString(),
      ...additionalData
    }

    await kv.set(`user:${userId}`, userProfile)

    // If doctor, create doctor profile
    if (role === 'doctor') {
      const doctorProfile = {
        userId,
        specialization: additionalData.specialization || '',
        experience: additionalData.experience || 0,
        consultationFee: additionalData.consultationFee || 50,
        rating: 5.0,
        totalPatients: 0,
        status: 'available',
        expertise: additionalData.expertise || [],
        about: additionalData.about || '',
      }
      await kv.set(`doctor:${userId}`, doctorProfile)
    }

    return c.json({ 
      user: userProfile,
      message: 'User created successfully'
    })
  } catch (error) {
    console.log('Signup error:', error)
    return c.json({ error: 'Failed to create user: ' + error.message }, 500)
  }
})

// Sign in
app.post('/make-server-abee656a/auth/signin', async (c) => {
  try {
    const { email, password } = await c.req.json()

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      console.log('Signin error:', error)
      return c.json({ error: error.message }, 400)
    }

    // Get user profile
    const userId = data.user.id
    const userProfile = await kv.get(`user:${userId}`)

    return c.json({ 
      access_token: data.session.access_token,
      user: userProfile || data.user
    })
  } catch (error) {
    console.log('Signin error:', error)
    return c.json({ error: 'Failed to sign in: ' + error.message }, 500)
  }
})

// Get current user
app.get('/make-server-abee656a/auth/user', async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'))
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const userProfile = await kv.get(`user:${user.id}`)
    return c.json({ user: userProfile || user })
  } catch (error) {
    console.log('Get user error:', error)
    return c.json({ error: 'Failed to get user: ' + error.message }, 500)
  }
})

// Logout
app.post('/make-server-abee656a/auth/logout', async (c) => {
  try {
    const authHeader = c.req.header('Authorization')
    if (authHeader) {
      const token = authHeader.split(' ')[1]
      await supabaseClient.auth.signOut()
    }
    return c.json({ message: 'Logged out successfully' })
  } catch (error) {
    console.log('Logout error:', error)
    return c.json({ error: 'Failed to logout: ' + error.message }, 500)
  }
})

// ==================== DOCTOR ROUTES ====================

// Get all doctors
app.get('/make-server-abee656a/doctors', async (c) => {
  try {
    const doctors = await kv.getByPrefix('doctor:')
    const doctorsWithUsers = await Promise.all(
      doctors.map(async (doctor) => {
        const user = await kv.get(`user:${doctor.userId}`)
        return { ...doctor, ...user }
      })
    )
    return c.json({ doctors: doctorsWithUsers })
  } catch (error) {
    console.log('Get doctors error:', error)
    return c.json({ error: 'Failed to get doctors: ' + error.message }, 500)
  }
})

// Get doctor by ID
app.get('/make-server-abee656a/doctors/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const doctor = await kv.get(`doctor:${id}`)
    if (!doctor) {
      return c.json({ error: 'Doctor not found' }, 404)
    }
    const user = await kv.get(`user:${id}`)
    return c.json({ doctor: { ...doctor, ...user } })
  } catch (error) {
    console.log('Get doctor error:', error)
    return c.json({ error: 'Failed to get doctor: ' + error.message }, 500)
  }
})

// Update doctor profile
app.put('/make-server-abee656a/doctors/:id', async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'))
    if (!user) return c.json({ error: 'Unauthorized' }, 401)

    const id = c.req.param('id')
    if (user.id !== id) {
      return c.json({ error: 'Forbidden' }, 403)
    }

    const updates = await c.req.json()
    const doctor = await kv.get(`doctor:${id}`)
    
    if (!doctor) {
      return c.json({ error: 'Doctor not found' }, 404)
    }

    const updatedDoctor = { ...doctor, ...updates }
    await kv.set(`doctor:${id}`, updatedDoctor)

    return c.json({ doctor: updatedDoctor })
  } catch (error) {
    console.log('Update doctor error:', error)
    return c.json({ error: 'Failed to update doctor: ' + error.message }, 500)
  }
})

// Update doctor status
app.put('/make-server-abee656a/doctors/:id/status', async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'))
    if (!user) return c.json({ error: 'Unauthorized' }, 401)

    const id = c.req.param('id')
    if (user.id !== id) {
      return c.json({ error: 'Forbidden' }, 403)
    }

    const { status } = await c.req.json()
    const doctor = await kv.get(`doctor:${id}`)
    
    if (!doctor) {
      return c.json({ error: 'Doctor not found' }, 404)
    }

    doctor.status = status
    await kv.set(`doctor:${id}`, doctor)

    return c.json({ doctor })
  } catch (error) {
    console.log('Update status error:', error)
    return c.json({ error: 'Failed to update status: ' + error.message }, 500)
  }
})

// ==================== APPOINTMENT ROUTES ====================

// Create appointment
app.post('/make-server-abee656a/appointments', async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'))
    if (!user) return c.json({ error: 'Unauthorized' }, 401)

    const body = await c.req.json()
    const appointmentId = `appt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const appointment = {
      id: appointmentId,
      patientId: user.id,
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    await kv.set(`appointment:${appointmentId}`, appointment)

    return c.json({ appointment })
  } catch (error) {
    console.log('Create appointment error:', error)
    return c.json({ error: 'Failed to create appointment: ' + error.message }, 500)
  }
})

// Get appointments for user
app.get('/make-server-abee656a/appointments', async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'))
    if (!user) return c.json({ error: 'Unauthorized' }, 401)

    const userProfile = await kv.get(`user:${user.id}`)
    const allAppointments = await kv.getByPrefix('appointment:')

    let appointments
    if (userProfile.role === 'doctor') {
      appointments = allAppointments.filter(apt => apt.doctorId === user.id)
    } else {
      appointments = allAppointments.filter(apt => apt.patientId === user.id)
    }

    // Enrich with user data
    const enrichedAppointments = await Promise.all(
      appointments.map(async (apt) => {
        const doctor = await kv.get(`user:${apt.doctorId}`)
        const patient = await kv.get(`user:${apt.patientId}`)
        return { ...apt, doctor, patient }
      })
    )

    return c.json({ appointments: enrichedAppointments })
  } catch (error) {
    console.log('Get appointments error:', error)
    return c.json({ error: 'Failed to get appointments: ' + error.message }, 500)
  }
})

// Update appointment status
app.put('/make-server-abee656a/appointments/:id', async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'))
    if (!user) return c.json({ error: 'Unauthorized' }, 401)

    const id = c.req.param('id')
    const { status } = await c.req.json()

    const appointment = await kv.get(`appointment:${id}`)
    if (!appointment) {
      return c.json({ error: 'Appointment not found' }, 404)
    }

    appointment.status = status
    appointment.updatedAt = new Date().toISOString()
    await kv.set(`appointment:${id}`, appointment)

    return c.json({ appointment })
  } catch (error) {
    console.log('Update appointment error:', error)
    return c.json({ error: 'Failed to update appointment: ' + error.message }, 500)
  }
})

// Delete appointment
app.delete('/make-server-abee656a/appointments/:id', async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'))
    if (!user) return c.json({ error: 'Unauthorized' }, 401)

    const id = c.req.param('id')
    const appointment = await kv.get(`appointment:${id}`)
    
    if (!appointment) {
      return c.json({ error: 'Appointment not found' }, 404)
    }

    if (appointment.patientId !== user.id) {
      return c.json({ error: 'Forbidden' }, 403)
    }

    await kv.del(`appointment:${id}`)
    return c.json({ message: 'Appointment deleted' })
  } catch (error) {
    console.log('Delete appointment error:', error)
    return c.json({ error: 'Failed to delete appointment: ' + error.message }, 500)
  }
})

// ==================== CHAT ROUTES ====================

// Send message
app.post('/make-server-abee656a/messages', async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'))
    if (!user) return c.json({ error: 'Unauthorized' }, 401)

    const body = await c.req.json()
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const message = {
      id: messageId,
      senderId: user.id,
      ...body,
      createdAt: new Date().toISOString()
    }

    await kv.set(`message:${messageId}`, message)

    return c.json({ message })
  } catch (error) {
    console.log('Send message error:', error)
    return c.json({ error: 'Failed to send message: ' + error.message }, 500)
  }
})

// Get messages between users
app.get('/make-server-abee656a/messages/:userId', async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'))
    if (!user) return c.json({ error: 'Unauthorized' }, 401)

    const otherUserId = c.req.param('userId')
    const allMessages = await kv.getByPrefix('message:')

    const messages = allMessages.filter(msg => 
      (msg.senderId === user.id && msg.receiverId === otherUserId) ||
      (msg.senderId === otherUserId && msg.receiverId === user.id)
    ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

    return c.json({ messages })
  } catch (error) {
    console.log('Get messages error:', error)
    return c.json({ error: 'Failed to get messages: ' + error.message }, 500)
  }
})

// Get conversations
app.get('/make-server-abee656a/conversations', async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'))
    if (!user) return c.json({ error: 'Unauthorized' }, 401)

    const allMessages = await kv.getByPrefix('message:')
    const userMessages = allMessages.filter(msg => 
      msg.senderId === user.id || msg.receiverId === user.id
    )

    // Group by conversation partner
    const conversationMap = new Map()
    for (const msg of userMessages) {
      const partnerId = msg.senderId === user.id ? msg.receiverId : msg.senderId
      if (!conversationMap.has(partnerId) || 
          new Date(msg.createdAt) > new Date(conversationMap.get(partnerId).createdAt)) {
        conversationMap.set(partnerId, msg)
      }
    }

    const conversations = await Promise.all(
      Array.from(conversationMap.entries()).map(async ([partnerId, lastMessage]) => {
        const partner = await kv.get(`user:${partnerId}`)
        return { partner, lastMessage }
      })
    )

    return c.json({ conversations })
  } catch (error) {
    console.log('Get conversations error:', error)
    return c.json({ error: 'Failed to get conversations: ' + error.message }, 500)
  }
})

// ==================== ARTICLE ROUTES ====================

// Get all articles
app.get('/make-server-abee656a/articles', async (c) => {
  try {
    const articles = await kv.getByPrefix('article:')
    return c.json({ articles })
  } catch (error) {
    console.log('Get articles error:', error)
    return c.json({ error: 'Failed to get articles: ' + error.message }, 500)
  }
})

// Get article by ID
app.get('/make-server-abee656a/articles/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const article = await kv.get(`article:${id}`)
    
    if (!article) {
      return c.json({ error: 'Article not found' }, 404)
    }

    return c.json({ article })
  } catch (error) {
    console.log('Get article error:', error)
    return c.json({ error: 'Failed to get article: ' + error.message }, 500)
  }
})

// ==================== HEALTH TIPS ROUTES ====================

// Get all health tips
app.get('/make-server-abee656a/health-tips', async (c) => {
  try {
    const tips = await kv.getByPrefix('tip:')
    return c.json({ tips })
  } catch (error) {
    console.log('Get tips error:', error)
    return c.json({ error: 'Failed to get tips: ' + error.message }, 500)
  }
})

// ==================== PAYMENT ROUTES ====================

// Create payment
app.post('/make-server-abee656a/payments', async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'))
    if (!user) return c.json({ error: 'Unauthorized' }, 401)

    const body = await c.req.json()
    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const payment = {
      id: paymentId,
      userId: user.id,
      ...body,
      status: 'completed',
      createdAt: new Date().toISOString()
    }

    await kv.set(`payment:${paymentId}`, payment)

    return c.json({ payment })
  } catch (error) {
    console.log('Create payment error:', error)
    return c.json({ error: 'Failed to create payment: ' + error.message }, 500)
  }
})

// ==================== WITHDRAWAL ROUTES ====================

// Create withdrawal request
app.post('/make-server-abee656a/withdrawals', async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'))
    if (!user) return c.json({ error: 'Unauthorized' }, 401)

    const userProfile = await kv.get(`user:${user.id}`)
    if (userProfile.role !== 'doctor') {
      return c.json({ error: 'Only doctors can request withdrawals' }, 403)
    }

    const body = await c.req.json()
    const withdrawalId = `wd_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const withdrawal = {
      id: withdrawalId,
      doctorId: user.id,
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    await kv.set(`withdrawal:${withdrawalId}`, withdrawal)

    return c.json({ withdrawal })
  } catch (error) {
    console.log('Create withdrawal error:', error)
    return c.json({ error: 'Failed to create withdrawal: ' + error.message }, 500)
  }
})

// Get withdrawals for doctor
app.get('/make-server-abee656a/withdrawals', async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'))
    if (!user) return c.json({ error: 'Unauthorized' }, 401)

    const allWithdrawals = await kv.getByPrefix('withdrawal:')
    const withdrawals = allWithdrawals.filter(wd => wd.doctorId === user.id)

    return c.json({ withdrawals })
  } catch (error) {
    console.log('Get withdrawals error:', error)
    return c.json({ error: 'Failed to get withdrawals: ' + error.message }, 500)
  }
})

// ==================== USER PROFILE ROUTES ====================

// Update user profile
app.put('/make-server-abee656a/users/:id', async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'))
    if (!user) return c.json({ error: 'Unauthorized' }, 401)

    const id = c.req.param('id')
    if (user.id !== id) {
      return c.json({ error: 'Forbidden' }, 403)
    }

    const updates = await c.req.json()
    const userProfile = await kv.get(`user:${id}`)
    
    if (!userProfile) {
      return c.json({ error: 'User not found' }, 404)
    }

    const updatedProfile = { ...userProfile, ...updates }
    await kv.set(`user:${id}`, updatedProfile)

    return c.json({ user: updatedProfile })
  } catch (error) {
    console.log('Update user error:', error)
    return c.json({ error: 'Failed to update user: ' + error.message }, 500)
  }
})

// Health check
app.get('/make-server-abee656a/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Start server
Deno.serve(app.fetch)
