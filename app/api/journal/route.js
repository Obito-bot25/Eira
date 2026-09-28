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
  if (!user) return NextResponse.json({ error: 'Please log in first.' }, { status: 401 });
  const db = await readDb();
  return NextResponse.json({ journals: db.journals.filter(j => j.userId === user.id).sort((a,b) => b.createdAt.localeCompare(a.createdAt)) });
}

export async function POST(request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'Please log in first.' }, { status: 401 });
  const { title = '', entry = '', mood = 5, tags = [] } = await request.json();
  if (!String(entry).trim()) return NextResponse.json({ error: 'Journal entry cannot be empty.' }, { status: 400 });
  const db = await readDb();
  const journal = { id: crypto.randomUUID(), userId: user.id, title: String(title).trim(), entry: String(entry).trim(), mood: Math.min(10, Math.max(1, Number(mood) || 5)), tags: Array.isArray(tags) ? tags.map(String).slice(0, 20) : [], createdAt: new Date().toISOString() };
  db.journals.push(journal); await writeDb(db);
  return NextResponse.json({ journal }, { status: 201 });
}
