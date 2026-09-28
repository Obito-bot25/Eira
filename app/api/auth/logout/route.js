import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readDb, writeDb } from '@/lib/db';

export async function POST() {
  const token = (await cookies()).get('eira_session')?.value;
  if (token) { const db = await readDb(); const user = db.users.find(u => u.token === token); if (user) { user.token = null; await writeDb(db); } }
  const response = NextResponse.json({ message: 'Logged out.' });
  response.cookies.set('eira_session', '', { httpOnly: true, expires: new Date(0), path: '/' });
  return response;
}
