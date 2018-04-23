const getData = require("./getData");
// These are functions that will be used to get the data objects that contain the necessary data
module.exports = async function getStaticData(url, err) {
  const data = await getData(url, err);
  switch (data.type) {
    case "item":
      const { data: items } = data;
      console.log(items);
      return items;
      break;
    case "summoner":
      const { data: spells } = data;
      return spells;
      break;
    case "champion":
      const { data: champions } = data;
      return champions;
  }
}
