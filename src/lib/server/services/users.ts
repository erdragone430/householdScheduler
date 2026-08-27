import db from '@/db/schema/schema';
import crypto from 'crypto';
import { User } from "@/lib/types";

export function getAllUsers(): User[] {
    const stmt = db.prepare('SELECT * FROM users');
    const users = stmt.all() as User[];
    if(users.length === 0 ){
        throw new Error('No user found');
    }
    return users;
}

export function checkExist(id: string) : void{
    const checkStmt = db.prepare('SELECT id FROM users WHERE id = ?');
    const result = checkStmt.get(id);
    if(!result){
        throw new Error("ID user ${id} not found");
    }
}

export function insertUser(name: string, role = 'member'){
    const checkStmt = db.prepare('SELECT id FROM users WHERE id = ?');
    let id: string;
    let exists: unknown;
    do{
        id = crypto.randomUUID();
        exists = checkStmt.get(id);
    } while(exists);

    const insertStmt = db.prepare('INSERT INTO users (id,name,role) VALUES (?,?,?)');
    insertStmt.run(id,name,role);

    return {id, name, role};
}

export function deleteUser(id: string){
    checkExist(id);
    const deleteStmt = db.prepare('DELETE FROM users WHERE id = ?');
    deleteStmt.run(id);
    return id;
}

export function modifyName(id: string, newName : string){
    checkExist(id);
    const modName = db.prepare('UPDATE users SET name = ? WHERE id = ?');
    modName.run(id,newName);
    return {id,newName};
}

