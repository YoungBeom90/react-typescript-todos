import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import CreateToDo from './CreateToDo';
import { categoryState, IToDo, toDoSelector, toDoState } from '../atoms';
import ToDo from './ToDo';
import {Categories} from '../atoms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { eventNames } from 'process';



const ToDoList = () => {
    const toDos = useRecoilValue(toDoSelector);
    const setToDoList  = useSetRecoilState(toDoState);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    }
    console.log(toDos);

    const onClick = (event:React.MouseEvent<SVGSVGElement>) => {
        const target = event.currentTarget?.parentElement;
        const targetKey = target?.getAttribute("data-id");
        const index = toDos?.findIndex((toDo : any) => toDo.id === Number(targetKey));
        const newList = removeItemAtIndex(toDos!, index!);
        setToDoList(newList);
    } 
    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <select value={category} onInput={onInput}>
                <option value={Categories.TO_DO}>To Do</option>
                <option value={Categories.DOING}>Doing</option>
                <option value={Categories.DONE}>Done</option>
            </select>
            <CreateToDo />
            {
               category === Categories.DONE 
                ? toDos?.map((toDo : any, key : number) =>
                       <DoneDiv key={key} data-id={toDo.id}>
                           <ToDo key={toDo.id} {...toDo}/>
                           <TrashIcon onClick={onClick} icon={faTrashCan} key={key} />
                       </DoneDiv>
                    )
                : toDos?.map((toDo : any) => <ToDo key={toDo.id} {...toDo}/>)
            }
        </div>
    )
};

const removeItemAtIndex = (toDos: IToDo[], index: number) => {
    let afterDeletion = [...toDos.slice(0, index), ...toDos.slice(index + 1)];
    console.log(afterDeletion);
    localStorage.setItem("toDos", JSON.stringify(afterDeletion));
    return afterDeletion;
}

// interface IForm {
//     email: string;
//     firstName: string;
//     lastName: string;
//     password: string;
//     passwordCheck: string;
//     username: string;
//     extraError?: string;
// }

// const ToDoList = () => {
//     const {register, handleSubmit, formState: {errors}, setError} = useForm<IForm>({
//         defaultValues: {
//             email: "@naver.com"
//         }
//     });
//     const onValid = (data:IForm) => {
//         if(data.password !== data.passwordCheck) {
//             setError("passwordCheck", { message: "Password are not the same"}, {shouldFocus: true});
//         }
//         // setError("extraError", { message: "Server offline..."});
//         console.log(data);
//     }
//     console.log(errors);
//     return (
//         <div>
//             <form style={{display: "flex", flexDirection: "column"}} onSubmit={handleSubmit(onValid)}>
//                 <input 
//                     {...register("email", {
//                         required: "Email is required",
//                         pattern: {
//                             value: /^[A-Za-z0-9._%+-]+@naver.com$/,
//                             message: "Only naver.com emails allowed"
//                         },
//                     })} 
//                     placeholder='Email' 
//                 />
//                 <ErrorMessage>{errors.email?.message}</ErrorMessage>
//                 <input {...register("firstName", {required: "First Name is required"})} placeholder='First Name' />
//                 <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
//                 <input {...register("lastName", {required: "Last Name is required"})} placeholder='Last Name' />
//                 <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
//                 <input {...register("username", {required: "User Name is required", minLength: 10})} placeholder='User Name' />
//                 <ErrorMessage>{errors.username?.message}</ErrorMessage>
//                 <input 
//                     {...register("password", {
//                             required: "Password is required", 
//                             minLength: {
//                                 value: 5, 
//                                 message: "You password is too short"
//                             },
//                         })
//                     } 
//                     placeholder='Password' 
//                 />
//                 <ErrorMessage>{errors.password?.message}</ErrorMessage>
//                 <input 
//                     {...register("passwordCheck", {
//                             required: "Password check is required", 
//                             minLength: {
//                                 value: 5, 
//                                 message: "You password is too short"
//                             },
//                         })
//                     } 
//                     placeholder='Password check' 
//                 />
//                 <ErrorMessage>{errors.passwordCheck?.message}</ErrorMessage>
//                 <button>Add</button>
//                 <ErrorMessage>{errors.extraError?.message}</ErrorMessage>
//             </form>
//         </div>
//     )
// }

const ErrorMessage = styled.span`
    color: red;
`

const DoneDiv = styled.div`
    display: flexbox;
`
const TrashIcon = styled(FontAwesomeIcon)`
    margin: 2px 10px;
    cursor: pointer;
    
`


export default ToDoList;
