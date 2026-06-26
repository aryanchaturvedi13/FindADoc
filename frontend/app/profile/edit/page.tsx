'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ChevronLeft, Upload, User } from 'lucide-react';
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

export default function EditProfilePage() {
  const [formData, setFormData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    gender: '',
    previousIllness: '',
    photoPreview: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setFormData(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photoPreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(formData));
      setSaving(false);
      window.location.href = '/profile';
    }, 1000);
  };

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

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 py-12 md:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/profile"
            className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 font-semibold"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Profile
          </Link>

          <div className="bg-white border border-border rounded-lg p-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Edit Profile</h1>
            <p className="text-text-muted mb-8">Update your personal and health information</p>

            <form onSubmit={handleSubmit}>
              {/* Profile Photo */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-foreground mb-4">
                  Profile Photo
                </label>
                <div className="flex items-center gap-6">
                  {formData.photoPreview ? (
                    <img
                      src={formData.photoPreview}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-primary-light flex items-center justify-center">
                      <User className="w-12 h-12 text-primary" />
                    </div>
                  )}
                  <label className="cursor-pointer">
                    <span className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-semibold transition-colors inline-block">
                      Change Photo
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Personal Information */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
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
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Health Information */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-6">Health Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      min="18"
                      max="120"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Previous Illness or Health Conditions
                  </label>
                  <textarea
                    name="previousIllness"
                    value={formData.previousIllness}
                    onChange={handleChange}
                    placeholder="List any previous illnesses, allergies, or ongoing health conditions"
                    rows={5}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/profile"
                  className="flex-1 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary-light transition-colors text-center"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
