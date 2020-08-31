import React from 'react';
import {Form} from "./todo/Form";
import {DragDropContext} from "react-beautiful-dnd";
import {List} from "./todo/List";

const TodoWorkSpace = ({onDragEnd}) => (
    <>
      <Form />
      <DragDropContext onDragEnd={onDragEnd}>
        <List />
      </DragDropContext>
    </>
);

export default TodoWorkSpace;
