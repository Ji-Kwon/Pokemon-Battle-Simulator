const oppHp = document.getElementById("oppHP");
const userHp = document.getElementById("userHP");
const moveButton1 = document.getElementById("move0");
const moveButton2 = document.getElementById("move1");
const moveButton3 = document.getElementById("move2");
const moveButton4 = document.getElementById("move3");
const pkmButton1 = document.getElementById("pkm0");
const pkmButton2 = document.getElementById("pkm1");
const pkmButton3 = document.getElementById("pkm2");
const pkmButton4 = document.getElementById("pkm3");
const pkmButton5 = document.getElementById("pkm4");
const pkmButton6 = document.getElementById("pkm5");
const startButton = document.getElementById("startbtn");
const moves = document.getElementsByClassName("move");
const allPkm = document.getElementsByClassName("pkm");
const userdiv = document.getElementById("userdiv");
const oppdiv = document.getElementById("oppdiv");
const userSprite = document.getElementById("userSprite");
const oppSprite = document.getElementById("oppSprite");
let turnCount = 0;
let oppFaintedCount = 0;
const chatLog = document.getElementById("chat");
let selectedPokemon;
let selectedMove;
let userTurnComplete = false;
let oppTurnComplete = false;
let userDamage;
let oppDamage;

const userPokemonArray = [
    {
        name: "Gliscor",
        sprite: "https://img.pokemondb.net/sprites/platinum/back-normal/gliscor.png" ,
        level: 100,
        nature: "Impish",
        currHp,
        hp: 75,
        atk: 95,
        def: 125,
        spA: 45,
        spD: 75,
        spe: 95,
        evs: {hp: 252, def: 252, spD: 4},
        ivs: {hp: 31, atk:31, def: 31, spA: 31, spD: 31, spe:31},
        types: ["Ground", "Flying"],
        moves: [
            {
                name: "Earthquake",
                type: "Ground",
                power: 100,
                accuracy: 100
            },
            {
                name: "Ice-Fang",
                type: "Ice",
                power: 65,
                accuracy: 95
            },
            {
                name: "Acrobatics",
                type: "flying",
                power: 55,
                accuracy: 95
            },
            {
                name: "Night-Slash",
                type: "dark",
                power: 75,
                accuracy: 95
            }
        ]
    },
    {
        name: 'Chansey',
        sprite: "https://img.pokemondb.net/sprites/platinum/back-normal/chansey.png",
        level: 69,
        nature: 'Bold',
        currHp,
        hp: 250,
        atk: 5,
        def: 5,
        spA: 35,
        spD: 105,
        spe: 50,
        evs: {hp: 4, def: 252, spD: 252},
        ivs: {hp: 31, atk:31, def: 31, spA: 31, spD: 31, spe:31},
        types: ['Normal'],
        moves: ['Fire Punch', 'Thunder Punch', 'Ice Punch', 'Dizzy Punch']
    },
    {
        name: 'Starmie',
        sprite: "https://img.pokemondb.net/sprites/platinum/back-normal/starmie.png",
        level: 100,
        nature: 'Timid',
        currHp,
        hp: 60,
        atk: 75,
        def: 85,
        spA: 100,
        spD: 85,
        spe: 115,
        evs: {def: 4, spA: 252, spe: 252},
        ivs: {hp: 31, atk:31, def: 31, spA: 31, spD: 31, spe:31},
        types: ['Water', 'Psychic'],
        moves: ['Rapid Spin', 'Ice Beam', 'Hydro Pump', 'Thunderbolt']
    },
    {
        name: 'Magnezone',
        sprite: "https://img.pokemondb.net/sprites/platinum/back-normal/magnezone.png",
        level: 100,
        nature: 'Timid',
        currHp,
        hp: 70,
        atk: 70,
        def: 115,
        spA: 130,
        spD: 90,
        spe: 60,
        evs: {def: 4, spA: 252, spe: 252},
        ivs: {hp: 31, atk:31, def: 31, spA: 31, spD: 31, spe:31},
        types: ['Electric', 'Steel'],
        moves: ['Gyro Ball', 'Flash Cannon', 'Thunderbolt', 'Volt Switch']
    },
    {
        name: 'Mienshao',
        sprite: "https://img.pokemondb.net/sprites/black-white/back-normal/mienshao.png",
        level: 100,
        nature: 'Jolly',
        currHp,
        hp: 65,
        atk: 125,
        def: 60,
        spA: 95,
        spD: 60,
        spe: 105,
        evs: {atk: 252, spD: 4, spe: 252},
        ivs: {hp: 31, atk:31, def: 31, spA: 31, spD: 31, spe:31},
        types: ['Fighting'],
        moves: ['High Jump Kick', 'Stone Edge', 'U-turn', 'Fake Out']
    },
    {
        name: 'Serperior',
        sprite: "https://img.pokemondb.net/sprites/black-white/back-normal/serperior.png",
        level: 100,
        nature: 'Timid',
        currHp,
        hp: 75,
        atk: 75,
        def: 95,
        spA: 75,
        spD: 95,
        spe: 113,
        evs: {hp: 56, spA: 200, spe: 252},
        ivs: {hp: 31, atk:31, def: 31, spA: 31, spD: 31, spe:31},
        types: ['Grass'],
        moves: ['Leaf Storm', 'Dragon Pulse', 'Leaf Blade', 'Grass Knot']
    }
];

const oppPokemonArray = [
    {
        name: 'Mamoswine',
        sprite: "https://img.pokemondb.net/sprites/diamond-pearl/normal/mamoswine-f.png",
        level: 100,
        nature: 'Jolly',
        currHp,
        hp: 110,
        atk: 130,
        def: 80,
        spA: 70,
        spD: 60,
        spe: 80,
        evs: {atk: 252, spD: 4, spe: 252},
        ivs: {hp: 31, atk:31, def: 31, spA: 31, spD: 31, spe:31},
        types: ['Ice', 'Ground'],
        moves: ['Avalanche', 'Earthquake', 'Ice Shard', 'Icicle Crash']
    },
    {
        name: 'Scizor',
        sprite: "https://img.pokemondb.net/sprites/diamond-pearl/normal/scizor-f.png",
        level: 100,
        nature: 'Adamant',
        currHp,
        hp: 70,
        atk: 130,
        def: 100,
        spA: 55,
        spD: 80,
        spe: 65,
        evs: {hp: 248, atk: 252, spD: 8},
        ivs: {hp: 31, atk:31, def: 31, spA: 31, spD: 31, spe:31},
        types: ['Bug', 'Steel'],
        moves: ['Bullet Punch', 'X-Scissor', 'Pursuit', 'Facade']
    },
    {
        name: 'Garchomp',
        sprite: "https://img.pokemondb.net/sprites/black-white/normal/garchomp-f.png",
        level: 100,
        nature: 'Jolly',
        currHp,
        hp: 108,
        atk: 130,
        def: 95,
        spA: 80,
        spD: 85,
        spe: 102,
        evs: {atk: 252, spD: 4, spe: 252},
        ivs: {hp: 31, atk:31, def: 31, spA: 31, spD: 31, spe:31},
        types: ['Dragon', 'Ground'],
        moves: ['Crunch', 'Dragon Claw', 'Facade', 'Fire Fang']
    },
    {
        name: 'Ferrothorn',
        sprite: "https://img.pokemondb.net/sprites/black-white/normal/ferrothorn.png",
        level: 100,
        nature: 'Brave',
        currHp,
        hp: 74,
        atk: 94,
        def: 131,
        spA: 54,
        spD: 116,
        spe: 20,
        evs: {hp: 248, atk: 252, spA: 8},
        ivs: {hp: 31, atk:31, def: 31, spA: 31, spD: 31, spe:31},
        types: ['Grass', 'Steel'],
        moves: ['Energy Ball', 'Facade', 'Flash Cannon', 'Power Whip']
    },
    {
        name: 'Conkeldurr',
        sprite: "https://img.pokemondb.net/sprites/black-white/normal/conkeldurr.png",
        level: 100,
        nature: 'Adamant',
        currHp,
        hp: 105,
        atk: 140,
        def: 95,
        spA: 55,
        spD: 65,
        spe: 45,
        evs: {hp: 252, atk: 252, spD: 4},
        ivs: {hp: 31, atk:31, def: 31, spA: 31, spD: 31, spe:31},
        types: ['Fighting'],
        moves: ['Drain Punch', 'Hammer Arm', 'Facade', 'Ice Punch']
    },
    {
        name: 'Volcarona',
        sprite: "https://img.pokemondb.net/sprites/black-white/normal/volcarona.png",
        level: 100,
        nature: 'Timid',
        currHp,
        hp: 85,
        atk: 60,
        def: 65,
        spA: 135,
        spD: 105,
        spe: 100,
        evs: {spA: 252, spD: 4, spe: 252},
        ivs: {hp: 31, atk:31, def: 31, spA: 31, spD: 31, spe:31},
        types: ['Bug', 'Fire'],
        moves: ['Bug Buzz', 'Fiery Dance', 'Flamethrower', 'Giga Drain']
    }
];

function startBattle(){
    startButton.style.display = "none";
    for(let i = 0; i < allPkm.length; i++){
        allPkm[i].style.display = "flex";
        allPkm[i].innerHTML = userPokemonArray[i].name;
    }
}
function spawnUserPokemon(input){
    userdiv.style.display = "flex";
    userSprite.src = userPokemonArray[input].sprite;
    let pkmMoves = userPokemonArray[input].moves
    for(let i = 0; i < moves.length; i++){
        if(i<pkmMoves.length){
            moves[i].style.display = "flex";
            moves[i].innerHTML = pkmMoves[i];    
        }
        else{
            moves[i].style.display = "none";
        }
    }
}

function spawnOppPokemon(index){
    oppdiv.style.display = "flex";
    oppSprite.src = oppPokemonArray[index].sprite;
}

function attack(){

}

function calculateStats(){

}

/*function calculateDamage(pkmIndex, moveIndex){
    userDamage = ((((2*userPokemonArray[pkmIndex].level)/5)+2) * userPokemonArray[pkmIndex].moves[moveIndex].power * a/d);
}*/

function switchPokemon(index){
    userHp.innerHTML = `HP: ${userPokemonArray[index].currHp}%`;
    userSprite.src = userPokemonArray[index].sprite;
    let pkmMoves = userPokemonArray[index].moves
    for(let i = 0; i < moves.length; i++){
        if(i<pkmMoves.length){
            moves[i].innerHTML = pkmMoves[i];    
        }
        else{
            moves[i].style.display = "none";
        }
    }
}

function updateCurrPkm(){

}

function isFainted(){
    
}

function endBattle(){

}

function checkRound(){

}

function chatText(message){
    const newMessage = document.createElement("p");
    newMessage.textContent = message;

    chatLog.appendChild(newMessage);
}

function logTurn(userInput, oppInput){
    if(turnCount <=0){
        turnCount++;
    }
    else{
    chatText(`Turn${turnCount}:`)
    chatText(userInput);
    chatText(oppInput);
    turnCount++;
    }
}

function selectPokmeon(index){
    const pkmButtons = document.querySelectorAll(".pkm"); // Assuming buttons have a class "pkm"
    pkmButtons.forEach((button, idx) => {
        button.disabled = false; // Enable all buttons
        button.style.opacity = 1; // Reset appearance
        button.style.cursor = "pointer"; // Reset cursor
        if (idx === index) {
            // Disable the button for the currently selected Pokémon
            button.disabled = true;
            button.style.opacity = 0.5; // Dim the button
            button.style.cursor = "not-allowed"; // Change cursor
        }
    });    
    if(turnCount<=1){
        spawnUserPokemon(index);
        spawnOppPokemon(oppFaintedCount)
        logTurn(`User sent out ${userPokemonArray[index].name}!`, `Opponent sent out ${oppPokemonArray[oppFaintedCount].name}!`);
    }
    else{
        switchPokemon(index);
        logTurn(`User sent out ${userPokemonArray[index].name}!`)
    }
}

startButton.addEventListener("click",function(){
    startBattle();
    logTurn();
});

pkmButton1.addEventListener("click", function(){
    selectedPokemon = 0;
    selectPokmeon(selectedPokemon);
});
pkmButton2.addEventListener("click", function(){
    selectedPokemon = 1;
    selectPokmeon(selectedPokemon);
});
pkmButton3.addEventListener("click", function(){
    selectedPokemon = 2;
    selectPokmeon(selectedPokemon);
});
pkmButton4.addEventListener("click", function(){
    selectedPokemon = 3;
    selectPokmeon(selectedPokemon);
});
pkmButton5.addEventListener("click", function(){
    selectedPokemon = 4;
    selectPokmeon(selectedPokemon);
});
pkmButton6.addEventListener("click", function(){
    selectedPokemon = 5;
    selectPokmeon(selectedPokemon);
});
moveButton1.addEventListener("click", function(){
    selectedMove = 0;
    attack(selectedMove);
});
moveButton2.addEventListener("click", function(){
    selectedMove = 1;
    attack(selectedMove);
});
moveButton3.addEventListener("click", function(){
    selectedMove = 2;
    attack(selectedMove);
});
moveButton4.addEventListener("click", function(){
    selectedMove = 3;
    attack(selectedMove);
});
