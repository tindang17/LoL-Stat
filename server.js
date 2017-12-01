require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
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

app.post('/summoner', (req, res) => {
  getItems();
  const results = [];



























// `https://na1.api.riotgames.com/lol/static-data/v3/items?locale=en_US&api_key=${process.env.API_KEY}`
  // results.push(items);
  // rp(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/RiotSchmick?api_key=${process.env.API_KEY}`)
  // .then(firstRes => {
  //   const parsedData = JSON.parse(firstRes);
  //   results.push(parsedData);
  //   rp(`https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${parsedData.accountId}/recent?api_key=${process.env.API_KEY}`)
  //   .then(secRes => {
  //     const secParsedData = JSON.parse(secRes);
  //     const { matches } = secParsedData;
  //     const [ ...latestMatches ] = matches;
  //     // const [ latestMatches ] = matches;
  //     // console.log(results);
  //     for (let i = 0; i <= 1; i++) {
  //       rp(`https://na1.api.riotgames.com/lol/match/v3/matches/${latestMatches[i].gameId}?api_key=${process.env.API_KEY}`)
  //       .then(thirdRes => {
  //         const thirdParsedData = JSON.parse(thirdRes);
  //         results.push(thirdParsedData);
  //       });
  //     }
  //   });
  // });

});

app.listen(3001, () => {
  console.log('server is running on port 3001')
});