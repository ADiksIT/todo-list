import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userLogout} from "../redux/actions/user";
import {clearTodo} from "../redux/actions/todos";
import PropTypes from 'prop-types';
import {useTranslation} from "react-i18next";


export const NavBar = ({data}) => {
  const [score, setScore] = useState(0)

  const {user} = useSelector(state => state.user)
  const dispatch = useDispatch()

  const {t, i18n} = useTranslation('common');

  const logOutHandle = () => {
    if (user) {
      dispatch(userLogout())
      dispatch(clearTodo())
    }
  }

  //so happened
  const languageHandle = () => {
    setScore(score + 1)
    if (score >= data.length - 1) setScore(0)
    i18n.changeLanguage(data[score]);
  }

  return (
      <nav>
        <div className='nav-wrapper container'>
          <a href="/" className="brand-logo">{t('nav_bar.title')}</a>
          <ul id="nav-mobile" className="right">
            <li onClick={() => languageHandle()}>
              <a><i className="material-icons">language</i></a>
            </li>

            {user ? <li><a href='/list'>{user}</a></li> : ''}

            <li onClick={() => logOutHandle()}>
              <a href='/auth'>{user ? t('nav_bar.btn_logOut') : t('nav_bar.btn_logIn')}</a>
            </li>

          </ul>
        </div>
      </nav>
  )
}

NavBar.propTypes = {
  data: PropTypes.array
}
