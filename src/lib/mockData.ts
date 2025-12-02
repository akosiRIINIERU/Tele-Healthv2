export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  avatar: string;
  status: 'available' | 'busy' | 'offline';
  consultationFee: number;
  expertise: string[];
  nextAvailable?: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  doctorAvatar: string;
  patientId?: string;
  patientName?: string;
  patientAvatar?: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  reason?: string;
  notes?: string;
}

export interface Article {
  id: string;
  title: string;
  category: 'illness' | 'herbal' | 'wellness';
  image: string;
  excerpt: string;
  content: string;
  readTime: string;
  date: string;
}

export interface HealthTip {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  date: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: Date;
  isMe: boolean;
}

export interface Medicine {
  id: string;
  name: string;
  category: 'prescription' | 'otc' | 'supplement' | 'firstaid' | 'herbal';
  description: string;
  price: number;
  stock: number;
  manufacturer: string;
  dosage: string;
  requiresPrescription: boolean;
  image: string;
  rating: number;
  reviews: number;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  deliveryAddress: string;
  paymentMethod: string;
}

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Smith',
    specialization: 'Cardiology',
    experience: 15,
    rating: 4.8,
    avatar: '',
    status: 'available',
    consultationFee: 100,
    expertise: ['Heart Disease', 'Hypertension', 'ECG'],
    nextAvailable: 'Today, 2:00 PM',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Dermatology',
    experience: 10,
    rating: 4.9,
    avatar: '',
    status: 'available',
    consultationFee: 80,
    expertise: ['Acne Treatment', 'Skin Cancer', 'Cosmetic Dermatology'],
    nextAvailable: 'Today, 3:30 PM',
  },
  {
    id: '3',
    name: 'Dr. Emily Johnson',
    specialization: 'Pediatrics',
    experience: 12,
    rating: 4.7,
    avatar: '',
    status: 'busy',
    consultationFee: 90,
    expertise: ['Child Development', 'Vaccinations', 'Pediatric Care'],
    nextAvailable: 'Tomorrow, 10:00 AM',
  },
  {
    id: '4',
    name: 'Dr. David Williams',
    specialization: 'Orthopedics',
    experience: 20,
    rating: 4.9,
    avatar: '',
    status: 'available',
    consultationFee: 120,
    expertise: ['Joint Replacement', 'Sports Injuries', 'Fractures'],
    nextAvailable: 'Today, 4:00 PM',
  },
  {
    id: '5',
    name: 'Dr. Lisa Anderson',
    specialization: 'General Medicine',
    experience: 8,
    rating: 4.6,
    avatar: '',
    status: 'offline',
    consultationFee: 70,
    expertise: ['Primary Care', 'Preventive Medicine', 'Chronic Diseases'],
    nextAvailable: 'Tomorrow, 9:00 AM',
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    doctorId: '1',
    doctorName: 'Dr. Sarah Smith',
    doctorSpecialization: 'Cardiology',
    doctorAvatar: '',
    patientName: 'John Doe',
    patientAvatar: '',
    date: '2025-12-10',
    time: '2:00 PM',
    status: 'confirmed',
    reason: 'Regular checkup',
  },
  {
    id: '2',
    doctorId: '2',
    doctorName: 'Dr. Michael Chen',
    doctorSpecialization: 'Dermatology',
    doctorAvatar: '',
    patientName: 'Jane Smith',
    patientAvatar: '',
    date: '2025-12-15',
    time: '10:00 AM',
    status: 'pending',
    reason: 'Skin rash consultation',
  },
  {
    id: '3',
    doctorId: '1',
    doctorName: 'Dr. Sarah Smith',
    doctorSpecialization: 'Cardiology',
    doctorAvatar: '',
    patientName: 'John Doe',
    patientAvatar: '',
    date: '2025-11-15',
    time: '3:00 PM',
    status: 'completed',
    reason: 'Follow-up consultation for hypertension',
  },
  {
    id: '4',
    doctorId: '3',
    doctorName: 'Dr. Emily Johnson',
    doctorSpecialization: 'Pediatrics',
    doctorAvatar: '',
    patientName: 'Sarah Williams',
    patientAvatar: '',
    date: '2025-11-20',
    time: '11:00 AM',
    status: 'completed',
    reason: 'Child vaccination',
  },
  {
    id: '5',
    doctorId: '4',
    doctorName: 'Dr. David Williams',
    doctorSpecialization: 'Orthopedics',
    doctorAvatar: '',
    patientName: 'Mike Johnson',
    patientAvatar: '',
    date: '2025-11-25',
    time: '4:30 PM',
    status: 'completed',
    reason: 'Knee pain assessment',
  },
  {
    id: '6',
    doctorId: '2',
    doctorName: 'Dr. Michael Chen',
    doctorSpecialization: 'Dermatology',
    doctorAvatar: '',
    patientName: 'Emily Davis',
    patientAvatar: '',
    date: '2025-11-28',
    time: '1:00 PM',
    status: 'completed',
    reason: 'Acne treatment consultation',
  },
];

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Understanding Heart Disease: Symptoms and Prevention',
    category: 'illness',
    image: 'https://images.unsplash.com/photo-1535914254981-b5012eebbd15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NjE3NDM0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    excerpt: 'Learn about the common symptoms of heart disease and how to prevent it with lifestyle changes.',
    content: 'Heart disease remains one of the leading causes of death worldwide. Understanding the symptoms and taking preventive measures can significantly reduce your risk...',
    readTime: '5 min read',
    date: '2025-10-28',
  },
  {
    id: '2',
    title: 'The Healing Power of Turmeric',
    category: 'herbal',
    image: 'https://images.unsplash.com/photo-1545840716-c82e9eec6930?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjBtZWRpY2luZXxlbnwxfHx8fDE3NjE3OTAwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    excerpt: 'Discover the anti-inflammatory benefits of turmeric and how to incorporate it into your daily routine.',
    content: 'Turmeric has been used in traditional medicine for thousands of years. Its active compound, curcumin, offers powerful anti-inflammatory properties...',
    readTime: '4 min read',
    date: '2025-10-27',
  },
  {
    id: '3',
    title: 'Managing Diabetes Through Diet',
    category: 'illness',
    image: 'https://images.unsplash.com/photo-1535914254981-b5012eebbd15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NjE3NDM0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    excerpt: 'Essential dietary guidelines for people living with diabetes to maintain healthy blood sugar levels.',
    content: 'Living with diabetes requires careful attention to diet. This comprehensive guide will help you understand which foods to embrace and which to avoid...',
    readTime: '6 min read',
    date: '2025-10-26',
  },
  {
    id: '4',
    title: 'Ginger: A Natural Remedy for Nausea',
    category: 'herbal',
    image: 'https://images.unsplash.com/photo-1545840716-c82e9eec6930?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjBtZWRpY2luZXxlbnwxfHx8fDE3NjE3OTAwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    excerpt: 'How ginger can help relieve nausea and other digestive issues naturally.',
    content: 'Ginger is a powerful natural remedy that has been used for centuries to treat nausea and digestive problems...',
    readTime: '3 min read',
    date: '2025-10-25',
  },
];

export const mockHealthTips: HealthTip[] = [
  {
    id: '1',
    title: 'Stay Hydrated',
    description: 'Drink at least 8 glasses of water daily to maintain optimal health and energy levels.',
    icon: 'droplets',
    category: 'Wellness',
    date: '2025-10-30',
  },
  {
    id: '2',
    title: 'Get Enough Sleep',
    description: 'Aim for 7-9 hours of quality sleep each night to support your immune system and mental health.',
    icon: 'moon',
    category: 'Sleep',
    date: '2025-10-30',
  },
  {
    id: '3',
    title: 'Exercise Regularly',
    description: 'Engage in at least 30 minutes of moderate exercise 5 days a week for cardiovascular health.',
    icon: 'activity',
    category: 'Fitness',
    date: '2025-10-30',
  },
  {
    id: '4',
    title: 'Eat Colorful Vegetables',
    description: 'Include a variety of colorful vegetables in your diet to get a wide range of nutrients.',
    icon: 'apple',
    category: 'Nutrition',
    date: '2025-10-30',
  },
];

export const mockMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol',
    category: 'otc',
    description: 'Pain reliever and fever reducer.',
    price: 5,
    stock: 100,
    manufacturer: 'Johnson & Johnson',
    dosage: '500mg',
    requiresPrescription: false,
    image: 'https://images.unsplash.com/photo-1535914254981-b5012eebbd15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NjE3NDM0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.5,
    reviews: 120,
  },
  {
    id: '2',
    name: 'Amoxicillin',
    category: 'prescription',
    description: 'Antibiotic for bacterial infections.',
    price: 10,
    stock: 50,
    manufacturer: 'Pfizer',
    dosage: '500mg',
    requiresPrescription: true,
    image: 'https://images.unsplash.com/photo-1545840716-c82e9eec6930?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjBtZWRpY2luZXxlbnwxfHx8fDE3NjE3OTAwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviews: 80,
  },
  {
    id: '3',
    name: 'Vitamin C',
    category: 'supplement',
    description: 'Immune booster and antioxidant.',
    price: 15,
    stock: 75,
    manufacturer: 'Nature Made',
    dosage: '500mg',
    requiresPrescription: false,
    image: 'https://images.unsplash.com/photo-1535914254981-b5012eebbd15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NjE3NDM0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviews: 150,
  },
  {
    id: '4',
    name: 'Band-Aid',
    category: 'firstaid',
    description: 'Adhesive bandage for minor cuts and scrapes.',
    price: 2,
    stock: 200,
    manufacturer: 'Johnson & Johnson',
    dosage: 'N/A',
    requiresPrescription: false,
    image: 'https://images.unsplash.com/photo-1545840716-c82e9eec6930?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjBtZWRpY2luZXxlbnwxfHx8fDE3NjE3OTAwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    reviews: 100,
  },
  {
    id: '5',
    name: 'Echinacea',
    category: 'herbal',
    description: 'Herbal supplement to boost immune system.',
    price: 12,
    stock: 60,
    manufacturer: 'Herbalife',
    dosage: '500mg',
    requiresPrescription: false,
    image: 'https://images.unsplash.com/photo-1535914254981-b5012eebbd15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NjE3NDM0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.4,
    reviews: 90,
  },
];

export const mockCartItems: CartItem[] = [
  {
    medicine: mockMedicines[0],
    quantity: 2,
  },
  {
    medicine: mockMedicines[2],
    quantity: 1,
  },
];

export const mockOrders: Order[] = [
  {
    id: '1',
    items: mockCartItems,
    total: 25,
    status: 'pending',
    date: '2025-11-01',
    deliveryAddress: '123 Main St, Anytown, USA',
    paymentMethod: 'Credit Card',
  },
  {
    id: '2',
    items: [
      {
        medicine: mockMedicines[1],
        quantity: 3,
      },
    ],
    total: 30,
    status: 'shipped',
    date: '2025-10-30',
    deliveryAddress: '456 Elm St, Othertown, USA',
    paymentMethod: 'PayPal',
  },
];