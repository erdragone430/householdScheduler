import Database from 'better-sqlite3';
import path from 'path'
import fs from 'fs';

const dirPath = path.join(process.cwd(),'db');
const dbPath = path.join(dirPath,'scheduler.db');


if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath, {recursive: true});
}
const db = new Database(dbPath);

db.pragma('foreign_keys = ON');

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'member'
    );

    CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT
    );

    CREATE TABLE IF NOT EXISTS schedules (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        task_id TEXT,
        year INTEGER NOT NULL,
        week_number TEXT NOT NULL,
        month INTEGER NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        completed_at TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
    );
`);

export default db;