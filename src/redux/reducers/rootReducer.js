import { combineReducers } from 'redux'
import { listReducer } from "./listReducer";
import {userReducer} from "./userReducer";

export const rootReducer = combineReducers({ list: listReducer, user: userReducer })
