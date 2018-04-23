require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const rp = require("request-promise");
const ENV = process.env.ENV || "development";
const PORT = process.env.PORT || 3001;
const path = require('path');
const API_KEY =
  process.env.API_KEY;

//helper-functions
const getData = require("./helper-functions/getData");
const getStaticData = require("./helper-functions/getStaticData");
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


/*
  The function filteredData's job is the first step of extracting the nested data in the object.
  First it will compare the summoner name in the participantsIdentities object with the playerName
  that is provided to it. If the name match, the participant Id will be returned.
  The participant Id will be used as the reference point to extract other info.
  We then call the getPlayerStatOfMatch callback to get the player stat of the particular match.
*/
function filteredData(
  playerName,
  match,
  cb,
  items,
  champions,
  spells,
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
  let result = cb(
    id,
    participants,
    items,
    champions,
    spells,
    gameDuration,
    summonerLevel,
    playerName,
    gameId
  );
  return result;
}

app.get("/api/summoner", async (req, res) => {
  // get data from client
  let { name } = req.query;
  let results = [];
  let items = await getStaticData(
    `https://na1.api.riotgames.com/lol/static-data/v3/items?locale=en_US&itemListData=image&api_key=${
      API_KEY
    }`,
    HttpError
  );

  // get spells
  let spells = await getStaticData(
    `https://na1.api.riotgames.com/lol/static-data/v3/summoner-spells?locale=en_US&spellListData=image&dataById=false&api_key=${
      API_KEY
    }`,
    HttpError
  );

  // get champions

  let champions = await getStaticData(
    `https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&championListData=image&dataById=false&api_key=${
      API_KEY
    }`,
    HttpError
  );

  //get summoner
  const summoner = await getData(
    `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${
      name
    }?api_key=${API_KEY}`,
    HttpError
  );
  let { name: summonerName, summonerLevel } = summoner;
  const { accountId } = summoner;
  //get match details
  const latestMatches = await getData(
    `https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${
      accountId
    }/recent?api_key=${API_KEY}`,
    HttpError
  );
  const { matches } = latestMatches;
  let detail;
  let gameId;
   // The gameId is assigned value inside the loop so that we can get multiple game ids.
  for (let i = 0; i <= 3; i++) {
    gameId = matches[i].gameId;
    detail = await getData(
      `https://na1.api.riotgames.com/lol/match/v3/matches/${
        gameId
      }?api_key=${API_KEY}`,
      HttpError
    );
    results.push(
      filteredData(
        summonerName,
        detail,
        getPlayerStatOfMatch,
        items,
        champions,
        spells,
        summonerLevel,
        gameId
      )
    );
  }
  res.json(results).status(200);
});

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log("server is running on port 3001");
});