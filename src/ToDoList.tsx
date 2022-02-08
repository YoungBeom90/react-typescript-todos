import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { atom, useRecoilState } from 'recoil';

const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
})

interface IForm {
    toDo: string;
}

interface IToDo {
    text: string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE";
}

const ToDoList = () => {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const { 
        register,
        handleSubmit,
        setValue
    } = useForm<IForm>();
    const handleValue = ({toDo}:IForm) => {
        setToDos(oldToDos => [{text: toDo, id: Date.now(), category: "TO_DO"}, ...oldToDos]);
        setValue("toDo", "");
    }
    console.log(toDos);
    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <form onSubmit={handleSubmit(handleValue)}>
                <input {...register("toDo", {
                    required: "Please write a to do!"
                })} placeholder='Write a to do' />
                <button>Add</button>
            </form>
            <ul>
                {toDos.map(toDo => <li key={toDo.id}>{toDo.text}</li>)}
            </ul>
        </div>
    )
};

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

export default ToDoList;
