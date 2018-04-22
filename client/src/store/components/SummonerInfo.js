import React from "react";
const SummonerInfo = props => (
  <div className="summoner">
    <span>{props.info.name}</span>
    <span>{props.info.level}</span>
  </div>
);

export default SummonerInfo;
