let typeMatch = {
    'normal': [['ghost'], ['fighting'], ['rock', 'steel']],
    'fire': [[], ['water', 'ground', 'rock'], ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy']],
    'water': [[], ['electric', 'grass'], ['fire', 'water', 'ice', 'steel']],
    'electric': [['ground'], ['ground'], ['electric', 'flying', 'steel']],
    'grass': [[], ['fire', 'ice', 'poison', 'flying', 'bug'], ['water', 'electric', 'grass', 'ground']],
    'ice': [[], ['fire', 'fighting', 'rock', 'steel'], ['ice']],
    'fighting': [['ghost'], ['flying', 'psychic', 'fairy'], ['bug', 'rock', 'dark']],
    'poison': [['steel'], ['ground', 'psychic'], ['grass', 'fighting', 'poison', 'bug', 'fairy']],
    'ground': [['flying'], ['water', 'grass', 'ice'], ['poison', 'rock']],
    'flying': [['ground'], ['rock', 'electric', 'ice'], ['grass', 'bug', 'fighting']],
    'psychic': [['dark'], ['bug', 'ghost', 'dark'], ['fighting', 'psychic']],
    'bug': [[], ['fire', 'flying', 'rock'], ['grass', 'fighting', 'ground']],
    'rock': [[], ['water', 'grass', 'fighting', 'ground', 'steel'], ['normal', 'fire', 'poison', 'flying']],
    'ghost': [['normal'], ['ghost', 'dark'], ['poison', 'bug']],
    'dragon': [['fairy'], ['ice', 'dragon', 'fairy'], ['fire', 'water', 'electric', 'grass']],
    'dark': [[], ['fighting', 'bug', 'fairy'], ['ghost', 'dark']],
    'steel': [[], ['fire', 'fighting', 'ground'], ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy']],
    'fairy': [[], ['poison', 'steel'], ['fighting', 'bug', 'dark']],
};



const userTeamString = `
Gliscor @ Toxic Orb  
Ability: Poison Heal  
EVs: 252 HP / 252 Def / 4 SpD  
Impish Nature  
- Earthquake  
- Ice Fang  
- Fire Fang  
- Aerial Ace  

Chansey @ Eviolite  
Ability: Natural Cure  
Level: 69  
EVs: 4 HP / 252 Def / 252 SpD  
Bold Nature  
IVs: 0 Atk  
- Fire Punch  
- Thunder Punch  
- Ice Punch  
- Dizzy Punch  

Starmie @ Life Orb  
Ability: Natural Cure  
EVs: 4 Def / 252 SpA / 252 Spe  
Timid Nature  
IVs: 0 Atk  
- Rapid Spin  
- Ice Beam  
- Hydro Pump  
- Thunderbolt  

Magnezone @ Choice Scarf  
Ability: Magnet Pull  
EVs: 4 Def / 252 SpA / 252 Spe  
Timid Nature  
IVs: 2 Atk / 30 SpA / 30 Spe  
- Gyro Ball 
- Flash Cannon  
- Thunderbolt  
- Volt Switch  

Mienshao @ Life Orb  
Ability: Regenerator  
EVs: 252 Atk / 4 SpD / 252 Spe  
- High Jump Kick  
- Stone Edge  
- U-turn  
- Fake Out  

Serperior @ Assault Vest  
Ability: Contrary  
EVs: 56 HP / 200 SpA / 252 Spe  
Timid Nature  
IVs: 2 Atk / 30 SpA / 30 Spe  
- Leaf Storm  
- Dragon Pulse  
- Leaf Blade  
- Grass Knot 
`;

const oppTeamString = `
Mamoswine @ Choice Band  
Ability: Snow Cloak  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Avalanche  
- Earthquake  
- Ice Shard  
- Icicle Crash  

Scizor @ Life Orb  
Ability: Technician  
EVs: 248 HP / 252 Atk / 8 SpD  
Adamant Nature  
- Bullet Punch  
- X-Scissor  
- Pursuit  
- Facade  

Garchomp  
Ability: Sand Veil  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Crunch  
- Dragon Claw  
- Facade  
- Fire Fang  

Ferrothorn @ Rocky Helmet  
Ability: Iron Barbs  
EVs: 248 HP / 252 Atk / 8 SpA  
Brave Nature  
- Energy Ball  
- Facade  
- Flash Cannon  
- Power Whip  

Conkeldurr @ Flame Orb  
Ability: Guts  
EVs: 252 HP / 252 Atk / 4 SpD  
Adamant Nature  
- Drain Punch  
- Hammer Arm  
- Facade  
- Ice Punch  

Volcarona @ Leftovers  
Ability: Flame Body  
EVs: 252 SpA / 4 SpD / 252 Spe  
Timid Nature  
IVs: 0 Atk  
- Bug Buzz  
- Fiery Dance  
- Flamethrower  
- Giga Drain  
`;



class Pokemon{
    constructor(name, sprite, level = 100, nature, hp, atk, def, spA, spD, spe, evs = new EV(), ivs = new IV(), types, moves){
        this.name = name;
        this.sprite = sprite;
        this.level = level;
        this.nature = nature;
        this.hp = hp;
        this.atk = atk;
        this.def = def;
        this.spA = spA;
        this.spD = spD;
        this.spe = spe;
        this.evs = evs;
        this.ivs = ivs;
        this.types = types;
        this.moves = moves;
    }
}

class Moves{
    constructor(name, type, power, accuracy, pp, damageClass){
        this.name = name;
        this.type = type;
        this.power = power;
        this.accuracy = accuracy;
        this.pp = pp;
        this.damageClass= damageClass;
    }
}

class EV{
    constructor(hp=0, atk=0, def=0, spA=0, spD=0, spe=0){
        this.hp = hp;
        this.atk = atk;
        this.def = def;
        this.spA = spA;
        this.spD = spD;
        this.spe = spe;
    }

}

class IV{
    constructor(hp=31, atk=31, def=31, spA=31, spD=31, spe=31){
        this.hp = hp;
        this.atk = atk;
        this.def = def;
        this.spA = spA;
        this.spD = spD;
        this.spe = spe;
    }
}

// make pokemon arrays
// Split the pokemon data into blocks based on double line breaks
const userBlocks = userTeamString.trim().split(/\n\n+/);
const oppBlocks = oppTeamString.trim().split(/\n\n+/);

// Extract the first word from each block (this should be the pokemon's name)
const userPkmArray = userBlocks.map(block => block.split('\n')[0].split(' ')[0]);
const oppPkmArray= oppBlocks.map(block => block.split('\n')[0].split(' ')[0]);

//output
//console.log(userPkmArray);
//console.log(oppPkmArray);

// make moves arrays
// extract moves
const extractMoves = (block) => {
    const lines = block.split('\n'); // Split block into lines
    return lines
        .filter(line => line.startsWith('- ')) // Only lines starting with "- "
        .map(line => line.slice(2).trim()); // Remove "- " and trim the move name
};

// Update move arrays for user and opponent
const userMovesArray = userBlocks.map(block => extractMoves(block));
const oppMovesArray = oppBlocks.map(block => extractMoves(block));


//output
//console.log(userMovesArray);
//console.log(oppMovesArray);

// Function to extract EVs from a string
const extractEVs = (block) => {
    const evMatch = block.match(/EVs: ([\d\s/HPAtkDefSpASpDSpE]+)/);
    if (!evMatch) return new EV(); // Default EVs if not found

    const evString = evMatch[1];
    const evParts = evString.split('/').map(part => part.trim());
    const evs = new EV();

    evParts.forEach(evPart => {
        const [value, stat] = evPart.match(/(\d+)\s*(\w+)/).slice(1); // Extract value and stat
        const evValue = parseInt(value);

        switch (stat) {
            case "HP":
                evs.hp = evValue;
                break;
            case "Atk":
                evs.atk = evValue;
                break;
            case "Def":
                evs.def = evValue;
                break;
            case "SpA":
                evs.spA = evValue;
                break;
            case "SpD":
                evs.spD = evValue;
                break;
            case "Spe":
                evs.spe = evValue;
                break;
            default:
                console.warn(`Unknown EV stat: ${stat}`);
        }
    });

    return evs;
};
const extractIVs = (block) => {
    const ivMatch = block.match(/IVs: ([\d\s/HPAtkDefSpASpDSpE]+)/);
    if (!ivMatch) return new IV(); // Default IVs if not found

    const ivString = ivMatch[1];
    const ivParts = ivString.split('/').map(part => part.trim());
    const ivs = new IV();

    ivParts.forEach(ivPart => {
        const [value, stat] = ivPart.match(/(\d+)\s*(\w+)/).slice(1); // Extract value and stat
        const ivValue = parseInt(value);

        switch (stat) {
            case "HP":
                ivs.hp = ivValue;
                break;
            case "Atk":
                ivs.atk = ivValue;
                break;
            case "Def":
                ivs.def = ivValue;
                break;
            case "SpA":
                ivs.spA = ivValue;
                break;
            case "SpD":
                ivs.spD = ivValue;
                break;
            case "Spe":
                ivs.spe = ivValue;
                break;
            default:
                console.warn(`Unknown IV stat: ${stat}`);
        }
    });

    return ivs;
};

const extractNature = (block) => {
    const natureMatch = block.match(/(\w+) Nature/);
    if (natureMatch) {
        return natureMatch[1];
    }
    return null; // Return null if no nature is found
}

// declare pokemonteam arrays to append user and opponent pokemon objects to
let userPokemonTeam = [];
let oppPokemonTeam =[];

async function initializeTeams() {
    
    // Ensure fetchPokemon completes before moving to fetchMoves
    await fetchPokemon(userPkmArray, oppPkmArray);
    await fetchMoves(userMovesArray, oppMovesArray);

    // Output for debugging
    console.log("User Team:", userPokemonTeam);
    console.log("Opponent Team:", oppPokemonTeam);
}

async function fetchPokemon(userPkmArray, oppPkmArray){
    // iterate through pokemon array and append data to object
    for (let i = 0; i < userPkmArray.length; i++) {
        const block = userBlocks[i];
        const levelMatch = block.match(/Level: (\d+)/); // Extract level if specified
        const level = levelMatch ? parseInt(levelMatch[1]) : 100; // Default to 100 if not specified
        const nature = extractNature(block); // Extract Nature
        const evs = extractEVs(block); // Extract EVs
        const ivs = extractIVs(block); // Extract IVs
        const pokemonName = userPkmArray[i];
        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);

            if(!response.ok){
                throw new Error(`Could not fetch data for Pokemon: ${pokemonName}`);
            }

            const data = await response.json();
            
            // getting data for pokemon class
            const name = data.name;
            const sprite = data.sprites.back_default;
            const stats = data.stats.reduce((acc, stat) =>{
                acc[stat.stat.name] = stat.base_stat;
                return acc;
            }, {});
            const types = data.types.map(typeInfo => typeInfo.type.name);

            //new pokemon object
            const userPokemon = new Pokemon(
                name,
                sprite,
                level,
                nature,
                stats.hp,
                stats.attack,
                stats.defense,
                stats["special-attack"],
                stats["special-defense"],
                stats.speed,
                evs,
                ivs,
                types,
                []
            );

            //append to list of pokemon object
            userPokemonTeam.push(userPokemon);
        }
        catch(error){
            console.error(error);
        }

    }

    for (let i = 0; i < oppPkmArray.length; i++) {
        const block = oppBlocks[i];
        const levelMatch = block.match(/Level: (\d+)/); // Extract level if specified
        const level = levelMatch ? parseInt(levelMatch[1]) : 100; // Default to 100 if not specified
        const nature = extractNature(block); // Extract Nature
        const evs = extractEVs(block); // Extract EVs
        const ivs = extractIVs(block); // Extract IVs
        const pokemonName = oppPkmArray[i];
        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);

            if(!response.ok){
                throw new Error(`Could not fetch data for Pokemon: ${pokemonName}`);
            }

            const data = await response.json();
            
            // getting data for pokemon class
            const name = data.name;
            const sprite = data.sprites.front_default;
            const stats = data.stats.reduce((acc, stat) =>{
                acc[stat.stat.name] = stat.base_stat;
                return acc;
            }, {});
            const types = data.types.map(typeInfo => typeInfo.type.name);

            //new pokemon object
            const oppPokemon = new Pokemon(
                name,
                sprite,
                level,
                nature,
                stats.hp,
                stats.attack,
                stats.defense,
                stats["special-attack"],
                stats["special-defense"],
                stats.speed,
                evs,
                ivs,
                types,
                []
            );

            //append to list of pokemon object
            oppPokemonTeam.push(oppPokemon);
        }
        catch(error){
            console.error(error);
        }

    }
}

async function fetchMoves(userMovesArray, oppMovesArray) {
    for (let i = 0; i < userMovesArray.length; i++) {
        const moveList = userMovesArray[i]; // List of moves for this Pokémon
        const pokemon = userPokemonTeam[i]; // Corresponding Pokémon object
        for (let move of moveList) {
            try {
                // Replace spaces with dashes for multi-word move names
                const moveUrlName = move.toLowerCase().replace(/\s+/g, '-');
                const response = await fetch(`https://pokeapi.co/api/v2/move/${moveUrlName}`);

                if (!response.ok) {
                    throw new Error(`Could not fetch data for Move: ${move}`);
                }

                const data = await response.json();

                const moveDetails = {
                    name: data.name,
                    type: data.type.name,
                    power: data.power,
                    accuracy: data.accuracy,
                    pp: data.pp,
                    damageClass: data.damage_class.name,
                };

                // Append move details to Pokémon's moves array
                pokemon.moves.push(moveDetails);
            } catch (error) {
                console.error(error);
            }
        }
    }

    for (let i = 0; i < oppMovesArray.length; i++) {
        const moveList = oppMovesArray[i]; // List of moves for this Pokémon
        const pokemon = oppPokemonTeam[i]; // Corresponding Pokémon object
        for (let move of moveList) {
            try {
                // Replace spaces with dashes for multi-word move names
                const moveUrlName = move.toLowerCase().replace(/\s+/g, '-');
                const response = await fetch(`https://pokeapi.co/api/v2/move/${moveUrlName}`);

                if (!response.ok) {
                    throw new Error(`Could not fetch data for Move: ${move}`);
                }

                const data = await response.json();
                const moveDetails = {
                    name: data.name,
                    type: data.type.name,
                    power: data.power,
                    accuracy: data.accuracy,
                    pp: data.pp,
                    damageClass: data.damage_class.name,
                };

                // Append move details to Pokémon's moves array
                pokemon.moves.push(moveDetails);
            } catch (error) {
                console.error(error);
            }
        }
    }
}

async function battleStart(){
    await initializeTeams();
    
    // Ensure the sprites exist before attempting to set them
    if (userPokemonTeam.length > 0 && oppPokemonTeam.length > 0) {
        document.getElementById('userSprite').src = userPokemonTeam[0].sprite;
        document.getElementById('oppSprite').src = oppPokemonTeam[0].sprite;
        document.getElementById('move0').innerText = userPokemonTeam[0].moves[0].name;
        document.getElementById('move1').innerText = userPokemonTeam[0].moves[1].name;
        document.getElementById('move2').innerText = userPokemonTeam[0].moves[2].name;
        document.getElementById('move3').innerText = userPokemonTeam[0].moves[3].name;
        
    } else {
        console.error("Pokemon teams are not initialized.");
    }
    for(let i = 0; i < userPokemonTeam.length; i++){
        document.getElementById(`pkm${i}`).innerText = userPokemonTeam[i].name;
        document.getElementById(`pkm${i}`).style.display = 'block';
        document.getElementById(`userBall${i}`).style.display ='block';
    }
    for(let i = 0; i < oppPokemonTeam.length; i++){
        document.getElementById(`oppBall${i}`).style.display ='block';
    }
}

// Call battleStart after DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    battleStart().catch(console.error);
});



