import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { readDb, writeDb } from '@/lib/db';
import { hashPassword, createToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const { name, email, password, confirmPassword, phone } = await request.json();
    if (!name || !email || !password || !confirmPassword || !phone) return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    if (password !== confirmPassword) return NextResponse.json({ error: 'Passwords do not match.' }, { status: 400 });
    if (password.length < 6) return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    const normalized = email.trim().toLowerCase();
    const db = await readDb();
    if (db.users.some(u => u.email === normalized)) return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
    const token = createToken();
    const user = { name: String(name).trim().slice(0, 60), id: crypto.randomUUID(), email: normalized, phone: String(phone).trim(), passwordHash: hashPassword(password), token, createdAt: new Date().toISOString() };
    db.users.push(user);
    await writeDb(db);
    const response = NextResponse.json({ message: 'Account created successfully.', user: { id: user.id, name: user.name, email: user.email, phone: user.phone } }, { status: 201 });
    response.cookies.set('eira_session', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 24 * 7 });
    return response;
  } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }
}
