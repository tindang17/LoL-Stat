import React from 'react';
import { connect } from 'react-redux';
import { getSummonerMatches } from '../actions/index';

let GetSummonerMatches = ({ dispatch }) => {
  let input;

  return (
    <section className='inputForm'>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return;
        }

        dispatch(getSummonerMatches(input.value));
        input.value = ''

        }}
      >
        <input
          ref={node => {
            input = node
          }}
        />
        <button type='submit'>
          Click
        </button>
      </form>
    </section>
  );
}

GetSummonerMatches = connect()(GetSummonerMatches);

export default GetSummonerMatches;