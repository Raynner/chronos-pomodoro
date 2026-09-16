import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefautButton";
import { DefaultInput } from "../DefautInput";

export function MainForm() {
    return(
                        <form className='form' action="">
                    <div className="formRow">
                        <DefaultInput labelText='task' id='meuImput' type='text' placeholder='Digite algo' ></DefaultInput>
                    </div>

                    <div className="formRow">
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>

                    <div className="formRow">
                        <Cycles />
                    </div>

                    <div className="formRow">
                        <DefaultButton icon={<PlayCircleIcon />} color='red' />
                    </div>
                </form>
    )
}