import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readDb } from '@/lib/db';

export async function GET() {
  const token = (await cookies()).get('eira_session')?.value;
  if (!token) return NextResponse.json({ user: null });
  const db = await readDb();
  const user = db.users.find(u => u.token === token);
  return NextResponse.json({ user: user ? { id: user.id, name: user.name || '', email: user.email, phone: user.phone || '' } : null });
}
