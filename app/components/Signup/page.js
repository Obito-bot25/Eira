'use client';
import { useState } from 'react';
import styles from './Signup.module.css';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    name: '',
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!form.agree) {
      setError('Please accept the student wellness terms.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Signup failed.');
        return;
      }
      window.location.href = '/components/Profile';
    } catch {
      setError('Backend is unavailable. Please verify that the server is active.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
<div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.badge}>NEW REGISTRATION</span>
            <span className={styles.secBadge}>PRIVATE BY DESIGN</span>
          </div>

          <h1 className={styles.title}>CREATE STUDENT ACCOUNT</h1>
          <p className={styles.subtitle}>
            Join EIRA to access personalized mood tracking, private journals, and peer groups.
          </p>

          <div className={styles.socialButtons}>
            <button
              type="button"
              className={styles.googleBtn}
              onClick={() =>
                setError('Google sign-in is not configured. Please use email registration.')
              }
            >
              <FcGoogle size={20} /> GOOGLE
            </button>
            <button
              type="button"
              className={styles.otherBtn}
              onClick={() => setError('Please use email signup for this local demo.')}
            >
              CAMPUS SSO
            </button>
          </div>

          <div className={styles.divider}>
            <span>OR REGISTER WITH EMAIL</span>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>FULL LEGAL OR CHOSEN NAME *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Alex Morgan"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>CAMPUS EMAIL ADDRESS *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="alex@university.edu"
                required
              />
            </div>

            <div className={styles.twoCol}>
              <div className={styles.inputGroup}>
                <label>PASSWORD *</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 6 chars"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>CONFIRM PASSWORD *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>PHONE NUMBER (FOR CRISIS NOTIFICATIONS) *</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 (555) 234-5678"
                required
              />
            </div>

            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                required
                id="termsCheck"
              />
              <label htmlFor="termsCheck">
                I agree to the{' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(
                      'EIRA Terms: All student journaling and wellness metrics are stored privately on this local instance. In emergency situations, please call 112 or Tele-MANAS 14416 directly.'
                    );
                  }}
                >
                  community guidelines and privacy terms
                </a>
              </label>
            </div>

            {error && (
              <div className={styles.errorBox}>
                <span>✕ {error}</span>
              </div>
            )}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'CREATING ACCOUNT...' : 'CREATE MY FREE ACCOUNT →'}
            </button>
          </form>

          <div className={styles.loginRow}>
            <span>ALREADY HAVE AN ACCOUNT?</span>
            <Link href="/components/Login" className={styles.loginLink}>
              LOG IN HERE →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
