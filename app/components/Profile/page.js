"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Profile.module.css";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    fetch("/api/profile", { credentials: "include", cache: "no-store" })
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || "Please log in first.");
        return d;
      })
      .then((d) => {
        setUser(d.user);
        setForm({ name: d.user.name || "", phone: d.user.phone || "" });
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const displayName = user?.name || user?.email?.split("@")[0] || "Student";
  const avatar = displayName.charAt(0).toUpperCase();

  async function saveProfile(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not update profile.");
      setUser(data.user);
      setForm({ name: data.user.name, phone: data.user.phone || "" });
      setEditing(false);
      setNotice("Profile updated successfully.");
      setTimeout(() => setNotice(""), 3500);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setUser(null);
      router.push("/components/Login");
      router.refresh();
    }
  }

  if (loading) {
    return (
      <>
<div className={styles.page}>
          <div className={styles.loadingBox}>
            <span className={styles.spinIcon}>⚡</span>
            <p>LOADING SECURE STUDENT PROFILE...</p>
          </div>
        </div>
      </>
    );
  }

  if (error && !user) {
    return (
      <>
<div className={styles.page}>
          <div className={styles.errorBox}>
            <span className={styles.errorIcon}>⚠️</span>
            <h2>SESSION NOT FOUND</h2>
            <p>{error}</p>
            <Link href="/components/Login" className={styles.primaryBtn}>
              LOG IN TO CONTINUE →
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
<div className={styles.page}>
        <div className={styles.container}>
          {/* Top Notice Banners */}
          {notice && (
            <div className={styles.noticeBanner}>
              <span>✓ {notice}</span>
            </div>
          )}
          {error && (
            <div className={styles.errorBanner}>
              <span>✕ {error}</span>
            </div>
          )}

          {/* Profile Identity Card */}
          <div className={styles.idCard}>
            <div className={styles.idCardHeader}>
              <span className={styles.idBadge}>EIRA STUDENT PROFILE ID</span>
              <span className={styles.statusLive}>● ACTIVE NOW</span>
            </div>

            <div className={styles.profileMainRow}>
              <div className={styles.avatarBox}>
                <span className={styles.avatarLetter}>{avatar}</span>
              </div>

              <div className={styles.profileDetails}>
                <h1 className={styles.profileName}>{displayName}</h1>
                <p className={styles.profileEmail}>{user?.email}</p>
                {user?.phone && (
                  <p className={styles.profilePhone}>📞 {user.phone}</p>
                )}
                <div className={styles.tagRow}>
                  <span className={styles.studentTag}>UNDERGRADUATE</span>
                  <span className={styles.streakTag}>🔥 7-DAY STREAK</span>
                  <span className={styles.tierTag}>LEVEL 3 MINDFUL</span>
                </div>
              </div>

              <div className={styles.actionColumn}>
                <button
                  className={styles.editBtn}
                  onClick={() => {
                    setError("");
                    setNotice("");
                    setEditing(!editing);
                  }}
                >
                  {editing ? "CANCEL" : "EDIT PROFILE ✎"}
                </button>
                <button className={styles.logoutBtn} onClick={logout}>
                  LOG OUT ⎋
                </button>
              </div>
            </div>

            {/* Inline Edit Form */}
            {editing && (
              <div className={styles.editDrawer}>
                <h3 className={styles.editTitle}>UPDATE PROFILE CREDENTIALS</h3>
                <form onSubmit={saveProfile} className={styles.editForm}>
                  <div className={styles.formGroup}>
                    <label className={styles.inputLabel}>FULL NAME</label>
                    <input
                      className={styles.neoInput}
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      required
                      maxLength={60}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.inputLabel}>PHONE (OPTIONAL)</label>
                    <input
                      className={styles.neoInput}
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className={styles.formBtns}>
                    <button
                      type="submit"
                      className={styles.saveBtn}
                      disabled={saving}
                    >
                      {saving ? "SAVING CHANGES..." : "SAVE CHANGES ✓"}
                    </button>
                    <button
                      type="button"
                      className={styles.cancelBtn}
                      onClick={() => setEditing(false)}
                    >
                      CANCEL
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Stats Row */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>12</span>
              <span className={styles.statLabel}>MOOD CHECK-INS</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>03</span>
              <span className={styles.statLabel}>DAILY JOURNALS</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>05</span>
              <span className={styles.statLabel}>MINDFULNESS SESSIONS</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>07</span>
              <span className={styles.statLabel}>WELLNESS GAMES</span>
            </div>
          </div>

          {/* Level Progress */}
          <div className={styles.progressCard}>
            <div className={styles.progressTop}>
              <span className={styles.progressTitle}>WELLNESS MILESTONE PROGRESS</span>
              <span className={styles.progressPercent}>70% TO LEVEL 4</span>
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: "70%" }}
              ></div>
            </div>
            <p className={styles.progressNote}>
              Complete 2 more daily check-ins or 1 guided breathing session to unlock the &quot;Zen Master&quot; badge.
            </p>
          </div>

          {/* Achievements */}
          <div className={styles.achievementsSection}>
            <div className={styles.sectionHeaderRow}>
              <span className={styles.sectionBadge}>BADGES & HONORS</span>
              <h2 className={styles.sectionTitle}>UNLOCKED ACHIEVEMENTS</h2>
            </div>
            <div className={styles.achievementGrid}>
              <div className={styles.achievementCard}>
                <div className={styles.badgeIcon}>🧘</div>
                <div className={styles.badgeText}>
                  <h4>FOCUS GURU</h4>
                  <p>Completed 5 Mindfulness Sessions</p>
                </div>
              </div>
              <div className={styles.achievementCard}>
                <div className={styles.badgeIcon}>⚡</div>
                <div className={styles.badgeText}>
                  <h4>WELL-BEING WARRIOR</h4>
                  <p>Maintained a 7-day streak</p>
                </div>
              </div>
              <div className={styles.achievementCard}>
                <div className={styles.badgeIcon}>📓</div>
                <div className={styles.badgeText}>
                  <h4>EXPRESSION STAR</h4>
                  <p>Wrote 10+ reflection logs</p>
                </div>
              </div>
              <div className={styles.achievementCard}>
                <div className={styles.badgeIcon}>🌟</div>
                <div className={styles.badgeText}>
                  <h4>ROUTINE KEEPER</h4>
                  <p>Checked in daily for a week</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={styles.activityCard}>
            <h3 className={styles.activityTitle}>RECENT ACTIVITY LOG</h3>
            <ul className={styles.activityList}>
              <li className={styles.activityItem}>
                <span className={styles.actIcon}>🧘</span>
                <div className={styles.actContent}>
                  <strong>Completed Box Breathing Session</strong>
                  <span>Today at 4:30 PM • 4-7-8 Somatic cycle</span>
                </div>
              </li>
              <li className={styles.activityItem}>
                <span className={styles.actIcon}>📓</span>
                <div className={styles.actContent}>
                  <strong>Wrote in Journal - “Gratitude & Grounding”</strong>
                  <span>Yesterday at 9:15 PM • Mood: 8/10</span>
                </div>
              </li>
              <li className={styles.activityItem}>
                <span className={styles.actIcon}>😊</span>
                <div className={styles.actContent}>
                  <strong>Logged Daily Mood - “Calm & Centered”</strong>
                  <span>Yesterday at 11:00 AM • Positive Outlook</span>
                </div>
              </li>
              <li className={styles.activityItem}>
                <span className={styles.actIcon}>🎮</span>
                <div className={styles.actContent}>
                  <strong>Played Wellness Cognitive Game - “Connect Four”</strong>
                  <span>2 days ago • Neuro-relaxation match</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Settings Section */}
          <div className={styles.settingsSection}>
            <h3 className={styles.settingsTitle}>ACCOUNT & PRIVACY PREFERENCES</h3>
            <div className={styles.settingsGrid}>
              <div className={styles.settingCard}>
                <div>
                  <h4 className={styles.settingCardTitle}>NOTIFICATION ALERTS</h4>
                  <p className={styles.settingCardDesc}>
                    Configure daily morning mood check-in and evening reflection prompts.
                  </p>
                </div>
                <button
                  className={styles.settingActionBtn}
                  onClick={() => alert("Notification preferences are configured via your browser settings.")}
                >
                  CONFIGURE →
                </button>
              </div>

              <div className={styles.settingCard}>
                <div>
                  <h4 className={styles.settingCardTitle}>DATA & PRIVACY VAULT</h4>
                  <p className={styles.settingCardDesc}>
                    Journal entries are stored in your private session account with zero ad tracking.
                  </p>
                </div>
                <button
                  className={styles.settingActionBtn}
                  onClick={() => alert("Privacy status: Local DB storage active. No third-party data tracking.")}
                >
                  AUDIT DATA →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
