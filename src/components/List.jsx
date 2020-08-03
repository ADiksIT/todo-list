import React from 'react';
import { useSelector } from 'react-redux';
import { Item } from './Item';
import {initialState} from "../redux/reducers/listReducer";

export const List = () => {
  const list = useSelector((state) => state.list ?? initialState);

  return (
        <ul className="collection with-header">
          {list?.length ? (
              list.map((todo) => <Item todo={todo} key={todo.id} />)
          ) : (
              <h5>Your list clear</h5>
          )}
        </ul>
  );
};
