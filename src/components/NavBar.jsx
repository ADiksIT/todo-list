import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export const NavBar = () => {
  const user = useSelector(state => state.user)

  return (
      <nav>
        <div className='nav-wrapper container'>
          <a href="/" className="brand-logo">TO-DO APP</a>
          <ul id="nav-mobile" className="right">
            {user ? <li><Link to='/'>{user.user}</Link></li> : ''}
            <li><Link to='/auth'>{user.user ? 'LogOut' : 'LogIn'}</Link></li>
            {!user.user ? <li><Link to='/'>Home</Link></li> : ''}
          </ul>
        </div>
      </nav>
  )
}
