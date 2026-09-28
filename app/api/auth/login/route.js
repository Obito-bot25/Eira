import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';
import { verifyPassword, createToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const normalized = String(email || '').trim().toLowerCase();
    if (!normalized || !password) return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    const db = await readDb();
    const user = db.users.find(u => u.email === normalized);
    if (!user || !verifyPassword(password, user.passwordHash)) return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    user.token = createToken();
    await writeDb(db);
    const response = NextResponse.json({ message: 'Login successful.', user: { id: user.id, name: user.name || '', email: user.email, phone: user.phone } });
    response.cookies.set('eira_session', user.token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 24 * 7 });
    return response;
  } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }
}
