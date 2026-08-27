import 'server-only';
import db from '@/db/schema/schema';
import { User, Task, Schedule } from "@/lib/types"
import { randomUUID } from 'crypto';


function getDateOfISOWeek(week: number, year: number): Date {
    const simple = new Date(year, 0, 1 + (week - 1) * 7);
    const dow = simple.getDay();
    const ISOweekStart = simple;
    if (dow <= 4) {
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    } else {
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    }
    return ISOweekStart;
}

export function generateWeeklyScheduling(users: User[], tasks: Task[], year: number, weekNumber: number) {
    const rotationOffset = weekNumber - 1;
    const weekStartDate = getDateOfISOWeek(weekNumber, year);
    const realMonth = weekStartDate.getMonth() + 1;
    const insertStmt = db.prepare(`
        INSERT OR IGNORE INTO schedules (id,user_id, task_id, year, week_number, month, status) 
        VALUES (?,?, ?, ?, ?, ?, 'pending')
    `);

    const transaction = db.transaction(() => {
        tasks.forEach((task, taskIndex) => {
            const userIndex = (taskIndex + rotationOffset) % users.length;
            const assignedUser = users[userIndex];
            const id = randomUUID();

            insertStmt.run(id,assignedUser.id, task.id, year, weekNumber, realMonth);
        });
    });
    transaction();
}

export function getWeekSchedule(week: number, year: number): Schedule[] {
    const stmt = db.prepare('SELECT * FROM schedules WHERE week_number = ? AND year = ?');
    const schedules = stmt.all(week,year) as Schedule[];
    return schedules;
}


