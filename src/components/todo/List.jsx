import React from 'react';
import { useSelector } from 'react-redux';
import { Item } from './Item';
import { Droppable } from 'react-beautiful-dnd';

export const List = () => {
  const list = useSelector((state) => state.list);

  return (
    <Droppable droppableId={Date.now().toString()}>
      {(provided) => (
        <ul
          className="collection with-header"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {list?.length ? (
            list.map((todo, i) => <Item index={i} todo={todo} key={todo?.id || i} />)
          ) : (
            <h5>Your list clear</h5>
          )}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};
