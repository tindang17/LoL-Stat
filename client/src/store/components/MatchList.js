import React, { Fragment } from 'react';
import SummonerInfo from './SummonerInfo';
import Match from './Match';
const MatchList = (props) => {
  const {matches} = props;
  let name;
  let level;
  if (matches[matches.length - 1]!== undefined) {
    name = matches[0].summonerName;
    level = `Level: ${matches[0].summonerLevel}`;
  } else {
    name = '';
    level = '';
  }
  return (
    <Fragment>
      <SummonerInfo info={{name, level}} />
      <div id='match-list' className='col-md-6'>
        {matches.map(match => {
          return (
            <section style={{ 'display': 'inline-block', 'verticalAlign': 'text-top' }} key={match.gameId}>{Match(match)}</section>
          )})
        }
      </div>
    </Fragment>
  );
}

export default MatchList;