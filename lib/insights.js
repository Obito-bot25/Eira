/**
 * Deterministic Wellbeing Insight & Metrics Engine
 * Strictly descriptive — NON-DIAGNOSTIC.
 * Analyzes authenticated user's real check-in and activity records.
 */

export const MOOD_MAP = {
  1: { label: 'LOW', color: '#FF5500', desc: 'Exhausted / Stressed' },
  2: { label: 'NOT GREAT', color: '#FECDD3', desc: 'Uneasy / Distracted' },
  3: { label: 'OKAY', color: '#EFEFEA', desc: 'Balanced / Steady' },
  4: { label: 'GOOD', color: '#BAE6FD', desc: 'Focused / Capable' },
  5: { label: 'GREAT', color: '#D4FF00', desc: 'Energized / Grounded' },
};

/**
 * Calculates weekly count of activities strictly within the last 7 calendar days.
 */
export function calculateWeeklyMetrics(userMoods = [], userJournals = [], userActivities = []) {
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  const checkInsThisWeek = userMoods.filter(m => {
    const t = new Date(m.createdAt).getTime();
    return !isNaN(t) && t >= sevenDaysAgo;
  }).length;

  const journalsThisWeek = userJournals.filter(j => {
    const t = new Date(j.createdAt).getTime();
    return !isNaN(t) && t >= sevenDaysAgo;
  }).length;

  const activitiesThisWeek = userActivities.filter(a => {
    const t = new Date(a.completedAt || a.createdAt).getTime();
    return !isNaN(t) && t >= sevenDaysAgo;
  }).length;

  return {
    checkInsThisWeek,
    journalsThisWeek,
    activitiesThisWeek,
  };
}

/**
 * Builds the real 7-day mood array ending today.
 * Missing days remain strictly null — NEVER treated as 0 or negative.
 */
export function buildWeeklyTrend(userMoods = []) {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const result = [];
  const now = new Date();

  // Generate 7 days ending with today (index 0 is 6 days ago, index 6 is today)
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayLabel = days[d.getDay()];

    // Find moods logged on this exact date (YYYY-MM-DD)
    const dayMoods = userMoods.filter(m => {
      if (!m.createdAt) return false;
      return m.createdAt.startsWith(dateStr);
    });

    if (dayMoods.length > 0) {
      // Pick the latest check-in for that calendar day
      const latest = dayMoods.sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
      const moodVal = Number(latest.mood);
      const meta = MOOD_MAP[moodVal] || null;
      result.push({
        day: dayLabel,
        date: dateStr,
        isToday: i === 0,
        mood: moodVal,
        label: meta ? meta.label : String(moodVal),
        color: meta ? meta.color : '#EFEFEA',
      });
    } else {
      result.push({
        day: dayLabel,
        date: dateStr,
        isToday: i === 0,
        mood: null, // Strictly missing
        label: '—',
        color: 'transparent',
      });
    }
  }

  return result;
}

/**
 * Deterministically analyzes check-in patterns.
 * STRICT CLINICAL RULE: Absolutely NO diagnostic or psychiatric claims.
 */
export function generateInsight(userMoods = []) {
  if (!userMoods || userMoods.length === 0) {
    return {
      status: 'empty',
      text: 'START WITH TODAY. LOG YOUR FIRST CHECK-IN TO SEE YOUR PERSONAL TREND.',
    };
  }

  if (userMoods.length === 1) {
    return {
      status: 'single',
      text: 'ONE CHECK-IN LOGGED. COME BACK TOMORROW TO BUILD YOUR WEEK.',
    };
  }

  // Sort chronological
  const sorted = [...userMoods].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const recent = sorted.slice(-7); // Last 7 check-ins

  if (recent.length < 3) {
    return {
      status: 'building',
      text: 'CHECK IN FOR A FEW MORE DAYS TO SEE YOUR TREND.',
    };
  }

  // Split into first half and second half
  const mid = Math.floor(recent.length / 2);
  const firstHalf = recent.slice(0, mid);
  const secondHalf = recent.slice(mid);

  const firstAvg = firstHalf.reduce((sum, m) => sum + Number(m.mood), 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((sum, m) => sum + Number(m.mood), 0) / secondHalf.length;
  const diff = secondAvg - firstAvg;

  if (diff >= 0.5) {
    return {
      status: 'improving',
      text: 'YOUR RECENT CHECK-INS ARE TRENDING UPWARD.',
    };
  } else if (diff <= -0.5) {
    return {
      status: 'declining',
      text: 'YOUR RECENT CHECK-INS HAVE BEEN LOWER THAN EARLIER THIS WEEK.',
    };
  } else {
    return {
      status: 'steady',
      text: 'YOUR RECENT CHECK-INS HAVE BEEN FAIRLY STEADY.',
    };
  }
}

/**
 * Recommends an existing EIRA feature based on the latest mood score.
 */
export function getPersonalizedRecommendation(latestMood) {
  const m = Number(latestMood);
  if (m === 1 || m === 2) {
    return {
      tool: 'GROUNDING',
      label: 'TRY A GROUNDING EXERCISE →',
      desc: '5-4-3-2-1 sensory grounding to ease acute tension and re-center your awareness.',
      href: '/wellness',
    };
  }

  if (m === 3) {
    return {
      tool: 'BREATHING',
      label: 'TRY A BREATHING SESSION →',
      desc: '4-7-8 diaphragmatic pacing to stimulate vagus calm and steady your focus.',
      href: '/wellness',
    };
  }

  if (m === 4 || m === 5) {
    return {
      tool: 'FOCUS',
      label: 'TRY A FOCUS SESSION →',
      desc: 'Pomodoro focus study sprint to channel your positive momentum productively.',
      href: '/wellness',
    };
  }

  return {
    tool: 'CHECKIN',
    label: 'LOG YOUR FIRST CHECK-IN →',
    desc: 'Select your baseline feeling above to personalize your guided wellness tools.',
    href: '#mood-checkin',
  };
}
