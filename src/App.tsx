import React, {useState} from 'react';
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import styled from "styled-components";
import {useRecoilState} from "recoil";
import {toDoState} from "./atoms";
import Board from "./Components/Board";
import Trash from "./Components/Trash";

const Wrapper = styled.div`
  display: flex;
  max-width: 80%;
  width: 100%;
  margin: auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const Boards = styled.div`
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`
// const Board = styled.div`
//   padding: 50px 10px 20px 10px;
//   border-radius: 5px;
//   background-color: ${(props) => props.theme.borderColor};
//   min-height: 300px;
// `
const Card = styled.div`
  border-radius: 5px;
  padding: 10px 10px;
  margin: 3px;
  background-color: ${(props) => props.theme.cardColor};
`


const App = () => {
    const [toDos, setToDos] = useRecoilState(toDoState);

    const onDragEnd = (info: DropResult) => {

        const {destination, draggableId, source} = info;

        console.log(destination?.droppableId);

        if(!destination) return;
        let newToDos;
        if(destination.droppableId === source.droppableId) {
            setToDos((allBoards) => {
                const boardCopy = [...allBoards[source.droppableId]];
                const taskObj = boardCopy[source.index];
                boardCopy.splice(source.index, 1);
                boardCopy.splice(destination.index, 0, taskObj);

                newToDos = {
                    ...allBoards,
                    [source.droppableId] : boardCopy
                }

                return newToDos;
            });

            localStorage.setItem("toDoList", JSON.stringify(newToDos));

        }

        if(destination.droppableId !== source.droppableId) {

            if(destination.droppableId === "Trash") {
                setToDos((allBoards) => {
                    const sourceBoard = [...allBoards[source.droppableId]];
                    const taskObj = sourceBoard[source.index];

                    let anotherToDos = sourceBoard.filter((toDo) => toDo.id !== taskObj.id)

                    newToDos = {
                        ...allBoards,
                        [source.droppableId] : anotherToDos
                    }

                    return newToDos;
                })


            } else {
                setToDos((allBoards) => {
                    const sourceBoard = [...allBoards[source.droppableId]];
                    const taskObj = sourceBoard[source.index];
                    const destinationBoard = [...allBoards[destination.droppableId]];
                    sourceBoard.splice(source.index, 1);
                    destinationBoard.splice(destination.index, 0 , taskObj);

                    newToDos = {
                        ...allBoards,
                        [source.droppableId]: sourceBoard,
                        [destination.droppableId]: destinationBoard,
                    }
                    return newToDos;

                });

            }
                localStorage.setItem("toDoList", JSON.stringify(newToDos));

        }
    }


  return (
      <DragDropContext onDragEnd={onDragEnd}>
          <Wrapper>
              <Boards>
                  {Object.keys(toDos).map((boardId, key) => boardId!=="Trash" && <Board key={key} toDos={toDos[boardId]} boardId={boardId} />)}
              </Boards>
              <Trash boardId="Trash"/>
          </Wrapper>
      </DragDropContext>
  );
};

export default App;

