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

app.post('/summoner', async (req, res) => {
  // get data from client
  const summonerName = req.body.summoner;
  const results = {};

  // get item
  const items = await getItems(`https://na1.api.riotgames.com/lol/static-data/v3/items?locale=en_US&api_key=${process.env.API_KEY}`);
  const { data:itemObj } = items;
  results.itemDetails = itemObj;

  // get runes
  const runes = await getRunes(`https://na1.api.riotgames.com/lol/static-data/v3/runes?locale=en_US&api_key=${process.env.API_KEY}`);
  const { data: runeObj } = runes;
  results.runeDetails = runeObj;

  // get champions
  const champions = await getChampions(`https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&dataById=false&api_key=${process.env.API_KEY}`);
  const { data: championsObj } = champions;
  results.championDetails = championsObj;

  //get summoner
  const summoner = await getSummonerInfo(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonerName}?api_key=${process.env.API_KEY}`);
  results.summonerDetails = summoner;
  const { accountId } = summoner;

  //get match details
  const latestMatches = await getRecentMatches(`https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}/recent?api_key=${process.env.API_KEY}`);
  const { matches } = latestMatches;
  results.matchDetails = [];
  let detail;
  for (let i = 0; i <= 2; i++) {
    detail = await getMatchDetail(`https://na1.api.riotgames.com/lol/match/v3/matches/${matches[i].gameId}?api_key=${process.env.API_KEY}`);
    results.matchDetails.push(detail);
  }

  res.status(200).json(results);
});

app.listen(3001, () => {
  console.log('server is running on port 3001')
});