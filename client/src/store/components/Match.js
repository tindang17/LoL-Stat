import React from 'react';

const Match = (match) => {
  let {
    summonerName,
    summonerLevel,
    gameLength,
    win,
    kills,
    deaths,
    assists,
    creepsKilled,
    itemNames,
    championName,
    runesName,
    creepScorePerMinutes } = match;

  return (
    <article className='match-stats'>
      <div>
        <span className="spanStat">Name: {summonerName}</span>
        <span className="spanStat">level: {summonerLevel}</span>
      </div>
      <p>Match result: {win === true ?
        win = 'win': 'lose'
      }</p>
      <div>
        <span>kills: {kills}</span>
        <span className="spanStat">deaths: {deaths}</span>
        <span className="spanStat">assists: {assists}</span>
      </div>
      <p>Creeps Killed: {creepsKilled}</p>
      <p>Champion: {championName}</p>
      Item Bought:
      <ul className="list items">
        {itemNames.map(name =>
          <li>{name}</li>
        )}
      </ul>
      Runes used:
      <ul className="list runes">
        {runesName.map(name =>
          <li>{name}</li>
        )}
      </ul>
      <p>creepScorePerMinutes: {creepScorePerMinutes}</p>
      <p>Game Length: {gameLength} minutes</p>
    </article>
  )
};

export default Match;