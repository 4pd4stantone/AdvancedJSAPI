export {getPlanet};




async function getPlanet() {
  const response = await fetch(
    "https://dragonball-api.com/api/planets"
  );
  const planetData = await response.json();
  const planetItems = planetData.items;
  return planetItems
}

getPlanet()