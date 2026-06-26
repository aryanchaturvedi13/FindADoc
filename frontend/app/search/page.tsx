'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { DoctorCard } from '@/components/doctor-card';
import { doctors, cities } from '@/lib/data';
import { Search, MapPin, Filter } from 'lucide-react';
import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
    setSelectedCity(searchParams.get('city') || '');
  }, [searchParams]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      // Filter by search query
      if (
        searchQuery &&
        !doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Filter by city
      if (selectedCity) {
        const selectedCityObj = cities.find((c) => c.id === selectedCity);
        if (!doctor.location.includes(selectedCityObj?.name || '')) {
          return false;
        }
      }

      // Filter by price range
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        if (doctor.price < min || doctor.price > max) {
          return false;
        }
      }

      // Filter by rating
      if (ratingFilter !== 'all') {
        const minRating = parseFloat(ratingFilter);
        if (doctor.rating < minRating) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCity, priceRange, ratingFilter]);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />

      {/* Search Filter Section */}
      <section className="bg-secondary border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search by specialty or name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-text-muted" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
              >
                <option value="">All destinations</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}, {city.country}
                  </option>
                ))}
              </select>
            </div>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            >
              <option value="all">All prices</option>
              <option value="0-50">$0 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-150">$100 - $150</option>
              <option value="150-500">$150+</option>
            </select>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="px-4 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            >
              <option value="all">All ratings</option>
              <option value="4.5">4.5+ stars</option>
              <option value="4.7">4.7+ stars</option>
              <option value="4.9">4.9+ stars</option>
            </select>
          </div>
          <p className="text-sm text-text-muted">
            Found <strong>{filteredDoctors.length}</strong> doctor{filteredDoctors.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Results */}
      <section className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Filter className="w-16 h-16 text-border mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No doctors found
              </h3>
              <p className="text-text-muted mb-6">
                Try adjusting your search filters or exploring other destinations.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCity('');
                  setPriceRange('all');
                  setRatingFilter('all');
                }}
                className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="bg-background min-h-screen" />}>
      <SearchPageContent />
    </Suspense>
  );
}
