import { GET_MATCHES } from '../actions/index'
const matches = (state = [], action) => {
  switch (action.type) {
    case GET_MATCHES:
      return action.matches;
    default:
      return state;
  }
}