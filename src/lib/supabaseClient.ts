import { projectId, publicAnonKey } from '../utils/supabase/info'

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-abee656a`

// Helper to get auth token from localStorage
function getAuthToken(): string | null {
  return localStorage.getItem('access_token')
}

// Helper to set auth token
export function setAuthToken(token: string) {
  localStorage.setItem('access_token', token)
}

// Helper to clear auth token
export function clearAuthToken() {
  localStorage.removeItem('access_token')
}

// Generic API call helper
async function apiCall(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const token = getAuthToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : `Bearer ${publicAnonKey}`,
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(error.error || `HTTP ${response.status}`)
  }

  return response.json()
}

// ==================== AUTH API ====================

export const authApi = {
  signup: async (data: {
    email: string
    password: string
    name: string
    role: 'patient' | 'doctor'
    [key: string]: any
  }) => {
    const result = await apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return result
  },

  signin: async (email: string, password: string) => {
    const result = await apiCall('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    if (result.access_token) {
      setAuthToken(result.access_token)
    }
    return result
  },

  logout: async () => {
    await apiCall('/auth/logout', { method: 'POST' })
    clearAuthToken()
  },

  getCurrentUser: async () => {
    try {
      const result = await apiCall('/auth/user')
      return result.user
    } catch (error) {
      clearAuthToken()
      throw error
    }
  },
}

// ==================== DOCTOR API ====================

export const doctorApi = {
  getAll: async () => {
    const result = await apiCall('/doctors')
    return result.doctors
  },

  getById: async (id: string) => {
    const result = await apiCall(`/doctors/${id}`)
    return result.doctor
  },

  update: async (id: string, data: any) => {
    const result = await apiCall(`/doctors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    return result.doctor
  },

  updateStatus: async (id: string, status: string) => {
    const result = await apiCall(`/doctors/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
    return result.doctor
  },
}

// ==================== APPOINTMENT API ====================

export const appointmentApi = {
  create: async (data: {
    doctorId: string
    date: string
    time: string
    reason?: string
  }) => {
    const result = await apiCall('/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return result.appointment
  },

  getAll: async () => {
    const result = await apiCall('/appointments')
    return result.appointments
  },

  updateStatus: async (id: string, status: string) => {
    const result = await apiCall(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
    return result.appointment
  },

  delete: async (id: string) => {
    const result = await apiCall(`/appointments/${id}`, {
      method: 'DELETE',
    })
    return result
  },
}

// ==================== CHAT API ====================

export const chatApi = {
  sendMessage: async (data: {
    receiverId: string
    text: string
  }) => {
    const result = await apiCall('/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return result.message
  },

  getMessages: async (userId: string) => {
    const result = await apiCall(`/messages/${userId}`)
    return result.messages
  },

  getConversations: async () => {
    const result = await apiCall('/conversations')
    return result.conversations
  },
}

// ==================== ARTICLE API ====================

export const articleApi = {
  getAll: async () => {
    const result = await apiCall('/articles')
    return result.articles
  },

  getById: async (id: string) => {
    const result = await apiCall(`/articles/${id}`)
    return result.article
  },
}

// ==================== HEALTH TIPS API ====================

export const healthTipsApi = {
  getAll: async () => {
    const result = await apiCall('/health-tips')
    return result.tips
  },
}

// ==================== PAYMENT API ====================

export const paymentApi = {
  create: async (data: {
    appointmentId: string
    amount: number
    method: string
    [key: string]: any
  }) => {
    const result = await apiCall('/payments', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return result.payment
  },
}

// ==================== WITHDRAWAL API ====================

export const withdrawalApi = {
  create: async (data: {
    amount: number
    method: string
    accountDetails: any
  }) => {
    const result = await apiCall('/withdrawals', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return result.withdrawal
  },

  getAll: async () => {
    const result = await apiCall('/withdrawals')
    return result.withdrawals
  },
}

// ==================== USER API ====================

export const userApi = {
  update: async (id: string, data: any) => {
    const result = await apiCall(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    return result.user
  },
}

// Health check
export async function checkHealth() {
  try {
    const result = await apiCall('/health')
    return result
  } catch (error) {
    console.error('Health check failed:', error)
    throw error
  }
}
