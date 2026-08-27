'use server';
import { getAllUsers,insertUser,deleteUser,modifyName } from "@/lib/server/services/users";
import { User } from "@/lib/types";



export async function fetchAllUsers() : Promise<{ success: boolean; data?: User[]; error?: string }>{
    try{
        const users = getAllUsers();
        return {success : true, data: users};
    }catch(error){
        console.error('Error retriving users:', error );
        return {success : false, error: (error as Error).message};
    }
}

export async function handleUserInsert(name: string) : Promise<{ success: boolean; data?: User; error?: string }>{
    try{
        const user = insertUser(name);
        return {success: true, data: user};
    }catch(error){
        console.error("Error creating user");
        return {success : false, error: (error as Error).message};
    }

}

export async function handleUserDeletion(id: string) : Promise<{ success: boolean; data?: string; error?: string }>{
    try{
        const user = deleteUser(id);
        return {success : true, data : id};
    }catch(error){
        console.error("Error deleting the user");
        return {success : false, error: (error as Error).message};
    }
}

export async function handleModifyName(id: string, newName: string) : Promise<{success: boolean; data?: string; error?: string}>{
    try{
        const newN = modifyName(id,newName);
        return {success: true, data: newN};
    }catch(error){
        console.error("Error modifying name");
        return {success : false, error: (error as Error).message};
    }
}