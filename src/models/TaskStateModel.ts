import type { taskModule } from "./TaskModel";

export type TaskStateModel = {
    tasks: taskModule[];
    secondsRemaining: number;
    formattedSeconsRemaining: string;
    activeTask: taskModule | null;
    currentCycle: number;
    config: {
        workTime: number;
        shortBreackTime: number;
        longBreackTime: number;
    };
};