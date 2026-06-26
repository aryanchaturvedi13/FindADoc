'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { doctors } from '@/lib/data';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

function BookingPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const doctorId = params.id as string;
  const [selectedTime, setSelectedTime] = useState('');
  const doctor = doctors.find((d) => d.id === doctorId);

  useEffect(() => {
    setSelectedTime(searchParams.get('time') || '');
  }, [searchParams]);

  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    reason: '',
  });

  if (!doctor) {
    return (
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Doctor not found</h1>
            <Link href="/search" className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary/90">
              Back to Search
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'details') {
      setStep('payment');
    } else if (step === 'payment') {
      setStep('confirmation');
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold ${
                step === 'details' || step === 'payment' || step === 'confirmation'
                  ? 'bg-primary text-white'
                  : 'bg-secondary text-text-muted'
              }`}>
                1
              </div>
              <div className={`flex-1 h-1 mx-2 ${step === 'payment' || step === 'confirmation' ? 'bg-primary' : 'bg-border'}`} />
              <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold ${
                step === 'payment' || step === 'confirmation'
                  ? 'bg-primary text-white'
                  : 'bg-secondary text-text-muted'
              }`}>
                2
              </div>
              <div className={`flex-1 h-1 mx-2 ${step === 'confirmation' ? 'bg-primary' : 'bg-border'}`} />
              <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold ${
                step === 'confirmation'
                  ? 'bg-primary text-white'
                  : 'bg-secondary text-text-muted'
              }`}>
                3
              </div>
            </div>
            <div className="flex justify-between text-xs font-semibold text-text-muted">
              <span>Patient Details</span>
              <span>Payment</span>
              <span>Confirmation</span>
            </div>
          </div>

          {/* Doctor Card */}
          <div className="bg-white border border-border rounded-lg p-6 mb-8">
            <div className="flex items-center gap-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-lg font-bold text-foreground">{doctor.name}</h3>
                <p className="text-text-muted">{doctor.specialty}</p>
                <p className="text-primary font-semibold mt-2">${doctor.price} - {selectedTime}</p>
              </div>
            </div>
          </div>

          {step === 'details' && (
            <form onSubmit={handleSubmit} className="bg-white border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Patient Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Reason for Visit
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe your symptoms or reason for the visit"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex gap-4">
                <Link
                  href={`/doctor/${doctor.id}`}
                  className="flex-1 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-secondary transition-colors flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Link>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handleSubmit} className="bg-white border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Payment</h2>

              <div className="bg-secondary border border-border rounded-lg p-4 mb-6">
                <p className="text-sm text-text-muted mb-1">Total Amount</p>
                <p className="text-3xl font-bold text-foreground">${doctor.price}</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength={3}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="flex-1 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-secondary transition-colors flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Complete Booking
                </button>
              </div>
            </form>
          )}

          {step === 'confirmation' && (
            <div className="bg-white border border-border rounded-lg p-8 text-center">
              <CheckCircle className="w-20 h-20 text-success mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
              <p className="text-text-muted mb-8 text-lg">
                Your appointment has been successfully booked.
              </p>

              <div className="bg-secondary rounded-lg p-6 mb-8 text-left">
                <h3 className="font-semibold text-foreground mb-4">Appointment Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Doctor:</span>
                    <span className="font-semibold text-foreground">{doctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Time:</span>
                    <span className="font-semibold text-foreground">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Patient:</span>
                    <span className="font-semibold text-foreground">
                      {formData.firstName} {formData.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Cost:</span>
                    <span className="font-semibold text-primary">${doctor.price}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-text-muted mb-8">
                A confirmation email has been sent to <strong>{formData.email}</strong>
              </p>

              <Link
                href="/"
                className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="bg-background min-h-screen" />}>
      <BookingPageContent />
    </Suspense>
  );
}
