import { SET_MATCHES } from '../actions/index'
const matches = (state = [], action) => {
  switch (action.type) {
    case SET_MATCHES:
      return action.matches;
    default:
      return state;
  }
}

export default matches;