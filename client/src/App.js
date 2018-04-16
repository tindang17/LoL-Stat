import React, { Component } from 'react';
import './App.css';
import GetSummonerMatches from './store/components/GetSummonerMatches';
import MatchList from './store/components/MatchList';
import Loading from './Loading';
import { connect } from "react-redux";
// import Loading from './Loading';
class App extends Component {
  render() {
    const { isFetching, items } = this.props.matches; 
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Look up the summoner that you want</h1>
        </header>
        <GetSummonerMatches />
        { isFetching ? <Loading /> : <MatchList matches = {items}/> }
      </div>
    );
  }
}

const mapStateToProps = ({ matches }) => ({
  matches
});

export default connect(mapStateToProps)(App);
