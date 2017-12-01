require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const request = require('request');
const rp = require('request-promise');
// const http2 = require('http2')
const ENV = process.env.ENV || "development";
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

async function getItems () {
  try {
    let response = await fetch(`https://na1.api.riotgames.com/lol/static-data/v3/items?locale=en_US&api_key=${process.env.API_KEY}`)
    let data = await response.json();
    console.log(data);
  } catch (err) {
    throw err;
  }
}

app.post('/summoner', (req, res) => {
  getItems();
  const results = [];
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