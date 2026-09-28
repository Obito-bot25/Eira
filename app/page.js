import styles from "./page.module.css";
import Link from "next/link";
import MoodDashboard from "./components/MoodDashboard/MoodDashboard";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* 1. Hero Section (Server Rendered Static Editorial with Geometric Visual) */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadgeRow}>
            <span className={styles.liveDot}></span>
            <span className={styles.heroTag}>STUDENT MENTAL WELLNESS PLATFORM</span>
          </div>

          <h1 className={styles.heroTitle}>
            CHECK IN.<br />
            REFLECT.<br />
            MOVE <span className={styles.purpleAccent}>FORWARD.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            A confidential, student-first digital space for daily emotional check-ins,
            private reflection logs, guided wellness tools, and campus support resources.
          </p>

          <div className={styles.heroActionRow}>
            <Link href="/components/AiChatbot" prefetch={true} className={styles.primaryCta}>
              TALK TO EIRA AI →
            </Link>
            <Link href="/components/Journal" prefetch={true} className={styles.secondaryCta}>
              OPEN PRIVATE JOURNAL
            </Link>
          </div>

          <div className={styles.guaranteeRow}>
            <span className={styles.guaranteeItem}>✓ PRIVATE BY DESIGN</span>
            <span className={styles.guaranteeItem}>✓ NON-DIAGNOSTIC</span>
            <span className={styles.guaranteeItem}>✓ ZERO AD TRACKING</span>
          </div>
        </div>

        {/* Geometric Bauhaus Visual Card */}
        <div className={styles.heroVisualWrap}>
          <div className={styles.geometricCard}>
            <div className={styles.geoCardTop}>
              <span className={styles.geoVersionBadge}>EIRA CORE // V2.0</span>
              <span className={styles.geoArrowBadge}>↗</span>
            </div>

            <div className={styles.bauhausGraphic}>
              <div className={styles.purpleArch}></div>
              <div className={styles.orangeBlock}></div>
              <div className={styles.limeBlock}>
                <div className={styles.dotMatrix}>
                  {[...Array(24)].map((_, i) => (
                    <span key={i} className={styles.dot}></span>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.geoCardBottom}>
              <div className={styles.geoStatusLine}>
                <span className={styles.statusPill}>ACTIVE</span>
                <span>CONFIDENTIAL STUDENT WELLNESS HUB</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The 4 Functional Pillars (Server Rendered Static) */}
      <section className={styles.pillarsSection}>
        <div className={styles.sectionHeaderRow}>
          <span className={styles.secMiniTag}>THE 4 PILLARS</span>
          <h2 className={styles.sectionTitle}>HOW EIRA WORKS FOR YOU</h2>
        </div>

        <div className={styles.pillarsGrid}>
          <div className={styles.pillarCard}>
            <div className={styles.pillarTop}>
              <span className={styles.pillarNum}>01</span>
              <span className={styles.arrowIcon}>↗</span>
            </div>
            <h3 className={styles.pillarHeading}>CHECK IN</h3>
            <p className={styles.pillarDesc}>
              Log your daily baseline state in seconds with our 5-point mood telemetry.
              Establish clear emotional self-awareness without clinical judgement.
            </p>
            <Link href="#mood-checkin" className={styles.pillarAction}>
              LOG TODAY&apos;S MOOD →
            </Link>
          </div>

          <div className={styles.pillarCard}>
            <div className={styles.pillarTop}>
              <span className={styles.pillarNum}>02</span>
              <span className={styles.arrowIcon}>↗</span>
            </div>
            <h3 className={styles.pillarHeading}>REFLECT</h3>
            <p className={styles.pillarDesc}>
              Write in a private student journal. Track personal thoughts,
              exam deadlines, and emotional sentiment with custom tags.
            </p>
            <Link href="/components/Journal" prefetch={true} className={styles.pillarAction}>
              OPEN JOURNAL →
            </Link>
          </div>

          <div className={styles.pillarCard}>
            <div className={styles.pillarTop}>
              <span className={styles.pillarNum}>03</span>
              <span className={styles.arrowIcon}>↗</span>
            </div>
            <h3 className={styles.pillarHeading}>UNDERSTAND</h3>
            <p className={styles.pillarDesc}>
              Access guided wellness tools: 4-7-8 box breathing, 5-4-3-2-1 sensory
              grounding, Pomodoro focus study sprints, and self-screening questionnaires.
            </p>
            <Link href="/wellness" prefetch={true} className={styles.pillarAction}>
              EXPLORE WELLNESS LAB →
            </Link>
          </div>

          <div className={styles.pillarCard}>
            <div className={styles.pillarTop}>
              <span className={styles.pillarNum}>04</span>
              <span className={styles.arrowIcon}>↗</span>
            </div>
            <h3 className={styles.pillarHeading}>GET SUPPORT</h3>
            <p className={styles.pillarDesc}>
              Connect with student peer circles, book university counseling sessions,
              or access official national crisis helplines anytime.
            </p>
            <Link href="/components/Support" prefetch={false} className={styles.pillarAction}>
              SUPPORT DIRECTORY →
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Daily Mood Check-In & Real Data Dashboard (Client-Side Interactive Island) */}
      <MoodDashboard />

      {/* 4. AI Companion Spotlight Card (Server Rendered Static) */}
      <section className={styles.aiSpotlightSection}>
        <div className={styles.aiCard}>
          <div className={styles.aiCardLeft}>
            <div className={styles.aiTagRow}>
              <span className={styles.aiMiniTag}>CONVERSATIONAL COPING</span>
              <span className={styles.aiStatusBadge}>● AI COMPANION ACTIVE</span>
            </div>
            <h2 className={styles.aiTitle}>
              EIRA AI // YOUR CONFIDENTIAL SPACE TO TALK.
            </h2>
            <p className={styles.aiDesc}>
              Whether you need to untangle academic stress before a midterm, decompress
              after a grueling week, or navigate anxious thoughts late at night, EIRA is
              ready to listen and provide structured somatic guidance.
            </p>

            <div className={styles.promptChips}>
              <span className={styles.promptChipLabel}>TRY ASKING:</span>
              {[
                "I have acute exam anxiety ↗",
                "I can't focus on studying ↗",
                "I'm overwhelmed with deadlines ↗",
                "Guide me through a breathing session ↗",
              ].map((prompt, i) => (
                <Link
                  key={i}
                  href="/components/AiChatbot"
                  prefetch={false}
                  className={styles.promptChip}
                >
                  {prompt}
                </Link>
              ))}
            </div>

            <div className={styles.aiActionRow}>
              <Link href="/components/AiChatbot" prefetch={true} className={styles.aiPrimaryBtn}>
                TALK TO EIRA AI NOW →
              </Link>
            </div>
          </div>

          <div className={styles.aiCardRight}>
            <div className={styles.mockTerminal}>
              <div className={styles.terminalBar}>
                <div className={styles.terminalDots}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className={styles.terminalName}>eira://terminal/coping-session</span>
              </div>
              <div className={styles.terminalContent}>
                <div className={styles.chatMessageAssistant}>
                  <span className={styles.speakerTag}>EIRA AI:</span>
                  <p>
                    Hello. Take a slow breath. Whatever academic or personal
                    pressure you are carrying, this space is completely yours. What feels
                    heaviest on your mind today?
                  </p>
                </div>
                <div className={styles.chatMessageUser}>
                  <span className={styles.speakerTagUser}>YOU:</span>
                  <p>I have two project deadlines tomorrow and I feel completely paralyzed.</p>
                </div>
                <div className={styles.chatMessageAssistant}>
                  <span className={styles.speakerTag}>EIRA AI:</span>
                  <p>
                    That paralysis is your nervous system entering freeze mode. Let&apos;s
                    down-regulate first: 3 slow box breaths together, then we break down
                    the first 10-minute task.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Somatic & Wellness Tools Quad (Server Rendered Static) */}
      <section className={styles.wellnessQuadSection}>
        <div className={styles.sectionHeaderRow}>
          <span className={styles.secMiniTag}>GUIDED WELLNESS TOOLS</span>
          <h2 className={styles.sectionTitle}>SOMATICS & MINDFULNESS LAB</h2>
        </div>

        <div className={styles.toolsGrid}>
          <div className={styles.toolCard}>
            <div className={styles.toolTop}>
              <span className={styles.toolBadgePurple}>SOMATICS</span>
              <span className={styles.arrowIcon}>↗</span>
            </div>
            <h3 className={styles.toolTitle}>4-7-8 BOX BREATHING</h3>
            <p className={styles.toolDesc}>
              Scientifically proven diaphragmatic breathing to rapidly stimulate the vagus
              nerve and down-regulate sympathetic fight-or-flight spikes.
            </p>
            <Link href="/wellness" prefetch={true} className={styles.toolBtn}>
              LAUNCH BREATHING →
            </Link>
          </div>

          <div className={styles.toolCard}>
            <div className={styles.toolTop}>
              <span className={styles.toolBadgeLime}>STUDY SPRINTS</span>
              <span className={styles.arrowIcon}>↗</span>
            </div>
            <h3 className={styles.toolTitle}>POMODORO FOCUS TIMER</h3>
            <p className={styles.toolDesc}>
              25-minute uninterrupted study sprint paired with mandatory 5-minute somatic
              rest intervals to protect cognitive stamina.
            </p>
            <Link href="/wellness" prefetch={true} className={styles.toolBtn}>
              START FOCUS TIMER →
            </Link>
          </div>

          <div className={styles.toolCard}>
            <div className={styles.toolTop}>
              <span className={styles.toolBadgeOrange}>ACUTE ANXIETY</span>
              <span className={styles.arrowIcon}>↗</span>
            </div>
            <h3 className={styles.toolTitle}>5-4-3-2-1 GROUNDING</h3>
            <p className={styles.toolDesc}>
              Sensory reorientation protocol to pull your awareness out of catastrophic
              future-thinking and back into your immediate physical surroundings.
            </p>
            <Link href="/wellness" prefetch={true} className={styles.toolBtn}>
              PRACTICE GROUNDING →
            </Link>
          </div>

          <div className={styles.toolCard}>
            <div className={styles.toolTop}>
              <span className={styles.toolBadgeBlue}>NEURO-FOCUS</span>
              <span className={styles.arrowIcon}>↗</span>
            </div>
            <h3 className={styles.toolTitle}>COGNITIVE WELLNESS GAMES</h3>
            <p className={styles.toolDesc}>
              Lightweight pattern-matching puzzles (Connect Four, Sudoku, Whack-a-Mole)
              designed to gently interrupt rumination and panic cycles.
            </p>
            <Link href="/wellness" prefetch={true} className={styles.toolBtn}>
              PLAY RELAXATION GAMES →
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Crisis Emergency Helpline Banner (Server Rendered Static) */}
      <section className={styles.emergencySection}>
        <div className={styles.emergencyCard}>
          <div className={styles.emergencyLeft}>
            <span className={styles.emergencyAlertTag}>NATIONAL CRISIS HELPLINES (24/7)</span>
            <h3 className={styles.emergencyHeading}>
              EXPERIENCING AN ACUTE CRISIS OR SEVERE DISTRESS?
            </h3>
            <p className={styles.emergencyDesc}>
              If you or a fellow student are in immediate danger or need urgent crisis
              intervention, confidential professional support is available right now.
            </p>
          </div>
          <div className={styles.emergencyActions}>
            <a href="tel:112" className={styles.emergencyCallBtn}>
              CALL 112 (EMERGENCY) ↗
            </a>
            <a href="tel:14416" className={styles.teleManasBtn}>
              CALL TELE-MANAS (14416) ↗
            </a>
            <Link href="/components/Support" prefetch={false} className={styles.viewDirectoryBtn}>
              FULL DIRECTORY →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}