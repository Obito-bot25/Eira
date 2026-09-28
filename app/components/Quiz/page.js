'use client';
import React, { useState } from 'react';
import styles from './Quiz.module.css';
import { FaPlay } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

const quizzes = [
  {
    title: 'Daily Micro-Checkin',
    subtitle: '60-second baseline mood and energy calibration',
    accent: 'var(--accent-lime, #D4FF00)',
    badge: 'DAILY PULSE',
    questions: [
      'How would you describe your baseline energy level today?',
      'Did you achieve restorative, uninterrupted sleep last night?',
      'Have you taken at least 15 minutes today to disconnect and recharge?',
      'How manageable does your academic or daily workload feel right now?',
    ],
  },
  {
    title: 'PHQ-9 Self-Screener',
    subtitle: 'Standard 9-item reflection questionnaire (self-screening only, not a diagnosis)',
    accent: 'var(--color-blue, #BAE6FD)',
    badge: 'SELF-SCREENING QUESTIONNAIRE',
    disclaimer: 'This questionnaire is for personal self-reflection and screening only. It does not constitute a clinical diagnosis or medical evaluation. If you are in distress, professional support may be appropriate.',
    questions: [
      'Over the last 2 weeks: Little interest or pleasure in doing things?',
      'Over the last 2 weeks: Feeling down, depressed, or hopeless?',
      'Over the last 2 weeks: Trouble falling or staying asleep, or sleeping too much?',
      'Over the last 2 weeks: Feeling tired or having little energy?',
      'Over the last 2 weeks: Poor appetite or overeating?',
      'Over the last 2 weeks: Feeling bad about yourself — or that you are a failure or have let yourself down?',
      'Over the last 2 weeks: Trouble concentrating on things, such as coursework or reading?',
      'Over the last 2 weeks: Moving or speaking so slowly, or being noticeably fidgety and restless?',
      'Over the last 2 weeks: Thoughts that you would be better off dead, or of hurting yourself in some way?',
    ],
  },
  {
    title: 'Holistic Well-Being Index',
    subtitle: 'Personal emotional balance and academic routine reflection',
    accent: 'var(--accent-purple, #7047EB)',
    badge: 'WELLNESS REFLECTION',
    questions: [
      'How satisfied and grounded do you feel with your daily personal routine?',
      'How supported and connected do you feel by friends, family, or campus peers?',
      'How frequently during the week do you experience moments of calm?',
      'Do you feel equipped with effective coping habits when academic stress arrives?',
    ],
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [active, setActive] = useState(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);

  const start = (q) => {
    setActive(q);
    setIndex(0);
    setAnswers([]);
    setDone(false);
  };

  const answer = (value) => {
    const next = [...answers, value];
    if (index + 1 < active.questions.length) {
      setAnswers(next);
      setIndex(index + 1);
    } else {
      setAnswers(next);
      setDone(true);
    }
  };

  return (
    <>
<div className={styles.container}>
        <div className={styles.mainCard}>
          <div className={styles.topBar}>
            <button
              className={styles.backBtn}
              onClick={() => router.push('/services')}
            >
              <IoArrowBack size={18} /> BACK TO SERVICES
            </button>
            <span className={styles.topBadge}>SELF-SCREENING REFLECTIONS</span>
          </div>

          <h1 className={styles.pageTitle}>
            SELF-ASSESSMENT <span className={styles.highlightPill}>LAB</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Self-screening tools designed to help you track emotional patterns and reflect on your
            wellbeing. These tools are strictly non-diagnostic.
          </p>

          <div className={styles.quizList}>
            {quizzes.map((quiz, i) => (
              <div
                key={i}
                className={styles.quizCard}
                style={{ backgroundColor: quiz.accent }}
              >
                <div className={styles.quizText}>
                  <span className={styles.quizBadge}>{quiz.badge}</span>
                  <h2>{quiz.title}</h2>
                  <p>{quiz.subtitle}</p>
                </div>
                <button
                  className={styles.quizButton}
                  onClick={() => start(quiz)}
                >
                  <FaPlay className={styles.playIcon} /> START REFLECTION →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Informational Cards */}
        <div className={styles.aboutSection}>
          <span className={styles.infoBadge}>TRANSPARENCY NOTE</span>
          <h3 className={styles.aboutHeading}>ABOUT THESE ASSESSMENTS</h3>
          <div className={styles.aboutCards}>
            <div className={styles.aboutCard}>
              <h4>DAILY MICRO-CHECKIN</h4>
              <p>
                A 60-second baseline pulse that syncs with your weekly mood log to help you monitor
                daily fluctuations in energy and stress.
              </p>
            </div>
            <div className={styles.aboutCard}>
              <h4>PHQ-9 SELF-SCREENER</h4>
              <p>
                A standard 9-item public self-screening questionnaire. Responses are for self-reflection
                only and do not constitute a medical diagnosis.
              </p>
            </div>
            <div className={styles.aboutCard}>
              <h4>WELL-BEING ASSESSMENT</h4>
              <p>
                A guided self-reflection measuring social support, academic routines, and personal
                grounding habits.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Modal */}
      {active && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalTop}>
              <span className={styles.modalBadge}>{active.badge}</span>
              <button
                className={styles.modalCloseBtn}
                onClick={() => setActive(null)}
              >
                ✕
              </button>
            </div>

            {!done ? (
              <>
                <div className={styles.modalHeader}>
                  <span className={styles.stepCounter}>
                    QUESTION {index + 1} OF {active.questions.length}
                  </span>
                  <h2 className={styles.modalQuestion}>
                    {active.questions[index]}
                  </h2>
                  {active.disclaimer && (
                    <p style={{ fontSize: '0.78rem', color: '#666', marginTop: '6px' }}>
                      Notice: Self-screening only — not a clinical diagnosis.
                    </p>
                  )}
                </div>

                <div className={styles.optionGrid}>
                  {['Not at all', 'Several days', 'More than half the days', 'Nearly every day'].map(
                    (opt) => (
                      <button
                        key={opt}
                        onClick={() => answer(opt)}
                        className={styles.optionBtn}
                      >
                        <span>{opt}</span>
                        <span className={styles.optArrow}>→</span>
                      </button>
                    )
                  )}
                </div>

                <div className={styles.modalFooter}>
                  <div className={styles.progressTrack}>
                    <div
                      className={styles.progressBar}
                      style={{
                        width: `${((index + 1) / active.questions.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.completeView}>
                <div className={styles.completeIcon}>✓</div>
                <h2>REFLECTION COMPLETE</h2>
                <p>
                  Your responses were recorded for this session. Please note that this self-screening
                  is not a clinical diagnosis. If you are experiencing persistent distress or difficulty
                  coping with academic life, speaking with a qualified healthcare professional or campus
                  counselor is recommended.
                </p>
                <div className={styles.completeActions}>
                  <button
                    className={styles.doneBtn}
                    onClick={() => setActive(null)}
                  >
                    RETURN TO ASSESSMENTS ✓
                  </button>
                  <button
                    className={styles.supportBtn}
                    onClick={() => {
                      setActive(null);
                      router.push('/components/Support');
                    }}
                  >
                    VIEW SUPPORT DIRECTORY →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
