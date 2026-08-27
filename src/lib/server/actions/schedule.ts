'use server';
import { generateWeeklyScheduling } from "@/lib/server/services/schedule";
import { getAllUsers } from "@/lib/server/services/users";
import { getTasks } from "@/lib/server/services/tasks";

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