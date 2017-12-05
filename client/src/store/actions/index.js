export const GET_MATCHES = 'GET_MATCHES';

export function getSummonerMatches(name) {
  return dispatch => {
    const options = {
      method: 'POST',
      credential: 'omit',
      body: JSON.stringify({
        summoner: name
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(`http://localhost:3001/summoner`, options)
    .then(res => res.json())
    .then(res => res.results)
    .then(matches =>
      dispatch(getMatches(matches))
    )
    .catch(err => console.log(err)
  };
}

export function getMatches(matches) {
  return {
    type: GET_MATCHES,
    matches
  };
}