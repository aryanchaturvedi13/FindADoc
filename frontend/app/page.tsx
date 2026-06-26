'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CityCard } from '@/components/city-card';
import { TestimonialCard } from '@/components/testimonial-card';
import { cities, testimonials } from '@/lib/data';
import { Search, MapPin, Clock, Shield } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (selectedCity) params.append('city', selectedCity);
    window.location.href = `/search?${params.toString()}`;
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-light to-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Find Quality Healthcare Anywhere in the World
            </h1>
            <p className="text-lg text-text-muted mb-10 text-pretty">
              Connect with verified doctors in 50+ destinations. Book appointments, compare prices, and get the care you need while traveling.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3.5 w-5 h-5 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search by specialty or condition"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-text-muted" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white"
                  >
                    <option value="">Select a destination</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}, {city.country}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Search Doctors
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Why Choose FindADoc?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-light w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Quick Booking</h3>
              <p className="text-text-muted">
                Book appointments in minutes. Most doctors available within 24 hours.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-light w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Verified Doctors</h3>
              <p className="text-text-muted">
                All doctors are verified and reviewed by patients from around the world.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-light w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Global Network</h3>
              <p className="text-text-muted">
                Access healthcare across 50+ countries with transparent pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            What Our Patients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Doctor?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Join thousands of travelers who have found quality healthcare worldwide.
          </p>
          <Link
            href="/search"
            className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-white/90 transition-colors"
          >
            Start Your Search
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
