export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  location: string;
  languages: string[];
  bio: string;
  availability: string[];
  verified: boolean;
}

export interface City {
  id: string;
  name: string;
  country: string;
  image: string;
  doctorCount: number;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  specialty: string;
  avatar: string;
}

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Anderson',
    specialty: 'General Practice',
    rating: 4.9,
    reviews: 247,
    price: 80,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    location: 'Bangkok, Thailand',
    languages: ['English', 'Thai'],
    bio: 'Experienced GP with 12 years of practice. Specializes in travel medicine and preventive care.',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    verified: true,
  },
  {
    id: '2',
    name: 'Dr. Carlos Rodriguez',
    specialty: 'Dentistry',
    rating: 4.8,
    reviews: 189,
    price: 120,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    location: 'Mexico City, Mexico',
    languages: ['Spanish', 'English'],
    bio: 'Cosmetic and general dentistry. Known for painless procedures and exceptional care.',
    availability: ['Mon', 'Tue', 'Wed', 'Thu'],
    verified: true,
  },
  {
    id: '3',
    name: 'Dr. Priya Patel',
    specialty: 'Dermatology',
    rating: 4.7,
    reviews: 156,
    price: 100,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    location: 'Bangkok, Thailand',
    languages: ['English', 'Hindi'],
    bio: 'Skin specialist with expertise in travel-related dermatology issues.',
    availability: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    verified: true,
  },
  {
    id: '4',
    name: 'Dr. Marco Vitale',
    specialty: 'General Practice',
    rating: 4.6,
    reviews: 134,
    price: 75,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    location: 'Rome, Italy',
    languages: ['Italian', 'English', 'French'],
    bio: 'General practitioner with 10 years experience. Expert in travel medicine.',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    verified: true,
  },
  {
    id: '5',
    name: 'Dr. Aisha Okafor',
    specialty: 'Eye Care',
    rating: 4.9,
    reviews: 203,
    price: 90,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    location: 'Lagos, Nigeria',
    languages: ['English', 'Yoruba'],
    bio: 'Ophthalmologist specializing in vision correction and eye health for travelers.',
    availability: ['Mon', 'Wed', 'Thu', 'Fri', 'Sat'],
    verified: true,
  },
  {
    id: '6',
    name: 'Dr. James Sullivan',
    specialty: 'Orthopedics',
    rating: 4.5,
    reviews: 98,
    price: 110,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    location: 'Sydney, Australia',
    languages: ['English'],
    bio: 'Sports injury specialist. Great for travelers with joint and muscle issues.',
    availability: ['Tue', 'Wed', 'Thu', 'Fri'],
    verified: true,
  },
  {
    id: '7',
    name: 'Dr. Maria Garcia',
    specialty: 'Pediatrics',
    rating: 4.8,
    reviews: 167,
    price: 85,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    location: 'Buenos Aires, Argentina',
    languages: ['Spanish', 'English', 'Portuguese'],
    bio: 'Pediatrician with experience in treating traveling families and children.',
    availability: ['Mon', 'Tue', 'Thu', 'Fri'],
    verified: true,
  },
  {
    id: '8',
    name: 'Dr. Hiroshi Tanaka',
    specialty: 'General Practice',
    rating: 4.7,
    reviews: 142,
    price: 95,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    location: 'Tokyo, Japan',
    languages: ['Japanese', 'English'],
    bio: 'General practitioner with expertise in traditional and modern medicine.',
    availability: ['Mon', 'Tue', 'Wed', 'Fri', 'Sat'],
    verified: true,
  },
  {
    id: '9',
    name: 'Dr. Elena Novak',
    specialty: 'Cardiology',
    rating: 4.9,
    reviews: 213,
    price: 130,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    location: 'Prague, Czech Republic',
    languages: ['Czech', 'English', 'German'],
    bio: 'Cardiologist specializing in cardiac health for travelers and older adults.',
    availability: ['Tue', 'Wed', 'Thu', 'Fri'],
    verified: true,
  },
  {
    id: '10',
    name: 'Dr. Kwame Asante',
    specialty: 'General Practice',
    rating: 4.6,
    reviews: 119,
    price: 70,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    location: 'Accra, Ghana',
    languages: ['English', 'Twi'],
    bio: 'Experienced GP offering comprehensive health checks for travelers.',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    verified: true,
  },
];

export const cities: City[] = [
  {
    id: '1',
    name: 'Bangkok',
    country: 'Thailand',
    image: 'https://images.unsplash.com/photo-1508009603792-321db280dd2d?w=400&h=300&fit=crop',
    doctorCount: 45,
    description: 'Modern medical facilities with affordable healthcare',
  },
  {
    id: '2',
    name: 'Mexico City',
    country: 'Mexico',
    image: 'https://images.unsplash.com/photo-1518235506717-e1ed3306a89f?w=400&h=300&fit=crop',
    doctorCount: 38,
    description: 'High-quality dental and cosmetic procedures',
  },
  {
    id: '3',
    name: 'Sydney',
    country: 'Australia',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    doctorCount: 52,
    description: 'World-class medical standards and expertise',
  },
  {
    id: '4',
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    doctorCount: 41,
    description: 'Advanced technology and precision medicine',
  },
  {
    id: '5',
    name: 'Prague',
    country: 'Czech Republic',
    image: 'https://images.unsplash.com/photo-1508009603792-321db280dd2d?w=400&h=300&fit=crop',
    doctorCount: 35,
    description: 'European standards with competitive pricing',
  },
  {
    id: '6',
    name: 'Buenos Aires',
    country: 'Argentina',
    image: 'https://images.unsplash.com/photo-1518235506717-e1ed3306a89f?w=400&h=300&fit=crop',
    doctorCount: 39,
    description: 'Excellent healthcare with Latin American charm',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Emma Thompson',
    rating: 5,
    text: 'Found a great dentist in Mexico City. The process was seamless and I saved 60% on costs!',
    specialty: 'Dentistry',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
  },
  {
    id: '2',
    name: 'Michael Chen',
    rating: 5,
    text: 'Quick appointment booking in Bangkok. Dr. Sarah was professional and thorough. Highly recommend!',
    specialty: 'General Practice',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
  },
  {
    id: '3',
    name: 'Sophie Laurent',
    rating: 4,
    text: 'Great experience finding specialists in Prague. Clear communication and fair pricing.',
    specialty: 'Cardiology',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
  },
  {
    id: '4',
    name: 'Raj Patel',
    rating: 5,
    text: 'Best decision booking through FindADoc. My family got excellent care in Sydney.',
    specialty: 'Family Medicine',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop',
  },
];
