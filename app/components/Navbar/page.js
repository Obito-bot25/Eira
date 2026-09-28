"use client";
import styles from './Navbar.module.css';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bannerClosed, setBannerClosed] = useState(false);

  const links = [
    { name: 'DASHBOARD', path: '/' },
    { name: 'JOURNAL', path: '/components/Journal' },
    { name: 'WELLNESS LAB', path: '/wellness' },
    { name: 'PEER GROUPS', path: '/components/PeerGroup' },
    { name: 'CAMPUS', path: '/components/Campus' },
    { name: 'SUPPORT', path: '/components/Support' },
    { name: 'ABOUT', path: '/about' },
  ];

  const fetchAuth = () => {
    let alive = true;
    fetch('/api/auth/me', { credentials: 'include', cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => {
        if (alive) setUser(d.user || null);
      })
      .catch(() => {
        if (alive) setUser(null);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  };

  useEffect(() => {
    const cleanup = fetchAuth();
    const handleAuthChange = () => fetchAuth();
    window.addEventListener('eira_auth_change', handleAuthChange);
    return () => {
      if (cleanup) cleanup();
      window.removeEventListener('eira_auth_change', handleAuthChange);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    // Refresh auth only when navigating to root or profile
    if (pathname === '/' || pathname === '/components/Profile') {
      fetchAuth();
    }
  }, [pathname]);

  async function logout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setUser(null);
      router.push('/components/Login');
      router.refresh();
    }
  }

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className={styles.header}>
      {/* Top Banner (Purple bar with black border and arrow CTA matching reference) */}
      {!bannerClosed && (
        <div className={styles.topBanner}>
          <div className={styles.bannerLeft}>
            <span className={styles.bannerTag}>NOTICE:</span>
            <span>DIGITAL STUDENT WELLNESS COMPANION // AI & SELF-SERVICE TOOLS</span>
          </div>
          <div className={styles.bannerRight}>
            <Link href="/wellness" className={styles.bannerLink}>
              EXPLORE WELLNESS LAB →
            </Link>
            <button
              className={styles.bannerClose}
              onClick={() => setBannerClosed(true)}
              aria-label="Close notification banner"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav className={styles.navbar} aria-label="Main Navigation">
        {/* Left: Brand Mark */}
        <Link href="/" className={styles.brandMark} aria-label="EIRA Home">
          <div className={styles.logoBadge}>EIRA</div>
          <span className={styles.brandTitle}>NEO WELLNESS</span>
        </Link>

        {/* Center: Desktop Links */}
        <ul className={styles.navLinks}>
          {links.map((link) => {
            const active = isActive(link.path);
            return (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
                >
                  {link.name}
                  {active && <span className={styles.activeDot}></span>}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Actions */}
        <div className={styles.actions}>
          {loading ? (
            <div className={styles.loadingPlaceholder} />
          ) : user ? (
            <div className={styles.userControls}>
              <Link href="/components/Profile" className={styles.profileBtn}>
                <FiUser size={15} />
                <span>{user.name?.split(' ')[0] || user.email?.split('@')[0]}</span>
              </Link>
              <button
                type="button"
                className={styles.logoutBtn}
                onClick={logout}
                title="Log out"
              >
                <FiLogOut size={15} />
              </button>
            </div>
          ) : (
            <div className={styles.authRow}>
              <Link href="/components/Login" className={styles.loginLink}>
                LOG IN
              </Link>
              <Link href="/components/AiChatbot" className={styles.primaryCtaBtn}>
                TALK TO AI →
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className={styles.mobileDrawer}>
          <ul className={styles.mobileNavList}>
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`${styles.mobileNavItem} ${
                    isActive(link.path) ? styles.mobileActiveItem : ''
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{link.name}</span>
                  {isActive(link.path) && (
                    <span className={styles.mobileActiveBadge}>CURRENT</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.mobileFooter}>
            <Link
              href="/components/AiChatbot"
              className={styles.mobileAiCta}
              onClick={() => setMobileOpen(false)}
            >
              TALK TO EIRA AI →
            </Link>

            {user ? (
              <div className={styles.mobileUserRow}>
                <Link
                  href="/components/Profile"
                  className={styles.mobileProfileLink}
                  onClick={() => setMobileOpen(false)}
                >
                  👤 {user.name || user.email}
                </Link>
                <button
                  type="button"
                  className={styles.mobileLogoutBtn}
                  onClick={logout}
                >
                  LOG OUT
                </button>
              </div>
            ) : (
              <div className={styles.mobileAuthRow}>
                <Link
                  href="/components/Login"
                  className={styles.mobileLoginBtn}
                  onClick={() => setMobileOpen(false)}
                >
                  LOG IN
                </Link>
                <Link
                  href="/components/Signup"
                  className={styles.mobileSignupBtn}
                  onClick={() => setMobileOpen(false)}
                >
                  SIGN UP FREE →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
