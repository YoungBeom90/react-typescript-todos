import {atom, RecoilState, selector} from "recoil";

export enum Categories {
    "TO_DO" = "TO_DO", 
    "DOING" = "DOING", 
    "DONE" = "DONE"
}

export interface IToDo {
    text: string;
    id: number;
    category: Categories;
}

export const categoryState = atom<Categories>({key: "category", default: Categories.TO_DO});

let localStorage = window.localStorage.getItem("toDos");
let jsonData = JSON.parse(localStorage as any);
export const toDoState = atom({key: "toDo", default: jsonData});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({get}) => {
        const toDos = get(toDoState);
        console.log(toDos);
        const category = get(categoryState);

        if(toDos) {
            if(category == Categories.TO_DO)
                return toDos.filter((toDo : any) => toDo.category == Categories.TO_DO);
            if(category == Categories.DOING)
                return toDos.filter((toDo : any) => toDo.category == Categories.DOING);
            if(category == Categories.DONE)
                return toDos.filter((toDo : any) => toDo.category == Categories.DONE);
        }

    },
    
})