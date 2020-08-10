import {createAction} from "redux-actions";

export const addTodo = createAction('ADD_TODO')
export const addAllTodo = createAction('ADD_ALL_TODO')
export const toggleTodo = createAction('TOGGLE_TODO')
export const deleteTodo = createAction('DELETE_TODO')
export const changeTodo = createAction('CHANGE_TODO')
