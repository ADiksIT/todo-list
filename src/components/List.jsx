import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Item } from './Item';
import {useHttp} from "../hooks/http.hook";
import {addAllTodo} from "../redux/actions/actions";
import {userChange} from "../redux/actions/user";

export const List = () => {

  const dispatch = useDispatch();

  const list = useSelector(state => state.list);
  const {id} = useSelector(state => state.user)

  const localUser = JSON.parse(localStorage.getItem('user'));

  const {request} = useHttp();

  useEffect(useCallback(() => {
    const fetchData = async () => {
      const response = await request(`/api/todos/users/${id || localUser.id}`);
      dispatch(addAllTodo(response))
      dispatch(userChange(localUser))
    }
    fetchData()
  }, [dispatch, id, localUser, request]), []);

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
