import {handleActions} from "redux-actions";
import {userChange} from "../actions/user";

export const initialState = {user : '', id : ''};
export const userReducer = handleActions (
    {
      [userChange](state, {payload}) {
        return {user: payload.user, id: payload.id}
      },

    }, initialState
)
