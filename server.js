require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const rp = require("request-promise");
const ENV = process.env.ENV || "development";
const PORT = process.env.PORT || 3001;
const path = require('path');

//helper-functions
const getItems = require("./helper-functions/getItems");
const getRunes = require("./helper-functions/getRunes");
const getChampions = require("./helper-functions/getChampions");
const getSummonerInfo = require("./helper-functions/getSummonerInfo");
const getRecentMatches = require("./helper-functions/getRecentMatches");
const getMatchDetail = require("./helper-functions/getMatchDetail");
const getPlayerStatOfMatch = require("./helper-functions/getPlayerStatOfMatch");
// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, './client/build')));

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

async function getItemDetails(url, err) {
  const data = await getItems(url, err);
  const { data: items } = data;
  return items;
}
async function getRunesDetails(url, err) {
  const data = await getRunes(url, err);
  const { data: runes } = data;
  return runes;
}
async function getChampionsDetails(url, err) {
  const data = await getChampions(url, err);
  const { data: champions } = data;
  return champions;
}
// filtering data in match object
function filteredData(
  playerName,
  match,
  cb,
  items,
  champions,
  runes,
  summonerLevel,
  gameId
) {
  const { participantIdentities } = match;
  const { participants } = match;
  const { gameDuration } = match;
  let id;
  for (let info of participantIdentities) {
    if (info.player.summonerName === playerName) {
      id = info.participantId;
      break;
    }
  }
  let filteredData = cb(
    id,
    participants,
    items,
    champions,
    runes,
    gameDuration,
    summonerLevel,
    playerName,
    gameId
  );
  return filteredData;
}

app.get("/api/summoner", async (req, res) => {
  // get data from client
  let { name } = req.query;
  let results = [];
  let items = await getItemDetails(
    `https://na1.api.riotgames.com/lol/static-data/v3/items?locale=en_US&api_key=${
      process.env.API_KEY
    }`,
    HttpError
  );

  // get runes
  let runes = await getRunesDetails(
    `https://na1.api.riotgames.com/lol/static-data/v3/summoner-spells?locale=en_US&dataById=false&api_key=${
      process.env.API_KEY
    }`,
    HttpError
  );

  // get champions

  let champions = await getChampionsDetails(
    `https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&dataById=false&api_key=${
      process.env.API_KEY
    }`,
    HttpError
  );

  //get summoner
  const summoner = await getSummonerInfo(
    `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${
      name
    }?api_key=${process.env.API_KEY}`,
    HttpError
  );
  const { name: summonerName, summonerLevel } = summoner;
  const { accountId } = summoner;

  //get match details
  const latestMatches = await getRecentMatches(
    `https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${
      accountId
    }/recent?api_key=${process.env.API_KEY}`,
    HttpError
  );
  const { matches } = latestMatches;
  let detail;
  let gameId;
  for (let i = 0; i <= 3; i++) {
    gameId = matches[i].gameId;
    detail = await getMatchDetail(
      `https://na1.api.riotgames.com/lol/match/v3/matches/${
        gameId
      }?api_key=${process.env.API_KEY}`,
      HttpError
    );
    results.push(
      filteredData(
        summonerName,
        detail,
        getPlayerStatOfMatch,
        items,
        champions,
        runes,
        summonerLevel,
        gameId
      )
    );
  }
  console.log(results);
  res.json(results).status(200);
});

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log("server is running on port 3001");
});