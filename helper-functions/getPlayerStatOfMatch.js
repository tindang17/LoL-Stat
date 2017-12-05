
function getPlayerStatOfMatch(
  id,
  participants,
  items,
  champions,
  runes,
  gameDuration,
  summonerLevel,
  playerName
) {
  let stats = {};
  stats.gameLength = gameDuration / 60;
  stats.summonerName = playerName;
  stats.summonerLevel = summonerLevel;
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
  stats.creepScorePerMinutes = stats.creepsKilled / stats.gameLength;
  return stats;
}

function getItemNames(stats, itemIds, items) {
  stats.itemNames = [];
  for (let itemIdIndex in itemIds) {
    for (let itemIndex in items) {
      if (Number(itemIds[itemIdIndex]) === Number(items[itemIndex].id)) {
        stats.itemNames.push(items[itemIndex].name);
      }
    }
  }
  return stats;
}

function getChampionNames(stats, champId, champions) {
  for (let championsKey in champions) {
    if (champId === champions[championsKey].id) {
      stats.championName = champions[championsKey].name;
    }
  }
  return stats;
}

function getRuneNames(stats, runeIds, runes) {
  stats.runesName = [];
  for (let runeId of runeIds) {
    for (let runesKey in runes) {
      if (runeId === runes[runesKey].id) {
        stats.runesName.push(runes[runesKey].name);
      }
    }
  }
  return stats;
}

module.exports = getPlayerStatOfMatch;