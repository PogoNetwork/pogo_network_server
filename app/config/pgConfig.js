/*globals module, require ,console, __dirname, User*/

module.exports = {
    database: 'pokemonGoNetwork',
    user: 'pkm_trainer',
    password: 'pikachu',
    port: 5432,
    ssl: true,
    max: 20, //set pool max size to 20
    min: 4, //set min pool size to 4
    idleTimeoutMillis: 1000 //close idle clients after 1 second
};