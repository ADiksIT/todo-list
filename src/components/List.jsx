import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Item } from './Item';
import {useHttp} from "../hooks/http.hook";
import {addAllTodo} from "../redux/actions/actions";

export const List = () => {

  const list = useSelector(state => state.list);
  const {id} = useSelector(state => state.user)
  const dispatch = useDispatch();
  const {request} = useHttp();

  useEffect(() => {
    const fetchData = async () => {
      const response = await request(`/api/todos/users/${id}`);
      dispatch(addAllTodo(response))
    }
    fetchData();
  }, [dispatch, id, request]);

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
