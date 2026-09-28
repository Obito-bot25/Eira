import styles from "./service.module.css";
import Link from "next/link";

export default function ServicesPage() {
  const currentServices = [
    {
      title: "AI Companion",
      desc: "Conversational AI support and guided somatic grounding exercises.",
      link: "/components/AiChatbot",
      accent: "var(--accent-lime, #D4FF00)",
      tag: "CORE AI",
    },
    {
      title: "Student Peer Groups",
      desc: "Student peer communities sharing academic and personal coping experiences.",
      link: "/components/PeerGroup",
      accent: "var(--color-blue, #BAE6FD)",
      tag: "COMMUNITY",
    },
    {
      title: "Guided Wellness & Somatics",
      desc: "Box breathing, Pomodoro focus sprints, 5-4-3-2-1 grounding, and cognitive puzzles.",
      link: "/wellness",
      accent: "var(--accent-lime, #D4FF00)",
      tag: "INTERACTIVE",
    },
    {
      title: "Self-Assessment Screeners",
      desc: "PHQ-9 self-screening, daily mood pulses, and holistic resilience reflection.",
      link: "/components/Quiz",
      accent: "var(--color-pink, #FECDD3)",
      tag: "SELF-SCREENING",
    },
    {
      title: "Crisis Support Directory",
      desc: "Official national crisis hotlines (112, 14416) and campus support resources.",
      link: "/components/Support",
      accent: "var(--accent-orange, #FF5500)",
      tag: "CRISIS RESOURCES",
    },
    {
      title: "Specialist Consultations",
      desc: "Explore 1-on-1 consultation scheduling with student wellness specialists.",
      link: "/components/doctorProfile",
      accent: "var(--accent-purple, #7047EB)",
      tag: "SPECIALISTS",
    },
  ];

  const futureServices = [
    {
      title: "Audio Relaxation Tracks",
      desc: "Ambient soundscapes and guided audio sessions for study focus and stress relief.",
      tag: "ROADMAP",
    },
    {
      title: "Campus Clinic Integrations",
      desc: "Direct appointment scheduling with university health center counseling units.",
      tag: "CAMPUS INTEGRATION",
    },
    {
      title: "Study Habit Analytics",
      desc: "Insights connecting Pomodoro focus intervals with personal mood entries.",
      tag: "RESEARCH",
    },
    {
      title: "Academic Accommodation Guides",
      desc: "Clear guides on university medical leave policies and exam deferral requests.",
      tag: "STUDENT RIGHTS",
    },
  ];

  return (
    <>
      <div className={styles.page}>
        <section className={styles.servicesSection}>
          <header className={styles.header}>
            <div className={styles.topBadge}>
              <span className={styles.liveDot}></span>
              <span>STUDENT WELLNESS TOOLS</span>
            </div>
            <h1 className={styles.title}>
              EIRA <span className={styles.highlightPill}>SERVICES</span> DIRECTORY
            </h1>
            <p className={styles.subtitle}>
              Guided mental wellness tools built specifically for university life, exam
              cycles, and emotional equilibrium.
            </p>
          </header>

          {/* Core Services Grid */}
          <div className={styles.sectionHeaderRow}>
            <span className={styles.secBadge}>LIVE CAPABILITIES</span>
            <h2 className={styles.gridHeading}>ACTIVE PLATFORM MODULES</h2>
          </div>

          <div className={styles.cardGrid}>
            {currentServices.map((service, index) => (
              <div
                key={index}
                className={styles.card}
                style={{ backgroundColor: service.accent }}
              >
                <div className={styles.cardTop}>
                  <span className={styles.cardTag}>{service.tag}</span>
                  <span className={styles.cardIcon}>✦</span>
                </div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.desc}</p>
                <Link href={service.link} className={styles.launchBtn}>
                  LAUNCH SERVICE →
                </Link>
              </div>
            ))}
          </div>

          {/* How It Works Section */}
          <div className={styles.howItWorks}>
            <span className={styles.secBadge}>STUDENT WORKFLOW</span>
            <h2 className={styles.howHeading}>HOW EIRA SUPPORTS YOUR JOURNEY</h2>
            <p className={styles.howSubtitle}>
              Three simple steps to build daily emotional awareness.
            </p>

            <div className={styles.stepsGrid}>
              <div className={styles.stepCard}>
                <div className={styles.stepNum}>01</div>
                <h4>DAILY EMOTIONAL PULSE</h4>
                <p>
                  Check in with your baseline mood and journal your unfiltered thoughts into your
                  private account.
                </p>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepNum}>02</div>
                <h4>GUIDED SOMATIC COPING</h4>
                <p>
                  Practice targeted breathing exercises, grounding routines, or conversational AI
                  decompression sessions.
                </p>
              </div>
              <div className={styles.stepCard}>
                <div className={styles.stepNum}>03</div>
                <h4>CAMPUS & CRISIS SUPPORT</h4>
                <p>
                  When self-guided tools aren&apos;t enough, access student peer circles, campus
                  counseling, or official national crisis helplines.
                </p>
              </div>
            </div>
          </div>

          {/* Future Innovation Roadmap */}
          <div className={styles.futureSection}>
            <div className={styles.sectionHeaderRow}>
              <span className={styles.secBadge}>FUTURE CONCEPTS</span>
              <h2 className={styles.gridHeading}>RESEARCH & PRODUCT ROADMAP</h2>
            </div>
            <div className={styles.cardGrid}>
              {futureServices.map((goal, index) => (
                <div key={index} className={styles.futureCard}>
                  <div className={styles.cardTop}>
                    <span className={styles.futureTag}>{goal.tag}</span>
                    <span className={styles.cardIcon}>⚡</span>
                  </div>
                  <h3 className={styles.cardTitle}>{goal.title}</h3>
                  <p className={styles.cardDesc}>{goal.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call To Action */}
          <div className={styles.ctaBanner}>
            <div className={styles.ctaLeft}>
              <span className={styles.secBadge}>SPECIALIST SESSIONS</span>
              <h2>EXPLORE SPECIALIST CONSULTATIONS</h2>
              <p>
                View our directory of student wellness clinicians for 1-on-1 consultations.
              </p>
            </div>
            <Link href="/components/doctorProfile" className={styles.ctaActionBtn}>
              VIEW SPECIALISTS →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
