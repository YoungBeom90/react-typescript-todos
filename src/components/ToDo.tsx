import {IToDo, toDoState} from './../atoms';
import { useSetRecoilState } from 'recoil';
import {Categories} from '../atoms';
import React from "react";

const ToDo = ({text, category, id} : IToDo) => {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {

        const {
            currentTarget: { name }
        } = event;

        setToDos((oldToDos : any) => {
            const targetIndex = oldToDos.findIndex((toDo : any) => toDo.id === id);
            const oldToDo = oldToDos[targetIndex];
            const newToDo = {
                text,
                id,
                category: name as any
            };
            console.log(oldToDo, newToDo);

            let result = [
                ...oldToDos.slice(0, targetIndex),
                newToDo,
                ...oldToDos.slice(targetIndex + 1)
            ];

            localStorage.setItem("toDos", JSON.stringify(result));

            return result;
        });

    }
    
    return (
        <li>
            <span>{text}</span>
            {category !== Categories.DOING && <button name={Categories.DOING} onClick={onClick}>Doing</button>}
            {category !== Categories.TO_DO && <button name={Categories.TO_DO} onClick={onClick}>To Do</button>}
            {category !== Categories.DONE && <button name={Categories.DONE} onClick={onClick}>Done</button>}
        </li>
    )
}

export default ToDo