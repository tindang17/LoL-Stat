// Get Match Detail
module.exports = async function getMatchDetail (url) {
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