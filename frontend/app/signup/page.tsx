'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { User, Mail, Lock, Check, Upload } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    previousIllness: '',
    photo: null as File | null,
    photoPreview: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
          photo: file,
          photoPreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        alert('Please fill all fields');
        return;
      }
      setStep(2);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!formData.age || !formData.gender) {
      alert('Please fill all fields');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Store user data in localStorage for demo
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        previousIllness: formData.previousIllness,
        photoPreview: formData.photoPreview,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      window.location.href = '/profile';
    }, 1000);
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 py-12 md:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-border rounded-lg p-8">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${step === 1 ? 'bg-primary text-white' : 'bg-secondary text-foreground'}`}>
                  1
                </div>
                <div className={`h-1 flex-1 mx-4 ${step === 2 ? 'bg-primary' : 'bg-secondary'}`} />
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${step === 2 ? 'bg-primary text-white' : 'bg-secondary text-foreground'}`}>
                  2
                </div>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2 text-center">
                {step === 1 ? 'Create Account' : 'Complete Your Profile'}
              </h1>
              <p className="text-text-muted text-center">
                {step === 1 ? 'Basic information' : 'Health and personal details'}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 w-5 h-5 text-text-muted" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="John"
                          className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Last Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 w-5 h-5 text-text-muted" />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Doe"
                          className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-5 h-5 text-text-muted" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 w-5 h-5 text-text-muted" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 w-5 h-5 text-text-muted" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Age
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="25"
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

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Previous Illness or Health Conditions
                    </label>
                    <textarea
                      name="previousIllness"
                      value={formData.previousIllness}
                      onChange={handleChange}
                      placeholder="List any previous illnesses, allergies, or ongoing health conditions (optional)"
                      rows={4}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Profile Photo
                    </label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      {formData.photoPreview ? (
                        <div className="space-y-4">
                          <img
                            src={formData.photoPreview}
                            alt="Preview"
                            className="w-24 h-24 rounded-full mx-auto object-cover"
                          />
                          <label className="block">
                            <span className="text-primary hover:text-primary/80 cursor-pointer font-semibold">
                              Change photo
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                        </div>
                      ) : (
                        <label className="block cursor-pointer">
                          <Upload className="w-8 h-8 text-text-muted mx-auto mb-2" />
                          <span className="text-foreground font-semibold">Upload a photo</span>
                          <p className="text-sm text-text-muted">or drag and drop</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  <label className="flex items-center gap-2 mb-6">
                    <input
                      type="checkbox"
                      required
                      className="w-4 h-4 rounded border-border focus:ring-2 focus:ring-primary"
                    />
                    <span className="text-sm text-text-muted">
                      I agree to the{' '}
                      <a href="#" className="text-primary hover:text-primary/80">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-primary hover:text-primary/80">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </>
              )}

              <div className="flex gap-4">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary-light transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors ${
                    step === 2 ? '' : ''
                  }`}
                >
                  {loading ? 'Creating account...' : step === 1 ? 'Next' : 'Create Account'}
                </button>
              </div>
            </form>

            <p className="text-center text-text-muted mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:text-primary/80 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
