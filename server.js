require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const rp = require('request-promise');
const ENV = process.env.ENV || "development";
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/summoner', (req, res) => {
  rp(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/RiotSchmick?api_key=${process.env.API_KEY}`)
  .then(response => {
    const parsedData = JSON.parse(response);
    rp(`https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${parsedData.accountId}/recent?api_key=${process.env.API_KEY}`)
    .then(response => {
      const parsedData = JSON.parse(response);
      const { matches } = parsedData;

      // rp(`https://na1.api.riotgames.com/lol/match/v3/matches/${parsedData.gameId}?api_key=${process.env.API_KEY}`)
      // .then(response => console.log(JSON.parse(response)));
    });
  });
});

app.listen(3001, () => {
  console.log('server is running on port 3001')
});