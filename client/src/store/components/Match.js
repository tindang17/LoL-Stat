import React from 'react';

const Match = (match) => {
  let {
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
      <p>Match result: {win === true ?
        win = 'win': 'lose'
      }</p>
      <div>
        <span>Kills: {kills}</span>
        <span className="spanStat">Deaths: {deaths}</span>
        <span className="spanStat">Assists: {assists}</span>
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
      <p>Creep Score Per Minute: {creepScorePerMinutes}</p>
      <p>Game Length: {gameLength} minutes</p>
    </article>
  )
};

export default Match;