"use client";
import styles from "./Campus.module.css";
import Link from "next/link";
import { useState } from "react";

export default function CampusIntegration() {
  const [msg, setMsg] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const show = (text) => {
    setMsg(text);
    setTimeout(() => {
      setMsg("");
    }, 4000);
  };

  const events = [
    {
      id: 1,
      title: "Exam Anxiety & Cognitive Reframing",
      type: "workshop",
      badge: "WEEKLY WORKSHOP",
      badgeColor: "var(--color-yellow)",
      time: "Wed, 4:00 PM • Campus Student Center Hall B",
      desc: "Practical grounding techniques to help stabilize focus before high-stakes midterms and tests.",
      actionText: "RSVP FREE",
      actionMsg: "Registered for 'Exam Anxiety & Cognitive Reframing' workshop. Check your student email for the calendar invite!",
    },
    {
      id: 2,
      title: "Mindful Study Sprints & Flow States",
      type: "workshop",
      badge: "LIVE LAB",
      badgeColor: "var(--color-green)",
      time: "Fri, 5:30 PM • Library Media Room & Zoom",
      desc: "Learn the science of 25/5 Pomodoro study intervals with guided somatic breathing between sprints.",
      actionText: "JOIN SESSION",
      actionMsg: "Study sprint seat reserved! Link has been saved to your campus dashboard.",
    },
    {
      id: 3,
      title: "De-Stigmatizing Student Burnout with Dr. Rao",
      type: "webinar",
      badge: "EXPERT WEBINAR",
      badgeColor: "var(--color-blue)",
      time: "Sat, 11:00 AM • Live Interactive Stream",
      desc: "Clinical psychiatrist Dr. Rao answers real student questions on imposter syndrome, insomnia, and peer pressure.",
      actionText: "JOIN WEBINAR",
      actionMsg: "Webinar reminder set. You'll receive an SMS/email reminder 15 minutes prior to broadcast.",
    },
    {
      id: 4,
      title: "Campus Dog Therapy & De-stress Fair",
      type: "social",
      badge: "OUTDOOR SOCIAL",
      badgeColor: "var(--color-pink)",
      time: "Mon, 1:00 PM • South Lawn Commons",
      desc: "Take a break from textbooks with certified therapy dogs and peer mental health advocates.",
      actionText: "VIEW DETAILS",
      actionMsg: "Marked on your schedule! Bring your student ID for fast-track entry.",
    },
  ];

  const filteredEvents =
    selectedFilter === "all"
      ? events
      : events.filter((e) => e.type === selectedFilter);

  return (
    <>
<div className={styles.page}>
        {/* Hero Banner */}
        <header className={styles.heroSection}>
          <div className={styles.heroTopTag}>
            <span className={styles.liveDot}></span>
            <span>OFFICIAL CAMPUS NETWORK INTEGRATION</span>
          </div>
          <h1 className={styles.heroTitle}>
            CAMPUS <span className={styles.highlightPill}>WELLNESS</span> HUB
          </h1>
          <p className={styles.heroSubtitle}>
            Direct, confidential mental wellness infrastructure built specifically
            for students, peer advocates, and academic resilience.
          </p>

          <div className={styles.heroStatsRow}>
            <div className={styles.statBox}>
              <span className={styles.statVal}>PRIVATE</span>
              <span className={styles.statLbl}>BY DESIGN</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statVal}>CAMPUS</span>
              <span className={styles.statLbl}>DIRECTORY</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statVal}>FREE</span>
              <span className={styles.statLbl}>FOR ALL STUDENTS</span>
            </div>
          </div>
        </header>

        {/* Student Portal Showcase */}
        <section className={styles.portalSection}>
          <div className={styles.portalGrid}>
            <div className={styles.portalLeft}>
              <span className={styles.sectionBadge}>STUDENT ACCESS PORTAL</span>
              <h2 className={styles.portalHeading}>
                Connect Your Academic Life With Mental Equilibrium.
              </h2>
              <p className={styles.portalDesc}>
                Whether you need campus counseling referrals, structured
                student peer circles, or daily micro-grounding tools, EIRA links
                directly with your campus ecosystem.
              </p>

              <div className={styles.featurePills}>
                <div className={styles.featPill}>
                  <span className={styles.pillIcon}>🎓</span>
                  <span>Campus-specific clinic referrals</span>
                </div>
                <div className={styles.featPill}>
                  <span className={styles.pillIcon}>👥</span>
                  <span>Student peer support networks</span>
                </div>
                <div className={styles.featPill}>
                  <span className={styles.pillIcon}>🧘</span>
                  <span>Exam-week guided grounding & body scans</span>
                </div>
              </div>

              <div className={styles.portalBtns}>
                <Link href="/components/Login" className={styles.loginBtn}>
                  STUDENT LOGIN →
                </Link>
                <Link href="/components/Signup" className={styles.createBtn}>
                  CREATE FREE ACCOUNT
                </Link>
              </div>
            </div>

            <div className={styles.portalRight}>
              <div className={styles.mockTerminal}>
                <div className={styles.terminalHeader}>
                  <div className={styles.terminalDots}>
                    <span className={styles.dotRed}></span>
                    <span className={styles.dotYellow}></span>
                    <span className={styles.dotGreen}></span>
                  </div>
                  <span className={styles.terminalTitle}>eira-campus://portal-v2</span>
                </div>
                <div className={styles.terminalBody}>
                  <div className={styles.terminalLine}>
                    <span className={styles.termPrefix}>STATUS:</span>
                    <span className={styles.termOk}>CONNECTED TO CAMPUS NETWORK</span>
                  </div>
                  <div className={styles.terminalLine}>
                    <span className={styles.termPrefix}>STUDENT ID:</span>
                    <span>ANONYMIZED_AES256</span>
                  </div>
                  <div className={styles.terminalLine}>
                    <span className={styles.termPrefix}>ACTIVE SESSIONS:</span>
                    <span>3 PEER CIRCLES LIVE NOW</span>
                  </div>
                  <div className={styles.terminalLine}>
                    <span className={styles.termPrefix}>CLINIC WAIT:</span>
                    <span>&lt; 5 MIN TELE-TRIAGE</span>
                  </div>
                  <div className={styles.terminalBox}>
                    <span className={styles.boxTag}>QUICK WELLNESS TIP</span>
                    <p>
                      Taking 3 conscious diaphragmatic breaths before entering an exam
                      lowers salivary cortisol by up to 23%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events & Workshops */}
        <section className={styles.eventsSection}>
          <div className={styles.sectionHeaderRow}>
            <div>
              <span className={styles.sectionBadge}>CALENDAR & WORKSHOPS</span>
              <h2 className={styles.sectionTitle}>CAMPUS WELLNESS EVENTS</h2>
            </div>
            <div className={styles.filterGroup}>
              <button
                className={`${styles.filterBtn} ${selectedFilter === "all" ? styles.activeFilter : ""}`}
                onClick={() => setSelectedFilter("all")}
              >
                ALL
              </button>
              <button
                className={`${styles.filterBtn} ${selectedFilter === "workshop" ? styles.activeFilter : ""}`}
                onClick={() => setSelectedFilter("workshop")}
              >
                WORKSHOPS
              </button>
              <button
                className={`${styles.filterBtn} ${selectedFilter === "webinar" ? styles.activeFilter : ""}`}
                onClick={() => setSelectedFilter("webinar")}
              >
                WEBINARS
              </button>
              <button
                className={`${styles.filterBtn} ${selectedFilter === "social" ? styles.activeFilter : ""}`}
                onClick={() => setSelectedFilter("social")}
              >
                COMMUNITY
              </button>
            </div>
          </div>

          <div className={styles.eventsGrid}>
            {filteredEvents.map((ev) => (
              <div key={ev.id} className={styles.eventCard}>
                <div className={styles.eventCardTop}>
                  <span
                    className={styles.eventBadge}
                    style={{ backgroundColor: ev.badgeColor }}
                  >
                    {ev.badge}
                  </span>
                  <span className={styles.eventTime}>{ev.time}</span>
                </div>
                <h3 className={styles.eventHeading}>{ev.title}</h3>
                <p className={styles.eventDescription}>{ev.desc}</p>
                <button
                  className={styles.eventActionBtn}
                  onClick={() => show(ev.actionMsg)}
                >
                  {ev.actionText} →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Why Campus Integration / Student Pillars */}
        <section className={styles.whySection}>
          <span className={styles.sectionBadge}>WHY CAMPUS INTEGRATION?</span>
          <h2 className={styles.sectionTitle}>STUDENT-FIRST CAMPUS WELLNESS</h2>
          <p className={styles.sectionSubtitle}>
            Traditional university services often feel bureaucratic and intimidating.
            EIRA closes the gap with student-first friction-free support.
          </p>

          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <div className={`${styles.pillarIcon} ${styles.iconYellow}`}>👥</div>
              <h4 className={styles.pillarTitle}>PEER SUPPORT CIRCLES</h4>
              <p className={styles.pillarDesc}>
                Connect with classmates navigating the exact same academic pressures,
                curated by trained student facilitators.
              </p>
              <Link href="/components/PeerGroup" className={styles.pillarLink}>
                EXPLORE GROUPS →
              </Link>
            </div>

            <div className={styles.pillarCard}>
              <div className={`${styles.pillarIcon} ${styles.iconBlue}`}>🛡️</div>
              <h4 className={styles.pillarTitle}>TAILORED RESOURCES</h4>
              <p className={styles.pillarDesc}>
                Access university-specific emergency phone extensions, confidential
                leave guides, and disability accommodations.
              </p>
              <button
                className={styles.pillarBtn}
                onClick={() => show("Personalized campus resources unlocked for your profile.")}
              >
                VIEW RESOURCES →
              </button>
            </div>

            <div className={styles.pillarCard}>
              <div className={`${styles.pillarIcon} ${styles.iconGreen}`}>🎓</div>
              <h4 className={styles.pillarTitle}>ACADEMIC SCREENING</h4>
              <p className={styles.pillarDesc}>
                Clinically validated PHQ-9 & GAD-7 screening quizzes with clear,
                zero-judgement personalized guidance.
              </p>
              <Link href="/components/Quiz" className={styles.pillarLink}>
                TAKE ASSESSMENT →
              </Link>
            </div>
          </div>
        </section>

        {/* Floating Toast Notification */}
        {msg && (
          <div className={styles.toast}>
            <span className={styles.toastIcon}>⚡</span>
            <span>{msg}</span>
            <button className={styles.toastClose} onClick={() => setMsg("")}>
              ✕
            </button>
          </div>
        )}
      </div>
    </>
  );
}
