## AdvancedJSAPI

##Dragon Ball Z Arena — Browser Game

Pick a fighter, battle random opponents, collect all 7 Dragon Balls, and summon Shenron. This single-page web game fetches live character data from a public Dragon Ball API, with 10 different battle planets, and uses simple probabilities with KI-scaled damage, transformations, and Senzu Beans to create quick, replayable fights. 

##Features

Live data from API: Renders fighters and opponents with images, name, race, gender, KI, and max KI pulled at runtime.

Character select: <select> is populated from API data while skipping characters with unknown or zero KI.

KI-scaled combat: Damage scales by parsing human-friendly KI strings like “billion” or by converting numeric strings.

Battles and progress: Defeat 7 opponents to earn all 7 Dragon Balls and trigger a Shenron victory state.

Transformations: Goku, Vegeta, Piccolo, Freezer, Zarbon, Celula, and Gohan can transform mid-run and boost power.

Senzu Beans x3: Heal to 100% up to three times.

Planets: The user can pick the background planet image.

Responsive UI feedback: Attack and counterattack animations, hit or miss alerts, health bars, and basic input disabling to avoid race conditions.

##Stack

HTML/CSS/JavaScript (ES modules)

Fetch API with async/await

Public API: https://dragonball-api.com/api/characters/

##Project Structure
/ (static site)
│
├─ index.html
├─ styles.css
├─ main.js                 # orchestrates UI, events, gameplay
├─ opponent.js             # exports getDBZData(), getTransformationData()
├─ planet.js               # exports getPlanet()
│
├─ images/                 # local assets like ball1.png..ball7.png, shenron.png
└─ README.md

##How It Works

Data modules

opponent.js: getDBZData() returns an array of characters. getTransformationData() returns a character list aligned to transformation indices.

planet.js: getPlanet() returns an array of planet objects with image and name.

Startup

getFighterNames() fetches characters, filters out unknown or zero KI, and fills the fighter <select>.

changePlanet() sets the initial background with a cyclic index.

Selecting a fighter

On change, getFighterImg() finds the selected character, sets image, info panel, flips certain IDs so sprites face the opponent, and caches fighterName.

Also recalculates powerDamage via fighterPowerDamage().

Opponent generation

getOpponentImg() picks a random character with valid KI that is not the current fighter, sets image and info, flips some sprites, and returns opponent KI.

Damage model

String KI tiers map to damage: googolplex 0.8, septillion 0.7, sextillion 0.6, quintillion 0.5, quadrillion 0.4, trillion 0.3, billion 0.2. Numeric KI falls into 0.01, 0.05, or 0.1 by magnitude.

Combat loop

attack() uses an 80% hit chance for the player. On kill, increments Dragon Ball count and spawns a new opponent. On 7th victory, shows Shenron and resets.

On a miss, the opponent has a 70% chance to strike back using oPowerDamage.

Transformations

getTransformData() fetches the specific fighter by index and steps through transformations[transformationLevel], replacing sprite and KI, then recalculates powerDamage.

Race condition guards

Buttons like Attack, Planet, and Opponent are disabled while actions and animations run, then re-enabled with timeouts after state settles.

##Controls

Select Fighter: Use the dropdown before starting.

Random Opponent: Click “Start” to roll a foe.

Start: The game starts on the first opponent roll. Controls lock to prevent mid-combat changes.

Attack: Triggers the player’s strike with animations and damage calculations.

Transform: Enabled after your first kill if your fighter supports it.

Senzu Beans (x3): Click each bean icon once to restore health to 100%.

##Setup

Clone or download the repo.

Serve the folder with a simple static server or open index.html directly in a modern browser.

Ensure image assets referenced by the code (for Dragon Balls and Shenron) are present in your images folder or adjust their paths.

##Configuration

API base: https://dragonball-api.com/api/characters/

getDBZData() and getTransformationData() should normalize to the data structure returned by the API.

getTransformData() expects a character endpoint by index and a transformations array in the response.

##Key Files and Functions

main.js

getFighterNames(): Loads fighters into the dropdown.

getFighterImg(): Sets the selected fighter’s image and stats.

getOpponentImg(): Picks and renders a valid opponent.

fighterPowerDamage(), opponentPowerDamage(): Compute damage multipliers from KI.

startGame(): Locks setup controls, shows a quick tutorial, enables Attack.

attack(): Runs the turn, applies damage, handles kills, victory, and loss.

getTransformData(): Steps through transformation stages for supported fighters.

opponent.js

getDBZData(): Returns character list used by fighter and opponent logic.

getTransformationData(): Returns list that aligns names to transformation indices.

planet.js

getPlanet(): Returns an array of planet objects for background rotation.

##Known Limitations and Notes

API coupling: The transformation fetch relies on index alignment between getTransformationData() and GET /characters/{id}. If upstream data reorders, mapping logic should switch to an ID lookup by name rather than by index.

Numeric parsing: Numeric KI parsing removes spaces, commas, and periods. If the format changes upstream, adjust the regex.

Sprites facing: Image flips are based on hardcoded ID lists. If the API changes IDs, lists update will be needed.

##Roadmap

Replace window.alert with in-game modals.

Add sound effects and hit sparks.

Improve transformation UI with a dedicated panel.

Save and show run stats on victory.

Make opponent selection avoid repeats in a single run.

##Attribution

API: Dragon Ball API at dragonball-api.com.

Dragon Ball: Dragon Ball is a property of its respective rights holders. This project is a fan-made educational demo.

##License

MIT License © 2025 Victor Stanton