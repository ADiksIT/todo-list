export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const CHANGE_TODO = 'CHANGE_TODO'

export const addTodo = text => {
  return {
    type: ADD_TODO,
    payload: {
      text,
      id: Date.now().toString(),
      completed: false
    }
  }
}

export const toggleTodo = id => {
  return {
    type: TOGGLE_TODO,
    id
  }
}

export const deleteTodo = id => {
  return {
    type: DELETE_TODO,
    id
  }
}

export const changeTodo = payload => {
  return {
    type: CHANGE_TODO,
    text: payload.text,
    id: payload.id
  }
}
