import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/actions/user";
import { clearTodo } from "../redux/actions/actions";

export const NavBar = () => {
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const logOutHandle = () => {
    dispatch(userLogout())
    dispatch(clearTodo())
  }

  return (
      <nav>
        <div className='nav-wrapper container'>
          <a href="/" className="brand-logo">TO-DO APP</a>
          <ul id="nav-mobile" className="right">

            {user ? <li><Link to='/'>{user}</Link></li> : ''}

            <li onClick={() => logOutHandle()}>
              <Link to='/auth'>{user ? 'LogOut' : 'LogIn'}</Link>
            </li>
          </ul>
        </div>
      </nav>
  )
}
