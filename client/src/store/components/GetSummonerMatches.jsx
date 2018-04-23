import React from 'react';
import { connect } from 'react-redux';
import { getSummonerMatches } from '../actions/actions';

let GetSummonerMatches = ({ dispatch }) => {
  let input;
  return <section className="inputForm">
      <form style={{ marginTop: 15 }} onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(getSummonerMatches(input.value));
          input.value = "";
        }}>
        <label>Enter the summoner's name</label>
        <input ref={node => {
            input = node;
          }} required="true" />
        <button type="submit">Click</button>
      </form>
    </section>;
}

GetSummonerMatches = connect()(GetSummonerMatches);

export default GetSummonerMatches;