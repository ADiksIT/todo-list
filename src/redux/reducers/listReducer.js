import {ADD_TODO, CHANGE_TODO, DELETE_TODO, TOGGLE_TODO} from "../actions/todo";

export const initialState = [{text: 'Add your first to-do!', completed: false, id:Date.now().toString() }]

const listReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_TODO:
      return [...state, action.payload]

    case TOGGLE_TODO:
      return state.map(todo => todo.id === action.id ? {...todo, completed: !todo.completed} : todo)

    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id)

    case CHANGE_TODO:
      return state.map(todo => {
        if (todo.id === action.id) todo.text = action.text
        return todo
      })

    default: return state
  }
}

export default listReducer
