import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefautButton";
import { DefaultInput } from "../DefautInput";
import { useRef } from "react";
import type { taskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCyce";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";

export function MainForm() {
    const { state, setState } = useTaskContext()
    const taskNameInput = useRef<HTMLInputElement>(null);

    // ciclos
    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleTipe = getNextCycleType(nextCycle);

    function handleCrateNewTask(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if (taskNameInput.current === null) return;

        const taskName = taskNameInput.current.value.trim();

        if(!taskName) {
            alert('Digite o nome da tarefa');
            return;
        }

        const newTask: taskModel = {
            id: Date.now().toString(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration: state.config[nextCycleTipe],
            type: nextCycleTipe,
        };

        const secondsRemaining = newTask.duration * 60

        setState(prevState => {
            return {
                ...prevState,
                config: {...prevState.config},
                activeTask: newTask,
                currentCycle: nextCycle,
                secondsRemaining, // conferir
                formattedSeconsRemaining: formatSecondsToMinutes(secondsRemaining), // conferir
                tasks: [...prevState.tasks, newTask],
            }
        })
    }
    return(
                        <form onSubmit={handleCrateNewTask} className='form' action="">
                    <div className="formRow">
                        <DefaultInput labelText='task' id='meuImput' type='text' placeholder='Digite algo' ref={taskNameInput} disabled={!!state.activeTask}></DefaultInput>
                    </div>

                    <div className="formRow">
                        <p>Próximo intervalo é de 25min</p>
                    </div>

                    {state.currentCycle > 0 && (
                    <div className="formRow">
                        <Cycles />
                    </div>
                    )}

                    <div className="formRow">
                        {!state.activeTask ? (
                            <DefaultButton 
                            aria-label="Iniciar nova tarefa" 
                            title="Iniciar nova tarefa" 
                            type="submit" 
                            icon={<PlayCircleIcon />} 
                            />
                        ) : (
                            <DefaultButton 
                            aria-label="Interromper tarefa atual" 
                            title="Interromper tarefa atual" 
                            type="button"
                            color="red" 
                            icon={<StopCircleIcon />} 
                            />
                        )}
                        
                    </div>
                </form>
    )
}