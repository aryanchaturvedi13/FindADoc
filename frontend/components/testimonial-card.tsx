'use client';

import { Testimonial } from '@/lib/data';
import { Star } from 'lucide-react';

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white border border-border rounded-lg p-6">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
          <p className="text-xs text-text-muted">{testimonial.specialty}</p>
        </div>
      </div>
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < testimonial.rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-border'
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-foreground leading-relaxed">{testimonial.text}</p>
    </div>
  );
}
