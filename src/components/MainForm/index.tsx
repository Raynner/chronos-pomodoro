import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefautButton";
import { DefaultInput } from "../DefautInput";
import { useRef } from "react";
import type { taskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCyce";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { Tips } from "../tips";

export function MainForm() {
    const { state, dispatch } = useTaskContext()
    const taskNameInput = useRef<HTMLInputElement>(null);

    // ciclos
    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleTipe = getNextCycleType(nextCycle);

    

    function handleCreateNewTask(event: React.SubmitEvent<HTMLFormElement>) {
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

        dispatch ({type: TaskActionTypes.START_TASK, payload: newTask});

    }

     

    function handleInterruptTask() {
            dispatch ({type: TaskActionTypes.INTERRUPT_TASK});
    }

    return(
                        <form onSubmit={handleCreateNewTask} className='form' action=''>
                    <div className="formRow">
                        <DefaultInput labelText='task' id='meuImput' type='text' placeholder='Digite algo' ref={taskNameInput} disabled={!!state.activeTask}></DefaultInput>
                    </div>

                    <div className="formRow">
                        <Tips />
                    </div>

                    {state.currentCycle > 0 && (
                    <div className="formRow">
                        <Cycles />
                    </div>
                    )}

                    <div className="formRow">
                        {!state.activeTask && (
                            <DefaultButton 
                            aria-label="Iniciar nova tarefa" 
                            title="Iniciar nova tarefa" 
                            type="submit" 
                            icon={<PlayCircleIcon />} 
                            key='botao_submit'
                            />
                        )} 
                        
                        {!!state.activeTask &&(
                            <DefaultButton 
                            aria-label="Interromper tarefa atual" 
                            title="Interromper tarefa atual" 
                            type="button"
                            color="red" 
                            icon={<StopCircleIcon />}
                            onClick={handleInterruptTask}
                            key='botao_button'
                            />
                        )}
                        
                    </div>
                </form>
    )
    }
