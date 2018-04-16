import { SET_MATCHES } from '../actions/actions';
import { REQUEST_MATCHES } from '../actions/actions';
const matches = (state = {isFetching: false, items: []}, action) => {
  switch (action.type) {
    case SET_MATCHES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.matches
      });
    case REQUEST_MATCHES:
      return Object.assign({}, state, {
        isFetching: true
      });
    default:
      return state;
  }
}

export default matches;