import { useForm } from 'react-hook-form';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { categoryState, toDoState } from '../atoms';

interface IForm {
    toDo: string;
}

const CreateToDo = () => {
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const {register, handleSubmit, setValue} = useForm<IForm>();
    const handleValue = ({toDo}:IForm) => {
        setToDos(oldToDos => [{text: toDo, id: Date.now(), category}, ...oldToDos]);
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