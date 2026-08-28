'use server';
import { generateWeeklyScheduling,getWeekSchedule,existSchedule } from "@/lib/server/services/schedule";
import { getAllUsers } from "@/lib/server/services/users";
import { getTasks } from "@/lib/server/services/tasks";
import { Schedule } from "@/lib/types";

export async function handleScheduleGeneration(year : number, weekNumber: number) : Promise<{success: boolean, error?: string}>{
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
        const exists = existSchedule(weekNumber, year);

        if(!exists){
            const generationResult = await handleScheduleGeneration(year, weekNumber);
            if (!generationResult.success) {
                return { success: false, error: generationResult.error };
            }
            const sched = getWeekSchedule(weekNumber,year);
            return {success: true, schedules: sched};
        }
        const sched = getWeekSchedule(year,weekNumber);
        return {success: true, schedules: sched};
    }catch(error){
        console.error("Error in weekly schedule generation:",error);
        return {success: false, error: (error as Error).message};
    }
}