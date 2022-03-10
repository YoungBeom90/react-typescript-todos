import React, {MouseEventHandler} from 'react';
import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";
import 'boxicons';
import {useRecoilState} from "recoil";
import {IToDo, toDoState} from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  padding: 10px 10px;
  margin: 3px;
  background-color: ${(props) => props.isDragging? "#E2E2FF" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging? "3px 4px 5px rgba(0,0,0,0.2)" : "none"};
  //vertical-align: sub;
  //min-width: 100%;
  display: flex;
  justify-items: right;
  align-items: center;
`

interface IDraggableCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
    boardId: string;
}

const DraggableCard = ({toDoId, toDoText, boardId, index} : IDraggableCardProps) => {
    const [toDos, setToDos] = useRecoilState(toDoState);

    const deleteToDo = (event : MouseEventHandler) => {
        let newToDos;
        setToDos((allBoards) => {
            newToDos = {
                ...toDos,
                [boardId] : toDos[boardId].filter(todo => todo.id !== toDoId)
            }
            return newToDos;
        });
        console.log(newToDos);
        localStorage.setItem("toDoList", JSON.stringify(newToDos));
    }

    return (
        <Draggable
            key={toDoId}
            draggableId={toDoId+""}
            index={index}
        >
            {
                (magic, snapshot) =>
                    <div style={{display: "inline-flex"}}>
                        <Card
                            isDragging={snapshot.isDragging}
                            ref={magic.innerRef}
                            {...magic.draggableProps}
                            {...magic.dragHandleProps}
                        >
                            {toDoText}
                            {/*<DeleteButton onClick={deleteToDo as any} >*/}
                            {/*    <img*/}
                            {/*        src="data:image/png;base64,*/}
                            {/*    iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAK*/}
                            {/*    lJREFUSEvtlcERQDAQRZ9KlIBOlEIFlKQUOqASJjM4hJ0fIje5ZTbZ9//*/}
                            {/*    uJJuReGWJ86MANdABpSFkBlpgsIQqgEuQC5cjUL0FrPtFS4iKyxKpBCp+ARwXYnt/OvatJwccyqV1z6J5/*/}
                            {/*    nXzvgb4CtX+5Ic6UAmjS/QDLu/qaUn+HsivKbpEivAYEDJofOh0N/msl+xGZQ8USvoeX4DmbnSqkRmY3z6*/}
                            {/*    WHLABUDk4GfuOp84AAAAASUVORK5CYII="*/}
                            {/*    />*/}
                            {/*</DeleteButton>*/}
                        </Card>
                    </div>
            }
        </Draggable>
    );
};

export default React.memo(DraggableCard);

const DeleteButton = styled.button`
    margin: 0 -5px 0 10px;
`