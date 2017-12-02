require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const fetch = require('node-fetch');
const request = require('request');
const rp = require('request-promise');
const ENV = process.env.ENV || "development";

//helper-functions
const getItems = require('./helper-functions/getItems');
const getRunes = require('./helper-functions/getRunes');
const getChampions = require('./helper-functions/getChampions');
const getSummonerInfo = require('./helper-functions/getSummonerInfo');
const getRecentMatches = require('./helper-functions/getRecentMatches');
const getMatchDetail = require('./helper-functions/getMatchDetail');

// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function getItemDetails (url, err) {
  const data = await getItems(url, err);
  const { data: items } = data;
  return items;
}
async function getRunesDetails (url, err) {
  const data = await getRunes(url, err);
  const { data: runes } = data;
  return runes
}
async function getChampionsDetails (url, err) {
  const data = await getChampions(url, err);
  const { data: champions } = data;
  return champions
}



// function filteredItem (items, match, summoner) {
//   const { participantIdentities } = match;
//   // for (let key in items)
// }

app.post('/summoner', async (req, res) => {
  // get data from client
  let summonerName = req.body.summoner;
  // const results = {};

  // const items = await getItemDetails(`https://na1.api.riotgames.com/lol/static-data/v3/items?locale=en_US&api_key=${process.env.API_KEY}`, HttpError)

  // // get runes
  // const runes = await getRunesDetails(`https://na1.api.riotgames.com/lol/static-data/v3/runes?locale=en_US&api_key=${process.env.API_KEY}`, HttpError);

  // // // get champions
  // const champions = await getChampionsDetails(`https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&dataById=false&api_key=${process.env.API_KEY}`, HttpError);

  //get summoner
  const summoner = await getSummonerInfo(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonerName}?api_key=${process.env.API_KEY}`, HttpError);
  const { name, summonerLevel } = summoner;
  const { accountId } = summoner;

  //get match details
  const latestMatches = await getRecentMatches(`https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}/recent?api_key=${process.env.API_KEY}`, HttpError);
  const { matches } = latestMatches;
  // results.matchDetails = [];
  let detail;
  for (let i = 0; i <= 2; i++) {
    detail = await getMatchDetail(`https://na1.api.riotgames.com/lol/match/v3/matches/${matches[i].gameId}?api_key=${process.env.API_KEY}`, HttpError);
  }
  // res.status(200).json(results);
});

app.listen(3001, () => {
  console.log('server is running on port 3001')
});