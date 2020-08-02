import React from 'react';
import { useSelector } from 'react-redux';
import { Item } from './Item';

export const List = () => {
  const list = useSelector((state) => state.list);

  return (
    <ul className="collection with-header">
      {list.length ? (
        list.map((todo) => <Item todo={todo} key={todo.id} />)
      ) : (
        <h4>Your list clear</h4>
      )}
    </ul>
  );
};
