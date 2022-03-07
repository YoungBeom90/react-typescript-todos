import { useForm } from 'react-hook-form';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import {categoryState, IToDo, toDoState} from '../atoms';

interface IForm {
    toDo: string;
}

const CreateToDo = () => {
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const {register, handleSubmit, setValue} = useForm<IForm>();
    const handleValue = ({toDo}:IForm) => {
        // setToDos(oldToDos => [{text: toDo, id: Date.now(), category}, ...oldToDos]);
        let localStorage = window.localStorage.getItem("toDos") as any;
        localStorage = JSON.parse(localStorage);
        console.log(localStorage);
        if(localStorage) {
            localStorage.unshift({text: toDo, id: Date.now(), category});
        } else {
            localStorage = [];
            localStorage.push({text: toDo, id: Date.now(), category});
        }
        window.localStorage.setItem("toDos", JSON.stringify(localStorage as any));
        setToDos(localStorage);
        setValue("toDo", "");
    }
    return (
        <form onSubmit={handleSubmit(handleValue)}>
            <input {...register("toDo", {
                required: "Please write a to do!"
            })} placeholder='Write a to do' />
            <button>Add</button>
        </form>
    )
}

export default CreateToDo