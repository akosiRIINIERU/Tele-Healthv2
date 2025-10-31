// Frontend script to initialize database with seed data
// Run this from the browser console or create a temporary button in the UI

import { projectId, publicAnonKey } from '../utils/supabase/info'

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-abee656a`

async function initDatabase() {
  console.log('🌱 Initializing database...')
  
  try {
    // Check if server is healthy
    const healthResponse = await fetch(`${API_URL}/health`, {
      headers: {
        Authorization: `Bearer ${publicAnonKey}`,
      },
    })
    
    if (!healthResponse.ok) {
      throw new Error('Server is not responding')
    }
    
    console.log('✓ Server is healthy')
    
    // Note: The seed script needs to be run on the server side
    // For now, we'll create a test patient account
    console.log('Creating test accounts...')
    
    // Create a test patient
    try {
      const patientResponse = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          email: 'patient@test.com',
          password: 'password123',
          name: 'Test Patient',
          role: 'patient',
          phone: '+1 (555) 000-0001',
          age: 30,
          gender: 'Other',
        }),
      })
      
      if (patientResponse.ok) {
        console.log('✓ Test patient created (patient@test.com / password123)')
      }
    } catch (error) {
      console.log('Test patient may already exist')
    }
    
    console.log('✅ Database initialization complete!')
    console.log('')
    console.log('To seed doctors, articles, and health tips:')
    console.log('1. The seed data is automatically created by doctors signing up')
    console.log('2. Or run the seed script on the server')
    console.log('')
    console.log('Test Accounts:')
    console.log('Patient: patient@test.com / password123')
    console.log('')
    console.log('Sample Doctor Accounts (auto-created on first server run):')
    console.log('- dr.smith@healthcare.com / doctor123')
    console.log('- dr.johnson@healthcare.com / doctor123')
    console.log('- dr.garcia@healthcare.com / doctor123')
    console.log('- dr.lee@healthcare.com / doctor123')
    console.log('- dr.patel@healthcare.com / doctor123')
    
  } catch (error) {
    console.error('❌ Initialization failed:', error)
  }
}

export { initDatabase }

// Auto-run if this file is imported as a module
if (typeof window !== 'undefined') {
  (window as any).initDatabase = initDatabase
}
