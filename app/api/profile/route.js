import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readDb, writeDb } from '@/lib/db';

async function getCurrentUser() {
  const token = (await cookies()).get('eira_session')?.value;
  if (!token) return null;
  const db = await readDb();
  return { db, user: db.users.find(u => u.token === token) || null };
}

export async function GET() {
  const result = await getCurrentUser();
  if (!result?.user) return NextResponse.json({ error: 'Please log in first.' }, { status: 401 });
  const { user } = result;
  return NextResponse.json({ user: { id: user.id, name: user.name || '', email: user.email, phone: user.phone || '' } });
}

export async function PATCH(request) {
  const result = await getCurrentUser();
  if (!result?.user) return NextResponse.json({ error: 'Please log in first.' }, { status: 401 });
  try {
    const body = await request.json();
    const name = String(body.name ?? '').trim();
    const phone = String(body.phone ?? result.user.phone ?? '').trim();
    if (!name) return NextResponse.json({ error: 'Name cannot be empty.' }, { status: 400 });
    if (name.length > 60) return NextResponse.json({ error: 'Name must be 60 characters or less.' }, { status: 400 });
    result.user.name = name;
    result.user.phone = phone;
    await writeDb(result.db);
    return NextResponse.json({ user: { id: result.user.id, name: result.user.name, email: result.user.email, phone: result.user.phone } });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
