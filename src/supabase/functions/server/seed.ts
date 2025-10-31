// Seed script to populate initial data
// Run this once to add sample doctors, articles, and health tips

import { createClient } from 'jsr:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

async function seedDoctors() {
  console.log('Seeding doctors...')
  
  const doctors = [
    {
      email: 'dr.smith@healthcare.com',
      password: 'doctor123',
      name: 'Dr. Sarah Smith',
      role: 'doctor',
      specialization: 'Cardiologist',
      experience: 15,
      consultationFee: 100,
      expertise: ['Heart Disease', 'Hypertension', 'Cardiac Surgery', 'ECG'],
      about: 'Board-certified cardiologist with 15 years of experience in treating heart conditions and preventive care.',
      phone: '+1 (555) 123-4567',
      gender: 'Female',
      age: 42,
    },
    {
      email: 'dr.johnson@healthcare.com',
      password: 'doctor123',
      name: 'Dr. Michael Johnson',
      role: 'doctor',
      specialization: 'Pediatrician',
      experience: 10,
      consultationFee: 80,
      expertise: ['Child Health', 'Vaccinations', 'Growth Development', 'Pediatric Care'],
      about: 'Dedicated pediatrician specializing in child healthcare and development.',
      phone: '+1 (555) 234-5678',
      gender: 'Male',
      age: 38,
    },
    {
      email: 'dr.garcia@healthcare.com',
      password: 'doctor123',
      name: 'Dr. Maria Garcia',
      role: 'doctor',
      specialization: 'Dermatologist',
      experience: 12,
      consultationFee: 90,
      expertise: ['Skin Conditions', 'Acne Treatment', 'Cosmetic Dermatology', 'Skin Cancer'],
      about: 'Expert dermatologist with focus on medical and cosmetic skin treatments.',
      phone: '+1 (555) 345-6789',
      gender: 'Female',
      age: 40,
    },
    {
      email: 'dr.lee@healthcare.com',
      password: 'doctor123',
      name: 'Dr. James Lee',
      role: 'doctor',
      specialization: 'General Physician',
      experience: 8,
      consultationFee: 60,
      expertise: ['Primary Care', 'Preventive Medicine', 'Chronic Disease', 'Health Checkups'],
      about: 'General practitioner providing comprehensive primary healthcare services.',
      phone: '+1 (555) 456-7890',
      gender: 'Male',
      age: 35,
    },
    {
      email: 'dr.patel@healthcare.com',
      password: 'doctor123',
      name: 'Dr. Priya Patel',
      role: 'doctor',
      specialization: 'Psychiatrist',
      experience: 14,
      consultationFee: 120,
      expertise: ['Mental Health', 'Anxiety', 'Depression', 'Therapy', 'Counseling'],
      about: 'Experienced psychiatrist specializing in mental health and wellness.',
      phone: '+1 (555) 567-8901',
      gender: 'Female',
      age: 41,
    },
  ]

  for (const doctor of doctors) {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: doctor.email,
        password: doctor.password,
        email_confirm: true,
        user_metadata: { name: doctor.name, role: doctor.role }
      })

      if (authError) {
        console.log(`Error creating ${doctor.name}:`, authError.message)
        continue
      }

      const userId = authData.user.id

      // Store user profile
      await kv.set(`user:${userId}`, {
        id: userId,
        email: doctor.email,
        name: doctor.name,
        role: doctor.role,
        phone: doctor.phone,
        gender: doctor.gender,
        age: doctor.age,
        createdAt: new Date().toISOString()
      })

      // Store doctor profile
      await kv.set(`doctor:${userId}`, {
        userId,
        specialization: doctor.specialization,
        experience: doctor.experience,
        consultationFee: doctor.consultationFee,
        rating: 4.5 + Math.random() * 0.5, // Random rating 4.5-5.0
        totalPatients: Math.floor(Math.random() * 200) + 100,
        status: 'available',
        expertise: doctor.expertise,
        about: doctor.about,
      })

      console.log(`✓ Created ${doctor.name}`)
    } catch (error) {
      console.log(`Error seeding ${doctor.name}:`, error.message)
    }
  }
}

async function seedArticles() {
  console.log('Seeding articles...')
  
  const articles = [
    {
      id: 'article_1',
      title: 'Understanding Heart Health: Prevention and Care',
      category: 'wellness',
      excerpt: 'Learn about maintaining a healthy heart through diet, exercise, and lifestyle changes.',
      content: `
# Understanding Heart Health

Heart disease remains one of the leading causes of death worldwide, but many cases are preventable through lifestyle modifications and early detection.

## Key Prevention Strategies

### 1. Healthy Diet
- Eat plenty of fruits and vegetables
- Choose whole grains over refined grains
- Limit saturated fats and trans fats
- Reduce sodium intake

### 2. Regular Exercise
Aim for at least 150 minutes of moderate aerobic activity per week. This can include:
- Brisk walking
- Swimming
- Cycling
- Dancing

### 3. Stress Management
Chronic stress can negatively impact heart health. Practice:
- Meditation
- Yoga
- Deep breathing exercises
- Regular relaxation

## Warning Signs

Seek immediate medical attention if you experience:
- Chest pain or discomfort
- Shortness of breath
- Pain in arms, neck, jaw, or back
- Irregular heartbeat

## Conclusion

Taking care of your heart is a lifelong commitment. Regular check-ups with your healthcare provider and maintaining healthy habits can significantly reduce your risk of heart disease.
      `,
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800',
      publishedDate: new Date('2024-10-15').toISOString(),
    },
    {
      id: 'article_2',
      title: 'Common Cold vs Flu: Know the Difference',
      category: 'illness',
      excerpt: 'Understand the symptoms and treatment options for common cold and influenza.',
      content: `
# Common Cold vs Flu

While both are respiratory illnesses, they are caused by different viruses and have distinct characteristics.

## Common Cold Symptoms
- Runny or stuffy nose
- Sore throat
- Sneezing
- Mild cough
- Slight body aches
- Low-grade fever (rare)

## Flu Symptoms
- High fever (100-104°F)
- Severe body aches
- Extreme fatigue
- Dry cough
- Headache
- Chills

## Treatment

### For Common Cold:
- Rest and hydration
- Over-the-counter pain relievers
- Throat lozenges
- Warm liquids

### For Flu:
- Antiviral medications (if prescribed early)
- Plenty of rest
- Fluids
- Fever reducers
- Medical attention if severe

## Prevention
- Wash hands frequently
- Avoid touching face
- Get annual flu vaccine
- Stay away from sick people
- Maintain good hygiene

## When to See a Doctor
Consult a healthcare provider if you have:
- Difficulty breathing
- Persistent fever over 103°F
- Symptoms lasting more than 10 days
- Severe headache or facial pain
      `,
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800',
      publishedDate: new Date('2024-10-20').toISOString(),
    },
    {
      id: 'article_3',
      title: 'Turmeric: The Golden Spice with Healing Properties',
      category: 'herbal',
      excerpt: 'Discover the anti-inflammatory and antioxidant benefits of turmeric for overall health.',
      content: `
# Turmeric: Nature's Golden Healer

Turmeric has been used in traditional medicine for thousands of years and is now recognized by modern science for its powerful health benefits.

## Health Benefits

### 1. Anti-Inflammatory
Curcumin, the active compound in turmeric, has powerful anti-inflammatory effects that may help with:
- Arthritis pain
- Joint inflammation
- Muscle soreness

### 2. Antioxidant Properties
Helps protect cells from damage caused by free radicals

### 3. Brain Health
May improve memory and mood while reducing risk of brain diseases

### 4. Heart Health
Can improve blood vessel function and reduce inflammation

## How to Use

### Golden Milk Recipe:
- 1 cup milk (dairy or plant-based)
- 1 tsp turmeric powder
- 1/2 tsp cinnamon
- Pinch of black pepper
- Honey to taste

Heat all ingredients, stir well, and enjoy before bed.

### Cooking Tips:
- Add to curries and soups
- Sprinkle on roasted vegetables
- Mix into smoothies
- Use in rice dishes

## Dosage
- Typical dose: 500-2000 mg per day
- Always combine with black pepper to enhance absorption

## Precautions
- May interact with blood thinners
- Consult doctor if pregnant or breastfeeding
- High doses may cause digestive issues

## Conclusion
Turmeric is a versatile and powerful natural remedy that can be easily incorporated into your daily routine for various health benefits.
      `,
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=800',
      publishedDate: new Date('2024-10-25').toISOString(),
    },
    {
      id: 'article_4',
      title: 'Managing Stress and Anxiety in Modern Life',
      category: 'wellness',
      excerpt: 'Practical techniques for reducing stress and improving mental well-being.',
      content: `
# Managing Stress and Anxiety

In today's fast-paced world, stress and anxiety have become common challenges. Here's how to manage them effectively.

## Understanding Stress

Stress is your body's response to challenges or demands. While some stress is normal, chronic stress can harm your health.

## Symptoms of Chronic Stress
- Difficulty sleeping
- Irritability
- Headaches
- Digestive problems
- Fatigue
- Difficulty concentrating

## Stress Management Techniques

### 1. Mindfulness and Meditation
Practice daily meditation for 10-20 minutes:
- Focus on breathing
- Observe thoughts without judgment
- Use guided meditation apps

### 2. Physical Activity
Exercise releases endorphins that improve mood:
- Walk for 30 minutes daily
- Try yoga or tai chi
- Join a sports team

### 3. Time Management
- Prioritize tasks
- Learn to say no
- Break large tasks into smaller steps
- Take regular breaks

### 4. Social Connections
- Spend time with loved ones
- Join support groups
- Share feelings with trusted friends
- Seek professional help when needed

### 5. Healthy Lifestyle
- Get 7-9 hours of sleep
- Eat balanced meals
- Limit caffeine and alcohol
- Practice good sleep hygiene

## When to Seek Help

Consult a mental health professional if:
- Stress interferes with daily life
- You feel overwhelmed constantly
- Physical symptoms persist
- You have thoughts of self-harm

## Conclusion

Managing stress is a skill that improves with practice. Be patient with yourself and remember that seeking help is a sign of strength, not weakness.
      `,
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
      publishedDate: new Date('2024-10-28').toISOString(),
    },
  ]

  for (const article of articles) {
    try {
      await kv.set(`article:${article.id}`, article)
      console.log(`✓ Created article: ${article.title}`)
    } catch (error) {
      console.log(`Error seeding article:`, error.message)
    }
  }
}

async function seedHealthTips() {
  console.log('Seeding health tips...')
  
  const tips = [
    {
      id: 'tip_1',
      title: 'Stay Hydrated',
      category: 'hydration',
      description: 'Drink at least 8 glasses of water daily to keep your body functioning optimally. Proper hydration improves energy levels, brain function, and helps maintain healthy skin.',
      icon: 'Droplets',
      date: new Date('2024-10-30').toISOString(),
    },
    {
      id: 'tip_2',
      title: 'Get Quality Sleep',
      category: 'sleep',
      description: 'Aim for 7-9 hours of quality sleep each night. Good sleep is essential for physical health, mental well-being, and cognitive function.',
      icon: 'Moon',
      date: new Date('2024-10-29').toISOString(),
    },
    {
      id: 'tip_3',
      title: 'Exercise Regularly',
      category: 'exercise',
      description: 'Engage in at least 30 minutes of moderate physical activity most days of the week. Regular exercise strengthens your heart, builds muscle, and improves mood.',
      icon: 'Activity',
      date: new Date('2024-10-28').toISOString(),
    },
    {
      id: 'tip_4',
      title: 'Eat Balanced Meals',
      category: 'nutrition',
      description: 'Include a variety of fruits, vegetables, whole grains, and lean proteins in your diet. Good nutrition is the foundation of good health.',
      icon: 'Apple',
      date: new Date('2024-10-27').toISOString(),
    },
    {
      id: 'tip_5',
      title: 'Practice Mindfulness',
      category: 'mental',
      description: 'Take 10 minutes daily for meditation or deep breathing exercises. Mindfulness reduces stress and improves overall mental health.',
      icon: 'Brain',
      date: new Date('2024-10-26').toISOString(),
    },
    {
      id: 'tip_6',
      title: 'Wash Your Hands',
      category: 'hygiene',
      description: 'Wash hands frequently with soap and water for at least 20 seconds, especially before meals and after using the restroom.',
      icon: 'Sparkles',
      date: new Date('2024-10-25').toISOString(),
    },
  ]

  for (const tip of tips) {
    try {
      await kv.set(`tip:${tip.id}`, tip)
      console.log(`✓ Created tip: ${tip.title}`)
    } catch (error) {
      console.log(`Error seeding tip:`, error.message)
    }
  }
}

// Run all seed functions
async function seed() {
  console.log('🌱 Starting database seed...')
  
  try {
    await seedDoctors()
    await seedArticles()
    await seedHealthTips()
    
    console.log('✅ Seeding complete!')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
  }
}

// Execute if run directly
if (import.meta.main) {
  seed()
}

export { seed }
