import React from 'react';
import {Draggable, Droppable} from "react-beautiful-dnd";
import {IToDo} from "../atoms";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Area = styled.div<IAreaProps>`
    margin: 100px;
    //margin: 0 -5px 0 10px;
    & :hover {
      background-color: skyblue; 
    }
`

interface IBoardProps {
    // toDoId: number;
    boardId: string;
}

interface IAreaProps {
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
}

const Trash = ({boardId} : IBoardProps) => {
    return (
        <Droppable droppableId={boardId}>
            {
                (magic, snapshot) =>
                    <Area
                        ref={magic.innerRef}
                        {...magic.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                        isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                    >
                        <img
                            style={{width: "70px", borderRadius: '5px'}}
                            src="data:image/png;base64,
                                iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAK
                                lJREFUSEvtlcERQDAQRZ9KlIBOlEIFlKQUOqASJjM4hJ0fIje5ZTbZ9//
                                uJJuReGWJ86MANdABpSFkBlpgsIQqgEuQC5cjUL0FrPtFS4iKyxKpBCp+ARwXYnt/OvatJwccyqV1z6J5/
                                nXzvgb4CtX+5Ic6UAmjS/QDLu/qaUn+HsivKbpEivAYEDJofOh0N/msl+xGZQ8USvoeX4DmbnSqkRmY3z6
                                WHLABUDk4GfuOp84AAAAASUVORK5CYII="
                        />
                    </Area>
            }
        </Droppable>
    );
};

export default Trash;


