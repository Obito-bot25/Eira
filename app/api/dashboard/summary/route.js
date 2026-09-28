import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readDb } from '@/lib/db';
import { calculateWeeklyMetrics, buildWeeklyTrend, generateInsight, getPersonalizedRecommendation } from '@/lib/insights';

async function currentUser() {
  const token = (await cookies()).get('eira_session')?.value;
  if (!token) return null;
  const db = await readDb();
  return db.users.find(u => u.token === token) || null;
}

export async function GET() {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ authenticated: false, message: 'Not authenticated' }, { status: 200 });
  }

  const db = await readDb();
  const userMoods = (db.moods || []).filter(m => m.userId === user.id);
  const userJournals = (db.journals || []).filter(j => j.userId === user.id);
  const userActivities = (db.activities || []).filter(a => a.userId === user.id);

  // Latest check-in
  const sortedMoods = [...userMoods].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const latestMood = sortedMoods[0] || null;

  // Real 7-day metrics
  const metrics = calculateWeeklyMetrics(userMoods, userJournals, userActivities);

  // Real 7-day trend
  const weeklyTrend = buildWeeklyTrend(userMoods);

  // Deterministic non-diagnostic insight
  const insight = generateInsight(userMoods);

  // Personalized feature recommendation
  const recommendation = getPersonalizedRecommendation(latestMood?.mood);

  return NextResponse.json({
    authenticated: true,
    user: {
      id: user.id,
      name: user.name || '',
      email: user.email,
    },
    metrics,
    weeklyTrend,
    insight,
    recommendation,
    latestMood,
  });
}
