import React from 'react';
import { connect } from 'react-redux';
import Match from './Match';

const MatchList = ({ matches }) => {
  return (
  <div id='match-list' className='col-md-6'>
    {matches.map(match =>
      <article style={{ 'display': 'inline-block' }}key={match.gameId}>{Match(match)}</article>
    )}
  </div>
  );
}

const mapStateToProps = ({ matches }) => ({
  matches
});

export default connect(mapStateToProps)(MatchList);