export interface User{
    id : string;
    name : string;
    role: string;
}

export interface Task{
    id: string;
    title: "room1" | "room2" | "room3" | "room4";
    description?: string;
}

export interface Schedule {
    id: string;
    user_id: string;
    task_id: string;
    date: string;
    status: 'pending' | 'completed';
}