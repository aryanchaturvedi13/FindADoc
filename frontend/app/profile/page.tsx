'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { FileText, Clock, DollarSign, LogOut, Edit2, User } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  gender: string;
  previousIllness: string;
  photoPreview: string;
}

interface Consultation {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'completed' | 'upcoming' | 'cancelled';
  notes: string;
  amount: number;
}

interface Bill {
  id: string;
  consultationId: string;
  doctorName: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending';
  invoiceUrl: string;
}

interface Prescription {
  id: string;
  consultationId: string;
  doctorName: string;
  medicines: string[];
  startDate: string;
  endDate: string;
  instructions: string;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  // Mock data for consultations
  const consultations: Consultation[] = [
    {
      id: '1',
      doctorName: 'Dr. Sarah Anderson',
      specialty: 'General Practice',
      date: '2024-12-15',
      time: '10:00 AM',
      status: 'completed',
      notes: 'Regular checkup - all good',
      amount: 80,
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      date: '2024-12-20',
      time: '2:30 PM',
      status: 'upcoming',
      notes: '',
      amount: 120,
    },
    {
      id: '3',
      doctorName: 'Dr. Priya Sharma',
      specialty: 'Dermatology',
      date: '2024-11-10',
      time: '3:00 PM',
      status: 'completed',
      notes: 'Skin consultation',
      amount: 75,
    },
  ];

  // Mock data for bills
  const bills: Bill[] = [
    {
      id: '1',
      consultationId: '1',
      doctorName: 'Dr. Sarah Anderson',
      date: '2024-12-15',
      amount: 80,
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: '2',
      consultationId: '2',
      doctorName: 'Dr. Michael Chen',
      date: '2024-12-20',
      amount: 120,
      status: 'pending',
      invoiceUrl: '#',
    },
    {
      id: '3',
      consultationId: '3',
      doctorName: 'Dr. Priya Sharma',
      date: '2024-11-10',
      amount: 75,
      status: 'paid',
      invoiceUrl: '#',
    },
  ];

  // Mock data for prescriptions
  const prescriptions: Prescription[] = [
    {
      id: '1',
      consultationId: '1',
      doctorName: 'Dr. Sarah Anderson',
      medicines: ['Aspirin 500mg', 'Vitamin D3 1000IU'],
      startDate: '2024-12-15',
      endDate: '2025-01-15',
      instructions: 'Take one tablet twice daily with food',
    },
    {
      id: '2',
      consultationId: '2',
      doctorName: 'Dr. Michael Chen',
      medicines: ['Atorvastatin 20mg', 'Beta-blocker 50mg'],
      startDate: '2024-12-20',
      endDate: '2025-03-20',
      instructions: 'Take one tablet daily in the morning',
    },
  ];

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-text-muted">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-text-muted">Please log in to view your profile</p>
          <Link href="/login" className="text-primary hover:text-primary/80 font-semibold">
            Go to Login
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 py-12 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="bg-white border border-border rounded-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
              <div className="flex items-start gap-6">
                {userData.photoPreview ? (
                  <img
                    src={userData.photoPreview}
                    alt={userData.firstName}
                    className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-primary-light flex items-center justify-center">
                    <User className="w-12 h-12 text-primary" />
                  </div>
                )}
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    {userData.firstName} {userData.lastName}
                  </h1>
                  <p className="text-text-muted mt-1">{userData.email}</p>
                  <div className="flex gap-4 mt-4 text-sm text-text-muted">
                    <span>Age: {userData.age}</span>
                    <span>Gender: {userData.gender}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/profile/edit"
                  className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary-light transition-colors font-semibold"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>

            {userData.previousIllness && (
              <div className="bg-primary-light border border-primary rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Health Information</h3>
                <p className="text-text-muted">{userData.previousIllness}</p>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-border">
            {['profile', 'consultations', 'bills', 'prescriptions'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'text-primary border-primary'
                    : 'text-text-muted border-transparent hover:text-foreground'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-text-muted">First Name</label>
                    <p className="text-foreground">{userData.firstName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-text-muted">Last Name</label>
                    <p className="text-foreground">{userData.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-text-muted">Email</label>
                    <p className="text-foreground">{userData.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Health Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-text-muted">Age</label>
                    <p className="text-foreground">{userData.age} years</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-text-muted">Gender</label>
                    <p className="text-foreground capitalize">{userData.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-text-muted">
                      Previous Illness
                    </label>
                    <p className="text-foreground">
                      {userData.previousIllness || 'No conditions reported'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'consultations' && (
            <div className="space-y-4">
              {consultations.length === 0 ? (
                <div className="bg-white border border-border rounded-lg p-12 text-center">
                  <Clock className="w-12 h-12 text-text-muted mx-auto mb-4" />
                  <p className="text-text-muted">No consultations yet</p>
                </div>
              ) : (
                consultations.map((consultation) => (
                  <div key={consultation.id} className="bg-white border border-border rounded-lg p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {consultation.doctorName}
                        </h3>
                        <p className="text-text-muted text-sm">{consultation.specialty}</p>
                        <div className="flex gap-4 mt-2 text-sm text-text-muted">
                          <span>{consultation.date}</span>
                          <span>{consultation.time}</span>
                        </div>
                        {consultation.notes && (
                          <p className="text-foreground mt-2">{consultation.notes}</p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            consultation.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : consultation.status === 'upcoming'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {consultation.status.charAt(0).toUpperCase() +
                            consultation.status.slice(1)}
                        </span>
                        <p className="text-foreground font-semibold">${consultation.amount}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'bills' && (
            <div className="space-y-4">
              {bills.length === 0 ? (
                <div className="bg-white border border-border rounded-lg p-12 text-center">
                  <DollarSign className="w-12 h-12 text-text-muted mx-auto mb-4" />
                  <p className="text-text-muted">No bills yet</p>
                </div>
              ) : (
                bills.map((bill) => (
                  <div key={bill.id} className="bg-white border border-border rounded-lg p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {bill.doctorName}
                        </h3>
                        <p className="text-text-muted text-sm">Consultation on {bill.date}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            bill.status === 'paid'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                        </span>
                        <p className="text-foreground font-semibold text-lg">${bill.amount}</p>
                        <a
                          href={bill.invoiceUrl}
                          className="text-primary hover:text-primary/80 text-sm font-semibold mt-1"
                        >
                          View Invoice
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'prescriptions' && (
            <div className="space-y-4">
              {prescriptions.length === 0 ? (
                <div className="bg-white border border-border rounded-lg p-12 text-center">
                  <FileText className="w-12 h-12 text-text-muted mx-auto mb-4" />
                  <p className="text-text-muted">No prescriptions yet</p>
                </div>
              ) : (
                prescriptions.map((prescription) => (
                  <div key={prescription.id} className="bg-white border border-border rounded-lg p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        {prescription.doctorName}
                      </h3>
                      <p className="text-text-muted text-sm">
                        Valid from {prescription.startDate} to {prescription.endDate}
                      </p>
                    </div>

                    <div className="bg-secondary rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-foreground mb-2">Medicines</h4>
                      <ul className="space-y-2">
                        {prescription.medicines.map((medicine, index) => (
                          <li key={index} className="text-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {medicine}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Instructions</h4>
                      <p className="text-foreground">{prescription.instructions}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
