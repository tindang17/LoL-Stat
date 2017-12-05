// Get Champions
const fetch = require('node-fetch');
module.exports = async function getChampions (url, HttpError) {
  const options = {
    headers: {
      "Retry-After": 10
    }
  }
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
    } else {
    throw new HttpError(response);
  }
}