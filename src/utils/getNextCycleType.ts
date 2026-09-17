import type { taskModel } from "../models/TaskModel";

export function getNextCycleType(currentCycle: number): taskModel['type'] {
    if(currentCycle === 8) return 'longBreackTime';
    if(currentCycle % 2 === 0) return 'shortBreackTime';
     return 'workTime';
}