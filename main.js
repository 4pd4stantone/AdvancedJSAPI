//4. (3%) Organize your JavaScript code into at least three (3) different module files, and import functions and data across files as necessary.
import { getDBZData } from "./opponent.js";
import { getPlanet } from "./planet.js";

const fighterSelect = document.getElementById("fighterSelect");

const fighter = document.getElementById("fighter");

const infoDump1 = document.getElementById("infoDump1");

const opponentBtn = document.getElementById("random-opponent");

const backgroundImg = document.getElementById("backgroundImg");

const planetBtn = document.getElementById("planet");

const planetName = document.getElementById("planet-name");

let gameStarted = false;

async function getFighterNames() {
  changePlanet();
  const fighterItems = await getDBZData();

  // console.log(fighterItems[0].ki);
  //2. (15%) Create user interaction with the API through a search feature, paginated gallery, or similar. This feature should use GET requests to retrieve associated data.
  fighterItems.forEach((fighter) => {
    if (fighter.ki == "0" || fighter.ki == "unknown") {
      // return console.log(fighter.ki);
    } else {
      const options = document.createElement("option");
      fighterSelect.appendChild(options);
      options.value = fighter.name;
      options.textContent = fighter.name;
    }
  });
  getFighterImg();
}

getFighterNames();

fighterSelect.addEventListener("change", getFighterImg);
fighterSelect.addEventListener("change", async () => {
  powerDamage = await fighterPowerDamage();
  console.log(powerDamage);
});

//3. (15%) Make use of Promises and async/await syntax as appropriate.

async function getFighterImg() {
  if (gameStarted) return; 
  const fighterImg = await getDBZData();
  // console.log(fighterImg);
  let fighterId = fighterSelect.value;
  // console.log(fighterImg);
  let fighterKi = null;

  fighterImg.forEach((character) => {
    if (character.name === fighterId) {
      // removing the flipping of images using the style transform css attribute
      fighter.style.transform = "";
      fighter.src = character.image;
      // console.log(character)
      let name = character.name;
      let race = character.race;
      let gender = character.gender;
      let ki = character.ki; // need to remove dots and turn into a number
      fighterKi = ki;
      let maxKi = character.maxKi;
      infoDump1.innerHTML = `<h1 class="white" id="fighter-name">${name}</h1><h2 class="yellow">${race} - ${gender}</h2><h2 class="white" id="fighter-ki">KI: ${ki}</h2><h2 class="white">maxKi: ${maxKi}</h2>`;

      // array and forEach to flip some images to face opponent.
      let array = [
        3, 5, 9, 14, 15, 16, 19, 20, 22, 23, 25, 33, 40, 43, 63, 64, 65, 66, 69,
        70, 71, 72, 73, 74, 75,
      ];
      array.forEach((num) => {
        if (character.id === num) {
          fighter.style.transform = "scaleX(-1)";
        }
      });
    }
  });

  return fighterKi;
}

opponentBtn.addEventListener("click", getOpponentImg);
opponentBtn.addEventListener("click", startGame);

async function getOpponentImg() {
  if (gameStarted) return; 
  const opponentImg = await getDBZData();
  let i = Math.floor(Math.random() * 47);
  console.log(typeof i);
  console.log(opponentImg[i].name);
  let fighterId = fighterSelect.value;
  console.log(fighterId);
  if (
    opponentImg[i].ki == "0" ||
    opponentImg[i].ki == "unknown" ||
    fighterId == opponentImg[i].name
  ) {
    getOpponentImg();
  } else {
    opponent.style.transform = "";
    opponent.src = opponentImg[i].image;
    let name = opponentImg[i].name;
    let race = opponentImg[i].race;
    let gender = opponentImg[i].gender;
    let ki = opponentImg[i].ki; // need to remove dots and turn into a number
    let maxKi = opponentImg[i].maxKi;
    infoDump2.innerHTML = `<h1 class="white" id="fighter-name">${name}</h1><h2 class="yellow">${race} - ${gender}</h2><h2 class="white">KI: ${ki}</h2><h2 class="white">maxKi: ${maxKi}</h2>`;
    let array = [0, 1, 17, 23, 35, 36, 37, 41, 47];
    array.forEach((num) => {
      if (i == num) {
        opponent.style.transform = "scaleX(-1)";
      }
    });
  }
}

planetBtn.addEventListener("click", changePlanet);

let i = 0;

async function changePlanet() {
  if (gameStarted) return; 
  const planetImg = await getPlanet();
  const imgUrl = planetImg[i].image;
  // console.log(planetImg)
  backgroundImg.style.backgroundImage = `url(${imgUrl})`;
  backgroundImg.style.backgroundSize = "cover";
  backgroundImg.style.backgroundRepeat = "no-repeat";
  backgroundImg.style.backgroundPosition = "center";
  planetName.textContent = "";
  let namePlanet = planetImg[i].name;
  if (namePlanet == "Tierra") {
    planetName.textContent = `Earth`;
  } else {
    planetName.textContent = `${namePlanet}`;
  }
  if (i < 9) {
    i += 1;
    return i;
  } else {
    i = 0;
    return i;
  }
}

// Getting the curent fighter Ki
let currentFighterKi = null;

async function getFighterKi() {
  currentFighterKi = await getFighterImg();
  return currentFighterKi;
}

// const unitDamage = {
//   hundreds: 0.01,
//   thousand: 0.05,
//   million: 0.1,
//   billion: 0.2,
//   trillion: 0.3,
//   quadrillion: 0.4,
//   quintillion: 0.5,
//   sextillion: 0.6,
//   septillion: 0.7,
//   googolplex: 0.8,
// };

let powerDamage = null;

async function fighterPowerDamage() {
  let fighterKi = await getFighterKi();
  let lowerCase = String(fighterKi).toLowerCase();
  if (lowerCase.includes("googolplex")) {
    powerDamage = 0.8;
    return powerDamage;
  } else if (lowerCase.includes("septillion")) {
    powerDamage = 0.7;
    return powerDamage;
  } else if (lowerCase.includes("sextillion")) {
    powerDamage = 0.6;
    return powerDamage;
  } else if (lowerCase.includes("quintillion")) {
    powerDamage = 0.5;
    return powerDamage;
  } else if (lowerCase.includes("quadrillion")) {
    powerDamage = 0.4;
    return powerDamage;
  } else if (lowerCase.includes("trillion")) {
    powerDamage = 0.3;
    return powerDamage;
  } else if (lowerCase.includes("billion")) {
    powerDamage = 0.2;
    return powerDamage;
  } else {
      let rawKiNumb = Number(fighterKi.replaceAll(/[\s.,]/g, ""));
      console.log(rawKiNumb);
      if (rawKiNumb < 1000) {
        powerDamage = 0.01;
        return powerDamage;
      } else if (rawKiNumb < 1000000) {
        powerDamage = 0.05;
        return powerDamage;
      } else {
        powerDamage = 0.1;
        return powerDamage
      }
    }
  }


// to get the fighterPowerDamage of the initial character, if new character selected the fighterPowerDamage is updated via the eventlistener.
powerDamage = await fighterPowerDamage();
console.log(powerDamage)

let attackBtn = document.getElementById('attack');
attackBtn.addEventListener('click', attack)
let transformationBtn = document.getElementById('transformation');
transformationBtn.disabled = true;
attackBtn.disabled = true;

async function startGame () {
    gameStarted = true;
    fighterSelect.disabled = true;
    planetBtn.disabled = true;
    opponentBtn.disabled = true;
    
    let fighterId = fighterSelect.value;
    setTimeout(() => {
    window.alert(`${fighterId}!!! Defeat 7 enemies to get all 7 dragonballs to save the world!!! \n Use the attack button to defeat your enemies!!! \n You have 3 senzo beans to get your health points back to 100%, use them wisely! \n After you defeat an enemy you also have the option to go through a transformation to level up your powers if available. \n Good Luck!`);
    attackBtn.disabled = false;
    }, 1000);
    
    

    
}

function attack() {


    }



// (not an obligation) Enable user manipulation of data within the API through the use of POST, PUT, or PATCH requests. Ensure your chosen API supports this feature before beginning.

//5. (5%) Ensure the program runs as expected, without any undesired behavior caused by misunderstanding of the JavaScript event loop (such as race conditions, API calls being handled out of order, etc.).

//6. (5%) Create an engaging user experience through the use of HTML and CSS.

//7. (10%) Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).

//8. (5%) Commit frequently to the git repository. So far 9 commits.

//9. (2%) Include a README file that contains a description of your application.

//10. (5%) Level of effort displayed in creativity, presentation, and user experience.
