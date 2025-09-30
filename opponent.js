export {getDBZData, getTransformationData};

async function getDBZData() {
  const response = await fetch(
    "https://dragonball-api.com/api/characters?page=1&limit=58"
  );
  const fighterData = await response.json();
  const fighterItems = fighterData.items;
  return fighterItems
}

getDBZData()

async function getTransformationData() {
  const response = await fetch(
    "https://dragonball-api.com/api/characters/"
  );
  const transformData = await response.json();
  const transformItems = transformData.items;
  return transformItems
}

getTransformationData()



