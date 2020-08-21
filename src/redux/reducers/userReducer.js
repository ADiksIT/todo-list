import { handleActions } from "redux-actions";
import { userChange, userLogout, userStatus } from "../actions/user";

export const initialState = {user : '', id : '', auth: false, status: false};
export const userReducer = handleActions (
    {
      [userChange](state, {payload}) {
        return {...state, user: payload.user, id: payload.id, auth: true}
      },
      [userLogout](state, _) {
        return {...state, user: '', id: '', auth: false}
      },
      [userStatus](state, _) {
        return {...state, status: !state.status}
      }
    }, initialState
)
