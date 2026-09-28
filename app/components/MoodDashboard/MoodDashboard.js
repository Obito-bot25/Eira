"use client";
import React, { useEffect, useState, useCallback } from "react";
import styles from "../../page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MOOD_OPTIONS = [
  { label: "LOW", value: 1, color: "#FF5500", desc: "Exhausted / Stressed" },
  { label: "NOT GREAT", value: 2, color: "#FECDD3", desc: "Uneasy / Distracted" },
  { label: "OKAY", value: 3, color: "#EFEFEA", desc: "Balanced / Steady" },
  { label: "GOOD", value: 4, color: "#BAE6FD", desc: "Focused / Capable" },
  { label: "GREAT", value: 5, color: "#D4FF00", desc: "Energized / Grounded" },
];

const MOOD_LABEL_BY_VAL = {
  1: "LOW",
  2: "NOT GREAT",
  3: "OKAY",
  4: "GOOD",
  5: "GREAT",
};

export default function MoodDashboard() {
  const router = useRouter();

  // Consolidated state machine to eliminate sequential re-render cascades
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null,
    userName: "Student",
    currentMood: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null); // { message, type: 'info' | 'error' | 'success' }

  const loadDashboardSummary = useCallback(async () => {
    try {
      const res = await fetch("/api/dashboard/summary", {
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to load dashboard summary");

      const data = await res.json();

      if (data.authenticated) {
        let name = "Student";
        if (data.user?.name) name = data.user.name;
        else if (data.user?.email) name = data.user.email.split("@")[0];

        let todayMood = null;
        if (data.latestMood?.createdAt) {
          const todayStr = new Date().toISOString().split("T")[0];
          if (data.latestMood.createdAt.startsWith(todayStr)) {
            todayMood = MOOD_LABEL_BY_VAL[data.latestMood.mood] || null;
          }
        }

        // Atomic state update: batches data, name, currentMood, and loading in ONE tick
        setState((prev) => ({
          ...prev,
          data,
          userName: name,
          currentMood: todayMood || prev.currentMood,
          isLoading: false,
          error: null,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          data: null,
          isLoading: false,
          error: null,
        }));
      }
    } catch {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "COULDN'T LOAD YOUR CHECK-INS.",
      }));
    }
  }, []);

  useEffect(() => {
    loadDashboardSummary();

    // Fast initial UI cache check
    try {
      const saved = localStorage.getItem("eira_daily_mood");
      if (saved) {
        const parsed = JSON.parse(saved);
        const today = new Date().toISOString().split("T")[0];
        if (parsed.date === today && parsed.mood) {
          setState((prev) => ({ ...prev, currentMood: parsed.mood }));
        }
      }
    } catch {}
  }, [loadDashboardSummary]);

  const handleMoodSelect = async (item) => {
    setIsSubmitting(true);
    setToast(null);

    try {
      const res = await fetch("/api/moods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ mood: item.value }),
      });

      if (res.status === 401) {
        setToast({
          type: "error",
          message: "PLEASE LOG IN TO SAVE YOUR DAILY CHECK-IN.",
        });
        setTimeout(() => {
          router.push("/components/Login");
        }, 1500);
        return;
      }

      if (!res.ok) throw new Error("Save failed");

      const data = await res.json();
      if (data?.mood) {
        const today = new Date().toISOString().split("T")[0];
        try {
          localStorage.setItem(
            "eira_daily_mood",
            JSON.stringify({ mood: item.label, value: item.value, date: today, timestamp: Date.now() })
          );
        } catch {}

        setState((prev) => ({ ...prev, currentMood: item.label }));
        setToast({
          type: "success",
          message: `LOGGED MOOD AS ${item.label} (${item.value}/5). SAVED TO YOUR WEEK.`,
        });

        // Instant background refresh of calculated telemetry
        await loadDashboardSummary();
      } else {
        throw new Error("Invalid response");
      }
    } catch {
      setToast({
        type: "error",
        message: "COULDN'T SAVE YOUR CHECK-IN. TRY AGAIN.",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setToast(null);
      }, 5000);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "GOOD MORNING";
    if (hour < 18) return "GOOD AFTERNOON";
    return "GOOD EVENING";
  };

  const { data, isLoading, error, userName, currentMood } = state;

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <div
          className={styles.toastBanner}
          style={{
            backgroundColor: toast.type === "error" ? "#FF5500" : "#D4FF00",
            color: toast.type === "error" ? "#FFFFFF" : "#000000",
          }}
        >
          <span className={styles.toastTag}>
            {toast.type === "error" ? "ERROR" : "CONFIRMED"}
          </span>
          <span style={{ fontWeight: 800 }}>{toast.message}</span>
          <button
            className={styles.toastClose}
            onClick={() => setToast(null)}
            style={{ color: toast.type === "error" ? "#FFFFFF" : "#000000" }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Daily Mood Check-In & Telemetry */}
      <section id="mood-checkin" className={styles.moodSection}>
        <div className={styles.moodCard}>
          <div className={styles.moodHeader}>
            <div>
              <span className={styles.secMiniTag}>DAILY TELEMETRY</span>
              <h3 className={styles.moodGreeting}>
                {getGreeting()}, {userName.toUpperCase()}.
              </h3>
              <p className={styles.moodQuestion}>HOW ARE YOU FEELING RIGHT NOW?</p>
            </div>
            {currentMood && (
              <div className={styles.currentMoodBadge}>
                <span>TODAY:</span>
                <strong>{currentMood}</strong>
              </div>
            )}
          </div>

          {/* 5 Mood Buttons */}
          <div className={styles.moodButtonsGrid}>
            {MOOD_OPTIONS.map((item) => (
              <button
                key={item.label}
                type="button"
                disabled={isSubmitting}
                className={`${styles.moodBtn} ${
                  currentMood === item.label ? styles.moodBtnActive : ""
                } ${isSubmitting ? styles.moodBtnDisabled : ""}`}
                onClick={() => handleMoodSelect(item)}
              >
                <span
                  className={styles.moodColorBlock}
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className={styles.moodBtnLabel}>{item.label}</span>
                <span className={styles.moodBtnDesc}>
                  {isSubmitting ? "SAVING..." : item.desc}
                </span>
              </button>
            ))}
          </div>

          <hr className={styles.dashboardDivider} />

          {/* Loading / Error / Unauthenticated / Real Data States */}
          {isLoading ? (
            <div className={styles.dashboardStatusBox}>
              <span>LOADING YOUR WEEK...</span>
            </div>
          ) : error ? (
            <div className={styles.dashboardStatusBox}>
              <span>COULDN&apos;T LOAD YOUR CHECK-INS.</span>
              <button
                type="button"
                className={styles.dashboardRetryBtn}
                onClick={loadDashboardSummary}
              >
                TRY AGAIN
              </button>
            </div>
          ) : !data?.authenticated ? (
            <div className={styles.dashboardStatusBox}>
              <span>SIGN IN TO SYNC YOUR PRIVATE MOOD TELEMETRY &amp; WEEKLY METRICS.</span>
              <Link href="/components/Login" prefetch={false} className={styles.dashboardNoticeLink}>
                LOGIN / SIGN UP →
              </Link>
            </div>
          ) : (
            <div className={styles.dashboardStory}>
              {/* YOUR WEEK */}
              <div className={styles.metricsSection}>
                <div className={styles.dashboardHeaderRow}>
                  <h4 className={styles.dashboardSecTitle}>YOUR WEEK</h4>
                  <span className={styles.secMiniTag}>PAST 7 DAYS</span>
                </div>

                <div className={styles.metricsGrid}>
                  <div className={styles.metricBox}>
                    <span className={styles.metricNum}>
                      {String(data.metrics.checkInsThisWeek).padStart(2, "0")}
                    </span>
                    <span className={styles.metricLabel}>CHECK-INS THIS WEEK</span>
                  </div>

                  <div className={styles.metricBox}>
                    <span className={styles.metricNum}>
                      {String(data.metrics.journalsThisWeek).padStart(2, "0")}
                    </span>
                    <span className={styles.metricLabel}>JOURNALS THIS WEEK</span>
                  </div>

                  <div className={styles.metricBox}>
                    <span className={styles.metricNum}>
                      {String(data.metrics.activitiesThisWeek).padStart(2, "0")}
                    </span>
                    <span className={styles.metricLabel}>WELLNESS SESSIONS</span>
                  </div>
                </div>
              </div>

              {/* YOUR TREND */}
              <div className={styles.trendCard}>
                <div className={styles.trendHeader}>
                  <h4 className={styles.dashboardSecTitle}>YOUR TREND</h4>
                  <span className={styles.secMiniTag}>
                    {data.metrics.checkInsThisWeek === 0
                      ? "NO CHECK-INS YET"
                      : data.metrics.checkInsThisWeek === 1
                      ? "1 CHECK-IN LOGGED"
                      : "7-DAY ROLLING WINDOW"}
                  </span>
                </div>

                <div className={styles.trendGrid}>
                  {data.weeklyTrend.map((d) => (
                    <div key={d.date} className={styles.trendDayCol}>
                      <div className={styles.trendDayHeader}>
                        <span className={styles.trendDayName}>{d.day}</span>
                        {d.isToday && <span className={styles.trendTodayTag}>TODAY</span>}
                      </div>
                      {d.mood !== null ? (
                        <div
                          className={`${styles.trendSlot} ${styles.trendSlotFilled}`}
                          style={{ backgroundColor: d.color }}
                          title={`${d.day} (${d.date}): Mood ${d.mood} - ${d.label}`}
                        >
                          <span className={styles.trendSlotScore}>{d.mood}</span>
                          <span className={styles.trendSlotLabel}>{d.label}</span>
                        </div>
                      ) : (
                        <div
                          className={`${styles.trendSlot} ${styles.trendSlotEmpty}`}
                          title={`${d.day} (${d.date}): No check-in`}
                        >
                          —
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className={styles.trendLegend}>
                  <span className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: "#FF5500" }}></span>
                    1 LOW
                  </span>
                  <span className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: "#FECDD3" }}></span>
                    2 NOT GREAT
                  </span>
                  <span className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: "#EFEFEA" }}></span>
                    3 OKAY
                  </span>
                  <span className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: "#BAE6FD" }}></span>
                    4 GOOD
                  </span>
                  <span className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: "#D4FF00" }}></span>
                    5 GREAT
                  </span>
                </div>
              </div>

              {/* EIRA NOTICED */}
              <div className={styles.insightCard}>
                <span className={styles.insightTag}>EIRA NOTICED</span>
                <p className={styles.insightQuote}>
                  &ldquo;{data.insight.text}&rdquo;
                </p>
                <div className={styles.insightActionWrap}>
                  <span className={styles.insightSubtext}>
                    {data.recommendation.desc}
                  </span>
                  <Link
                    href={data.recommendation.href}
                    prefetch={true}
                    className={styles.insightActionBtn}
                  >
                    {data.recommendation.label}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
