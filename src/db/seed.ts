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

console.log("✅ Seed completato con successo!");



