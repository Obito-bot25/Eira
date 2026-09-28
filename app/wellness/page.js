'use client';

import { useEffect, useState } from 'react';
import styles from './wellness.module.css';
import { 
  FiActivity, 
  FiClock, 
  FiAward, 
  FiPlay, 
  FiCheckCircle, 
  FiHeart, 
  FiSun, 
  FiTarget, 
  FiCompass, 
  FiPause, 
  FiRotateCcw,
  FiX
} from 'react-icons/fi';

const games = [
  { title: 'Connect Four', desc: 'Strategic problem-solving to divert intrusive thoughts.', time: '15 min', best: 9, streak: 6, tag: 'COGNITIVE' },
  { title: 'Crosswords', desc: 'Classic brain word search for focus and vocabulary.', time: '5 min', best: 6, streak: 3, tag: 'BRAIN TRAIN' },
  { title: 'Whack a Mole', desc: 'Fast reflex training to release physical tension.', time: '30 sec', best: 8, streak: 5, tag: 'REFLEX' },
  { title: 'Pictionary', desc: 'Creative visualization and mindfulness word guessing.', time: '6 min', best: 7, streak: 5, tag: 'CREATIVE' },
  { title: 'Sudoku', desc: 'Mini 3×3 logic puzzle to boost working memory.', time: '8 min', best: 8, streak: 5, tag: 'LOGIC' },
];

const sudokuSolution = [1, 2, 3, 3, 1, 2, 2, 3, 1];
const crossword = { clue: 'A feeling of calm, peace and mental tranquility (8 letters)', answer: 'SERENITY' };

export default function WellnessPage() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [activeTool, setActiveTool] = useState(null); // 'BREATHING' | 'FOCUS' | 'GROUNDING' | 'MINDFULNESS'
  const [points, setPoints] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [moodCount, setMoodCount] = useState(0);

  useEffect(() => {
    // Load real user activity completions and mood records
    fetch('/api/activity', { credentials: 'include', cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : { activities: [] }))
      .then((d) => {
        const count = Array.isArray(d.activities) ? d.activities.length : 0;
        setCompleted(count);
        setPoints(count * 15);
      })
      .catch(() => {});

    fetch('/api/moods', { credentials: 'include', cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : { moods: [] }))
      .then((d) => {
        const count = Array.isArray(d.moods) ? d.moods.length : 0;
        setMoodCount(count);
      })
      .catch(() => {});
  }, []);

  const finishActivity = async (type = 'wellness', earned = 15) => {
    setPoints((p) => p + earned);
    setCompleted((c) => c + 1);

    try {
      await fetch('/api/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ type }),
      });
    } catch {
      // Activity state preserved locally
    }
  };

  return (
    <>
      <main className={styles.container}>
        {/* Header Banner */}
        <section className={styles.headerCard}>
          <div className={styles.headerLeft}>
            <div className={styles.tagGroup}>
              <span className={styles.badgePrimary}>WELLNESS LAB</span>
              <span className={styles.badgeSecondary}>GUIDED WELLNESS</span>
              <span className={styles.badgeGreen}>STRESS REDUCTION</span>
            </div>
            <h1 className={styles.title}>
              WELLNESS & <span>MINDFULNESS</span>
            </h1>
            <p className={styles.subtitle}>
              Practical tools to help manage student burnout, practice breathing, and recharge your focus.
            </p>
          </div>

          <div className={styles.streakBanner}>
            <div className={styles.streakText}>
              <strong>⚡ DAILY WELLNESS HABITS</strong>
              <span>Practice grounding, breathing, or study sprints to recharge cognitive energy.</span>
            </div>
          </div>
        </section>

        {/* Real Stats Row */}
        <section className={styles.statsRow}>
          <div className={styles.statBox}>
            <span className={styles.statIcon}>🎯</span>
            <div className={styles.statContent}>
              <h3>{completed}</h3>
              <p>Activities Finished</p>
            </div>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statIcon}>🏅</span>
            <div className={styles.statContent}>
              <h3>{points}</h3>
              <p>Wellness Points</p>
            </div>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statIcon}>📊</span>
            <div className={styles.statContent}>
              <h3>{moodCount}</h3>
              <p>Check-ins Logged</p>
            </div>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statIcon}>🧠</span>
            <div className={styles.statContent}>
              <h3>9 Tools</h3>
              <p>Interactive Modules</p>
            </div>
          </div>
        </section>

        {/* SECTION 1: CORE 4 MINDFULNESS ACTIVITIES */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.miniLabel}>CORE WELLNESS TOOLS</span>
              <h2 className={styles.sectionHeading}>INTERACTIVE MINDFULNESS TOOLS</h2>
            </div>
            <span className={styles.sectionMeta}>STUDENT REGULATION</span>
          </div>

          <div className={styles.coreToolsGrid}>
            {/* 1. BREATHING CARD */}
            <article className={`${styles.coreCard} ${styles.cardBreathing}`}>
              <div className={styles.coreCardHeader}>
                <span className={styles.coreCardTag}>NERVOUS SYSTEM</span>
                <span className={styles.coreIcon}>🫁</span>
              </div>
              <h3 className={styles.coreCardTitle}>BREATHING</h3>
              <p className={styles.coreCardDesc}>
                4-7-8 Box Breathing to instantly lower heart rate, downregulate sympathetic fight-or-flight, and restore mental composure.
              </p>
              <div className={styles.visualIndicatorBox}>
                <div className={styles.breathingCircleAnimation} />
                <span className={styles.visualIndicatorLabel}>4s Inhale • 7s Hold • 8s Exhale</span>
              </div>
              <button 
                type="button" 
                className={styles.coreCtaBtn}
                onClick={() => setActiveTool('BREATHING')}
              >
                <span>START BREATHING RESET</span>
                <FiPlay size={16} />
              </button>
            </article>

            {/* 2. FOCUS CARD */}
            <article className={`${styles.coreCard} ${styles.cardFocus}`}>
              <div className={styles.coreCardHeader}>
                <span className={styles.coreCardTag}>STUDY FLOW</span>
                <span className={styles.coreIcon}>⏳</span>
              </div>
              <h3 className={styles.coreCardTitle}>FOCUS</h3>
              <p className={styles.coreCardDesc}>
                25-minute Pomodoro study sprint with structured 5-minute cognitive breaks to conquer procrastination and academic fatigue.
              </p>
              <div className={styles.visualIndicatorBox}>
                <span className={styles.timerDigital}>25:00</span>
                <span className={styles.visualIndicatorLabel}>Deep Work Interval Ready</span>
              </div>
              <button 
                type="button" 
                className={styles.coreCtaBtn}
                onClick={() => setActiveTool('FOCUS')}
              >
                <span>LAUNCH FOCUS TIMER</span>
                <FiPlay size={16} />
              </button>
            </article>

            {/* 3. GROUNDING CARD */}
            <article className={`${styles.coreCard} ${styles.cardGrounding}`}>
              <div className={styles.coreCardHeader}>
                <span className={styles.coreCardTag}>ANXIETY RELIEF</span>
                <span className={styles.coreIcon}>⚓</span>
              </div>
              <h3 className={styles.coreCardTitle}>GROUNDING</h3>
              <p className={styles.coreCardDesc}>
                5-4-3-2-1 Sensory anchoring exercise. Disconnects racing anxious spirals by reconnecting your attention with tangible reality.
              </p>
              <div className={styles.visualIndicatorBox}>
                <div className={styles.groundingStepsPreview}>
                  <span>👀 5</span>
                  <span>✋ 4</span>
                  <span>👂 3</span>
                  <span>👃 2</span>
                  <span>👅 1</span>
                </div>
                <span className={styles.visualIndicatorLabel}>Multi-Sensory Anchoring</span>
              </div>
              <button 
                type="button" 
                className={styles.coreCtaBtn}
                onClick={() => setActiveTool('GROUNDING')}
              >
                <span>START GROUNDING DRILL</span>
                <FiPlay size={16} />
              </button>
            </article>

            {/* 4. MINDFULNESS CARD */}
            <article className={`${styles.coreCard} ${styles.cardMindfulness}`}>
              <div className={styles.coreCardHeader}>
                <span className={styles.coreCardTag}>BODY SCAN</span>
                <span className={styles.coreIcon}>🧘</span>
              </div>
              <h3 className={styles.coreCardTitle}>MINDFULNESS</h3>
              <p className={styles.coreCardDesc}>
                Guided somatic awareness to systematically scan and release trapped tension in your jaw, shoulders, and chest after studying.
              </p>
              <div className={styles.visualIndicatorBox}>
                <div className={styles.mindfulPulseBar}>
                  <div className={styles.pulseInner} />
                </div>
                <span className={styles.visualIndicatorLabel}>Somatic Relaxation Sequence</span>
              </div>
              <button 
                type="button" 
                className={styles.coreCtaBtn}
                onClick={() => setActiveTool('MINDFULNESS')}
              >
                <span>START BODY SCAN</span>
                <FiPlay size={16} />
              </button>
            </article>
          </div>
        </section>

        {/* SECTION 2: COGNITIVE WELLNESS GAMES (Preserved Functionality) */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.miniLabel}>BRAIN TRAINERS // COGNITIVE AGILITY</span>
              <h2 className={styles.sectionHeading}>GAMIFIED WELLNESS EXERCISES</h2>
            </div>
            <span className={styles.sectionMeta}>PLAY & EARN POINTS</span>
          </div>

          <div className={styles.gamesGrid}>
            {games.map((g) => (
              <div key={g.title} className={styles.gameCard}>
                <div className={styles.gameHeader}>
                  <span className={styles.gameTag}>{g.tag}</span>
                  <span className={styles.playableBadge}>▶ PLAYABLE</span>
                </div>
                <h3 className={styles.gameTitle}>{g.title}</h3>
                <p className={styles.gameDesc}>{g.desc}</p>
                
                <div className={styles.gameStatsRow}>
                  <span>⏱ {g.time}</span>
                  <span>🏆 Best: {g.best}</span>
                  <span>🔥 Streak: {g.streak}d</span>
                </div>

                <button 
                  type="button" 
                  className={styles.playBtn}
                  onClick={() => setSelectedGame(g.title)}
                >
                  START {g.title.toUpperCase()} →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: DAILY CHALLENGE & TIPS */}
        <div className={styles.bottomSplit}>
          <div className={styles.challengeBox}>
            <div className={styles.challengeHeader}>
              <span className={styles.challengeBadge}>TODAY’S OBJECTIVE</span>
              <h3>⚡ DAILY CAMPUS CHALLENGE</h3>
            </div>
            <p>
              Complete a 5-minute gratitude reflection or one cognitive brain trainer. Reflect on 3 small wins from this week.
            </p>
            <button 
              type="button" 
              className={styles.challengeBtn}
              onClick={() => {
                finishActivity('challenge', 25);
                alert("🎉 Challenge Accepted & Completed! +25 Wellness Points recorded!");
              }}
            >
              ACCEPT & LOG CHALLENGE (+25 PTS)
            </button>
          </div>

          <div className={styles.tipsBox}>
            <h3>💡 PRACTICAL WELLNESS TIPS</h3>
            <ul className={styles.tipsList}>
              <li><strong>Micro-Breaks:</strong> Even 90 seconds away from screens resets ocular strain and cognitive fatigue.</li>
              <li><strong>Hydration Check:</strong> 2% dehydration impairs focus, working memory, and mood regulation.</li>
              <li><strong>Celebrate Small Steps:</strong> Showing up for your mental wellness today is a victory.</li>
            </ul>
          </div>
        </div>
      </main>

      {/* CORE TOOL MODALS (Breathing, Focus, Grounding, Mindfulness) */}
      {activeTool && (
        <CoreToolModal
          tool={activeTool}
          onClose={() => setActiveTool(null)}
          onFinish={() => {
            finishActivity(activeTool.toLowerCase(), 20);
            setActiveTool(null);
          }}
        />
      )}

      {/* GAME MODAL (Whack-a-Mole, Connect Four, Crossword, Sudoku, Pictionary) */}
      {selectedGame && (
        <GameModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          onFinish={(pts) => finishActivity(selectedGame.toLowerCase(), pts || 15)}
        />
      )}
    </>
  );
}

/* =========================================================================
   CORE TOOL MODAL (Breathing, Focus, Grounding, Mindfulness)
   ========================================================================= */
function CoreToolModal({ tool, onClose, onFinish }) {
  // Breathing Tool State
  const [breathPhase, setBreathPhase] = useState('Inhale'); // Inhale -> Hold -> Exhale -> Hold
  const [breathSeconds, setBreathSeconds] = useState(4);
  const [breathCycles, setBreathCycles] = useState(0);

  // Focus Timer State
  const [focusSecondsLeft, setFocusSecondsLeft] = useState(25 * 60);
  const [focusRunning, setFocusRunning] = useState(false);

  // Grounding State
  const [groundingStep, setGroundingStep] = useState(0);
  const groundingSteps = [
    { count: 5, label: "Things you can SEE around you", example: "A lamp, your notebook, a tree outside, your pen, a coffee cup" },
    { count: 4, label: "Things you can physically TOUCH / FEEL", example: "The desk surface, your sweater fabric, feet on the floor, phone screen" },
    { count: 3, label: "Things you can HEAR right now", example: "Fan hum, distant footsteps, birds chirping, keyboard tapping" },
    { count: 2, label: "Things you can SMELL", example: "Fresh coffee, fresh air, paper notebook, subtle perfume" },
    { count: 1, label: "Thing you can TASTE", example: "Sip of water, mint, or simple freshness of breath" },
  ];

  // Mindfulness State
  const [mindfulStep, setMindfulStep] = useState(0);
  const mindfulSteps = [
    { title: "Shoulders & Neck", desc: "Drop your shoulders away from your ears. Inhale deep, exhale and release stored tension." },
    { title: "Jaw & Face", desc: "Unclench your jaw. Soften your brow and tongue. Allow your face muscles to relax completely." },
    { title: "Chest & Belly", desc: "Place a gentle palm on your stomach. Feel it expand on the inhale and soften on the exhale." },
    { title: "Gratitude & Reset", desc: "Acknowledge yourself for taking this intentional pause. You are safe and doing well." }
  ];

  // Breathing interval timer
  useEffect(() => {
    if (tool !== 'BREATHING') return;
    const interval = setInterval(() => {
      setBreathSeconds((sec) => {
        if (sec > 1) return sec - 1;
        // Switch phase
        if (breathPhase === 'Inhale') {
          setBreathPhase('Hold');
          return 7;
        } else if (breathPhase === 'Hold') {
          setBreathPhase('Exhale');
          return 8;
        } else {
          setBreathPhase('Inhale');
          setBreathCycles((c) => c + 1);
          return 4;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [tool, breathPhase]);

  // Focus interval timer
  useEffect(() => {
    if (tool !== 'FOCUS' || !focusRunning) return;
    const interval = setInterval(() => {
      setFocusSecondsLeft((sec) => {
        if (sec <= 1) {
          setFocusRunning(false);
          return 0;
        }
        return sec - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [tool, focusRunning]);

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.toolModalBox} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <span className={styles.toolMiniBadge}>INTERACTIVE EXERCISE</span>
            <h2 className={styles.modalHeading}>{tool} SESSION</h2>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <FiX size={22} />
          </button>
        </div>

        {/* 1. BREATHING TOOL CONTENT */}
        {tool === 'BREATHING' && (
          <div className={styles.interactiveArea}>
            <p className={styles.modalInstruction}>
              Follow the rhythmic guide below. Breathe in through your nose, hold calmly, and exhale slowly through your mouth.
            </p>
            <div className={styles.breathVisualizer}>
              <div className={`${styles.breathCircle} ${styles['breath' + breathPhase]}`}>
                <span className={styles.phaseTitle}>{breathPhase.toUpperCase()}</span>
                <span className={styles.phaseCount}>{breathSeconds}s</span>
              </div>
            </div>
            <div className={styles.cyclesCounter}>
              Completed Cycles: <strong>{breathCycles}</strong> / 3 recommended
            </div>
            <div className={styles.toolActionRow}>
              <button 
                type="button" 
                className={styles.finishToolBtn}
                onClick={onFinish}
              >
                COMPLETE SESSION (+20 PTS)
              </button>
            </div>
          </div>
        )}

        {/* 2. FOCUS TIMER CONTENT */}
        {tool === 'FOCUS' && (
          <div className={styles.interactiveArea}>
            <p className={styles.modalInstruction}>
              Put your phone away and close unnecessary tabs. Focus on one single task until the bell rings.
            </p>
            <div className={styles.focusTimerDisplay}>
              <h1 className={styles.timerBig}>{formatTimer(focusSecondsLeft)}</h1>
              <span className={styles.focusPhaseText}>
                {focusRunning ? "⚡ DEEP WORK INTERVAL ACTIVE" : "PAUSED — READY TO FOCUS"}
              </span>
            </div>
            <div className={styles.focusControls}>
              <button 
                type="button" 
                className={styles.focusPrimaryBtn}
                onClick={() => setFocusRunning(!focusRunning)}
              >
                {focusRunning ? <><FiPause /> PAUSE</> : <><FiPlay /> START FOCUSING</>}
              </button>
              <button 
                type="button" 
                className={styles.focusResetBtn}
                onClick={() => { setFocusRunning(false); setFocusSecondsLeft(25 * 60); }}
              >
                <FiRotateCcw /> RESET 25M
              </button>
            </div>
            <div className={styles.toolActionRow}>
              <button 
                type="button" 
                className={styles.finishToolBtn}
                onClick={onFinish}
              >
                LOG FOCUS SESSION (+20 PTS)
              </button>
            </div>
          </div>
        )}

        {/* 3. GROUNDING DRILL CONTENT */}
        {tool === 'GROUNDING' && (
          <div className={styles.interactiveArea}>
            <div className={styles.stepProgressRow}>
              {groundingSteps.map((s, idx) => (
                <div 
                  key={idx} 
                  className={`${styles.stepPill} ${idx === groundingStep ? styles.stepPillActive : idx < groundingStep ? styles.stepPillDone : ''}`}
                >
                  Step {idx + 1}
                </div>
              ))}
            </div>

            <div className={styles.groundingStepCard}>
              <div className={styles.stepCountCircle}>{groundingSteps[groundingStep].count}</div>
              <h3>{groundingSteps[groundingStep].label}</h3>
              <p className={styles.groundingExample}>
                Examples: {groundingSteps[groundingStep].example}
              </p>
            </div>

            <div className={styles.toolActionRow}>
              {groundingStep < groundingSteps.length - 1 ? (
                <button 
                  type="button" 
                  className={styles.nextStepBtn}
                  onClick={() => setGroundingStep(groundingStep + 1)}
                >
                  NEXT SENSE ({groundingStep + 2}/5) →
                </button>
              ) : (
                <button 
                  type="button" 
                  className={styles.finishToolBtn}
                  onClick={onFinish}
                >
                  COMPLETE GROUNDING (+20 PTS) ✓
                </button>
              )}
            </div>
          </div>
        )}

        {/* 4. MINDFULNESS BODY SCAN CONTENT */}
        {tool === 'MINDFULNESS' && (
          <div className={styles.interactiveArea}>
            <div className={styles.stepProgressRow}>
              {mindfulSteps.map((s, idx) => (
                <div 
                  key={idx} 
                  className={`${styles.stepPill} ${idx === mindfulStep ? styles.stepPillActive : idx < mindfulStep ? styles.stepPillDone : ''}`}
                >
                  {s.title}
                </div>
              ))}
            </div>

            <div className={styles.mindfulStepCard}>
              <span className={styles.mindfulIcon}>🌿</span>
              <h3>Focus on: {mindfulSteps[mindfulStep].title}</h3>
              <p>{mindfulSteps[mindfulStep].desc}</p>
            </div>

            <div className={styles.toolActionRow}>
              {mindfulStep < mindfulSteps.length - 1 ? (
                <button 
                  type="button" 
                  className={styles.nextStepBtn}
                  onClick={() => setMindfulStep(mindfulStep + 1)}
                >
                  NEXT BODY AREA →
                </button>
              ) : (
                <button 
                  type="button" 
                  className={styles.finishToolBtn}
                  onClick={onFinish}
                >
                  COMPLETE BODY SCAN (+20 PTS) ✓
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   GAMES MODAL (Preserved from original implementation with Neo-Brutalist UI)
   ========================================================================= */
function GameModal({ game, onClose, onFinish }) {
  const [won, setWon] = useState(false);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');

  const [board, setBoard] = useState(Array(42).fill(null));
  const [turn, setTurn] = useState('🔴');
  const [winnerSymbol, setWinnerSymbol] = useState(null);
  const [mole, setMole] = useState(Math.floor(Math.random() * 9));
  const [time, setTime] = useState(15);
  const [sudoku, setSudoku] = useState(Array(9).fill(''));

  useEffect(() => {
    if (game !== 'Whack a Mole' || won) return;
    if (time <= 0) { setWon(true); return; }
    const timer = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [game, time, won]);

  useEffect(() => {
    if (game !== 'Whack a Mole' || won) return;
    const timer = setInterval(() => setMole(Math.floor(Math.random() * 9)), 650);
    return () => clearInterval(timer);
  }, [game, won]);

  useEffect(() => {
    if (won) onFinish(game === 'Whack a Mole' ? Math.max(10, score) : 15);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [won]);

  function hasWinner(state, symbol) {
    const lines = [
      [0,1,2,3],[1,2,3,4],[2,3,4,5],[3,4,5,6],[7,8,9,10],[8,9,10,11],[9,10,11,12],[10,11,12,13],[14,15,16,17],[15,16,17,18],[16,17,18,19],[17,18,19,20],[21,22,23,24],[22,23,24,25],[23,24,25,26],[24,25,26,27],[28,29,30,31],[29,30,31,32],[30,31,32,33],[31,32,33,34],[35,36,37,38],[36,37,38,39],[37,38,39,40],[38,39,40,41],
      [0,7,14,21],[1,8,15,22],[2,9,16,23],[3,10,17,24],[4,11,18,25],[5,12,19,26],[6,13,20,27],[7,14,21,28],[8,15,22,29],[9,16,23,30],[10,17,24,31],[11,18,25,32],[12,19,26,33],[13,20,27,34],[14,21,28,35],[15,22,29,36],[16,23,30,37],[17,24,31,38],[18,25,32,39],[19,26,33,40],[20,27,34,41],
      [0,8,16,24],[1,9,17,25],[2,10,18,26],[3,11,19,27],[4,12,20,28],[5,13,21,29],[6,14,22,30],[7,15,23,31],[12,18,24,30],[13,19,25,31],[14,20,26,32],[15,21,27,33],[16,22,28,34],[17,23,29,35],[18,24,30,36],[19,25,31,37],[20,26,32,38],[21,27,33,39],[22,28,34,40],[23,29,35,41],
    ];
    return lines.some((line) => line.every((i) => state[i] === symbol));
  }

  function drop(col) {
    if (won) return;
    for (let row = 5; row >= 0; row--) {
      const i = row * 7 + col;
      if (!board[i]) {
        const symbol = turn;
        const next = [...board];
        next[i] = symbol;
        setBoard(next);
        if (hasWinner(next, symbol)) setWinnerSymbol(symbol);
        else setTurn(symbol === '🔴' ? '🟡' : '🔴');
        return;
      }
    }
  }

  function renderGame() {
    if (game === 'Whack a Mole') return (
      <div className={styles.gameInner}>
        <div className={styles.gameScoreBar}>
          <span>TIME REMAINING: <strong>{time}s</strong></span>
          <span>SCORE: <strong>{score}</strong></span>
        </div>
        <div className={styles.moleGrid}>
          {Array.from({ length: 9 }, (_, i) => (
            <button 
              key={i} 
              className={styles.moleCell} 
              onClick={() => i === mole && setScore((s) => s + 1)}
            >
              {i === mole ? '🐹' : '🕳️'}
            </button>
          ))}
        </div>
        {time === 0 && <Result score={Math.max(10, score)} />}
      </div>
    );

    if (game === 'Connect Four') return (
      <div className={styles.gameInner}>
        <div className={styles.gameScoreBar}>
          {winnerSymbol ? (
            <span>WINNER: <strong>{winnerSymbol}</strong></span>
          ) : (
            <span>TURN: <strong>{turn}</strong> (Click column to drop)</span>
          )}
        </div>
        <div className={styles.connectGrid}>
          {Array.from({ length: 7 }, (_, col) => (
            <button key={col} onClick={() => drop(col)} className={styles.connectColumn}>
              {Array.from({ length: 6 }, (_, row) => (
                <span key={row} className={styles.connectDisc}>
                  {board[row * 7 + col] || '⚪'}
                </span>
              ))}
            </button>
          ))}
        </div>
        {winnerSymbol && (
          <div className={styles.gameActionRow}>
            <button 
              className={styles.playAgainBtn} 
              onClick={() => { setBoard(Array(42).fill(null)); setTurn('🔴'); setWinnerSymbol(null); }}
            >
              PLAY AGAIN
            </button>
            <Result score={15} />
          </div>
        )}
      </div>
    );

    if (game === 'Crosswords') return (
      <div className={styles.gameInner}>
        <p className={styles.gameClueText}>CLUE: {crossword.clue}</p>
        <input 
          value={answer} 
          onChange={(e) => setAnswer(e.target.value)} 
          placeholder="TYPE YOUR ANSWER (e.g. SERENITY)" 
          className={styles.gameInput} 
        />
        <button 
          className={styles.gameSubmitBtn} 
          onClick={() => setWon(answer.trim().toUpperCase() === crossword.answer)}
        >
          CHECK ANSWER
        </button>
        {won && <Result score={15} />}
      </div>
    );

    if (game === 'Sudoku') return (
      <div className={styles.gameInner}>
        <p className={styles.gameClueText}>Fill the 3×3 mini Sudoku. Each row and column must contain digits 1, 2 and 3.</p>
        <div className={styles.sudokuGrid}>
          {sudoku.map((v, i) => (
            <input 
              key={i} 
              value={v} 
              maxLength={1} 
              onChange={(e) => { 
                const n = [...sudoku]; 
                n[i] = e.target.value.replace(/[^1-3]/g, ''); 
                setSudoku(n); 
              }} 
              className={styles.sudokuCell} 
            />
          ))}
        </div>
        <button 
          className={styles.gameSubmitBtn} 
          onClick={() => setWon(sudoku.every((v) => v) && sudoku.every((v, i) => v === sudokuSolution[i]))}
        >
          CHECK SUDOKU
        </button>
        {won && <Result score={15} />}
      </div>
    );

    return (
      <div className={styles.gameInner}>
        <p className={styles.gameClueText}>Draw a quick picture on paper for a peer, then type this wellness word:</p>
        <h2 className={styles.wordDisplay}>🧘 MEDITATION</h2>
        <input 
          value={answer} 
          onChange={(e) => setAnswer(e.target.value)} 
          placeholder="TYPE 'MEDITATION'" 
          className={styles.gameInput} 
        />
        <button 
          className={styles.gameSubmitBtn} 
          onClick={() => setWon(answer.trim().toUpperCase() === 'MEDITATION')}
        >
          SUBMIT GUESS
        </button>
        {won && <Result score={15} />}
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.gameModalBox} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <span className={styles.toolMiniBadge}>BRAIN TRAINER</span>
            <h2 className={styles.modalHeading}>{game}</h2>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <FiX size={22} />
          </button>
        </div>
        {renderGame()}
      </div>
    </div>
  );
}

function Result({ score }) { 
  return (
    <div className={styles.resultNotice}>
      🎉 EXCELLENT WORK! +{score} WELLNESS POINTS EARNED!
    </div>
  ); 
}

