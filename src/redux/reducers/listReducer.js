import {handleActions} from "redux-actions";
import {addAllTodo, addTodo, changeTodo, clearTodo, deleteTodo, toggleTodo} from "../actions/actions";

export const initialState = []

export const listReducer = handleActions (
    {
      [addAllTodo](state, {payload}) {
        return [...state, ...payload]
      },
      [addTodo](state, {payload}) {
        return [...state, {...payload}]
      },
      [toggleTodo](state, {payload}) {
        return state.map(todo => todo.id === payload ? {...todo, completed: !todo.completed} : todo)
      },
      [deleteTodo](state, {payload}) {
        return state.filter(todo => todo.id !== payload)
      },
      [changeTodo](state, {payload}) {
        return state.map(todo => {
          if (todo.id === payload.id) todo.text = payload.text
          return todo
        })
      },
      [clearTodo](state, {payload}) {
        return initialState
      }
    }, initialState
)
