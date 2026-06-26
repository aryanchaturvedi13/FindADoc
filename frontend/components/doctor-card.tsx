'use client';

import { Doctor } from '@/lib/data';
import { Star, Check } from 'lucide-react';
import Link from 'next/link';

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Link href={`/doctor/${doctor.id}`}>
      <div className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="aspect-square overflow-hidden bg-secondary">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground">{doctor.name}</h3>
            {doctor.verified && (
              <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
            )}
          </div>
          <p className="text-sm text-text-muted mb-2">{doctor.specialty}</p>
          
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(doctor.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : i < doctor.rating
                      ? 'fill-yellow-400 text-yellow-400 opacity-50'
                      : 'text-border'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-text-muted ml-1">
              {doctor.rating} ({doctor.reviews})
            </span>
          </div>

          <div className="space-y-1 mb-3">
            <p className="text-xs text-text-muted">{doctor.location}</p>
            <p className="text-xs text-text-muted">
              {doctor.languages.join(', ')}
            </p>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-lg font-semibold text-primary">
              ${doctor.price}
            </span>
            <span className="text-xs text-text-muted">per consultation</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
