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

export async function GET() {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: 'Please log in first.' }, { status: 401 });
  }

  const db = await readDb();
  const userActivities = (db.activities || [])
    .filter(a => a.userId === user.id)
    .sort((a, b) => b.completedAt.localeCompare(a.completedAt));

  return NextResponse.json({ activities: userActivities });
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

  const { type = 'wellness' } = body;
  const sanitizedType = String(type).trim().toLowerCase().slice(0, 50);

  const db = await readDb();
  if (!Array.isArray(db.activities)) {
    db.activities = [];
  }

  const newActivity = {
    id: crypto.randomUUID(),
    userId: user.id, // Strictly derived from session
    type: sanitizedType || 'wellness',
    completedAt: new Date().toISOString(),
  };

  db.activities.push(newActivity);
  await writeDb(db);

  return NextResponse.json({ activity: newActivity }, { status: 201 });
}
