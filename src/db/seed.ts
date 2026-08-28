import db from "@/db/schema/schema";
import { randomUUID } from "crypto";

console.log("Lets seed this db with KingDrago..");

db.prepare('DELETE FROM schedules').run();
db.prepare('DELETE FROM users').run();
db.prepare('DELETE FROM tasks').run();

const stmt = db.prepare('INSERT INTO users (id,name,role) VALUES (?,?,?)');
const id = randomUUID();
const name = 'Fabio Tommaselli';
const role = 'admin';
stmt.run(id,name,role);

// Mock Task
const taskStmt = db.prepare('INSERT INTO tasks (id,title,description) VALUES (?, ?, ?)');
taskStmt.run(randomUUID(),'room1','cleaning room');
taskStmt.run(randomUUID(),'room2','cleaning room');
taskStmt.run(randomUUID(),'room3','cleaning room');
taskStmt.run(randomUUID(),'room4','cleaning room');



// Mock Users
const userStmt = db.prepare('INSERT INTO users (id,name,role) VALUES (?, ?, ?)');
userStmt.run(randomUUID(),'Marco Rossi','member');
userStmt.run(randomUUID(),'Giovanni Bianchi','member');
userStmt.run(randomUUID(),'Giuseppe Verdi','member');
userStmt.run(randomUUID(),'Ugo Tognazzi','member');
userStmt.run(randomUUID(),'Lamine Yamal','member');
userStmt.run(randomUUID(),'Aldo Baglio','member');
userStmt.run(randomUUID(),'Giacomo Poretti','member');


console.log("✅ Seed completato con successo!");



