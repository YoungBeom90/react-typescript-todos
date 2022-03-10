import {atom} from "recoil";

export interface IToDo {
    id: number;
    text: string;
}

interface IToDoState {
    [key: string] : IToDo[];
}

export const toDoState = atom<IToDoState>({
    key: "toDos",
    default: localStorage.getItem("toDoList") ?
        JSON.parse(localStorage.getItem("toDoList") as any)
        : {
            "To Do" : [],
            Doing: [],
            Done: [],
            Trash: []
        }
})
