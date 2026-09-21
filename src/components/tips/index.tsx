import { useTaskContext } from "../../contexts/TaskContext/useTaskContext"
import { getNextCycle } from "../../utils/getNextCyce";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function Tips() {
    const { state } = useTaskContext()
    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    //tips

    const tipsForWhenActiveTask = {
        workTime: <span>Foque por {state.config.workTime}min</span>,
        shortBreackTime: <span>Descanse por {state.config.shortBreackTime}min</span>,
        longBreackTime: <span>Descanso longo</span>,
    }

    const tipsForNoActiveTask = {
        workTime: (<span>Próximo ciclo é de {state.config.workTime} min</span>),
        shortBreackTime: (<span>Próximo descanso é de {state.config.shortBreackTime} min</span>),
        longBreackTime: <span>Próximo descanso será longo</span>,
    }

    return (
        <>
        {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
        {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
        </>
    )
}