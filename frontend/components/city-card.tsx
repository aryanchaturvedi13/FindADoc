'use client';

import { City } from '@/lib/data';
import Link from 'next/link';

export function CityCard({ city }: { city: City }) {
  return (
    <Link href={`/search?city=${city.id}`}>
      <div className="relative overflow-hidden rounded-lg cursor-pointer group h-64">
        <img
          src={city.image}
          alt={city.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
        <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
          <h3 className="text-xl font-semibold">{city.name}</h3>
          <p className="text-sm text-white/80 mb-2">{city.country}</p>
          <p className="text-xs text-white/70">{city.doctorCount} doctors available</p>
        </div>
      </div>
    </Link>
  );
}
