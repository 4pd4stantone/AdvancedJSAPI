//4. (3%) Organize your JavaScript code into at least three (3) different module files, and import functions and data across files as necessary.
import { getDBZData, getTransformationData } from "./opponent.js";
import { getPlanet } from "./planet.js";

const fighterSelect = document.getElementById("fighterSelect");

const fighter = document.getElementById("fighter");

const infoDump1 = document.getElementById("infoDump1");

const opponentBtn = document.getElementById("random-opponent");

const backgroundImg = document.getElementById("backgroundImg");

const planetBtn = document.getElementById("planet");

const planetName = document.getElementById("planet-name");

const opponentHealth = document.getElementById("opponent-health");

const fighterHealth = document.getElementById("fighter-health");

// const fighterName = document.getElementById("fighter-name")

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

let fighterName = null;

async function getFighterImg() {
  if (gameStarted) return;
  const fighterImg = await getDBZData();
  // console.log(fighterImg);
  let fighterId = fighterSelect.value;
  // console.log(fighterId);
  let fighterKi = null;

  fighterImg.forEach((character) => {
    if (character.name === fighterId) {
      fighterName = character.name;
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

async function getOpponentImg(opponentHealthPct) {
  if (gameStarted && opponentHealthPct > 0) return;
  const opponentImg = await getDBZData();
  let i = Math.floor(Math.random() * 47);
  console.log(typeof i);
  console.log(opponentImg[i].name);
  let fighterId = fighterSelect.value;
  console.log(fighterId);
  let opponentKi = null;
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
    opponentKi = opponentImg[i].ki;
    let maxKi = opponentImg[i].maxKi;
    infoDump2.innerHTML = `<h1 class="white" id="fighter-name">${name}</h1><h2 class="yellow">${race} - ${gender}</h2><h2 class="white">KI: ${opponentKi}</h2><h2 class="white">maxKi: ${maxKi}</h2>`;
    let array = [0, 1, 17, 23, 35, 36, 37, 41, 47];
    array.forEach((num) => {
      if (i == num) {
        opponent.style.transform = "scaleX(-1)";
      }
    });
  }
  return opponentKi;
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

let currentOpponentKi = null;

async function getOpponentKi() {
  currentOpponentKi = await getOpponentImg();
  return currentOpponentKi;
}

// const unitDamage = {
//   hundreds: 0.10,
//   thousand: 0.15,
//   million: 0.20,
//   billion: 0.25,
//   trillion: 0.30,
//   quadrillion: 0.35,
//   quintillion: 0.40,
//   sextillion: 0.45,
//   septillion: 0.50,
//   googolplex: 0.55,
// };

let powerDamage = null;

async function fighterPowerDamage() {
  let fighterKi = await getFighterKi();
  let lowerCase = String(fighterKi).toLowerCase();
  if (lowerCase.includes("googolplex")) {
    powerDamage = 0.55;
    return powerDamage;
  } else if (lowerCase.includes("septillion")) {
    powerDamage = 0.5;
    return powerDamage;
  } else if (lowerCase.includes("sextillion")) {
    powerDamage = 0.45;
    return powerDamage;
  } else if (lowerCase.includes("quintillion")) {
    powerDamage = 0.40;
    return powerDamage;
  } else if (lowerCase.includes("quadrillion")) {
    powerDamage = 0.35;
    return powerDamage;
  } else if (lowerCase.includes("trillion")) {
    powerDamage = 0.30;
    return powerDamage;
  } else if (lowerCase.includes("billion")) {
    powerDamage = 0.25;
    return powerDamage;
  } else {
    let rawKiNumb = Number(fighterKi.replaceAll(/[\s.,]/g, ""));
    console.log(rawKiNumb);
    if (rawKiNumb < 1000) {
      powerDamage = 0.10;
      return powerDamage;
    } else if (rawKiNumb < 1000000) {
      powerDamage = 0.15;
      return powerDamage;
    } else {
      powerDamage = 0.2;
      return powerDamage;
    }
  }
}

powerDamage = await fighterPowerDamage();
console.log(powerDamage);

let oPowerDamage = null;

async function opponentPowerDamage() {
  let opponentKi = await getOpponentKi();
  let lowerCase = String(opponentKi).toLowerCase();
  if (lowerCase.includes("googolplex")) {
    oPowerDamage = 0.55;
    return oPowerDamage;
  } else if (lowerCase.includes("septillion")) {
    oPowerDamage = 0.5;
    return oPowerDamage;
  } else if (lowerCase.includes("sextillion")) {
    oPowerDamage = 0.45;
    return oPowerDamage;
  } else if (lowerCase.includes("quintillion")) {
    oPowerDamage = 0.4;
    return oPowerDamage;
  } else if (lowerCase.includes("quadrillion")) {
    oPowerDamage = 0.35;
    return oPowerDamage;
  } else if (lowerCase.includes("trillion")) {
    oPowerDamage = 0.3;
    return oPowerDamage;
  } else if (lowerCase.includes("billion")) {
    oPowerDamage = 0.25;
    return oPowerDamage;
  } else {
    if (opponentKi == null || opponentKi == NaN) {
      console.log(opponentKi);
      startGame();
    } else {
      let rawKiNumb = Number(opponentKi.replaceAll(/[\s.,]/g, ""));
      console.log(rawKiNumb);
      if (rawKiNumb < 1000) {
        oPowerDamage = 0.1;
        return oPowerDamage;
      } else if (rawKiNumb < 1000000) {
        oPowerDamage = 0.15;
        return oPowerDamage;
      } else {
        oPowerDamage = 0.2;
        return oPowerDamage;
      }
    }
  }
}

// to get the fighterPowerDamage of the initial character, if new character selected the fighterPowerDamage is updated via the eventlistener.

let attackBtn = document.getElementById("attack");
attackBtn.addEventListener("click", attack);
let transformationBtn = document.getElementById("transformation");
transformationBtn.disabled = true;
attackBtn.disabled = true;


async function startGame() {
  oPowerDamage = await opponentPowerDamage();
  console.log(oPowerDamage);
  gameStarted = true;
  fighterSelect.disabled = true;
  planetBtn.disabled = true;
  opponentBtn.disabled = true;

  let fighterId = fighterSelect.value;
  setTimeout(() => {
    window.alert(
  `${fighterId}! Collect all 7 Dragon Balls by defeating 7 enemies to save the world.\n` +
  `Use the Attack button to fight.\n` +
  `You have 3 Senzu Beans; each restores your health to 100%, so use them wisely.\n` +
  `Transform to boost your power whenever you can (Only 7 characters are able to use transformation).\n` +
  `Good luck!`
);
    attackBtn.disabled = false;
  }, 1000);
}

let sphere = document.getElementById("sphere");
let sphere2 = document.getElementById("sphere2");
sphere.addEventListener("click", attack);

let shenron = document.getElementById("shenron")

let opponentHealthPct = 100;
let fighterHealthPct = 100;
let opponentNum = 1;

async function attack() {
  attackBtn.disabled = true;
  if (opponentHealthPct > 0) {
    if (Math.random() < 0.50) {
      sphere.classList.add("animated-hit");
      setTimeout(() => {
        sphere.classList.remove("animated-hit");
      }, 2000);
      setTimeout(() => {
        window.alert(`💥 You did some damage to your opponent!`);
        const damagePct = 100 * powerDamage;
        opponentHealthPct = Math.max(0, opponentHealthPct - damagePct);
        if (opponentHealthPct === 0 && opponentNum < 7) {
          if (fighterName === "Goku" || fighterName === "Vegeta" || fighterName === "Piccolo" ||
            fighterName === "Freezer" ||fighterName === "Zarbon" ||fighterName === "Celula" ||
            fighterName === "Gohan") {
          transformationBtn.disabled = false;
          } else if (powerDamage <= 0.1) {
            fighterHealthPct = 100;
            fighterHealth.style.width = fighterHealthPct + "%";
            fighterHealth.textContent = fighterHealthPct + "%";
            powerDamage = powerDamage*2;
          } else if (powerDamage <= 0.15) {
            fighterHealthPct = Math.min(100, fighterHealthPct + 25);
            fighterHealth.style.width = fighterHealthPct + "%";
            fighterHealth.textContent = fighterHealthPct + "%";
            powerDamage = powerDamage*1.5;
          } else if (powerDamage <= 0.2) {
            fighterHealthPct = Math.min(100, fighterHealthPct + 15);
            fighterHealth.style.width = fighterHealthPct + "%";
            fighterHealth.textContent = fighterHealthPct + "%";
            powerDamage = powerDamage*1.25;
          } else if (powerDamage <= 0.25) {
            fighterHealthPct = Math.min(100, fighterHealthPct + 10);
            fighterHealth.style.width = fighterHealthPct + "%";
            fighterHealth.textContent = fighterHealthPct + "%";
            powerDamage = powerDamage*1.1;
          }
          for (let i = 0; i < opponentNum; i++) {
            let dragonBall = i + 1;
            document.getElementById("ball" + dragonBall).src = `ball${dragonBall}.png`;
          }
          window.alert(`Good Job! You defeated your opponent! Here is you next opponent!`);
          getOpponentImg(opponentHealthPct);
          opponentPowerDamage();
          opponentHealthPct = 100;
          opponentNum++;
        } else if (opponentHealthPct === 0 && opponentNum === 7) {
          shenron.src = "shenron.png"
          shenron.classList.add("dragon-grow")
          setTimeout(() => {window.alert(`Congratulations! You collected all 7 Dragon Balls and saved the planet!`)},2000);
          setTimeout(()=> {
                location.reload();
              }, 2000)
        }
        opponentHealth.style.width = opponentHealthPct + "%";
        opponentHealth.textContent = opponentHealthPct + "%";
        console.log(opponentHealthPct + "%");
      }, 2000);
    } else {
      sphere.classList.add("animated-miss");
      setTimeout(() => {
        sphere.classList.remove("animated-miss");
      }, 2000);
      setTimeout(() => {
        window.alert(`You missed!`);
        if (Math.random() < 0.75) {
          sphere2.classList.add("o-animated-hit");
          setTimeout(() => {
            sphere2.classList.remove("o-animated-hit");
          }, 2000);
          setTimeout(() => {
            window.alert(`💥 Your opponent caused you some damage!`);
            const damagePct = 100 * oPowerDamage;
            fighterHealthPct = Math.max(0, fighterHealthPct - damagePct);
            if (fighterHealthPct === 0) {
              window.alert(`You lost!!!`);
              setTimeout(()=> {
                location.reload();
              }, 1000)
            }
            fighterHealth.style.width = fighterHealthPct + "%";
            fighterHealth.textContent = fighterHealthPct + "%";
            console.log(fighterHealthPct + "%");
          }, 2000);
        } else {
          sphere2.classList.add("o-animated-miss");
          setTimeout(() => {
            sphere2.classList.remove("o-animated-miss");
          }, 2000);
          setTimeout(() => {
            window.alert(`You got lucky! Your opponent missed!`);
          }, 1000);
        }
      }, 2000);
    }
  }
  setTimeout(() => {
    attackBtn.disabled = false;
  }, 4000);
}

const bean1 = document.getElementById("bean1");
const bean2 = document.getElementById("bean2");
const bean3 = document.getElementById("bean3");


bean1.addEventListener("click", (e) => {
  if (fighterHealthPct < 100) {
  fighterHealthPct = 100;
  fighterHealth.style.width = fighterHealthPct + "%";
  fighterHealth.textContent = fighterHealthPct + "%";
  console.log(fighterHealthPct + "%");
  bean1.src = "";
  bean1.alt = "";
  bean1.removeEventListener("click", e);
  }
});
bean2.addEventListener("click", () => {
   if (fighterHealthPct < 100) {
  fighterHealthPct = 100;
  fighterHealth.style.width = fighterHealthPct + "%";
  fighterHealth.textContent = fighterHealthPct + "%";
  console.log(fighterHealthPct + "%");
  bean2.src = "";
  bean2.alt = "";
  bean2.removeEventListener("click");
   }
});
bean3.addEventListener("click", () => {
   if (fighterHealthPct < 100) {
  fighterHealthPct = 100;
  fighterHealth.style.width = fighterHealthPct + "%";
  fighterHealth.textContent = fighterHealthPct + "%";
  console.log(fighterHealthPct + "%");
  bean3.src = "";
  bean3.alt = "";
  bean3.removeEventListener("click");
   }
});

let dbzTransform = document.getElementById('transformation')
dbzTransform.addEventListener('click', getTransformData)

let transformationLevel = 0;

async function getTransformData() {
  transformationBtn.disabled = true;
  let transformData = await getTransformationData();
  console.log(transformData)
  for (let i = 0; i < transformData.length; i++) {
    if (fighterName === transformData[i].name) {
      let transformId = i + 1;
      const response = await fetch(`https://dragonball-api.com/api/characters/${transformId}`);
      let transformFighter = await response.json();
      let tF = transformFighter.transformations[transformationLevel]
      let imageUrl = tF.image;
      console.log(imageUrl);
      fighter.src = imageUrl;
      transformationLevel++;
      fighterHealthPct = 100;
      fighterHealth.style.width = fighterHealthPct + "%";
      fighterHealth.textContent = fighterHealthPct + "%";
      console.log(fighterHealthPct + "%");
      let name = tF.name;
      let newKi = tF.ki;
      infoDump1.innerHTML = `<h1 class="white" id="fighter-name">${name}</h1><h2 class="yellow" id="fighter-ki">KI: ${newKi}</h2>`;
      let lowerCase = String(newKi).toLowerCase()
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
    let rawKiNumb = Number(newKi.replaceAll(/[\s.,]/g, ""));
    console.log(rawKiNumb);
    if (rawKiNumb < 1000) {
      powerDamage = 0.01;
      return powerDamage;
    } else if (rawKiNumb < 1000000) {
      powerDamage = 0.05;
      return powerDamage;
    } else if (rawKiNumb < 1000000000) {
      powerDamage = 0.1;
      return powerDamage;
    } else if (rawKiNumb < 1000000000000) {
      powerDamage = 0.2;
      return powerDamage;
    } else {
      powerDamage = 0.3;
      return powerDamage;
    }
    }
    
  }
}
return transformFighter
}

// console.log(await getTransformData())


// async function getTransformationData() {
//   const response = await fetch(
//     "https://dragonball-api.com/api/characters/"
//   );
//   const transformData = await response.json();
//   const transformItems = transformData.items;
//   return transformItems
// }

// getTransformationData()



// (not an obligation) Enable user manipulation of data within the API through the use of POST, PUT, or PATCH requests. Ensure your chosen API supports this feature before beginning.

//5. (5%) Ensure the program runs as expected, without any undesired behavior caused by misunderstanding of the JavaScript event loop (such as race conditions, API calls being handled out of order, etc.).

//6. (5%) Create an engaging user experience through the use of HTML and CSS.

//7. (10%) Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).

//8. (5%) Commit frequently to the git repository. So far 12 commits.

//9. (2%) Include a README file that contains a description of your application.

//10. (5%) Level of effort displayed in creativity, presentation, and user experience.
