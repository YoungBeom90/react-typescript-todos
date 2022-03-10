import React from 'react';
import { useForm } from 'react-hook-form';
import {Droppable} from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import {IToDo, toDoState} from "../atoms";
import {useSetRecoilState} from "recoil";
// import {RecoilLoadable, useSetRecoilState} from "recoil";

const Wrapper = styled.div`
  padding-top: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.borderColor};
  min-height: 300px;
  display: flex;
  flex-direction: column;
`

const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`

const Area = styled.div<IAreaProps>`
  background-color: ${props => props.isDraggingOver ? "#F7D8E6" : props.isDraggingFromThis ? "#E6FCFE" : "#E9EEF1"};
  flex-grow: 1;
  transition: background-color .3s ease-in-out;
  padding: 20px;
`

const Form = styled.form` 
    width: 100%;
    input {
        width: 100%;
    }
`
interface IBoardProps {
    toDos: IToDo[];
    boardId: string;
}

interface IAreaProps {
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
}
interface IForm {
    toDo: string;
}

const Board = ({toDos, boardId} : IBoardProps) => {
    const setToDos = useSetRecoilState(toDoState);

    const {register, setValue, handleSubmit} = useForm<IForm>();
    const onValid = ({toDo}: IForm) => {
        const newToDo = {
            id: Date.now(),
            text: toDo
        }
        let newToDos;
        setToDos((allBoards) => {

            newToDos = {
                ...allBoards,
                [boardId]: [newToDo, ...allBoards[boardId]]
            }
            return newToDos;
        });
        localStorage.setItem("toDoList", JSON.stringify(newToDos));

        setValue('toDo', "");
    }
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input
                    {...register("toDo", {required: true})}
                    type="text"
                    placeholder={`Add task on ${boardId}`} />

            </Form>
            <Droppable droppableId={boardId}>
                { (magic, snapshot) =>
                    <Area
                        ref={magic.innerRef}
                        {...magic.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                        isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                    >
                        {
                            toDos.map((toDo, index) =>
                                <DraggableCard
                                    key={toDo.id}
                                    toDoId={toDo.id}
                                    toDoText={toDo.text}
                                    boardId={boardId as any}
                                    index={index}
                                />
                            )
                        }
                        {magic.placeholder}
                    </Area>
                }
            </Droppable>
        </Wrapper>
    );
};

export default Board;