export {getDBZData, getPlanet};

async function getDBZData() {
  const response = await fetch(
    "https://dragonball-api.com/api/characters?page=1&limit=58"
  );
  const fighterData = await response.json();
  const fighterItems = fighterData.items;
  return fighterItems
}

getDBZData()

async function getPlanet() {
  const response = await fetch(
    "https://dragonball-api.com/api/planets"
  );
  const planetData = await response.json();
  const planetItems = planetData.items;
  return planetItems
}

getPlanet()

