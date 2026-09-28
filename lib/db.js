import fs from 'fs/promises';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const dbFile = path.join(dataDir, 'db.json');

async function ensureDb() {
  await fs.mkdir(dataDir, { recursive: true });
  try { await fs.access(dbFile); }
  catch { await fs.writeFile(dbFile, JSON.stringify({ users: [], journals: [], moods: [], activities: [] }, null, 2)); }
}

export async function readDb() {
  await ensureDb();
  const raw = await fs.readFile(dbFile, 'utf8');
  try {
    const db = JSON.parse(raw);
    return {
      users: Array.isArray(db.users) ? db.users : [],
      journals: Array.isArray(db.journals) ? db.journals : [],
      moods: Array.isArray(db.moods) ? db.moods : [],
      activities: Array.isArray(db.activities) ? db.activities : []
    };
  } catch {
    const db = { users: [], journals: [], moods: [], activities: [] };
    await fs.writeFile(dbFile, JSON.stringify(db, null, 2));
    return db;
  }
}

export async function writeDb(db) {
  await ensureDb();
  await fs.writeFile(dbFile, JSON.stringify(db, null, 2));
}
