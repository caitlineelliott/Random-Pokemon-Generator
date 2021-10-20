document.querySelector('button').addEventListener("click", function (event) {
    const pokemonField = document.querySelector(".pokezone-container");
    const originalImage = document.querySelector(".poke-img");
    const stats = document.querySelector('.stats');
    const baseURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

    const name = document.querySelector("#name");
    const numberStat = document.querySelector("#number");
    const defenseStat = document.querySelector("#defense");
    const hpStat = document.querySelector("#hp");
    const speedStat = document.querySelector("#speed");
    const attackStat = document.querySelector("#attack");
    const specialStat = document.querySelector("#special");

    let color = Math.floor((Math.random() * 255));
    // let color2 = Math.floor((Math.random() * 255));
    // let color3 = Math.floor((Math.random() * 255));

    async function getPokemon(num) {
        try {
            const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
            return await request.json();
        }
        catch (e) { console.log('FAILED TO FETCH GEONAMES API DATA:', e); }
    }

    let results = getPokemon(color)
        .then(function (results) {
            let pokeData = {
                name: results.name,
                number: results.id,
                hp: results.stats[0].base_stat,
                attack: results.stats[1].base_stat,
                specialAttack: results.stats[3].base_stat,
                specialDefense: results.stats[4].base_stat,
                speed: results.stats[5].base_stat,
            }

            pokemonField.style.background = `rgb(${color}, ${color}, ${color}`;
            originalImage.style.background = ` no-repeat center/50% url('${baseURL}${color}.png')`;
            stats.style.display = 'flex';

            if (color > 150) {
                stats.style.color = 'black';
            } else {
                stats.style.color = 'white';
            }

            name.innerHTML = pokeData.name;
            numberStat.innerHTML = pokeData.number;
            defenseStat.innerHTML = pokeData.specialDefense;
            hpStat.innerHTML = pokeData.hp;
            speedStat.innerHTML = pokeData.speed;
            attackStat.innerHTML = pokeData.attack;
            specialStat.innerHTML = pokeData.specialAttack;
        })
});
