import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readDb, writeDb } from '@/lib/db';
import crypto from 'crypto';

async function currentUser() {
  const token = (await cookies()).get('eira_session')?.value;
  if (!token) return null;
  const db = await readDb();
  return db.users.find(u => u.token === token) || null;
}

export async function GET(request) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: 'Please log in first.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limitParam = parseInt(searchParams.get('limit') || '50', 10);
  const limit = isNaN(limitParam) ? 50 : Math.max(1, Math.min(limitParam, 500));

  const db = await readDb();
  const userMoods = (db.moods || [])
    .filter(m => m.userId === user.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);

  return NextResponse.json({ moods: userMoods });
}

export async function POST(request) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: 'Please log in first.' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const { mood } = body;
  const moodNum = Number(mood);

  // Strict integer validation between 1 and 5
  if (!Number.isInteger(moodNum) || moodNum < 1 || moodNum > 5) {
    return NextResponse.json(
      { error: 'Invalid mood value. Must be an integer between 1 and 5 (1=LOW, 2=NOT GREAT, 3=OKAY, 4=GOOD, 5=GREAT).' },
      { status: 400 }
    );
  }

  const db = await readDb();
  if (!Array.isArray(db.moods)) {
    db.moods = [];
  }

  const newMood = {
    id: crypto.randomUUID(),
    userId: user.id, // Strictly derived from server session, NEVER from client
    mood: moodNum,
    createdAt: new Date().toISOString(),
  };

  db.moods.push(newMood);
  await writeDb(db);

  return NextResponse.json({ mood: newMood }, { status: 201 });
}
