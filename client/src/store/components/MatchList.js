import React from 'react';
import { connect } from 'react-redux';
import Match from './Match';

const MatchList = ({ matches }) => {
  return (
    <div id='match-list' className='col-md-6'>
      {matches.map(match =>
        <section style={{ 'display': 'inline-block', 'verticalAlign': 'text-top' }} key={match.gameId}>{Match(match)}</section>
      )}
    </div>
  );
}

const mapStateToProps = ({ matches }) => ({
  matches
});

export default connect(mapStateToProps)(MatchList);