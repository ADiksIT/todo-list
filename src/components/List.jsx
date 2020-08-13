import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Item } from './Item';
import { useHttp } from '../hooks/http.hook';
import { addAllTodo } from '../redux/actions/actions';
import { userChange } from '../redux/actions/user';
import { Droppable } from 'react-beautiful-dnd';
import { apiGetTodos } from '../http.actions';

export const List = () => {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.list);
  const { id } = useSelector((state) => state.user);

  const localUser = JSON.parse(localStorage.getItem('user'));

  const { request } = useHttp();

  useEffect(
    useCallback(() => {
      const fetchData = async () => {
        const response = await request(apiGetTodos(id || localUser.id));
        dispatch(addAllTodo(response));
        dispatch(userChange(localUser));
      };
      fetchData();
    }, [dispatch, id, localUser, request]),
    [],
  );

  return (
    <Droppable droppableId={Date.now().toString()}>
      {(provided) => (
        <ul
          className="collection with-header"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {list?.length ? (
            list.map((todo, i) => <Item index={i} todo={todo} key={todo.id} />)
          ) : (
            <h5>Your list clear</h5>
          )}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};
