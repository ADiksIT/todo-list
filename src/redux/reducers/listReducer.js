import {handleActions} from "redux-actions";
import {addTodo, changeTodo, deleteTodo, toggleTodo} from "../actions/actions";

export const initialState = [{text: 'Add your first TO-DO', id: Date.now().toString(), completed: false}]

export const listReducer = handleActions (
    {
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
      }
    }, initialState
)
