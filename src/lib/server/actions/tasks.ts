import { getTasks } from "@/lib/server/services/tasks";
import { Task } from "@/lib/types";

export async function fetchAllTasks() : Promise<{success: boolean, error?: string, data?: Task[] }>{
    try{
        const tsks = getTasks();
        return {success: true , data: tsks};
    }catch(error){
        console.error('Error fetching tasks.');
        return {success: false, error: (error as Error).message};
    }
}