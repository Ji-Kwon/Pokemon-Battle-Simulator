const oppHp = document.getElementById("oppHP");
const userHp = document.getElementById("userHP");
const oppHealthBar = document.getElementById("oppHPBar");
const userHealthBar = document.getElementById("userHPBar");
const allButtons = document.querySelectorAll('button');
const moveButton1 = document.getElementById("move0");
const moveButton2 = document.getElementById("move1");
const moveButton3 = document.getElementById("move2");
const moveButton4 = document.getElementById("move3");
const moveButtons = document.querySelectorAll(".move");
const pkmButton1 = document.getElementById("pkm0");
const pkmButton2 = document.getElementById("pkm1");
const pkmButton3 = document.getElementById("pkm2");
const pkmButton4 = document.getElementById("pkm3");
const pkmButton5 = document.getElementById("pkm4");
const pkmButton6 = document.getElementById("pkm5");
const pkmButtons = document.querySelectorAll(".pkm");
const oppBalls = document.querySelectorAll(".oppBall");
const userBalls = document.querySelectorAll(".userBall");
const startButton = document.getElementById("startbtn");
const playButton = document.getElementById("playbtn");
const userdiv = document.getElementById("userdiv");
const oppdiv = document.getElementById("oppdiv");
const userSprite = document.getElementById("userSprite");
const oppSprite = document.getElementById("oppSprite");
let turnCount = 0;
let oppFaintedCount = 0;
let userFaintedCount = 0;
const chatLog = document.getElementById("chat");
let previousPokemon;
let selectedPokemon;
let selectedMove;
let userTurnComplete = false;
let oppTurnComplete = false;
let userDamage;
let oppDamage;

const natureModifiers = {
    Hardy: { atk: 1, def: 1, spA: 1, spD: 1, spe: 1 }, // Neutral nature
    Lonely: { atk: 1.1, def: 0.9, spA: 1, spD: 1, spe: 1 },
    Brave: { atk: 1.1, def: 1, spA: 1, spD: 1, spe: 0.9 },
    Adamant: { atk: 1.1, def: 1, spA: 0.9, spD: 1, spe: 1 },
    Naughty: { atk: 1.1, def: 1, spA: 1, spD: 0.9, spe: 1 },
    Bold: { atk: 0.9, def: 1.1, spA: 1, spD: 1, spe: 1 },
    Docile: { atk: 1, def: 1, spA: 1, spD: 1, spe: 1 }, // Neutral nature
    Relaxed: { atk: 1, def: 1.1, spA: 1, spD: 1, spe: 0.9 },
    Impish: { atk: 1, def: 1.1, spA: 0.9, spD: 1, spe: 1 },
    Lax: { atk: 1, def: 1.1, spA: 1, spD: 0.9, spe: 1 },
    Timid: { atk: 0.9, def: 1, spA: 1, spD: 1, spe: 1.1 },
    Hasty: { atk: 1, def: 0.9, spA: 1, spD: 1, spe: 1.1 },
    Serious: { atk: 1, def: 1, spA: 1, spD: 1, spe: 1 }, // Neutral nature
    Jolly: { atk: 1, def: 1, spA: 0.9, spD: 1, spe: 1.1 },
    Naive: { atk: 1, def: 1, spA: 1, spD: 0.9, spe: 1.1 },
    Modest: { atk: 0.9, def: 1, spA: 1.1, spD: 1, spe: 1 },
    Mild: { atk: 1, def: 0.9, spA: 1.1, spD: 1, spe: 1 },
    Quiet: { atk: 1, def: 1, spA: 1.1, spD: 1, spe: 0.9 },
    Bashful: { atk: 1, def: 1, spA: 1, spD: 1, spe: 1 }, // Neutral nature
    Rash: { atk: 1, def: 1, spA: 1.1, spD: 0.9, spe: 1 },
    Calm: { atk: 0.9, def: 1, spA: 1, spD: 1.1, spe: 1 },
    Gentle: { atk: 1, def: 0.9, spA: 1, spD: 1.1, spe: 1 },
    Sassy: { atk: 1, def: 1, spA: 1, spD: 1.1, spe: 0.9 },
    Careful: { atk: 1, def: 1, spA: 0.9, spD: 1.1, spe: 1 },
    Quirky: { atk: 1, def: 1, spA: 1, spD: 1, spe: 1 } // Neutral nature
};
const userPokemonArray = [
    {
        name: "Gliscor",
        sprite: "https://img.pokemondb.net/sprites/platinum/back-normal/gliscor.png",
        level: 100,
        nature: "Impish",
        maxHp: 0,
        currHp: 0,
        currAtk: 0,
        currDef: 0,
        currSpA: 0,
        currSpD: 0,
        currSpe: 0,
        baseStats: { hp: 75, atk: 95, def: 125, spA: 45, spD: 75, spe: 95 },
        evs: { hp: 252, atk: 0, def: 252, spA: 0, spD: 4, spe: 0 },
        ivs: { hp: 31, atk: 31, def: 31, spA: 31, spD: 31, spe: 31 },
        types: ["Ground", "Flying"],
        moves: [
            { name: "Earthquake", type: "Ground", power: 100, accuracy: 100, category: "physical" },
            { name: "Ice-Fang", type: "Ice", power: 65, accuracy: 95, category: "physical" },
            { name: "Acrobatics", type: "Flying", power: 55, accuracy: 95, category: "physical" },
            { name: "Night-Slash", type: "Dark", power: 75, accuracy: 95, category: "physical" }
        ]
    },
    {
        name: 'Chansey',
        sprite: "https://img.pokemondb.net/sprites/platinum/back-normal/chansey.png",
        level: 69,
        nature: 'Bold',
        maxHp: 0,
        currHp: 0,
        currAtk: 0,
        currDef: 0,
        currSpA: 0,
        currSpD: 0,
        currSpe: 0,
        baseStats: { hp: 250, atk: 5, def: 5, spA: 35, spD: 105, spe: 50 },
        evs: { hp: 4, atk: 0, def: 252, spA: 0, spD: 252, spe: 0 },
        ivs: { hp: 31, atk: 31, def: 31, spA: 31, spD: 31, spe: 31 },
        types: ['Normal'],
        moves: [
            { name: "Fire Punch", type: "Fire", power: 75, accuracy: 100, category: "physical" },
            { name: "Thunder Punch", type: "Electric", power: 75, accuracy: 100, category: "physical" },
            { name: "Ice Punch", type: "Ice", power: 75, accuracy: 100, category: "physical" },
            { name: "Dizzy Punch", type: "Normal", power: 70, accuracy: 100, category: "physical" }
        ]
    },
    {
        name: 'Starmie',
        sprite: "https://img.pokemondb.net/sprites/platinum/back-normal/starmie.png",
        level: 100,
        nature: 'Timid',
        maxHp: 0,
        currHp: 0,
        currAtk: 0,
        currDef: 0,
        currSpA: 0,
        currSpD: 0,
        currSpe: 0,
        baseStats: { hp: 60, atk: 75, def: 85, spA: 100, spD: 85, spe: 115 },
        evs: { hp: 0, atk: 0, def: 4, spA: 252, spD: 0, spe: 252 },
        ivs: { hp: 31, atk: 31, def: 31, spA: 31, spD: 31, spe: 31 },
        types: ['Water', 'Psychic'],
        moves: [
            { name: "Rapid Spin", type: "Normal", power: 50, accuracy: 100, category: "physical" },
            { name: "Ice Beam", type: "Ice", power: 90, accuracy: 100, category: "special" },
            { name: "Hydro Pump", type: "Water", power: 110, accuracy: 80, category: "special" },
            { name: "Thunderbolt", type: "Electric", power: 90, accuracy: 100, category: "special" }
        ]
    },
    {
        name: 'Magnezone',
        sprite: "https://img.pokemondb.net/sprites/platinum/back-normal/magnezone.png",
        level: 100,
        nature: 'Timid',
        maxHp: 0,
        currHp: 0,
        currAtk: 0,
        currDef: 0,
        currSpA: 0,
        currSpD: 0,
        currSpe: 0,
        baseStats: { hp: 70, atk: 70, def: 115, spA: 130, spD: 90, spe: 60 },
        evs: { hp: 0, atk: 0, def: 4, spA: 252, spD: 0, spe: 252 },
        ivs: { hp: 31, atk: 31, def: 31, spA: 31, spD: 31, spe: 31 },
        types: ['Electric', 'Steel'],
        moves: [
            { name: "Gyro Ball", type: "Steel", power: 50, accuracy: 100, category: "physical" },
            { name: "Flash Cannon", type: "Steel", power: 80, accuracy: 100, category: "special" },
            { name: "Thunderbolt", type: "Electric", power: 90, accuracy: 100, category: "special" },
            { name: "Volt Switch", type: "Electric", power: 70, accuracy: 100, category: "special" }
        ]
    },
    {
        name: 'Mienshao',
        sprite: "https://img.pokemondb.net/sprites/black-white/back-normal/mienshao.png",
        level: 100,
        nature: 'Jolly',
        maxHp: 0,
        currHp: 0,
        currAtk: 0,
        currDef: 0,
        currSpA: 0,
        currSpD: 0,
        currSpe: 0,
        baseStats: { hp: 65, atk: 125, def: 60, spA: 95, spD: 60, spe: 105 },
        evs: { hp: 0, atk: 252, def: 0, spA: 0, spD: 4, spe: 252 },
        ivs: { hp: 31, atk: 31, def: 31, spA: 31, spD: 31, spe: 31 },
        types: ['Fighting'],
        moves: [
            { name: "High Jump Kick", type: "Fighting", power: 130, accuracy: 90, category: "physical" },
            { name: "Stone Edge", type: "Rock", power: 100, accuracy: 80, category: "physical" },
            { name: "U-turn", type: "Bug", power: 70, accuracy: 100, category: "physical" },
            { name: "Fake Out", type: "Normal", power: 40, accuracy: 100, category: "physical" }
        ]
    },
    {
        name: 'Serperior',
        sprite: "https://img.pokemondb.net/sprites/black-white/back-normal/serperior.png",
        level: 100,
        nature: 'Timid',
        maxHp: 0,
        currHp: 0,
        currAtk: 0,
        currDef: 0,
        currSpA: 0,
        currSpD: 0,
        currSpe: 0,
        baseStats: { hp: 75, atk: 75, def: 95, spA: 75, spD: 95, spe: 113 },
        evs: { hp: 56, atk: 0, def: 0, spA: 200, spD: 0, spe: 252 },
        ivs: { hp: 31, atk: 31, def: 31, spA: 31, spD: 31, spe: 31 },
        types: ['Grass'],
        moves: [
            { name: "Leaf Storm", type: "Grass", power: 130, accuracy: 90, category: "special" },
            { name: "Dragon Pulse", type: "Dragon", power: 85, accuracy: 100, category: "special" },
            { name: "Leaf Blade", type: "Grass", power: 90, accuracy: 100, category: "physical" },
            { name: "Grass Knot", type: "Grass", power: "Varies", accuracy: 100, category: "special" }
        ]
    }
];
const oppPokemonArray = [
    {
        name: 'Mamoswine',
        sprite: "https://img.pokemondb.net/sprites/diamond-pearl/normal/mamoswine-f.png",
        level: 100,
        nature: 'Jolly',
        maxHp: 0,
        currHp: 0,
        currAtk: 0,
        currDef: 0,
        currSpA: 0,
        currSpD: 0,
        currSpe: 0,
        baseStats: { hp: 110, atk: 130, def: 80, spA: 70, spD: 60, spe: 80 },
        evs: { hp: 0, atk: 252, def: 0, spA: 0, spD: 4, spe: 252 },
        ivs: { hp: 31, atk: 31, def: 31, spA: 31, spD: 31, spe: 31 },
        types: ['Ice', 'Ground'],
        moves: [
            { name: "Avalanche", type: "Ice", power: 60, accuracy: 100, category: "physical" },
            { name: "Earthquake", type: "Ground", power: 100, accuracy: 100, category: "physical" },
            { name: "Ice Shard", type: "Ice", power: 40, accuracy: 100, category: "physical" },
            { name: "Icicle Crash", type: "Ice", power: 85, accuracy: 90, category: "physical" }
        ]
    },
    {
        name: 'Scizor',
        sprite: "https://img.pokemondb.net/sprites/diamond-pearl/normal/scizor-f.png",
        level: 100,
        nature: 'Adamant',
        maxHp: 0,
        currHp: 0,
        currAtk: 0,
        currDef: 0,
        currSpA: 0,
        currSpD: 0,
        currSpe: 0,
        baseStats: { hp: 70, atk: 130, def: 100, spA: 55, spD: 80, spe: 65 },
        evs: { hp: 248, atk: 252, def: 0, spA: 0, spD: 8, spe: 0 },
        ivs: { hp: 31, atk: 31, def: 31, spA: 31, spD: 31, spe: 31 },
        types: ['Bug', 'Steel'],
        moves: [
            { name: "Bullet Punch", type: "Steel", power: 40, accuracy: 100, category: "physical" },
            { name: "X-Scissor", type: "Bug", power: 80, accuracy: 100, category: "physical" },
            { name: "Pursuit", type: "Dark", power: 40, accuracy: 100, category: "physical" },
            { name: "Facade", type: "Normal", power: 70, accuracy: 100, category: "physical" }
        ]
    },
    {
        name: 'Garchomp',
        sprite: "https://img.pokemondb.net/sprites/black-white/normal/garchomp-f.png",
        level: 100,
        nature: 'Jolly',
        maxHp: 0,
        currHp: 0,
        currAtk: 0,
        currDef: 0,
        currSpA: 0,
        currSpD: 0,
        currSpe: 0,
        baseStats: { hp: 108, atk: 130, def: 95, spA: 80, spD: 85, spe: 102 },
        evs: { hp: 0, atk: 252, def: 0, spA: 0, spD: 4, spe: 252 },
        ivs: { hp: 31, atk: 31, def: 31, spA: 31, spD: 31, spe: 31 },
        types: ['Dragon', 'Ground'],
        moves: [
            { name: "Crunch", type: "Dark", power: 80, accuracy: 100, category: "physical" },
            { name: "Dragon Claw", type: "Dragon", power: 80, accuracy: 100, category: "physical" },
            { name: "Facade", type: "Normal", power: 70, accuracy: 100, category: "physical" },
            { name: "Fire Fang", type: "Fire", power: 65, accuracy: 95, category: "physical" }
        ]
    },
    {
        name: 'Ferrothorn',
        sprite: "https://img.pokemondb.net/sprites/black-white/normal/ferrothorn.png",
        level: 100,
        nature: 'Brave',
        maxHp: 0,
        currHp: 0,
        currAtk: 0,
        currDef: 0,
        currSpA: 0,
        currSpD: 0,
        currSpe: 0,
        baseStats: { hp: 74, atk: 94, def: 131, spA: 54, spD: 116, spe: 20 },
        evs: { hp: 248, atk: 252, def: 0, spA: 8, spD: 0, spe: 0 },
        ivs: { hp: 31, atk: 31, def: 31, spA: 31, spD: 31, spe: 31 },
        types: ['Grass', 'Steel'],
        moves: [
            { name: "Energy Ball", type: "Grass", power: 90, accuracy: 100, category: "special" },
            { name: "Facade", type: "Normal", power: 70, accuracy: 100, category: "physical" },
            { name: "Flash Cannon", type: "Steel", power: 80, accuracy: 100, category: "special" },
            { name: "Power Whip", type: "Grass", power: 120, accuracy: 85, category: "physical" }
        ]
    },
    {
        name: 'Conkeldurr',
        sprite: "https://img.pokemondb.net/sprites/black-white/normal/conkeldurr.png",
        level: 100,
        nature: 'Adamant',
        maxHp: 0,
        currHp: 0,
        currAtk: 0,
        currDef: 0,
        currSpA: 0,
        currSpD: 0,
        currSpe: 0,
        baseStats: { hp: 105, atk: 140, def: 95, spA: 55, spD: 65, spe: 45 },
        evs: { hp: 252, atk: 252, def: 0, spA: 0, spD: 4, spe: 0 },
        ivs: { hp: 31, atk: 31, def: 31, spA: 31, spD: 31, spe: 31 },
        types: ['Fighting'],
        moves: [
            { name: "Drain Punch", type: "Fighting", power: 75, accuracy: 100, category: "physical" },
            { name: "Hammer Arm", type: "Fighting", power: 100, accuracy: 90, category: "physical" },
            { name: "Facade", type: "Normal", power: 70, accuracy: 100, category: "physical" },
            { name: "Ice Punch", type: "Ice", power: 75, accuracy: 100, category: "physical" }
        ]
    },
    {
        name: 'Volcarona',
        sprite: "https://img.pokemondb.net/sprites/black-white/normal/volcarona.png",
        level: 100,
        nature: 'Timid',
        maxHp: 0,
        currHp: 0,
        currAtk: 0,
        currDef: 0,
        currSpA: 0,
        currSpD: 0,
        currSpe: 0,
        baseStats: { hp: 85, atk: 60, def: 65, spA: 135, spD: 105, spe: 100 },
        evs: { hp: 0, atk: 0, def: 0, spA: 252, spD: 4, spe: 252 },
        ivs: { hp: 31, atk: 31, def: 31, spA: 31, spD: 31, spe: 31 },
        types: ['Bug', 'Fire'],
        moves: [
            { name: "Bug Buzz", type: "Bug", power: 90, accuracy: 100, category: "special" },
            { name: "Fiery Dance", type: "Fire", power: 80, accuracy: 100, category: "special" },
            { name: "Flamethrower", type: "Fire", power: 90, accuracy: 100, category: "special" },
            { name: "Giga Drain", type: "Grass", power: 75, accuracy: 100, category: "special" }
        ]
    }
];
function calculateStats(pokemon) {
    const nature = natureModifiers[pokemon.nature];

    const hp = Math.floor(
        ((2 * pokemon.baseStats.hp + pokemon.ivs.hp + Math.floor(pokemon.evs.hp / 4)) * pokemon.level) / 100
    ) + pokemon.level + 10;

    const atk = Math.floor(
        (((2 * pokemon.baseStats.atk + pokemon.ivs.atk + Math.floor(pokemon.evs.atk / 4)) * pokemon.level) / 100) + 5
    ) * nature.atk;

    const def = Math.floor(
        (((2 * pokemon.baseStats.def + pokemon.ivs.def + Math.floor(pokemon.evs.def / 4)) * pokemon.level) / 100) + 5
    ) * nature.def;

    const spA = Math.floor(
        (((2 * pokemon.baseStats.spA + pokemon.ivs.spA + Math.floor(pokemon.evs.spA / 4)) * pokemon.level) / 100) + 5
    ) * nature.spA;

    const spD = Math.floor(
        (((2 * pokemon.baseStats.spD + pokemon.ivs.spD + Math.floor(pokemon.evs.spD / 4)) * pokemon.level) / 100) + 5
    ) * nature.spD;

    const spe = Math.floor(
        (((2 * pokemon.baseStats.spe + pokemon.ivs.spe + Math.floor(pokemon.evs.spe / 4)) * pokemon.level) / 100) + 5
    ) * nature.spe;
    return { hp, atk, def, spA, spD, spe};
}
function updateStats(){
    for(let i=0; i < userPokemonArray.length; i++){
        const userPkm = userPokemonArray[i];
        const stats = calculateStats(userPkm);

        userPkm.maxHp = stats.hp;
        userPkm.currHp = stats.hp;
        userPkm.currAtk = stats.atk;
        userPkm.currDef = stats.def;
        userPkm.currSpA = stats.spA;
        userPkm.currSpD = stats.spD;
        userPkm.currSpe = stats.spe;
    }
    for(let i=0; i < oppPokemonArray.length; i++){
        const oppPkm = oppPokemonArray[i];
        const stats = calculateStats(oppPkm);

        oppPkm.maxHp = stats.hp;
        oppPkm.currHp = stats.hp;
        oppPkm.currAtk = stats.atk;
        oppPkm.currDef = stats.def;
        oppPkm.currSpA = stats.spA;
        oppPkm.currSpD = stats.spD;
        oppPkm.currSpe = stats.spe;
    }
    
}
function startBattle(){
    startButton.style.display = "none";
    for(let i = 0; i < pkmButtons.length; i++){
        pkmButtons[i].style.display = "flex";
        pkmButtons[i].innerHTML = userPokemonArray[i].name;
    }
}
function endBattle(){
    pkmButtons.forEach(button =>{
        button.style.display = "none";
    })
    moveButtons.forEach(button =>{
        button.style.display = "none";
    })
    switch (true) {
        case userFaintedCount >= userPokemonArray.length:
            setTimeout(() => {
                alert("Game over! All user Pokémon have fainted.");
            }, 100); // Delay of 100ms
            break;
        case oppFaintedCount >= oppPokemonArray.length:
            setTimeout(() => {
                alert("Game over! You win.");
            }, 100); // Delay of 100ms
            break;
    }
    playButton.style.display = "block";
}

function playAgain(){
    playButton.style.display = "none";
    userdiv.style.display = "none";
    oppdiv.style.display = "none";
    // Reset game variables
    turnCount = 1;
    userFaintedCount = 0;
    oppFaintedCount = 0;
    chatLog.innerHTML = "";
    userBalls.forEach(ball =>{
        ball.src = "./assets/images/pokeball.png"
    });
    oppBalls.forEach(ball =>{
        ball.src = "./assets/images/pokeball.png"
    });
    
    // Reset Pokémon health
    userPokemonArray.forEach(pokemon => {
        pokemon.currHp = pokemon.maxHp;
    });
    oppPokemonArray.forEach(pokemon => {
        pokemon.currHp = pokemon.maxHp;
    });

    for(let i=0; i < userPokemonArray.length; i++){
        pkmButtons[i].style.display = "block";
        pkmButtons[i].disabled = false;
        pkmButtons[i].style.opacity = 1;
        pkmButtons[i].innerHTML = userPokemonArray[i].name;
    }
}
function spawnUserPokemon(index){
    userdiv.style.display = "flex";
    userHp.innerHTML = `HP: ${userPokemonArray[index].currHp} / ${userPokemonArray[index].maxHp}`;
    userSprite.src = userPokemonArray[index].sprite;
    let pkmMoves = userPokemonArray[index].moves
    for(let i = 0; i < moveButtons.length; i++){
        if(i<pkmMoves.length){
            moveButtons[i].style.display = "flex";
            moveButtons[i].innerHTML = pkmMoves[i].name;    
        }
        else{
            moveButtons[i].style.display = "none";
        }
    }
}
function spawnOppPokemon(index){
    oppdiv.style.display = "flex";
    oppHp.innerHTML = `HP: ${oppPokemonArray[index].currHp} / ${oppPokemonArray[index].maxHp}`;
    oppSprite.src = oppPokemonArray[index].sprite;
}
function selectPokemon(index, prev){
    pkmButtons.forEach((button, i) => {
        const pokemon = userPokemonArray[i];
        if (pokemon.currHp <= 0) {
            // Keep fainted Pokémon buttons disabled
            button.disabled = true;
            button.style.opacity = 0.5; // Dim the button
            button.style.cursor = "default"; // Indicate non-clickable
        } else {
            // Enable buttons for non-fainted Pokémon
            button.disabled = false;
            button.style.opacity = 1; // Restore normal appearance
            button.style.cursor = "pointer"; // Restore clickable cursor
        }
    });

    // Disable the button for the currently selected Pokémon
    const selectedButton = document.getElementById(`pkm${index}`);
    if (selectedButton) {
        selectedButton.disabled = true;
        selectedButton.style.opacity = 0.5; // Dim the button
        selectedButton.style.cursor = "default"; // Change cursor style
    }
    if(turnCount<=1){
        spawnUserPokemon(index);
        spawnOppPokemon(oppFaintedCount);
        logTurn(`User sent out ${userPokemonArray[index].name}!`, `Opponent sent out ${oppPokemonArray[oppFaintedCount].name}!`);
    }
    else if(isFainted(userPokemonArray[prev])){
        // Spawn the new Pokémon if the previous one fainted
        spawnUserPokemon(index);
        logTurn(
            `User sent out ${userPokemonArray[index].name}!`
        );
    }
    else{
        switchPokemon(index);
    }


}
function switchPokemon(index){
    const userPkm = userPokemonArray[index];
    selectedPokemon = index;
    
    userHp.innerHTML = `HP: ${userPkm.currHp} / ${userPkm.maxHp}`;
    userSprite.src = userPkm.sprite;

    let pkmMoves = userPokemonArray[index].moves
    for(let i = 0; i < moveButtons.length; i++){
        if(i<pkmMoves.length){
            moveButtons[i].innerHTML = pkmMoves[i].name;
            moveButtons[i].style.display = "flex";    
        }
        else{
            moveButtons[i].style.display = "none";
        }
    }
    logChat = `User sent out ${userPokemonArray[index].name}! <br>`;
    
    
    // Opponent attacks during switch
    const oppPkm = oppPokemonArray[oppFaintedCount];
    const oppMove = oppPkm.moves[Math.floor(Math.random() * 4)];
    const oppDamage = calculateDamage(oppPkm, userPkm, oppMove);
    
    userPkm.currHp = Math.max(userPkm.currHp - oppDamage, 0);
    userHp.innerHTML = `HP: ${userPkm.currHp} / ${userPkm.maxHp}`;
    logChat += `${oppPkm.name} used ${oppMove.name}!`;

    // Check if the switched Pokémon fainted from the opponent's attack
    if (isFainted(userPkm)) {
        logChat += ` "", ${userPkm.name} fainted!`;
        userFainted();
        
    }
    logTurn(logChat);

}
function attack(userPkmIndex, oppPkmIndex, moveIndex){
    pkmButtons.forEach(button =>{
        button.style.display = "none";
    })
    moveButtons.forEach(button =>{
        button.style.display = "none";
    })

    setTimeout(() => {
        pkmButtons.forEach(button =>{
            button.style.display = "block";
        })
    }, 2000);


    userPkm = userPokemonArray[userPkmIndex];
    oppPkm = oppPokemonArray[oppPkmIndex];
    userMove = userPkm.moves[moveIndex];
    oppMove = oppPkm.moves[Math.floor(Math.random()*4)];
    let userMoveLog;
    let oppMoveLog;

    userDamage = calculateDamage(userPkm, oppPkm, userMove);
    oppDamage = calculateDamage(userPkm, oppPkm, oppMove);

        // Determine turn order based on speed
        const userFirst = userPkm.currSpe > oppPkm.currSpe || 
        (userPkm.currSpe === oppPkm.currSpe && Math.random() < 0.5);

    if (userFirst) {
        // User attacks first
        const userDamage = calculateDamage(userPkm, oppPkm, userMove);
        oppPkm.currHp = Math.max(oppPkm.currHp - userDamage, 0);
        oppHp.innerHTML = `HP: ${oppPkm.currHp} / ${oppPkm.maxHp}`;
        userMoveLog = `${userPkm.name} used ${userMove.name}!<br>`;

        if (isFainted(oppPkm)) {
            userMoveLog += `${oppPkm.name} fainted!`;
            logTurn(userMoveLog);
            oppFainted();
            setTimeout(() => {
                moveButtons.forEach(button =>{
                    button.style.display = "block";
                })
            }, 2000);
            return;
        }

        // Opponent attacks if still alive
        const oppDamage = calculateDamage(oppPkm, userPkm, oppMove);
        userPkm.currHp = Math.max(userPkm.currHp - oppDamage, 0);
        userHp.innerHTML = `HP: ${userPkm.currHp} / ${userPkm.maxHp}`;
        oppMoveLog = `${oppPkm.name} used ${oppMove.name}!<br>`;

        if (isFainted(userPkm)) {
            oppMoveLog += `${userPkm.name} fainted!`;
            logTurn(userMoveLog, oppMoveLog);
            userFainted();
            return;
        }
        else{
            setTimeout(() => {
                moveButtons.forEach(button =>{
                    button.style.display = "block";
                })
            }, 2000);
        }
        logTurn(userMoveLog, oppMoveLog);

    } else {
        // Opponent attacks first
        const oppDamage = calculateDamage(oppPkm, userPkm, oppMove);
        userPkm.currHp = Math.max(userPkm.currHp - oppDamage, 0);
        userHp.innerHTML = `HP: ${userPkm.currHp} / ${userPkm.maxHp}`;
        oppMoveLog = `${oppPkm.name} used ${oppMove.name}!<br>`;

        if (isFainted(userPkm)) {
            oppMoveLog += `${userPkm.name} fainted!`;
            logTurn(oppMoveLog);
            userFainted();
            return;
        }
        else{
            setTimeout(() => {
                moveButtons.forEach(button =>{
                    button.style.display = "block";
                })
            }, 2000);
        }
        // User attacks if still alive
        const userDamage = calculateDamage(userPkm, oppPkm, userMove);
        oppPkm.currHp = Math.max(oppPkm.currHp - userDamage, 0);
        oppHp.innerHTML = `HP: ${oppPkm.currHp} / ${oppPkm.maxHp}`;
        userMoveLog = `${userPkm.name} used ${userMove.name}!<br>`;

        if (isFainted(oppPkm)) {
            userMoveLog += `${oppPkm.name} fainted!`;
            logTurn(oppMoveLog,userMoveLog);
            oppFainted();
            setTimeout(() => {
                moveButtons.forEach(button =>{
                    button.style.display = "block";
                })
            }, 2000);
            return;
        }
        logTurn(oppMoveLog, userMoveLog);
    }
    
    
}
function calculateDamage(attacker, defender, move){
    const power = move.power;
    const attackStat = move.category === "physical" ? attacker.currAtk : attacker.currSpA;
    const defenseStat = move.category === "physical" ? defender.currDef : defender.currSpD;

    const damage = Math.floor(
        ((((2 * attacker.level) / 5 + 2) * power * (attackStat / defenseStat)) / 50) + 2
    );

    return Math.max(damage, 1); // Ensure at least 1 damage
}
function isFainted(pokemon){
    return pokemon.currHp <=0;
}
function userFainted(){
    userFaintedCount++;
    const faintedBall = document.getElementById(`userBall${selectedPokemon}`);
    faintedBall.src = "./assets/images/pokeball-fainted.png";
    const faintedButton = document.getElementById(`pkm${selectedPokemon}`);
    userSprite.src = "./assets/images/disintegrating-emoji.gif";
    moveButtons.forEach(button => {
        button.style.display = "none"; // Set display to none
    });
    
    if (faintedButton) {
        faintedButton.disabled = true;
        faintedButton.style.opacity = 0.5; // Dim the button for visual feedback
        faintedButton.style.cursor = "default"; // Change cursor style
    }

    // Check if there are any Pokémon left to switch to
    if (userFaintedCount >= userPokemonArray.length) {
        // If no Pokémon are left, end the battle
        endBattle();
    } else {
        // Prompt the user to select another Pokémon
        logTurn("Your Pokémon has fainted! Choose another Pokémon to continue the battle.");
        // Optionally highlight available buttons
        userPokemonArray.forEach((pkm, index) => {
            const button = document.getElementById(`pkm${index}`);
            if (pkm.currHp > 0) {
                button.disabled = false; // Enable buttons for non-fainted Pokémon
                button.style.opacity = 1; // Restore normal appearance
                button.style.cursor = "pointer"; // Restore clickable cursor
            }
        });
    }

}
function oppFainted(){
    oppFaintedCount++
    oppSprite.src = "./assets/images/exploding-car-explode.gif";
    const faintedBall = document.getElementById(`oppBall${oppFaintedCount - 1}`);
    faintedBall.src = "./assets/images/pokeball-fainted.png";
    setTimeout(() => {
        if(oppFaintedCount >= oppPokemonArray.length){
            endBattle();
        }else {
            spawnOppPokemon(oppFaintedCount); // Send out the next opponent Pokémon
            chatText(`Opponent sent out ${oppPokemonArray[oppFaintedCount].name}!`);
        }
    }, 2000);
    
}
function chatText(message){
    const newMessage = document.createElement("p");
    const newTurn = document.createElement("h3");
    if(message === `Turn${turnCount}:`){
        newTurn.innerHTML = message;
        chatLog.appendChild(newTurn);
    }
    else{
        newMessage.innerHTML = message;
        chatLog.appendChild(newMessage);
       
    }
    
    
    chatLog.scrollTop = chatLog.scrollHeight;
}
function logTurn(userInput, oppInput){
    if(turnCount <=0){
        turnCount++;
    }
    else{
    chatText(`Turn${turnCount}:`)
    chatText(userInput);
    if (oppInput) {
        chatText(oppInput); 
    }
    turnCount++;
    }
}
updateStats();

startButton.addEventListener("click",function(){
    startBattle();
    logTurn();
});
playButton.addEventListener("click", function(){
    playAgain();
});
pkmButton1.addEventListener("click", function(){
    previousPokemon = selectedPokemon;
    selectedPokemon = 0;
    selectPokemon(selectedPokemon,previousPokemon);
});
pkmButton2.addEventListener("click", function(){
    previousPokemon = selectedPokemon;
    selectedPokemon = 1;
    selectPokemon(selectedPokemon,previousPokemon);
});
pkmButton3.addEventListener("click", function(){
    previousPokemon = selectedPokemon;
    selectedPokemon = 2;
    selectPokemon(selectedPokemon,previousPokemon);
});
pkmButton4.addEventListener("click", function(){
    previousPokemon = selectedPokemon;
    selectedPokemon = 3;
    selectPokemon(selectedPokemon,previousPokemon);
});
pkmButton5.addEventListener("click", function(){
    previousPokemon = selectedPokemon;
    selectedPokemon = 4;
    selectPokemon(selectedPokemon,previousPokemon);
});
pkmButton6.addEventListener("click", function(){
    previousPokemon = selectedPokemon;
    selectedPokemon = 5;
    selectPokemon(selectedPokemon,previousPokemon);
});
moveButton1.addEventListener("click", function(){
    selectedMove = 0;
    attack(selectedPokemon, oppFaintedCount, selectedMove);
});
moveButton2.addEventListener("click", function(){
    selectedMove = 1;
    attack(selectedPokemon, oppFaintedCount, selectedMove);
});
moveButton3.addEventListener("click", function(){
    selectedMove = 2;
    attack(selectedPokemon, oppFaintedCount, selectedMove);
});
moveButton4.addEventListener("click", function(){
    selectedMove = 3;
    attack(selectedPokemon, oppFaintedCount, selectedMove);
});