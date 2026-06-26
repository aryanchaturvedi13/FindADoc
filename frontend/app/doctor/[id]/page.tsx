'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { doctors } from '@/lib/data';
import { Star, MapPin, Globe, Check, Calendar, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useState, Suspense } from 'react';
import { useParams } from 'next/navigation';

function DoctorProfileContent() {
  const params = useParams();
  const doctorId = params.id as string;
  const doctor = doctors.find((d) => d.id === doctorId);
  const [selectedTime, setSelectedTime] = useState('');

  if (!doctor) {
    return (
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Doctor not found</h1>
            <p className="text-text-muted mb-6">This doctor profile doesn&apos;t exist.</p>
            <Link href="/search" className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary/90">
              Back to Search
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
  ];

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />

      {/* Profile Header */}
      <section className="bg-secondary border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Doctor Image */}
            <div className="md:col-span-1">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full aspect-square object-cover rounded-lg"
              />
            </div>

            {/* Doctor Info */}
            <div className="md:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold text-foreground">{doctor.name}</h1>
                    {doctor.verified && (
                      <Check className="w-6 h-6 text-success flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xl text-primary mb-4">{doctor.specialty}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(doctor.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : i < doctor.rating
                          ? 'fill-yellow-400 text-yellow-400 opacity-50'
                          : 'text-border'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-foreground">
                  {doctor.rating}
                </span>
                <span className="text-text-muted">
                  ({doctor.reviews} reviews)
                </span>
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white border border-border rounded-lg p-4">
                  <p className="text-xs text-text-muted uppercase mb-1">Price</p>
                  <p className="text-2xl font-bold text-primary">${doctor.price}</p>
                  <p className="text-xs text-text-muted">per consultation</p>
                </div>
                <div className="bg-white border border-border rounded-lg p-4">
                  <p className="text-xs text-text-muted uppercase mb-1">Location</p>
                  <p className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {doctor.location}
                  </p>
                </div>
              </div>

              {/* Languages */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-foreground mb-2">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((lang) => (
                    <span
                      key={lang}
                      className="bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* About & Schedule */}
            <div className="lg:col-span-2">
              {/* About */}
              <div className="bg-white border border-border rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">About</h2>
                <p className="text-text-muted leading-relaxed mb-6">{doctor.bio}</p>

                <h3 className="text-lg font-semibold text-foreground mb-3">Availability</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.availability.map((day) => (
                    <span
                      key={day}
                      className="bg-primary-light text-primary px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Widget */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-border rounded-lg p-6 sticky top-20">
                <h3 className="text-xl font-bold text-foreground mb-6">Book Appointment</h3>

                {/* Time Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Select Time
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-3 rounded-lg border transition-colors text-sm font-medium ${
                          selectedTime === time
                            ? 'bg-primary text-white border-primary'
                            : 'border-border text-foreground hover:border-primary'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Booking Button */}
                <Link
                  href={`/booking/${doctor.id}?time=${selectedTime}`}
                  className={`w-full block text-center py-3 rounded-lg font-semibold transition-colors mb-4 ${
                    selectedTime
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-secondary text-text-muted cursor-not-allowed'
                  }`}
                  onClick={(e) => !selectedTime && e.preventDefault()}
                >
                  {selectedTime ? 'Continue to Booking' : 'Select a Time'}
                </Link>

                {/* Message Option */}
                <button className="w-full py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary-light transition-colors flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Send Message
                </button>

                {/* Info */}
                <div className="mt-6 pt-6 border-t border-border text-xs text-text-muted space-y-2">
                  <p className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" />
                    Verified by patients
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Responds within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function DoctorProfile() {
  return (
    <Suspense fallback={<div className="bg-background min-h-screen" />}>
      <DoctorProfileContent />
    </Suspense>
  );
}
