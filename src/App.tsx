import React, {useState} from 'react';
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import styled from "styled-components";
import {useRecoilState} from "recoil";
import {toDoState} from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
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

        if(!destination) return;

        if(destination.droppableId === source.droppableId) {
            setToDos((allBoards) => {
                const boardCopy = [...allBoards[source.droppableId]];
                const taskObj = boardCopy[source.index];
                boardCopy.splice(source.index, 1);
                boardCopy.splice(destination.index, 0, taskObj);
                return {
                    ...allBoards,
                    [source.droppableId] : boardCopy
                }
            })
        }

        if(destination.droppableId !== source.droppableId) {

            setToDos((allBoards) => {
                const sourceBoard = [...allBoards[source.droppableId]];
                const taskObj = sourceBoard[source.index];
                const destinationBoard = [...allBoards[destination.droppableId]];
                sourceBoard.splice(source.index, 1);
                destinationBoard.splice(destination.index, 0 , taskObj);
                return {
                    ...allBoards,
                    [source.droppableId]: sourceBoard,
                    [destination.droppableId]: destinationBoard,
                }
                // const boardCopy = [...allBoards[source.droppableId]]
                // boardCopy.splice(source.index, 1).shift();
                // boardCopy.splice(destination?.index, 0, draggableId);
                //
                // return {
                //     ...allBoards,
                //     [source.droppableId]: boardCopy
                // };

            });
        }
    }


  return (
      <DragDropContext onDragEnd={onDragEnd}>
          <Wrapper>
              <Boards>
                  {Object.keys(toDos).map(boardId => <Board toDos={toDos[boardId]} boardId={boardId} />)}
              </Boards>
          </Wrapper>
      </DragDropContext>
  );
};

export default App;

