export const SET_MATCHES = 'SET_MATCHES';
export const REQUEST_MATCHES = 'REQUEST_MATCHES';
export function getSummonerMatches(query) {
  return dispatch => {
    dispatch(requestMatches())
    return fetch(`/api/summoner?name=${query}`, {
      accept: "application/json"
    })
    .then(response => response.json())
    .then(results => dispatch(setMatches(results)))
    .catch(err => console.log(err))
  }
}
export function requestMatches() {
  return {
    type: REQUEST_MATCHES
  }
}
export function setMatches(matches) {
  return {
    type: SET_MATCHES,
    matches
  };
}
