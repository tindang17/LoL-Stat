require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const fetch = require('node-fetch');
const request = require("request");
const rp = require("request-promise");
const ENV = process.env.ENV || "development";

//helper-functions
const getItems = require("./helper-functions/getItems");
const getRunes = require("./helper-functions/getRunes");
const getChampions = require("./helper-functions/getChampions");
const getSummonerInfo = require("./helper-functions/getSummonerInfo");
const getRecentMatches = require("./helper-functions/getRecentMatches");
const getMatchDetail = require("./helper-functions/getMatchDetail");

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

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
function filteredData(playerName, match, cb, items, champions, runes) {
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
  // console.log(participants)
  cb(id, participants, items, champions, runes, gameDuration);
}

function getPlayerStatOfMatch(id, participants, items, champions, runes, gameDuration) {
  let stats = {};
  stats.gameLength = gameDuration;
  let playerStats;
  let champId;
  let runeIds = [];
  for (let participant of participants) {
    if (id === participant.participantId) {
      playerStats = participant.stats;
      runeIds.push(participant.spell1Id, participant.spell2Id);
    }
    champId = participant.championId;
  }
  let itemIds = {};
  // get the data that I need
  for (let statKey in playerStats) {
    if (statKey === "win") {
      stats.win = playerStats[statKey];
    }

    if (statKey === "kills") {
      stats.kills = playerStats[statKey];
    }

    if (statKey === "deaths") {
      stats.deaths = playerStats[statKey];
    }

    if (statKey === "assists") {
      stats.assists = playerStats[statKey];
    }

    if (statKey === "totalMinionsKilled") {
      stats.creepsKilled = playerStats[statKey];
    }

    // get the item id to compare with id in the item object;
    if (statKey === "item0") {
      itemIds.item0 = playerStats[statKey];
    }

    if (statKey === "item1") {
      itemIds.item1 = playerStats[statKey];
    }

    if (statKey === "item2") {
      itemIds.item2 = playerStats[statKey];
    }

    if (statKey === "item3") {
      itemIds.item3 = playerStats[statKey];
    }

    if (statKey === "item4") {
      itemIds.item4 = playerStats[statKey];
    }

    if (statKey === "item5") {
      itemIds.item5 = playerStats[statKey];
    }

    if (statKey === "item6") {
      itemIds.item6 = playerStats[statKey];
    }
  }

  getItemNames(stats, itemIds, items);
  getChampionNames(stats, champId, champions);
  getRuneNames(stats, runeIds, runes);
  console.log(stats);
}

function getItemNames(stats, itemIds, items) {
  stats.itemNames = [];
  for (let itemIdIndex in itemIds) {
    for (let itemIndex in items) {
      if (Number(itemIds[itemIdIndex]) === Number(items[itemIndex].id)) {
        stats.itemNames.push(items[itemIndex].name)
      }
    }
  }
  return stats;
}

function getChampionNames(stats, champId, champions) {
  for (let championsKey in champions) {
    // console.log(typeof champId, typeof champions[championsKey].id)
    // console.log(champId, champions[championsKey].id)
    if (champId === champions[championsKey].id) {
      stats.championName = champions[championsKey].name;
    }
  }
  return stats;
}

function getRuneNames(stats, runeIds, runes) {
  stats.runesName = [];
  // console.log('IDDDDDDDD', runeIds);
  // console.log('RUNEEEEEEEE', runes);
  for (let runeId of runeIds) {
    for (let runesKey in runes) {
      if (runeId === runes[runesKey].id) {
        stats.runesName.push(runes[runesKey].name)
      }
    }
  }
  return stats
}

app.post("/summoner", async (req, res) => {
  // get data from client
  let name = req.body.summoner;
  // const results = {};

  let items = await getItemDetails(`https://na1.api.riotgames.com/lol/static-data/v3/items?locale=en_US&api_key=${process.env.API_KEY}`, HttpError);

  // get runes
  let runes = await getRunesDetails(`https://na1.api.riotgames.com/lol/static-data/v3/summoner-spells?locale=en_US&dataById=false&api_key=${process.env.API_KEY}`, HttpError);

  // get champions

  let champions= await getChampionsDetails(`https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&dataById=false&api_key=${process.env.API_KEY}`, HttpError);

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
  // results.matchDetails = [];
  let detail;
  for (let i = 0; i <= 2; i++) {
    detail = await getMatchDetail(
      `https://na1.api.riotgames.com/lol/match/v3/matches/${
        matches[i].gameId
      }?api_key=${process.env.API_KEY}`,
      HttpError
    );
    filteredData(summonerName, detail, getPlayerStatOfMatch, items, champions, runes);
  }

  // res.status(200).json(results);
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});