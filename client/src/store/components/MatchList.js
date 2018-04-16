import React from 'react';
import Match from './Match';

const MatchList = (props) => {
  const {matches} = props;
  return (
    <div id='match-list' className='col-md-6'>
      {matches.map(match =>
        <section style={{ 'display': 'inline-block', 'verticalAlign': 'text-top' }} key={match.gameId}>{Match(match)}</section>
      )}
    </div>
  );
}

export default MatchList;