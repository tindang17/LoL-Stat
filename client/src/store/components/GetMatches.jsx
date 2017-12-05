import React from 'react';
import connect from 'react-redux';
import { getSummonerMatches } from '../actions/index';

const GetSummonerMatches = ({ dispatch }) => {
  let input;

  return (
    <section className='inputForm'>
      <form onSubmit={e =>
        e.preventDefault()
        if (!input.value.trim()) {
          return;
        }

        dispatch(getSummonerMatches(input.value));
        input.value = ''

      }
  )
}