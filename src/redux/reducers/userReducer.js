import {handleActions} from "redux-actions";
import {userChange, userLogout} from "../actions/user";

export const initialState = {user : '', id : ''};
export const userReducer = handleActions (
    {
      [userChange](state, {payload}) {
        return {user: payload.user, id: payload.id}
      },
      [userLogout](state, {payload}) {
        return {...state, user: '', id: ''}
      }

    }, initialState
)
