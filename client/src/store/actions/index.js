export const SET_MATCHES = 'SET_MATCHES';

export function getSummonerMatches(query) {
  return dispatch => {
    fetch(`/api/summoner?name=${query}`, {
      accept: "application/json"
    })
    .then(response => {
      return response.json();
    })
    .then(results => {
      dispatch(setMatches(results))
    })
    .catch(err => console.log(err))
  }
}

export function setMatches(matches) {
  return {
    type: SET_MATCHES,
    matches
  };
}