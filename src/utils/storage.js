import {initialState} from "../redux/reducers/listReducer";

export const save = (state) => {
  try {
    return localStorage.setItem('state', JSON.stringify(state))
  } catch (e) {
    console.error('Error localstorage', e)
    return initialState
  }
};

export const load = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (!serializedState) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState;
  }
}
