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

  const spanStyle = {
    marginLeft: 10
  }

  const textAlign = {
    textAlign: 'left'
  }

  const sectionStyle = {
    textAlign: 'left',
    marginLeft: 20,
    marginTop: 20
  }
  return (
    <article style={sectionStyle} className='match-stats'>
      <div>
        <span>Name: {summonerName}</span>
        <span style={spanStyle}>level: {summonerLevel}</span>
      </div>
      <p>Match result: {win === true ?
        win = 'win': 'lose'
      }</p>
      <div>
        <span>kills: {kills}</span>
        <span style={spanStyle}>deaths: {deaths}</span>
        <span style={spanStyle}>assists: {assists}</span>
      </div>
      <p>Creeps Killed: {creepsKilled}</p>
      <p>Champion: {championName}</p>
      Item Bought:
      <ul style={textAlign}>
        {itemNames.map(name =>
          <li>{name}</li>
        )}
      </ul>
      Runes used:
      <ul style={textAlign}>
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