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
    <section style={sectionStyle} className='match-stats'>
      <div>
        <span>Name: {summonerName}</span>
        <span style={spanStyle}>level: {summonerLevel}</span>
      </div>
      <p>win: {win === true ?
        win = 'win': 'lose'
      }</p>
      <div>
        <span>kills: {kills}</span>
        <span style={spanStyle}>deaths: {deaths}</span>
        <span style={spanStyle}>assists: {assists}</span>
      </div>
      <p>creepKilled: {creepsKilled}</p>
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
      <p>Game Length: {gameLength}</p>
    </section>
  )
};

export default Match;