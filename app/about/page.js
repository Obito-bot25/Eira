import styles from "./about.module.css";
import Link from "next/link";

export default function About() {
  return (
    <>
      <div className={styles.page}>
        <section className={styles.aboutSection}>
          {/* Header */}
          <header className={styles.header}>
            <div className={styles.topBadge}>
              <span className={styles.liveDot}></span>
              <span>MISSION & ORIGIN STORY</span>
            </div>
            <h1 className={styles.title}>
              ABOUT <span className={styles.highlightPill}>EIRA</span>
            </h1>
            <p className={styles.subtitle}>
              Empowering students with accessible, confidential mental wellness tools
              through empathetic design and thoughtful engineering.
            </p>
          </header>

          {/* Mission & Vision */}
          <div className={styles.missionVision}>
            <div className={styles.cardMission}>
              <div className={styles.cardTagRow}>
                <span className={styles.cardBadge}>CORE PURPOSE</span>
                <span className={styles.cardIcon}>🎯</span>
              </div>
              <h3>OUR MISSION</h3>
              <p>
                To provide accessible digital self-care tools that help students reflect
                and seek support when needed:
              </p>
              <ul className={styles.missionList}>
                <li>● Automated conversational AI decompression tools.</li>
                <li>● Moderated student peer support circles.</li>
                <li>● Guided somatic coping exercises for acute exam stress.</li>
                <li>● Clear pathways to campus and national crisis resources.</li>
              </ul>
            </div>

            <div className={styles.cardVision}>
              <div className={styles.cardTagRow}>
                <span className={styles.cardBadge}>LONG-TERM VISION</span>
                <span className={styles.cardIcon}>🔭</span>
              </div>
              <h3>OUR VISION</h3>
              <p>
                A university ecosystem where every student feels seen, heard, and supported. We
                believe mental resilience and daily self-reflection are vital foundations for
                academic life.
              </p>
              <div className={styles.visionStat}>
                <span className={styles.statLarge}>STUDENT</span>
                <span className={styles.statCaption}>
                  centered wellness architecture designed to support academic and personal equilibrium.
                </span>
              </div>
            </div>
          </div>

          {/* Story */}
          <div className={styles.storySection}>
            <span className={styles.secBadge}>ORIGIN STORY</span>
            <h2>BUILT FOR STUDENT WELLNESS</h2>
            <p>
              EIRA was created to address the challenges students face when navigating academic
              pressure, exam deadlines, and daily stress. Finding a quiet, non-judgmental space to
              check in with yourself should be easy and immediate.
            </p>
            <p>
              We built EIRA as a student-first companion. By combining private session storage,
              conversational coping tools, and guided somatic relaxation exercises (like 4-7-8 box
              breathing and sensory grounding), we give students accessible tools for daily reflection.
            </p>
          </div>

          {/* Core Values */}
          <div className={styles.valuesSection}>
            <div className={styles.sectionHeaderRow}>
              <span className={styles.secBadge}>FOUNDATIONAL PILLARS</span>
              <h2 className={styles.valuesHeading}>OUR GUIDING PRINCIPLES</h2>
            </div>

            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <div className={styles.valIcon}>🛡️</div>
                <h4>STRICT PRIVACY</h4>
                <p>
                  Zero ad tracking. Your journal reflections and daily mood logs are kept private
                  to your account.
                </p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valIcon}>🤝</div>
                <h4>INCLUSIVITY & EMPATHY</h4>
                <p>
                  Zero-judgement support crafted for students from all backgrounds navigating
                  academic and personal pressures.
                </p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valIcon}>🔬</div>
                <h4>ETHICAL RESPONSIBILITY</h4>
                <p>
                  Our self-screening questionnaires and guided tools are explicitly non-diagnostic
                  and direct students to professional crisis care when needed.
                </p>
              </div>
            </div>
          </div>

          {/* Project Focus */}
          <div className={styles.teamSection}>
            <div className={styles.sectionHeaderRow}>
              <span className={styles.secBadge}>PROJECT TEAM</span>
              <h2 className={styles.valuesHeading}>DESIGNED FOR STUDENTS</h2>
            </div>
            <p className={styles.teamSubtitle}>
              Built with input from student wellbeing advocates and modern web developers.
            </p>

            <div className={styles.teamCards}>
              <div className={styles.teamCard}>
                <div className={styles.teamIcon}>🧠</div>
                <h4>MENTAL WELLNESS PRINCIPLES</h4>
                <p>Guided grounding exercises, crisis referral workflows, and non-diagnostic screening.</p>
              </div>
              <div className={styles.teamCard}>
                <div className={styles.teamIcon}>💻</div>
                <h4>ENGINEERING & PRIVACY</h4>
                <p>
                  Fast responsive interfaces, reliable session state, and zero third-party analytics.
                </p>
              </div>
              <div className={styles.teamCard}>
                <div className={styles.teamIcon}>🎓</div>
                <h4>STUDENT PERSPECTIVE</h4>
                <p>
                  Ensuring tone, terminology, and tools reflect genuine student academic needs.
                </p>
              </div>
            </div>
          </div>

          {/* Quick CTA */}
          <div className={styles.aboutCta}>
            <h3>Ready to explore your personal wellness space?</h3>
            <div className={styles.ctaBtns}>
              <Link href="/components/AiChatbot" className={styles.primaryCta}>
                TALK WITH EIRA AI →
              </Link>
              <Link href="/wellness" className={styles.secondaryCta}>
                EXPLORE WELLNESS LAB
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
