'use server';
import { generateWeeklyScheduling,getWeekSchedule } from "@/lib/server/services/schedule";
import { getAllUsers } from "@/lib/server/services/users";
import { getTasks } from "@/lib/server/services/tasks";
import { Schedule } from "@/lib/types";

export async function handleSchedeGeneration(year : number, weekNumber: number) : Promise<{success: boolean, error?: string}>{
    try{
        const users = getAllUsers();
        const tasks = getTasks();
        generateWeeklyScheduling(users,tasks,year,weekNumber);
        return {success: true};
    }catch(error){
        console.error("Error in weekly schedule generation:",error);
        return {success : false, error : (error as Error).message};
    }

}

export async function fetchWeekSchedule(year: number, weekNumber: number) : 
Promise<{success: boolean,error?: string, schedules?: Schedule[]}>
{
    try{
        const sched = getWeekSchedule(year,weekNumber);
        return {success: true, schedules: sched};
    }catch(error){
        console.error("Error in weekly schedule generation:",error);
        return {success: false, error: (error as Error).message};
    }
}