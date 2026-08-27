import db from "@/db/schema/schema";
import { Task } from "@/lib/types";

export function getTasks(): Task[]{
    const stmt = db.prepare('SELECT * from tasks');
    const tasks = stmt.all() as Task[];
    if(tasks.length === 0){
        throw new Error("No task available");
    }
    return tasks;
}