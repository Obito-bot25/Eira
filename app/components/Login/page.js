'use client';

import { useState } from 'react';
import styles from './Login.module.css';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Invalid email or password. If you are new, please sign up first.');
        return;
      }
      router.push('/components/Profile');
      router.refresh();
    } catch {
      setError('Unable to connect to the backend. Make sure npm run dev is running.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
<div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.badge}>STUDENT ACCESS</span>
            <span className={styles.secBadge}>SECURE ACCESS</span>
          </div>

          <h1 className={styles.title}>WELCOME BACK TO EIRA</h1>
          <p className={styles.subtitle}>
            Sign in to access your mood dashboard, secure journal, and AI companion.
          </p>

          <div className={styles.socialButtons}>
            <button
              type="button"
              className={styles.google}
              onClick={() => setError('Google sign-in is not configured. Please use email login.')}
            >
              <FcGoogle size={20} /> GOOGLE
            </button>
            <button
              type="button"
              className={styles.other}
              onClick={() => setError('Please use email login for this local demo.')}
            >
              CAMPUS SSO
            </button>
          </div>

          <div className={styles.divider}>
            <span>OR SIGN IN WITH EMAIL</span>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>CAMPUS EMAIL ADDRESS *</label>
              <input
                type="email"
                placeholder="student@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>SECRET PASSWORD *</label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className={styles.options}>
              <label className={styles.remember}>
                <input type="checkbox" /> REMEMBER SESSION
              </label>
              <button
                type="button"
                className={styles.forgot}
                onClick={() =>
                  setError('Password reset is not configured in this local demo. Create a new account or use your existing password.')
                }
              >
                FORGOT PASSWORD?
              </button>
            </div>

            {error && (
              <div className={styles.errorBox}>
                <span>✕ {error}</span>
              </div>
            )}

            <button type="submit" className={styles.loginButton} disabled={loading}>
              {loading ? 'LOGGING IN...' : 'LOG IN TO DASHBOARD →'}
            </button>
          </form>

          <div className={styles.signupBox}>
            <span>NEW TO EIRA?</span>{' '}
            <Link href="/components/Signup" className={styles.signupLink}>
              CREATE FREE STUDENT ACCOUNT →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
