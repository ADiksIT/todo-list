import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {changeTodo, deleteTodo, toggleTodo} from "../redux/actions/todo";

export const Item = ({ todo }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState(todo.text)
  const [state, setState] = useState(false)

  const handlerInput = ({ target }) => {
    setText(target.value)
  }

  const handlerChange = () => {
    if (!text.trim()) {
      return
    }

    if (state) {
      dispatch(changeTodo({text, id: todo.id}))
    }

    setState(!state)
  }

  return (
      <li className={todo.completed ? 'collection-item completed' : 'collection-item'} >

        <label onChange={() => {dispatch(toggleTodo(todo.id))}}>
          <input type="checkbox" defaultChecked={todo.completed}/>
          <span>''</span>
        </label>

        {state
            ? <form action="#" onSubmit={(e) => {
              e.preventDefault()
              handlerChange()
            }}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => handlerInput(e)}
                    onFocus={(e) => e.target.select()}
                />
              </form>
            : <span>{text}</span>
        }

        <div className="icons">
          <i className="material-icons" onClick={() => handlerChange()}>create</i>
          <i className="material-icons" onClick={() => dispatch(deleteTodo(todo.id))}>cancel</i>
        </div>
      </li>
  )
}
